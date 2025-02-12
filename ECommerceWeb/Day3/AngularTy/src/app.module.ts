import * as angular from 'angular';
import { MyController } from 'controller/app.controller';
import { ProductController } from 'controller/Product.controller';
 
angular.module('myApp', [])
.controller('MyController', MyController)
.controller('ProductController', ProductController);