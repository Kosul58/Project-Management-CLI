import { Cart } from "./cartType";
export interface Order {
  orderid: string;
  userid: string;
  timestamp: string;
  status: string;
  items: Cart[];
  total: number;
}
