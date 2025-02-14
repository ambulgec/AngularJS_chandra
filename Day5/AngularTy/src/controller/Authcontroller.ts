import * as angular from 'angular';

interface IUser {
    name: string;
    address: string;
    email: string;
    password: string;
}

interface IAuthScope extends angular.IScope {
    vm: AuthController;
}

export class AuthController {
    static $inject = ['$scope', '$window'];
    users: IUser[];
    user: IUser;
    message: string | any;

    constructor(private $scope: IAuthScope, private $window: angular.IWindowService) {
        this.user = { name: "", address: "", email: "", password: "" };
        this.users = JSON.parse(localStorage.getItem("users") || "[]");

        // Bind controller instance to $scope
        $scope.vm = this;
    }

    register(): void {
        if (!this.user.name || !this.user.address || !this.user.email || !this.user.password) {
            this.message = "All fields are required!";
            return;
        }

        // Check if user already exists
        // if (this.users.filter(u => u.email === this.user.email)) {
        //     this.message = "User already exists! Please log in.";
        //     return;
        // }

        // Save new user
        this.users.push({ ...this.user });
        localStorage.setItem("users", JSON.stringify(this.users));

        this.message = "Registration successful!";
    }

    login(): void {
        if (!this.user.email || !this.user.password) {
            this.message = "Email and Password are required!";
            return;
        }
    
        const isUserValid = this.users.some((u: IUser) => 
            u.email === this.user.email && u.password === this.user.password
        );
    
        if (isUserValid) {
            localStorage.setItem("loggedInUser", JSON.stringify(this.user));
            this.$window.location.href = "product.html"; 
        } else {
            this.message = "Invalid Email or Password!";
        }
    }
    

    
}


angular.module('myApp').controller('AuthController', AuthController);
