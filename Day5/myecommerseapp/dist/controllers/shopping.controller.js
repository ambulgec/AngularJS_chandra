var ShoppingController = /** @class */ (function () {
    function ShoppingController($scope, productService) {
        this.productService = productService;
        this.products = [];
        this.getCartData();
        $scope['vm'] = this;
    }
    ShoppingController.prototype.getCartData = function () {
        this.products = JSON.parse(JSON.stringify(this.productService.getCartProducts()));
    };
    ShoppingController.prototype.removeFromCart = function () {
        var x = 0;
    };
    ShoppingController.$inject = ['$scope', 'ProductService'];
    return ShoppingController;
}());

