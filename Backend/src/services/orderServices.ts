import cliOrderRepository from "../repository/cli_repository/orderRepository.js";
import apiOrderRepository from "../repository/api_repository/orderRepository.js";
import { Order, Status } from "../common/types/orderType.js";

class OrderServices {
  public async getOrder(
    userid: string,
    target: "cli" | "api"
  ): Promise<Order[] | null> {
    try {
      let data;
      target === "cli"
        ? (data = await cliOrderRepository.getOrder(userid))
        : (data = await cliOrderRepository.getOrder(userid));

      return data;
    } catch (err) {
      console.log("Failed to get order data", err);
      throw err;
    }
  }
  public async addOrder(
    userid: string,
    productid: string,
    target: "cli" | "api"
  ): Promise<Order[]> {
    try {
      let data;
      target === "cli"
        ? (data = await cliOrderRepository.addOrder(userid, productid))
        : (data = await cliOrderRepository.addOrder(userid, productid));
      return data;
    } catch (err) {
      console.log("Failed to add order of single product", err);
      throw err;
    }
  }
  public async addOrders(
    userid: string,
    products: string[],
    target: "cli" | "api"
  ): Promise<Order[]> {
    try {
      let data;
      target === "cli"
        ? (data = await cliOrderRepository.addOrders(userid, products))
        : (data = await cliOrderRepository.addOrders(userid, products));
      return data;
    } catch (err) {
      console.log("Failed to add order of multiple products", err);
      throw err;
    }
  }

  public async updateOrderStatus(
    orderid: string,
    userid: string,
    status: string,
    target: "cli" | "api"
  ): Promise<Order[] | null> {
    try {
      if (!Object.values(Status).includes(status as Status)) {
        throw new Error("Invalid status value provided.");
      }
      let newStatus = status as Status;
      let data;
      target === "cli"
        ? (data = await cliOrderRepository.updateOrderStatus(
            orderid,
            userid,
            newStatus
          ))
        : (data = await cliOrderRepository.updateOrderStatus(
            orderid,
            userid,
            newStatus
          ));
      return data;
    } catch (err) {
      console.log("failed to update order status", err);
      throw err;
    }
  }
  public async removeOrders(
    orderid: string,
    userid: string,
    target: "cli" | "api"
  ): Promise<Order[] | null> {
    try {
      let data;
      target === "cli"
        ? (data = await cliOrderRepository.removeOrders(orderid, userid))
        : (data = await cliOrderRepository.removeOrders(orderid, userid));
      return data;
    } catch (err) {
      console.log("Failed to remove order", err);
      throw err;
    }
  }
  public async removeOrder(
    orderid: string,
    userid: string,
    productid: string,
    target: "cli" | "api"
  ): Promise<Order[] | null> {
    try {
      // console.log(orderid, userid, productid);
      let data;
      target === "cli"
        ? (data = await cliOrderRepository.removeOrder(
            orderid,
            userid,
            productid
          ))
        : (data = await cliOrderRepository.removeOrder(
            orderid,
            userid,
            productid
          ));

      return data;
    } catch (err) {
      console.log("Failed to remove product from order", err);
      throw err;
    }
  }
}
export default new OrderServices();
