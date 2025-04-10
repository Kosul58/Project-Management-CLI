import { Cart } from "./cartType";

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
  items: Cart[];
  total: number;
}
