import { ProductCart } from "./product-cart";

export interface Order {
    orderTotal: number;
    products: ProductCart[];
}
