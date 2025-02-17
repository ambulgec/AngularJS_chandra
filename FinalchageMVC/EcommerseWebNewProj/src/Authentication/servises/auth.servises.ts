import * as angular from 'angular';
import { User } from '../models/user.model'; 

export class AuthService {
    private users: User[];

    constructor() {
        this.users = JSON.parse(localStorage.getItem("users") || "[]");
    }

    login(email: string, password: string): User | null {
        return this.users.find(u => u.email === email && u.password === password) || null;
    }

    register(userData: Omit<User, 'id' | 'cart'>): string {
        if (!userData.name || !userData.email || !userData.password || !userData.mobile || !userData.address || !userData.country) {
            return "All fields are required!";
        }

        if (this.users.some(u => u.email === userData.email)) {
            return "User already exists! Please login.";
        }

       
        const newUser: User = {
            id: Date.now(),
            cart: [],
            ...userData 
        };

        this.users.push(newUser);
        localStorage.setItem("users", JSON.stringify(this.users));

        return "Registration successful!";
    }
}

angular.module('ecomApp').service('AuthService', AuthService);
