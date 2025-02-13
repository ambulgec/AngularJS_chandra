var MyLoginController = /** @class */ (function () {
    function MyLoginController($scope) {
        this.$scope = $scope;
        this.message = 'Welcome to  TypeScript!';
        this.users = [
            { name: 'sujit', email: 'abc@gmail.com' },
            { name: 'akshay ', email: 'akshay.sam@gmail.com' },
            { name: 'Monti', email: 'Monti.kale@gmail.com' }
        ];
        $scope['vm'] = this;
    }
    MyLoginController.$inject = ['$scope'];
    return MyLoginController;
}());

//angular.module('myApp').controller('MyController', MyController);
