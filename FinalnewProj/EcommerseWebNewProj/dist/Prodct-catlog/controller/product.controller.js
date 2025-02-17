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

var ProductController = /** @class */ (function () {
    function ProductController(productService, $window, $scope) {
        this.productService = productService;
        this.$window = $window;
        this.$scope = $scope;
        this.products = [];
        this.cart = [];
        this.loggedInUserId = null;
        this.loggedInUser = null;
        this.selectedQuantities = {};
        this.showHeader = false;
        this.loadProducts();
        this.loadCart();
        this.loadUser();
        this.$window.scrollTo(0, 0);
    }
    ProductController.prototype.loadProducts = function () {
        var _this = this;
        this.productService.getProducts().then(function (data) {
            _this.loggedInUserId = localStorage.getItem('loggedInUserId');
            if (!_this.loggedInUserId) {
                _this.products = data.map(function (product) { return (__assign(__assign({}, product), { quantity: 0 })); });
                return;
            }
            var cart = _this.productService.loadCart();
            _this.products = data.map(function (product) {
                var cartItem = cart.find(function (item) { return item.id === product.id; });
                return __assign(__assign({}, product), { quantity: cartItem ? cartItem.quantity : 0 });
            });
        });
    };
    ProductController.prototype.updateDisplayedQuantity = function (product, amount) {
        var newQuantity = (this.selectedQuantities[product.id] || 0) + amount;
        this.selectedQuantities[product.id] = newQuantity < 0 ? 0 : newQuantity;
        this.$scope.$applyAsync();
    };
    ProductController.prototype.loadCart = function () {
        this.cart = this.productService.loadCart();
    };
    ProductController.prototype.addToCart = function (product) {
        this.cart = this.productService.addToCart(product, this.selectedQuantities[product.id] || 1);
        alert("Product Added Successfully");
        this.$window.location.reload();
    };
    ProductController.prototype.updateQuantity = function (product, amount) {
        this.cart = this.productService.updateQuantity(product, amount);
    };
    ProductController.prototype.removeFromCart = function (product) {
        this.cart = this.productService.removeFromCart(product);
    };
    ProductController.prototype.loadUser = function () {
        var userData = localStorage.getItem('loggedInUser');
        if (userData) {
            try {
                var user = JSON.parse(userData);
                this.loggedInUser = user.name || null;
            }
            catch (error) {
                console.error("Error parsing loggedInUser:", error);
                this.loggedInUser = null;
            }
        }
        else {
            this.loggedInUser = null;
        }
    };
    ProductController.prototype.logout = function () {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('loggedInUserId');
        localStorage.removeItem('loggedInUserCart');
        this.$window.location.href = "#!/login";
        this.$window.location.reload();
    };
    ProductController.$inject = ['ProductService', '$window', '$scope'];
    return ProductController;
}());

angular.module('ecomApp').controller('ProductController', ProductController);
