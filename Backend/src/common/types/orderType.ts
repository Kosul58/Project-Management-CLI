import { CartProduct } from "./cartType.js";

export enum Status {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Processing = "Processing",
  Shipped = "Shipped",
  OutForDelivery = "Out for Delivery",
  Delivered = "Delivered",
}
export interface Order {
  orderid: string;
  userid: string;
  timestamp: string;
  status: Status;
  items: CartProduct[];
  total: number;
}
