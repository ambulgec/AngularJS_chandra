var ProductService = /** @class */ (function () {
    function ProductService($http) {
        this.$http = $http;
    }
    ProductService.prototype.getProductsData = function () {
        return this.$http.get("./product.data.json");
    };
    ProductService.prototype.getCartProducts = function () {
        return JSON.parse(JSON.stringify(sessionStorage.getItem('cartProducts')));
    };
    ProductService.prototype.addProductToCart = function (product) {
        sessionStorage.setItem('cartProducts', JSON.stringify(product));
    };
    ProductService.$inject = ['$http'];
    return ProductService;
}());
