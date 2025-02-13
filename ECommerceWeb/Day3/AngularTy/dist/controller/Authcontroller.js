var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var AuthController = /** @class */ (function () {
    function AuthController($scope, $window) {
        this.$scope = $scope;
        this.$window = $window;
        this.user = { name: "", address: "", email: "", password: "" };
        this.users = JSON.parse(localStorage.getItem("users") || "[]");
        // Bind controller instance to $scope
        $scope.vm = this;
    }
    AuthController.prototype.register = function () {
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
        this.users.push(__assign({}, this.user));
        localStorage.setItem("users", JSON.stringify(this.users));
        this.message = "Registration successful!";
    };
    AuthController.prototype.login = function () {
        var _this = this;
        if (!this.user.email || !this.user.password) {
            this.message = "Email and Password are required!";
            return;
        }
        var isUserValid = this.users.some(function (u) {
            return u.email === _this.user.email && u.password === _this.user.password;
        });
        if (isUserValid) {
            localStorage.setItem("loggedInUser", JSON.stringify(this.user));
            this.$window.location.href = "product.html"; // Redirect to Product Page
        }
        else {
            this.message = "Invalid Email or Password!";
        }
    };
    AuthController.$inject = ['$scope', '$window'];
    return AuthController;
}());

// Register the controller with the AngularJS module
angular.module('myApp').controller('AuthController', AuthController);
