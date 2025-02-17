
var OrderController = /** @class */ (function () {
    function OrderController(CartService, $window) {
        this.CartService = CartService;
        this.$window = $window;
        this.cart = [];
        this.loggedInUserId = null;
        this.loadCart();
    }
    OrderController.prototype.loadCart = function () {
        this.cart = this.CartService.loadCart();
    };
    OrderController.prototype.checkout = function () {
        this.CartService.checkout();
        this.loadCart();
    };
    OrderController.prototype.removeFromCart = function (product) {
        this.cart = this.CartService.removeFromCart(product);
    };
    OrderController.prototype.updateQuantity = function (product, amount) {
        this.cart = this.CartService.updateQuantity(product, amount);
    };
    OrderController.prototype.getCartTotal = function () {
        return this.CartService.getCartTotal(this.cart);
    };
    OrderController.$inject = ['CartService', '$window'];
    return OrderController;
}());

angular.module('ecomApp').controller('OrderController', OrderController);
