import { IScopeCustom } from "../interfaces/iscope.interface";
import { Product } from "../models/product.model";
import { ProductService } from "../services/product.service";

export class ShoppingController{
      products: Product[] = [];
         static $inject = ['$scope','ProductService']
          constructor($scope: IScopeCustom,
              private productService: ProductService
          ){
              this.getCartData();
              $scope['vm'] = this;
          } 
          getCartData(){
            this.products = JSON.parse(JSON.stringify(this.productService.getCartProducts()));
          }
          removeFromCart(){
            var x = 0;
          }
}