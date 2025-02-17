export interface Product {
    id: string;
    name: string;
    type: string;
    subtype: string;
    price: number;
    imgSrc: string;
    quantity?: number; 
}
