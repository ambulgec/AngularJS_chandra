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

var AuthService = /** @class */ (function () {
    function AuthService() {
        this.users = JSON.parse(localStorage.getItem("users") || "[]");
    }
    AuthService.prototype.login = function (email, password) {
        return this.users.find(function (u) { return u.email === email && u.password === password; }) || null;
    };
    AuthService.prototype.register = function (userData) {
        if (!userData.name || !userData.email || !userData.password || !userData.mobile || !userData.address || !userData.country) {
            return "All fields are required!";
        }
        if (this.users.some(function (u) { return u.email === userData.email; })) {
            return "User already exists! Please login.";
        }
        var newUser = __assign({ id: Date.now(), cart: [] }, userData);
        this.users.push(newUser);
        localStorage.setItem("users", JSON.stringify(this.users));
        return "Registration successful!";
    };
    return AuthService;
}());

angular.module('ecomApp').service('AuthService', AuthService);
