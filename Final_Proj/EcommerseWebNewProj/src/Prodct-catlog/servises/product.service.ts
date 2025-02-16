import * as angular from 'angular';

export interface Product {
    id: string;
    name: string;
    type: string;
    subtype: string;
    price: number;
    imgSrc: string;
    quantity?: number;
}

export class ProductService {
    static $inject = ['$http'];

    constructor(private $http: angular.IHttpService) {}

    getProducts(): angular.IPromise<Product[]> {
        return this.$http.get<Product[]>('./product.data.json')
            .then(response => response.data);
    }
}


angular.module('ecomApp').service('ProductService', ProductService);
