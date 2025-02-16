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
        this.filteredProducts = [];
        this.selectedQuantities = {};
        this.showHeader = false;
        this.loadProducts();
        this.loadCart();
        this.$window.scrollTo(0, 0);
        this.loadUser();
    }
    ProductController.prototype.loadProducts = function () {
        var _this = this;
        this.productService.getProducts().then(function (data) {
            _this.loggedInUserId = localStorage.getItem('loggedInUserId');
            if (!_this.loggedInUserId) {
                _this.products = data.map(function (product) { return (__assign(__assign({}, product), { quantity: 0 // Default to 0 if not logged in
                 })); });
                return;
            }
            var users = JSON.parse(localStorage.getItem('users') || '[]');
            var user = users.find(function (u) { return String(u.id) === String(_this.loggedInUserId); });
            var cart = user ? user.cart || [] : [];
            // Assign the correct quantity from cart if exists
            _this.products = data.map(function (product) {
                var cartItem = cart.find(function (item) { return item.id === product.id; });
                return __assign(__assign({}, product), { quantity: cartItem ? cartItem.quantity : 0 // Use cart quantity if exists, else 0
                 });
            });
          
        });
    };
    ProductController.prototype.updateDisplayedQuantity = function (product, amount) {
        var newQuantity = (this.selectedQuantities[product.id] || 0) + amount;
        this.selectedQuantities[product.id] = newQuantity < 0 ? 0 : newQuantity; // Prevent negative values
        this.$scope.$applyAsync();
    };
    ProductController.prototype.loadCart = function () {
        var _this = this;
        this.loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!this.loggedInUserId)
            return;
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        var user = users.find(function (u) { return String(u.id) === String(_this.loggedInUserId); });
        this.cart = user ? user.cart || [] : [];
    };
    // addToCart(product: Product, amount: number) {
    //     this.loggedInUserId = localStorage.getItem('loggedInUserId'); 
    //     if (!this.loggedInUserId) {
    //         alert('Please log in to add items to the cart.');
    //         return;
    //     }
    //     let users = JSON.parse(localStorage.getItem('users') || '[]');
    //     const userIndex = users.findIndex((user: any) => String(user.id) === String(this.loggedInUserId));
    //     if (userIndex === -1) return;
    //     if (!users[userIndex].cart) {
    //         users[userIndex].cart = [];
    //     }
    //     let existingProduct = users[userIndex].cart.find((p: Product) => p.id === product.id);
    //     if (existingProduct) {
    //         existingProduct.quantity = (existingProduct.quantity || 0) + amount;
    //     } else {
    //         users[userIndex].cart.push({ ...product, quantity: 1 });
    //     }
    //     localStorage.setItem('users', JSON.stringify(users));
    //     localStorage.setItem('loggedInUserCart', JSON.stringify(users[userIndex].cart));
    //     this.cart = users[userIndex].cart;
    //     console.log('Updated Cart:', this.cart);
    //     this.$scope.$applyAsync();
    // }
    ProductController.prototype.addToCart = function (product) {
        var _this = this;
        this.loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!this.loggedInUserId) {
            alert('Please log in to add items to the cart.');
            return;
        }
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        var userIndex = users.findIndex(function (user) { return String(user.id) === String(_this.loggedInUserId); });
        if (userIndex === -1)
            return;
        if (!users[userIndex].cart) {
            users[userIndex].cart = [];
        }
        var existingProduct = users[userIndex].cart.find(function (p) { return p.id === product.id; });
        if (existingProduct) {
            existingProduct.quantity = this.selectedQuantities[product.id] || 1; // Use UI quantity
        }
        else {
            users[userIndex].cart.push(__assign(__assign({}, product), { quantity: this.selectedQuantities[product.id] || 1 }));
        }
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUserCart', JSON.stringify(users[userIndex].cart));
        this.cart = users[userIndex].cart;
        console.log('Updated Cart:', this.cart);
        this.$scope.$applyAsync();
    };
    ProductController.prototype.updateQuantity = function (product, amount) {
        var _this = this;
        this.loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!this.loggedInUserId)
            return;
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        var userIndex = users.findIndex(function (user) { return String(user.id) === String(_this.loggedInUserId); });
        if (userIndex === -1)
            return;
        var cartItem = users[userIndex].cart.find(function (p) { return p.id === product.id; });
        var productItem = this.products.find(function (p) { return p.id === product.id; }); // Find in products array
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
    // updateQuantity(product: Product, amount: number) {
    //     this.loggedInUserId = localStorage.getItem('loggedInUserId');
    //     if (!this.loggedInUserId) return;
    //     let users = JSON.parse(localStorage.getItem('users') || '[]');
    //     const userIndex = users.findIndex((user: any) => String(user.id) === String(this.loggedInUserId));
    //     if (userIndex === -1) return;
    //     let cartItem = users[userIndex].cart.find((p: Product) => p.id === product.id);
    //     if (cartItem) {
    //         cartItem.quantity = (cartItem.quantity || 0) + amount;
    //         if (cartItem.quantity <= 0) {
    //             users[userIndex].cart = users[userIndex].cart.filter((p: Product) => p.id !== product.id);
    //         }
    //         localStorage.setItem('users', JSON.stringify(users));
    //         localStorage.setItem('loggedInUserCart', JSON.stringify(users[userIndex].cart));
    //         this.cart = users[userIndex].cart;
    //     }
    // }
    ProductController.prototype.removeFromCart = function (product) {
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
    // showFooter(): boolean {
    //     let path = this.$location.path();
    //     return path === '/cart' || path === '/products';
    // }
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
    ;
    ProductController.prototype.logout = function () {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('loggedInUserId');
        localStorage.removeItem('loggedInUserCart');
        this.$window.location.href = "#!/login";
    };
    ProductController.$inject = ['ProductService', '$window', '$rootScope'];
    return ProductController;
}());

angular.module('ecomApp').controller('ProductController', ProductController);
