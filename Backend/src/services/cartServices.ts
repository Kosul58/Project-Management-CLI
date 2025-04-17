import cliCartRepository from "../repository/cli_repository/cartRepository.js";
import apiCartRepository from "../repository/api_repository/cartRepository.js";
import { Cart, CartProduct, UpdateCart } from "../common/types/cartType.js";
import productServices from "./productServices.js";

class CartService {
  private getRepository(target: "cli" | "api") {
    return target === "cli" ? cliCartRepository : apiCartRepository;
  }

  public async getProducts(target: "cli" | "api") {
    try {
      const repository = this.getRepository(target);
      return await repository.getProducts();
    } catch (err) {
      console.log("Failed to get all the products in the cart", err);
      throw err;
    }
  }

  public async getProductById(
    productid: string,
    userid: string,
    target: "cli" | "api"
  ) {
    try {
      const repository = this.getRepository(target);
      return await repository.getProductById(productid, userid);
    } catch (err) {
      console.log("Failed to get a product in cart by product/user id", err);
      throw err;
    }
  }

  public async getProduct(userid: string, target: "cli" | "api") {
    try {
      const repository = this.getRepository(target);
      return await repository.getProduct(userid);
    } catch (err) {
      console.log("Failed to get user's cart products", err);
      throw err;
    }
  }
  private generateCart(
    product: any,
    quantity: number,
    userid: string
  ): CartProduct {
    return {
      userid,
      productid: product._id,
      name: product.name,
      price: product.price,
      quantity,
      description: product.description ?? "",
    };
  }

  public async addProduct(
    userid: string,
    productId: string,
    quantity: number,
    target: "cli" | "api"
  ) {
    try {
      if (target === "api") {
        const product =
          (await productServices.getProductById(productId, "api")) ?? undefined;
        if (!product) return "noproduct";
        const newProduct = this.generateCart(product, quantity, userid);
        return await apiCartRepository.addProduct(userid, newProduct, quantity);
      }
      return await cliCartRepository.addProduct(userid, productId, quantity);
    } catch (err) {
      console.error("Failed to add product to cart", err);
      throw err;
    }
  }

  public async removeProduct(
    userid: string,
    productid: string,
    target: "cli" | "api"
  ) {
    try {
      const repository = this.getRepository(target);
      return await repository.removeProduct(userid, productid);
    } catch (err) {
      console.log("Failed to remove product from cart", err);
      throw err;
    }
  }

  public async removeProducts(
    userid: string,
    products: string[],
    target: "cli" | "api"
  ) {
    try {
      const repository = this.getRepository(target);
      return await repository.removeProducts(userid, products);
    } catch (err) {
      console.log("Failed to remove multiple products from cart", err);
      throw err;
    }
  }

  public async updateProduct(
    uid: string,
    pid: string,
    update: UpdateCart,
    target: "cli" | "api"
  ) {
    try {
      const repository = this.getRepository(target);
      return await repository.updateProduct(uid, pid, update);
    } catch (err) {
      console.log("Failed to update product in cart", err);
      throw err;
    }
  }

  public async cartTotal(userid: string, target: "cli" | "api") {
    try {
      const repository = this.getRepository(target);
      return await repository.totalCartPrice(userid);
    } catch (err) {
      console.log("Failed to calculate total cart price", err);
      throw err;
    }
  }
}

export default new CartService();
