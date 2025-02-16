
var ProductService = /** @class */ (function () {
    function ProductService($http) {
        this.$http = $http;
    }
    ProductService.prototype.getProducts = function () {
        return this.$http.get('./product.data.json')
            .then(function (response) { return response.data; });
    };
    ProductService.$inject = ['$http'];
    return ProductService;
}());

angular.module('ecomApp').service('ProductService', ProductService);
