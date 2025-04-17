import cliOrderRepository from "../repository/cli_repository/orderRepository.js";
import apiOrderRepository from "../repository/api_repository/orderRepository.js";
import { Order, Status } from "../common/types/orderType.js";

import cartServices from "./cartServices.js";
import productServices from "./productServices.js";
import { CartProduct } from "../common/types/cartType.js";

class OrderServices {
  private getRepository(target: "cli" | "api") {
    return target === "cli" ? cliOrderRepository : apiOrderRepository;
  }
  public async getOrder(userid: string, target: "cli" | "api") {
    try {
      const repository = this.getRepository(target);
      return await repository.getOrder(userid);
    } catch (err) {
      console.log("Failed to get order data", err);
      throw err;
    }
  }

  private async manageCart(items: CartProduct[], userid: string) {
    if (!items || items.length === 0) return;
    const productIds = items.map((p) => p.productid);
    try {
      await cartServices.removeProducts(userid, productIds, "api");
    } catch (err) {
      console.log("Failed to remove products from cart", err);
      throw err;
    }
  }
  public async addOrder(
    userid: string,
    productid: string,
    target: "cli" | "api"
  ) {
    try {
      if (target === "api") {
        const product = await cartServices.getProductById(
          productid,
          userid,
          "api"
        );
        if (!product) return "noproduct";
        const data = await apiOrderRepository.addOrder(userid, product);
        await this.manageCart(data.items, userid);
        return data;
      }
      return await cliOrderRepository.addOrder(userid, productid);
    } catch (err) {
      console.log("Failed to add order of single product", err);
      throw err;
    }
  }

  public async addOrders(
    userid: string,
    products: string[],
    target: "cli" | "api"
  ) {
    try {
      if (target === "api") {
        const searchProducts = await cartServices.getProduct(userid, "api");
        if (
          !searchProducts ||
          (Array.isArray(searchProducts.products) &&
            searchProducts.products.length < 1)
        ) {
          return "noproducts";
        }
        const filteredProducts = searchProducts.products.filter((p) =>
          products.includes(p.productid)
        );
        if (!filteredProducts || filteredProducts.length === 0)
          return "noproducts";
        const data = await apiOrderRepository.addOrders(
          userid,
          filteredProducts
        );

        await this.manageCart(filteredProducts as CartProduct[], userid);
        return data;
      }

      return await cliOrderRepository.addOrders(userid, products);
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
  ) {
    try {
      if (!Object.values(Status).includes(status as Status)) {
        throw new Error("Invalid status value provided.");
      }
      const newStatus = status as Status;
      const repository = this.getRepository(target);
      return await repository.updateOrderStatus(orderid, userid, newStatus);
    } catch (err) {
      console.log("Failed to update order status", err);
      throw err;
    }
  }

  private async manageInventory(items: CartProduct[]) {
    for (let { productid, quantity } of items) {
      await productServices.modifyInventory(
        productid,
        quantity,
        "increase",
        "api"
      );
    }
  }
  public async removeOrders(
    orderid: string,
    userid: string,
    target: "cli" | "api"
  ) {
    try {
      const repository = this.getRepository(target);
      const data = await repository.removeOrders(orderid, userid);

      if (
        data &&
        typeof data === "object" &&
        "result" in data &&
        "modifier" in data
      ) {
        if (target === "api") {
          await this.manageInventory(data.modifier);
        }
        return data.result;
      }

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
  ) {
    try {
      const repository = this.getRepository(target);
      const result = await repository.removeOrder(orderid, userid, productid);

      if (
        result &&
        typeof result === "object" &&
        "items" in result &&
        target === "api"
      ) {
        const removed = result.items.find(
          (item: any) => item.productid === productid
        );
        if (removed) {
          await this.manageInventory([removed]);
        }
      }

      return result;
    } catch (err) {
      console.log("Failed to remove product from order", err);
      throw err;
    }
  }
}

export default new OrderServices();
