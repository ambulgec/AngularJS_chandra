import { IScopeCustom } from "../interfaces/iscope.interface";
import { Product } from "../models/product.model";
import { ProductService } from "../services/product.service";
export class ProductCatalogController{
    products: Product[] = [];
   static $inject = ['$scope','ProductService']
    constructor($scope: IScopeCustom,
        private productService: ProductService
    ){
        this.getProductsData();
        $scope['vm'] = this;
    }
    getProductsData(){
       this.productService.getProductsData().
       then((response) => {
        this.products = response.data;
      })
      .catch((error) => {
        console.error('Error loading products:', error);
      });
    }
    onAddCart(product: Product){
      if(product){
        this.productService.addProductToCart(product);
        alert('Item added to cart successfully!!')
      }
    }
}