import * as angular from 'angular';
import { CartService, Product } from '../services/cart.service';

export class OrderController {
    static $inject = ['CartService', '$window'];
    
    cart: Product[] = [];
    loggedInUserId: string | null = null;

    constructor(private CartService: CartService, private $window: angular.IWindowService) {
        this.loadCart();
    }

    loadCart() {
        this.cart = this.CartService.loadCart();
    }

    checkout() {
        this.CartService.checkout();
        this.loadCart();
    }

    removeFromCart(product: Product) {
        this.cart = this.CartService.removeFromCart(product);
    }

    updateQuantity(product: Product, amount: number) {
        this.cart = this.CartService.updateQuantity(product, amount);
    }

    getCartTotal(): number {
        return this.CartService.getCartTotal(this.cart);
    }
}

angular.module('ecomApp').controller('OrderController', OrderController);
