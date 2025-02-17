
angular.module('ecomApp', ['ngRoute'])
    .controller('AuthController', AuthController)
    .service('AuthService', AuthService)
    .controller('ProductController', ProductController)
    .service('ProductService', ProductService)
    .controller('OrderController', OrderController)
    .service('CartService', CartService);
