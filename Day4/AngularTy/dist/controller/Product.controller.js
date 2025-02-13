
var ProductController = /** @class */ (function () {
    function ProductController($scope) {
        this.$scope = $scope;
        this.message = 'Welcome to the Product Store!';
        this.products = [
            { name: "iPhone 13", price: 59999, image: "../../assets/iphone13.jpg", description: "Apple iPhone 13 with A15 Bionic chip." },
            { name: "iPhone 16", price: 99999, image: "../../assets/iphone16.jpg", description: "Apple iPhone 16 with advanced features." },
            { name: "iPhone 16 (128GB)", price: 109999, image: "../../assets/iphone16128.jpg", description: "Apple iPhone 16 with 128GB storage." },
            { name: "iPhone 16 (128GB) Green", price: 109999, image: "../../assets/iphone16128green.jpg", description: "Apple iPhone 16 in Green color." },
            { name: "Redmi Note Mobile", price: 24999, image: "../../assets/RedmiNoteMobile.jpg", description: "Xiaomi Redmi Note with AMOLED display." },
            { name: "Samsung S24 Ultra", price: 129999, image: "../../assets/s24ultramobile.jpg", description: "Samsung Galaxy S24 Ultra with powerful camera." },
            { name: "Samsung Galaxy S23 FE", price: 69999, image: "../../assets/SamsungGImobile.jpg", description: "Samsung S23 FE flagship experience." },
            { name: "Samsung A56", price: 34999, image: "../../assets/Samsungmobile.jpg", description: "Samsung A56 with long battery life." }
        ];
        
        $scope.vm = this;
    }
    ProductController.$inject = ['$scope'];
    return ProductController;
}());

// Register the controller with the AngularJS module
angular.module('myApp').controller('ProductController', ProductController);
