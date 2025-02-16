import * as angular from 'angular';

interface IAppScope extends angular.IScope {
    showHeaderFooter: boolean;
}

export class AppController {
    static $inject = ['$scope', '$location'];

    constructor(private $scope: IAppScope, private $location: angular.ILocationService) {
        this.$scope.showHeaderFooter = false; // Initialize variable

        this.$scope.$on('$routeChangeSuccess', () => {
            const currentPath: string = this.$location.path();
            this.$scope.showHeaderFooter = currentPath.startsWith('/product-catalog');
        });
    }
}

angular.module('ecomApp').controller('AppController', AppController);

