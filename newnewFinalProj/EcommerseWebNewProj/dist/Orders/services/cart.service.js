
var CartService = /** @class */ (function () {
    function CartService() {
    }
    CartService.prototype.loadCart = function () {
        var loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId)
            return [];
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        var user = users.find(function (u) { return String(u.id) === String(loggedInUserId); });
        return user ? user.cart || [] : [];
    };
    CartService.prototype.checkout = function () {
        var loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId)
            return;
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        var userIndex = users.findIndex(function (user) { return String(user.id) === String(loggedInUserId); });
        if (userIndex !== -1) {
            users[userIndex].cart = [];
            localStorage.setItem('users', JSON.stringify(users));
        }
        localStorage.removeItem('loggedInUserCart');
        alert("Checkout successful!");
    };
    CartService.prototype.removeFromCart = function (product) {
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
    CartService.prototype.updateQuantity = function (product, amount) {
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
    CartService.prototype.getCartTotal = function (cart) {
        return cart.reduce(function (total, product) { return total + (product.price * (product.quantity || 1)); }, 0);
    };
    CartService.$inject = [];
    return CartService;
}());

angular.module('ecomApp').service('CartService', CartService);
