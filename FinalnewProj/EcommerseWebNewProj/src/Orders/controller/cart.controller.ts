import * as angular from 'angular';
import { CartService, Product } from '../services/cart.service';

export class OrderController {
    static $inject = ['OrderService', '$window'];
    
    cart: Product[] = [];
    loggedInUserId: string | null = null;

    constructor(private orderService: CartService, private $window: angular.IWindowService) {
        this.loadCart();
    }

    loadCart() {
        this.cart = this.orderService.loadCart();
    }

    checkout() {
        this.orderService.checkout();
        this.loadCart();
    }

    removeFromCart(product: Product) {
        this.cart = this.orderService.removeFromCart(product);
    }

    updateQuantity(product: Product, amount: number) {
        this.cart = this.orderService.updateQuantity(product, amount);
    }

    getCartTotal(): number {
        return this.orderService.getCartTotal(this.cart);
    }
}

angular.module('ecomApp').controller('OrderController', OrderController);
