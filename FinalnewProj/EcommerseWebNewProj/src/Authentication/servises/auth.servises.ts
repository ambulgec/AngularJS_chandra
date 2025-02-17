import * as angular from 'angular';

export class AuthService {
    private users: any[];

    constructor() {
        this.users = JSON.parse(localStorage.getItem("users") || "[]");
    }

   
    
    login(email: string, password: string): any {
        const user = this.users.find(u => u.email === email && u.password === password);
        return user || null; 
    }
    register(user: any): string {
        if (!user.name || !user.email || !user.password || !user.mobile || !user.address || !user.country) {
            return "All fields are required!";
        }

        if (this.users.some(u => u.email === user.email)) {
            return "User already exists! Please login.";
        }

        user.id = Date.now(); 
        user.cart = []; 
        this.users.push(user);
        localStorage.setItem("users", JSON.stringify(this.users));

        return "Registration successful!";
    }
}

angular.module('ecomApp').service('AuthService', AuthService);
