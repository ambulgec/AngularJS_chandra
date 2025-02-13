import * as angular from 'angular';

interface ICustomScope extends angular.IScope {
  vm: any; 
}

export class MyController {
  static $inject = ['$scope'];
  message: string;
  users: Array<any>;

  constructor(private $scope: ICustomScope) {
    this.message = 'Welcome to  TypeScript!';
    this.users=[
      { name: 'sujit', email: 'abc@gmail.com' },
      { name: 'akshay ', email: 'akshay.sam@gmail.com' },
      { name: 'Monti', email: 'Monti.kale@gmail.com' }
    ];
    
    $scope['vm'] = this;
  }
}

//angular.module('myApp').controller('MyController', MyController);