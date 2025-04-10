import { Product } from "../productType.js";
import { Cart } from "./cartType";
import { Order } from "../orderType.js";
import { Category } from "../categoryType.js";
export interface ProductResponse {
  message: string;
  response: string | Product[] | Product;
}

export interface CartResponse {
  message: string;
  response: string | Cart[] | Cart;
}

export interface OrderResponse {
  message: string;
  response: string | Order[] | Order;
}

export interface CategoryResponse {
  message: string;
  response: string | Category[] | Category;
}
