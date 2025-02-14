import angular from "angular";
import { Product } from "../models/product.model";

export class ProductService {

    static $inject = ['$http'];

    constructor(private $http: angular.IHttpService) {

    }

    public getProductsData(): angular.IHttpPromise<Product[]> {
        return this.$http.get("./product.data.json");
    }
    public getCartProducts(): Product[] {
        return JSON.parse(JSON.stringify(sessionStorage.getItem('cartProducts')));
    }
    public addProductToCart(product: Product){
        sessionStorage.setItem('cartProducts', JSON.stringify(product));
    }
}
