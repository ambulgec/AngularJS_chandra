import * as angular from 'angular';
import { Product } from '../../Prodct-catlog/model/product.model'; 

export class CartService {
    static $inject = [];

    constructor() {}

    private getLoggedInUser(): any | null {
        let loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId) return null;

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        return users.find((u: any) => String(u.id) === String(loggedInUserId)) || null;
    }

    private updateUserCart(updatedCart: Product[]): void {
        let loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId) return;

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((user: any) => String(user.id) === String(loggedInUserId));
        
        if (userIndex !== -1) {
            users[userIndex].cart = updatedCart;
            localStorage.setItem('users', JSON.stringify(users));
        }

        localStorage.setItem('loggedInUserCart', JSON.stringify(updatedCart));
    }

    loadCart(): Product[] {
        const user = this.getLoggedInUser();
        return user ? user.cart || [] : [];
    }

    checkout(): void {
        this.updateUserCart([]);
        alert("Checkout successful!");
    }

    removeFromCart(product: Product): Product[] {
        const updatedCart = this.loadCart().filter((p: Product) => p.id !== product.id);
        this.updateUserCart(updatedCart);
        return updatedCart;
    }

    updateQuantity(product: Product, amount: number): Product[] {
        let cart = this.loadCart();
        let cartItem = cart.find((p: Product) => p.id === product.id);

        if (cartItem) {
            cartItem.quantity = (cartItem.quantity || 0) + amount;
            if (cartItem.quantity <= 0) {
                cart = cart.filter((p: Product) => p.id !== product.id);
            }
        }

        this.updateUserCart(cart);
        return cart;
    }

    getCartTotal(cart: Product[]): number {
        return cart.reduce((total, product) => total + (product.price * (product.quantity || 1)), 0);
    }
}

angular.module('ecomApp').service('CartService', CartService);
