import * as angular from 'angular';

export interface Product {
    id: string;
    name: string;
    price: number;
    imgSrc: string;
    quantity?: number;
}

export class CartService {
    static $inject = [];

    constructor() {}

    loadCart(): Product[] {
        let loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId) return [];

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => String(u.id) === String(loggedInUserId));

        return user ? user.cart || [] : [];
    }

    checkout(): void {
        let loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId) return;

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((user: any) => String(user.id) === String(loggedInUserId));
        
        if (userIndex !== -1) {
            users[userIndex].cart = [];
            localStorage.setItem('users', JSON.stringify(users));
        }

        localStorage.removeItem('loggedInUserCart');
        alert("Checkout successful!");
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

    getCartTotal(cart: Product[]): number {
        return cart.reduce((total, product) => total + (product.price * (product.quantity || 1)), 0);
    }
}

angular.module('ecomApp').service('CartService', CartService);
