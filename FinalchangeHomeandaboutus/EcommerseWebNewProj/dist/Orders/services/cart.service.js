
var CartService = /** @class */ (function () {
    function CartService() {
    }
    CartService.prototype.getLoggedInUser = function () {
        var loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId)
            return null;
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        return users.find(function (u) { return String(u.id) === String(loggedInUserId); }) || null;
    };
    CartService.prototype.updateUserCart = function (updatedCart) {
        var loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId)
            return;
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        var userIndex = users.findIndex(function (user) { return String(user.id) === String(loggedInUserId); });
        if (userIndex !== -1) {
            users[userIndex].cart = updatedCart;
            localStorage.setItem('users', JSON.stringify(users));
        }
        localStorage.setItem('loggedInUserCart', JSON.stringify(updatedCart));
    };
    CartService.prototype.loadCart = function () {
        var user = this.getLoggedInUser();
        return user ? user.cart || [] : [];
    };
    CartService.prototype.checkout = function () {
        this.updateUserCart([]);
        alert("Checkout successful!");
    };
    CartService.prototype.removeFromCart = function (product) {
        var updatedCart = this.loadCart().filter(function (p) { return p.id !== product.id; });
        this.updateUserCart(updatedCart);
        return updatedCart;
    };
    CartService.prototype.updateQuantity = function (product, amount) {
        var cart = this.loadCart();
        var cartItem = cart.find(function (p) { return p.id === product.id; });
        if (cartItem) {
            cartItem.quantity = (cartItem.quantity || 0) + amount;
            if (cartItem.quantity <= 0) {
                cart = cart.filter(function (p) { return p.id !== product.id; });
            }
        }
        this.updateUserCart(cart);
        return cart;
    };
    CartService.prototype.getCartTotal = function (cart) {
        return cart.reduce(function (total, product) { return total + (product.price * (product.quantity || 1)); }, 0);
    };
    CartService.$inject = [];
    return CartService;
}());

angular.module('ecomApp').service('CartService', CartService);
