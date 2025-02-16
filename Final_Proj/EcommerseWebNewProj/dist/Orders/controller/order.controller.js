
var OrderController = /** @class */ (function () {
    function OrderController($window) {
        this.$window = $window;
        this.products = [];
        this.cart = [];
        this.loggedInUserId = null;
        this.loadCart();
    }
    OrderController.prototype.loadCart = function () {
        var _this = this;
        this.loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!this.loggedInUserId)
            return;
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        // const userIndex = users.findIndex((user: any) => String(user.id) === String(this.loggedInUserId));
        var user = users.find(function (u) { return String(u.id) === String(_this.loggedInUserId); });
        this.cart = user ? user.cart || [] : [];
    };
    OrderController.prototype.checkout = function () {
        var _this = this;
        alert("Checkout successful!");
        this.cart = [];
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        var userIndex = users.findIndex(function (user) { return String(user.id) === String(_this.loggedInUserId); });
        // const userIndex = users.findIndex((user: any) => user.id === this.loggedInUserId);
        if (userIndex !== -1) {
            users[userIndex].cart = [];
            localStorage.setItem('users', JSON.stringify(users));
        }
        localStorage.removeItem('loggedInUserCart');
    };
    OrderController.prototype.removeFromCart = function (product) {
        var _this = this;
        this.loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!this.loggedInUserId)
            return;
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        var userIndex = users.findIndex(function (user) { return String(user.id) === String(_this.loggedInUserId); });
        if (userIndex === -1)
            return;
        users[userIndex].cart = users[userIndex].cart.filter(function (p) { return p.id !== product.id; });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUserCart', JSON.stringify(users[userIndex].cart));
        this.cart = users[userIndex].cart;
    };
    OrderController.prototype.updateQuantity = function (product, amount) {
        var _this = this;
        this.loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!this.loggedInUserId)
            return;
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        var userIndex = users.findIndex(function (user) { return String(user.id) === String(_this.loggedInUserId); });
        if (userIndex === -1)
            return;
        var cartItem = users[userIndex].cart.find(function (p) { return p.id === product.id; });
        var productItem = this.products.find(function (p) { return p.id === product.id; });
        if (cartItem) {
            cartItem.quantity = (cartItem.quantity || 0) + amount;
            if (cartItem.quantity <= 0) {
                users[userIndex].cart = users[userIndex].cart.filter(function (p) { return p.id !== product.id; });
            }
        }
        if (productItem) {
            productItem.quantity = cartItem ? cartItem.quantity : 0; // Sync with cart
        }
        // Update localStorage
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUserCart', JSON.stringify(users[userIndex].cart));
        this.cart = users[userIndex].cart;
    };
    OrderController.prototype.getCartTotal = function () {
        return this.cart.reduce(function (total, product) { return total + (product.price * (product.quantity || 1)); }, 0);
    };
    OrderController.$inject = ['$window'];
    return OrderController;
}());

angular.module('ecomApp').controller('OrderController', OrderController);
