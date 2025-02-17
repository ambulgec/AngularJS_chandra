import * as angular from 'angular';

export interface Product {
    id: string;
    name: string;
    type: string;
    subtype: string;
    price: number;
    imgSrc: string;
    quantity?: number;
}

export class ProductService {
    static $inject = ['$http'];

    constructor(private $http: angular.IHttpService) {}

    getProducts(): angular.IPromise<Product[]> {
        return this.$http.get<Product[]>('./product.data.json')
            .then(response => response.data);
    }

    loadCart(): Product[] {
        let loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId) return [];

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => String(u.id) === String(loggedInUserId));

        return user ? user.cart || [] : [];
    }

    addToCart(product: Product, selectedQuantity: number): Product[] {
        let loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId) {
            alert('Please log in to add items to the cart.');
            return [];
        }

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((user: any) => String(user.id) === String(loggedInUserId));
        if (userIndex === -1) return [];

        if (!users[userIndex].cart) {
            users[userIndex].cart = [];
        }

        let existingProduct = users[userIndex].cart.find((p: Product) => p.id === product.id);

        if (existingProduct) {
            existingProduct.quantity = selectedQuantity || 1; 
        } else {
            users[userIndex].cart.push({ ...product, quantity: selectedQuantity || 1 });
        }

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUserCart', JSON.stringify(users[userIndex].cart));

        return users[userIndex].cart;
    }

    updateQuantity(product: Product, amount: number): Product[] {
        let loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId) return [];

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((user: any) => String(user.id) === String(loggedInUserId));
        if (userIndex === -1) return [];

        let cartItem = users[userIndex].cart.find((p: Product) => p.id === product.id);
        if (cartItem) {
            cartItem.quantity = (cartItem.quantity || 0) + amount;
            if (cartItem.quantity <= 0) {
                users[userIndex].cart = users[userIndex].cart.filter((p: Product) => p.id !== product.id);
            }
        }

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUserCart', JSON.stringify(users[userIndex].cart));

        return users[userIndex].cart;
    }

    removeFromCart(product: Product): Product[] {
        let loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId) return [];

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((user: any) => String(user.id) === String(loggedInUserId));
        if (userIndex === -1) return [];

        users[userIndex].cart = users[userIndex].cart.filter((p: Product) => p.id !== product.id);

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUserCart', JSON.stringify(users[userIndex].cart));

        return users[userIndex].cart;
    }
}

angular.module('ecomApp').service('ProductService', ProductService);
