
var AppController = /** @class */ (function () {
    function AppController($scope, $location) {
        var _this = this;
        this.$scope = $scope;
        this.$location = $location;
        this.$scope.showHeaderFooter = false; // Initialize variable
        this.$scope.$on('$routeChangeSuccess', function () {
            var currentPath = _this.$location.path();
            _this.$scope.showHeaderFooter = currentPath.startsWith('/product-catalog');
        });
    }
    AppController.$inject = ['$scope', '$location'];
    return AppController;
}());

angular.module('ecomApp').controller('AppController', AppController);
