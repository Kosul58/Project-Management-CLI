import orderRepository from "../repository/orderRepository.js";
import { Order, Status } from "../common/types/orderType.js";

class OrderServices {
  public async getOrder(userid: string): Promise<Order[]> {
    try {
      const data = await orderRepository.getOrder(userid);
      return data;
    } catch (err) {
      console.log("Failed to get order data", err);
      throw err;
    }
  }
  public async addOrder(userid: string, productid: string): Promise<Order[]> {
    try {
      const result = await orderRepository.addOrder(userid, productid);
      return result;
    } catch (err) {
      console.log("Failed to add order of single product", err);
      throw err;
    }
  }
  public async addOrders(userid: string, products: string[]): Promise<Order[]> {
    try {
      const result = await orderRepository.addOrders(userid, products);
      return result;
    } catch (err) {
      console.log("Failed to add order of multiple products", err);
      throw err;
    }
  }

  public async updateOrderStatus(
    orderid: string,
    userid: string,
    status: string
  ): Promise<Order[]> {
    try {
      if (!Object.values(Status).includes(status as Status)) {
        throw new Error("Invalid status value provided.");
      }
      let newStatus = status as Status;
      let orders = await orderRepository.updateOrderStatus(
        orderid,
        userid,
        newStatus
      );
      return orders;
    } catch (err) {
      console.log("failed to update order status", err);
      throw err;
    }
  }
  public async removeOrders(orderid: string, userid: string): Promise<Order[]> {
    try {
      let orders = await orderRepository.removeOrders(orderid, userid);
      return orders;
    } catch (err) {
      console.log("Failed to remove order", err);
      throw err;
    }
  }
  public async removeOrder(
    orderid: string,
    userid: string,
    productid: string
  ): Promise<Order[]> {
    try {
      // console.log(orderid, userid, productid);
      let orders = await orderRepository.removeOrder(
        orderid,
        userid,
        productid
      );
      return orders;
    } catch (err) {
      console.log("Failed to remove product from order", err);
      throw err;
    }
  }
}
export default new OrderServices();
