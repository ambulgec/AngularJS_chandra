import * as angular from 'angular';
import { CartService } from '../services/cart.service';
import { Product } from '../../Prodct-catlog/model/product.model'; 

export class OrderController {
    static $inject = ['CartService'];

    cart: Product[] = [];

    constructor(private cartService: CartService) {
        this.loadCart();
    }

    loadCart() {
        this.cart = this.cartService.loadCart();
    }

    checkout() {
        this.cartService.checkout();
        this.loadCart();
    }

    removeFromCart(product: Product) {
        this.cart = this.cartService.removeFromCart(product);
    }

    updateQuantity(product: Product, amount: number) {
        this.cart = this.cartService.updateQuantity(product, amount);
    }

    getCartTotal(): number {
        return this.cartService.getCartTotal(this.cart);
    }
}

angular.module('ecomApp').controller('OrderController', OrderController);
