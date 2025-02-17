
angular.module('ecomApp', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
            redirectTo: '/login'
        })
            .when('/login', {
            templateUrl: 'src/Authentication/views/login.html',
            controller: 'AuthController',
            controllerAs: 'vm'
        })
            .when('/register', {
            templateUrl: 'src/Authentication/views/register.html',
            controller: 'AuthController',
            controllerAs: 'vm'
        })
            .when('/products', {
            templateUrl: 'src/Prodct-catlog/views/product.view.html',
            controller: 'ProductController',
            controllerAs: 'vm'
        })
            .when('/cart', {
            templateUrl: 'src/Orders/views/cart.view.html',
            controller: 'OrderController',
            controllerAs: 'vm'
        })
            .otherwise({
            redirectTo: '/login'
        });
    }]);
