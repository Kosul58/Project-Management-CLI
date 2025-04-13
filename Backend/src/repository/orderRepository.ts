import FileManager from "../utils/fileManager.js";

import {
  cartPath,
  orderPath,
  generateId,
  getCurrentDateTimeStamp,
} from "../utils/utils.js";
import { Status } from "../common/types/orderType.js";

import { removeProduct } from "../controllers/cart.js";

import {
  increaseProductInventory,
  decreaseProductInventory,
  modifyInventory,
} from "../controllers/product.js";
import { Cart, CartProduct } from "../common/types/cartType.js";
import { Order } from "../common/types/orderType.js";
import { Product } from "../common/types/productType.js";
import fileManager from "../utils/fileManager.js";

class OrderRepository {
  private readonly orderPath: string;
  private readonly cartPath: string;
  private orders: Order[] = [];
  private carts: Cart[] = [];
  constructor() {
    this.orderPath = orderPath;
    this.cartPath = cartPath;
  }
  private async setOrders() {
    await FileManager.writeToFile(this.orderPath, this.orders);
  }
  private async loadOrders() {
    this.orders = await fileManager.readFromFile(this.orderPath);
  }
  private async loadCarts() {
    this.carts = await fileManager.readFromFile(this.cartPath);
  }

  private singleCartFilter(userid: string, productid: string): CartProduct {
    const userCart = this.carts.find((item) => item.userid === userid);
    if (!userCart) throw new Error("No Cart found for the user");
    const items = userCart.products.find((p) => p.productid === productid);
    if (!items) throw new Error("No products found in the cart");
    return items;
  }

  private multipleCartFilter(
    userid: string,
    products: string[]
  ): CartProduct[] {
    const userCart = this.carts.find((p) => p.userid === userid);
    if (!userCart) throw new Error("No Cart found for the given user");

    const items = userCart.products.filter(
      (item) => item.userid === userid && products.includes(item.productid)
    );
    if (items.length === 0) {
      throw new Error("No matching products found in cart.");
    }
    return items;
  }

  private orderFilter(
    orderid: string,
    userid: string,
    status: Status
  ): Order[] {
    return this.orders.map((order) => {
      if (order.orderid === orderid && order.userid === userid) {
        return { ...order, status };
      }
      return order;
    });
  }

  private orderTotal(items: CartProduct[]) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  private async modifyInventory(
    items: CartProduct[],
    modification: "increase" | "decrease"
  ) {
    for (let { productid, quantity } of items) {
      // console.log(productid, quantity);
      await modifyInventory(productid, quantity, modification);
    }
  }

  private async cartUpdate(products: string[], userid: string) {
    for (let i = 0; i < products.length; i++) {
      await removeProduct(userid, products[i]);
    }
  }

  private createOrder(userid: string): Order {
    return {
      orderid: generateId(),
      userid,
      timestamp: getCurrentDateTimeStamp(),
      status: Status.Pending,
      items: [],
      total: 0,
    };
  }

  public async getOrder(userid: string): Promise<Order[]> {
    try {
      await this.loadOrders();
      const userdata = this.orders.filter((order) => order.userid === userid);
      if (userdata.length === 0) {
        console.log("No Order Found for the User");
        return [];
      }
      console.log("Order search complete");
      return userdata;
    } catch (err) {
      console.log("failed to search orders of user", err);
      throw err;
    }
  }

  public async addOrder(userid: string, productid: string): Promise<Order[]> {
    try {
      await this.loadOrders();
      await this.loadCarts();
      let items: CartProduct = this.singleCartFilter(userid, productid);
      const total: number = this.orderTotal([items]);
      let order: Order = this.createOrder(userid);
      order.items = [items];
      order.total = total;
      this.orders.push(order);
      await this.setOrders();
      await this.cartUpdate([productid], userid);
      console.log("Order createad sucessfully");
      await this.modifyInventory(order.items, "decrease");
      return this.orders;
    } catch (err) {
      console.log("Failed to add order for user", err);
      throw err;
    }
  }

  public async addOrders(userid: string, products: string[]): Promise<Order[]> {
    try {
      let order: Order = this.createOrder(userid);
      await this.loadOrders();
      await this.loadCarts();
      let items: CartProduct[] = this.multipleCartFilter(userid, products);
      const total = this.orderTotal(items);
      order.items = items;
      order.total = total;
      this.orders.push(order);
      await this.setOrders();
      await this.cartUpdate(products, userid);
      console.log("Order createad sucessfully");
      await this.modifyInventory(items, "decrease");
      return this.orders;
    } catch (err) {
      console.log("Failed to add order", err);
      throw err;
    }
  }
  public async removeOrder(
    orderid: string,
    userid: string,
    productid: string
  ): Promise<Order[]> {
    try {
      await this.loadOrders();
      let order = this.orders.filter(
        (order) => order.orderid === orderid && order.userid === userid
      );
      let items = order[0].items.filter((item) => item.productid !== productid);
      console.log(items);
      let canceledItems = order[0].items.filter(
        (item) => item.productid === productid
      );

      // console.log(items, canceledItems);
      if (items.length !== 0) {
        this.orders = this.orders.map((order) => {
          if (order.orderid === orderid && order.userid === userid) {
            return { ...order, items };
          }
          return order;
        });
      } else {
        this.orders = this.orders.filter(
          (order) => order.orderid !== orderid && order.userid !== userid
        );
      }
      await this.modifyInventory(canceledItems, "increase");
      await this.setOrders();
      console.log("Order of a product removed successfully");
      return this.orders;
    } catch (err) {
      console.log("Failed to remove the order of a product", err);
      throw err;
    }
  }

  public async removeOrders(orderid: string, userid: string): Promise<Order[]> {
    try {
      await this.loadOrders();
      this.orders.filter((o) => o.orderid !== orderid);

      const order = this.orders.find((o) => o.orderid === orderid);
      if (!order) {
        console.log("No order to cancel");
        return this.orders;
      }
      await this.modifyInventory(order.items, "increase");
      await this.setOrders();
      console.log(
        `order canceled for order id ${orderid} and user id ${userid}`
      );
      return this.orders;
    } catch (err) {
      console.log("Failed to remove a order", err);
      throw err;
    }
  }
  public async updateOrderStatus(
    orderid: string,
    userid: string,
    status: Status
  ): Promise<Order[]> {
    try {
      await this.loadOrders();
      this.orders = this.orderFilter(orderid, userid, status);
      await this.setOrders();
      console.log(
        `order status updated of order id ${orderid} and user id ${userid}`
      );
      return this.orders;
    } catch (err) {
      console.log("Failed to update order status", err);
      throw err;
    }
  }
}

export default new OrderRepository();
