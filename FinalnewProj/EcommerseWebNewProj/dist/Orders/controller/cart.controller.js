
var OrderController = /** @class */ (function () {
    function OrderController(orderService, $window) {
        this.orderService = orderService;
        this.$window = $window;
        this.cart = [];
        this.loggedInUserId = null;
        this.loadCart();
    }
    OrderController.prototype.loadCart = function () {
        this.cart = this.orderService.loadCart();
    };
    OrderController.prototype.checkout = function () {
        this.orderService.checkout();
        this.loadCart();
    };
    OrderController.prototype.removeFromCart = function (product) {
        this.cart = this.orderService.removeFromCart(product);
    };
    OrderController.prototype.updateQuantity = function (product, amount) {
        this.cart = this.orderService.updateQuantity(product, amount);
    };
    OrderController.prototype.getCartTotal = function () {
        return this.orderService.getCartTotal(this.cart);
    };
    OrderController.$inject = ['OrderService', '$window'];
    return OrderController;
}());

angular.module('ecomApp').controller('OrderController', OrderController);
