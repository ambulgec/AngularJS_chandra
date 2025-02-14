import * as angular from 'angular';
import 'angular-route';  // Import ngRoute for routing
import { MyFirstController } from './controllers/app.controller';
import { ProductCatalogController } from './controllers/product-catalog.controller';
import { ShoppingController } from './controllers/shopping.controller';
import { LoginController } from './controllers/login.controller';
import { ProductService } from './services/product.service';
import { HomeController } from './controllers/home.controller';
import { AuthController } from './controllers/auth.controller';

angular.module('myApp', ['ngRoute'])
.service('ProductService',ProductService)
.controller('MyFirstController',MyFirstController)
.controller('ProductCatalogController',ProductCatalogController)
.controller('ShoppingController',ShoppingController)
.controller('LoginController',LoginController)
.controller('HomeController',HomeController)
.controller('AuthController',AuthController)
.config(['$routeProvider', ($routeProvider:any) => {
    $routeProvider
      .when('/cart', {
        templateUrl: 'views/shopping-cart.html',  // Template for the home route
        controller: 'ShoppingController',  // Controller for the home route
        controllerAs: 'shoppingControllerCtrl'  // Use 'homeCtrl' as alias for the controller instance
      })
      .when('/home', {
        templateUrl: 'views/home.html',  // Template for the home route
        controller: 'HomeController',  // Controller for the home route
        controllerAs: 'homeControllerCtrl'  // Use 'homeCtrl' as alias for the controller instance
      })
  }]);
