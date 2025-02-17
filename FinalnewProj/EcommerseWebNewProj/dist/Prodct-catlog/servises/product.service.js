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

var ProductService = /** @class */ (function () {
    function ProductService($http) {
        this.$http = $http;
    }
    ProductService.prototype.getProducts = function () {
        return this.$http.get('./product.data.json')
            .then(function (response) { return response.data; });
    };
    ProductService.prototype.loadCart = function () {
        var loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId)
            return [];
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        var user = users.find(function (u) { return String(u.id) === String(loggedInUserId); });
        return user ? user.cart || [] : [];
    };
    ProductService.prototype.addToCart = function (product, selectedQuantity) {
        var loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId) {
            alert('Please log in to add items to the cart.');
            return [];
        }
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        var userIndex = users.findIndex(function (user) { return String(user.id) === String(loggedInUserId); });
        if (userIndex === -1)
            return [];
        if (!users[userIndex].cart) {
            users[userIndex].cart = [];
        }
        var existingProduct = users[userIndex].cart.find(function (p) { return p.id === product.id; });
        if (existingProduct) {
            existingProduct.quantity = selectedQuantity || 1;
        }
        else {
            users[userIndex].cart.push(__assign(__assign({}, product), { quantity: selectedQuantity || 1 }));
        }
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUserCart', JSON.stringify(users[userIndex].cart));
        return users[userIndex].cart;
    };
    ProductService.prototype.updateQuantity = function (product, amount) {
        var loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId)
            return [];
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        var userIndex = users.findIndex(function (user) { return String(user.id) === String(loggedInUserId); });
        if (userIndex === -1)
            return [];
        var cartItem = users[userIndex].cart.find(function (p) { return p.id === product.id; });
        if (cartItem) {
            cartItem.quantity = (cartItem.quantity || 0) + amount;
            if (cartItem.quantity <= 0) {
                users[userIndex].cart = users[userIndex].cart.filter(function (p) { return p.id !== product.id; });
            }
        }
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUserCart', JSON.stringify(users[userIndex].cart));
        return users[userIndex].cart;
    };
    ProductService.prototype.removeFromCart = function (product) {
        var loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId)
            return [];
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        var userIndex = users.findIndex(function (user) { return String(user.id) === String(loggedInUserId); });
        if (userIndex === -1)
            return [];
        users[userIndex].cart = users[userIndex].cart.filter(function (p) { return p.id !== product.id; });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUserCart', JSON.stringify(users[userIndex].cart));
        return users[userIndex].cart;
    };
    ProductService.$inject = ['$http'];
    return ProductService;
}());

angular.module('ecomApp').service('ProductService', ProductService);
