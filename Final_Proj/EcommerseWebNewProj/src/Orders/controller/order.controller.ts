import * as angular from 'angular';

interface Product {
    id: string;
    name: string;
    price: number;
    imgSrc: string;
    quantity?: number;
}


export class OrderController {
    static $inject = ['$window'];
   products: Product[] = [];
    cart: any[] = [];
    loggedInUserId: string | null = null;

    constructor(private $window: angular.IWindowService) {
        this.loadCart();
        
    }

    loadCart() {
        this.loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!this.loggedInUserId) return;

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        // const userIndex = users.findIndex((user: any) => String(user.id) === String(this.loggedInUserId));
        const user = users.find((u: any) => String(u.id) === String(this.loggedInUserId));
        this.cart = user ? user.cart || [] : [];
    }

    checkout() {
        alert("Checkout successful!");
        this.cart = [];

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((user: any) => String(user.id) === String(this.loggedInUserId));
        // const userIndex = users.findIndex((user: any) => user.id === this.loggedInUserId);
        if (userIndex !== -1) {
            users[userIndex].cart = [];
            localStorage.setItem('users', JSON.stringify(users));
        }

        localStorage.removeItem('loggedInUserCart');
    }


    removeFromCart(product: Product) {
        this.loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!this.loggedInUserId) return;
    
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((user: any) => String(user.id) === String(this.loggedInUserId));
        if (userIndex === -1) return;
    
        users[userIndex].cart = users[userIndex].cart.filter((p: Product) => p.id !== product.id);
    
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUserCart', JSON.stringify(users[userIndex].cart));
    
        this.cart = users[userIndex].cart;
    }

     updateQuantity(product: Product, amount: number) {
            this.loggedInUserId = localStorage.getItem('loggedInUserId');
            if (!this.loggedInUserId) return;
        
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            const userIndex = users.findIndex((user: any) => String(user.id) === String(this.loggedInUserId));
            if (userIndex === -1) return;
        
            let cartItem = users[userIndex].cart.find((p: Product) => p.id === product.id);
            let productItem = this.products.find((p: Product) => p.id === product.id); 
        
            if (cartItem) {
                cartItem.quantity = (cartItem.quantity || 0) + amount;
                
                if (cartItem.quantity <= 0) {
                    users[userIndex].cart = users[userIndex].cart.filter((p: Product) => p.id !== product.id);
                }
            }
        
            if (productItem) {
                productItem.quantity = cartItem ? cartItem.quantity : 0; // Sync with cart
            }
        
            // Update localStorage
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('loggedInUserCart', JSON.stringify(users[userIndex].cart));
        
            this.cart = users[userIndex].cart;
        }
        getCartTotal(): number {
            return this.cart.reduce((total, product) => total + (product.price * (product.quantity || 1)), 0);
        }

}

angular.module('ecomApp').controller('OrderController', OrderController);
