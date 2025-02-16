
import * as angular from 'angular';
import { ProductService, Product } from '../servises/product.service';

export class ProductController {
    static $inject = ['ProductService', '$window','$rootScope'];

    products: Product[] = [];
    cart: Product[] = [];
    loggedInUserId: string | null = null;
    loggedInUser: string | null = null;
    filteredProducts: Product[] = [];
    selectedQuantities: { [key: string]: number } = {};
    showHeader: boolean = false;

    constructor(private productService: ProductService,private $window: angular.IWindowService,private $scope: angular.IScope) {
        this.loadProducts();
        this.loadCart();
        this.$window.scrollTo(0, 0);
        this.loadUser();


     
    }

    

    loadProducts() {
        this.productService.getProducts().then((data: Product[]) => {
            this.loggedInUserId = localStorage.getItem('loggedInUserId'); 
            if (!this.loggedInUserId) {
                this.products = data.map(product => ({
                    ...product,
                    quantity: 0  // Default to 0 if not logged in
                }));
                return;
            }
    
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find((u: any) => String(u.id) === String(this.loggedInUserId));
            let cart = user ? user.cart || [] : [];
    
            // Assign the correct quantity from cart if exists
            this.products = data.map(product => {
                let cartItem = cart.find((item: Product) => item.id === product.id);
                return {
                    ...product,
                    quantity: cartItem ? cartItem.quantity : 0  // Use cart quantity if exists, else 0
                };
            });
            this.$window.location.reload()
        });
    }


    updateDisplayedQuantity(product: Product, amount: number) {
        let newQuantity = (this.selectedQuantities[product.id] || 0) + amount;
        this.selectedQuantities[product.id] = newQuantity < 0 ? 0 : newQuantity; // Prevent negative values
        this.$scope.$applyAsync();
    }
    

    loadCart() {
        this.loggedInUserId = localStorage.getItem('loggedInUserId'); 
        if (!this.loggedInUserId) return;

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => String(u.id) === String(this.loggedInUserId));

        this.cart = user ? user.cart || [] : [];
        
    }

    

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
    addToCart(product: Product) {
        this.loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!this.loggedInUserId) {
            alert('Please log in to add items to the cart.');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((user: any) => String(user.id) === String(this.loggedInUserId));
        if (userIndex === -1) return;

        if (!users[userIndex].cart) {
            users[userIndex].cart = [];
        }

        let existingProduct = users[userIndex].cart.find((p: Product) => p.id === product.id);

        if (existingProduct) {
            existingProduct.quantity = this.selectedQuantities[product.id] || 1; // Use UI quantity
        } else {
            users[userIndex].cart.push({ ...product, quantity: this.selectedQuantities[product.id] || 1 });
        }

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUserCart', JSON.stringify(users[userIndex].cart));

        this.cart = users[userIndex].cart;
        console.log('Updated Cart:', this.cart);
        this.$scope.$applyAsync();
    }


    updateQuantity(product: Product, amount: number) {
        this.loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!this.loggedInUserId) return;
    
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((user: any) => String(user.id) === String(this.loggedInUserId));
        if (userIndex === -1) return;
    
        let cartItem = users[userIndex].cart.find((p: Product) => p.id === product.id);
        let productItem = this.products.find((p: Product) => p.id === product.id); // Find in products array
    
        if (cartItem) {
            cartItem.quantity = (cartItem.quantity || 0) + amount;
            
            if (cartItem.quantity <= 0) {
                users[userIndex].cart = users[userIndex].cart.filter((p: Product) => p.id !== product.id);
            }
        }
    
        if (productItem) {
            productItem.quantity = cartItem ? cartItem.quantity : 0; // Sync with cart
        }
    
        // Update localStorage
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUserCart', JSON.stringify(users[userIndex].cart));
    
        this.cart = users[userIndex].cart;
    }
    

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

    removeFromCart(product: Product) {
                this.loggedInUserId = localStorage.getItem('loggedInUserId');
                if (!this.loggedInUserId) return;
        
                let users = JSON.parse(localStorage.getItem('users') || '[]');
                const userIndex = users.findIndex((user: any) => String(user.id) === String(this.loggedInUserId));
                if (userIndex === -1) return;
        
                users[userIndex].cart = users[userIndex].cart.filter((p: Product) => p.id !== product.id);
        
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('loggedInUserCart', JSON.stringify(users[userIndex].cart));
        
                this.cart = users[userIndex].cart;
            }


            // showFooter(): boolean {
            //     let path = this.$location.path();
            //     return path === '/cart' || path === '/products';
            // }


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
                };
                
            
    logout() {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('loggedInUserId'); 
        localStorage.removeItem('loggedInUserCart'); 
        this.$window.location.href = "#!/login";
    }
}

angular.module('ecomApp').controller('ProductController', ProductController);
