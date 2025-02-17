import * as angular from 'angular';
import { ProductService, Product } from '../servises/product.service';

export class ProductController {
    static $inject = ['ProductService', '$window', '$scope'];

    products: Product[] = [];
    cart: Product[] = [];
    loggedInUserId: string | null = null;
    loggedInUser: string | null = null;
    selectedQuantities: { [key: string]: number } = {};
    showHeader: boolean = false;

    constructor(private productService: ProductService, private $window: angular.IWindowService, private $scope: angular.IScope) {
        this.loadProducts();
        this.loadCart();
        this.loadUser();
        this.$window.scrollTo(0, 0);
    }

    loadProducts() {
        this.productService.getProducts().then((data: Product[]) => {
            this.loggedInUserId = localStorage.getItem('loggedInUserId');
            if (!this.loggedInUserId) {
                this.products = data.map(product => ({ ...product, quantity: 0 }));
                return;
            }

            let cart = this.productService.loadCart();
            this.products = data.map(product => {
                let cartItem = cart.find((item: Product) => item.id === product.id);
                return { ...product, quantity: cartItem ? cartItem.quantity : 0 };
            });
        });
    }

    updateDisplayedQuantity(product: Product, amount: number) {
        let newQuantity = (this.selectedQuantities[product.id] || 0) + amount;
        this.selectedQuantities[product.id] = newQuantity < 0 ? 0 : newQuantity;
        this.$scope.$applyAsync();
    }

    loadCart() {
        this.cart = this.productService.loadCart();
    }

    addToCart(product: Product) {
        this.cart = this.productService.addToCart(product, this.selectedQuantities[product.id] || 1);
        alert("Product Added Successfully");
        this.$window.location.reload();
    }

    updateQuantity(product: Product, amount: number) {
        this.cart = this.productService.updateQuantity(product, amount);
    }

    removeFromCart(product: Product) {
        this.cart = this.productService.removeFromCart(product);
    }

    loadUser() {
        const userData = localStorage.getItem('loggedInUser');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                this.loggedInUser = user.name || null;
            } catch (error) {
                console.error("Error parsing loggedInUser:", error);
                this.loggedInUser = null;
            }
        } else {
            this.loggedInUser = null;
        }
    }

    logout() {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('loggedInUserId');
        localStorage.removeItem('loggedInUserCart');
        this.$window.location.href = "#!/login";
        this.$window.location.reload();
    }
}

angular.module('ecomApp').controller('ProductController', ProductController);
