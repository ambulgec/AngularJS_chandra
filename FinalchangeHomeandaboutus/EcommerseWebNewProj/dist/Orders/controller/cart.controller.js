
var OrderController = /** @class */ (function () {
    function OrderController(cartService) {
        this.cartService = cartService;
        this.cart = [];
        this.loadCart();
    }
    OrderController.prototype.loadCart = function () {
        this.cart = this.cartService.loadCart();
    };
    OrderController.prototype.checkout = function () {
        this.cartService.checkout();
        this.loadCart();
    };
    OrderController.prototype.removeFromCart = function (product) {
        this.cart = this.cartService.removeFromCart(product);
    };
    OrderController.prototype.updateQuantity = function (product, amount) {
        this.cart = this.cartService.updateQuantity(product, amount);
    };
    OrderController.prototype.getCartTotal = function () {
        return this.cartService.getCartTotal(this.cart);
    };
    OrderController.$inject = ['CartService'];
    return OrderController;
}());

angular.module('ecomApp').controller('OrderController', OrderController);
