import { getCurrentDateTimeStamp } from "../../utils/utils.js";
import { Status } from "../../common/types/orderType.js";

import { Cart, CartProduct } from "../../common/types/cartType.js";
import { Order } from "../../common/types/orderType.js";
import OrderSchema from "../../models/Order.js";

class OrderRepository {
  private generateOrder(userid: string): Order {
    return {
      userid,
      timestamp: getCurrentDateTimeStamp(),
      status: Status.Pending,
      items: [],
      total: 0,
    };
  }
  private calcTotal(items: CartProduct[]): number {
    return items.reduce((a, p) => a + p.price * p.quantity, 0);
  }

  public async getOrder(userid: string) {
    try {
      const orders = await OrderSchema.find({ userid });
      if (!orders || orders.length === 0) return "noorder";
      // const activeItems = orders.flatMap((order) =>
      //   order.items.filter((item) => item.active === true)
      // );

      return orders;
    } catch (err) {
      console.log("Failed to search orders of user", err);
      throw err;
    }
  }

  public async addOrder(userid: string, product: any) {
    try {
      const order = this.generateOrder(userid);
      const productItem: CartProduct = {
        productid: product.productid,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        active: true,
      };
      order.items.push(productItem);
      order.total = this.calcTotal(order.items);
      const newOrder = new OrderSchema(order);
      return newOrder.save();
    } catch (err) {
      console.log("Failed to add order for user", err);
      throw err;
    }
  }

  public async addOrders(userid: string, products: any) {
    try {
      const order = this.generateOrder(userid);
      for (let product of products) {
        const productItem: CartProduct = {
          productid: product.productid,
          userid,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          active: true,
        };
        order.items.push(productItem);
      }
      order.total = this.calcTotal(order.items);
      const newOrder = new OrderSchema(order);
      return await newOrder.save();
    } catch (err) {
      console.log("Failed to add order", err);
      throw err;
    }
  }
  public async removeOrder(orderid: string, userid: string, productid: string) {
    try {
      const order = await OrderSchema.findOne({ _id: orderid, userid });
      if (!order) return "noorder";

      const product = order.items.find((p: any) => p.productid === productid);
      if (!product) return "noproduct";

      product.active = false;

      order.markModified("items");
      return await order.save();
    } catch (err) {
      console.log("Failed to remove the order of a product", err);
      throw err;
    }
  }

  public async removeOrders(orderid: string, userid: string) {
    try {
      const order = await OrderSchema.findOne({ _id: orderid, userid });
      if (!order) return "noorder";

      order.items.forEach((item: any) => {
        item.active = false;
      });

      order.markModified("items");
      const result = await order.save();
      const modifier = order.items;
      return { result, modifier };
    } catch (err) {
      console.log("Failed to remove a order", err);
      throw err;
    }
  }

  public async updateOrderStatus(
    orderid: string,
    userid: string,
    status: Status
  ) {
    try {
      const order = await OrderSchema.findById(orderid);
      if (!order) return "noorder";
      order.status = status;
      return order.save();
    } catch (err) {
      console.log("Failed to update order status", err);
      throw err;
    }
  }
}

export default new OrderRepository();
