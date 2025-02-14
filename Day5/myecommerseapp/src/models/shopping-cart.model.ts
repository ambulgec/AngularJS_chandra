import { Product } from "./product.model";
import { User } from "./user.model";

export interface ShoppingCartModel{
    User: User;
    Products: Product[];
    TotalAmount: number;

}