import cliCartRepository from "../repository/cli_repository/cartRepository.js";
import apiCartRepository from "../repository/api_repository/cartRepository.js";
import { Cart, CartProduct, UpdateCart } from "../common/types/cartType.js";
import { ProductOptions } from "../common/types/productType.js";

class CartService {
  public async getProducts(target: "cli" | "api"): Promise<Cart[]> {
    try {
      let result;
      target === "cli"
        ? (result = await cliCartRepository.getProducts())
        : (result = await apiCartRepository.getProducts());
      return result;
    } catch (err) {
      console.log("Failed to get all the products in the cart", err);
      throw err;
    }
  }

  public async getProductById(
    productid: string,
    userid: string,
    target: "cli" | "api"
  ): Promise<CartProduct | null> {
    try {
      let result;
      target === "cli"
        ? (result = await cliCartRepository.getProductById(productid, userid))
        : (result = await apiCartRepository.getProductById(productid, userid));
      return result;
    } catch (err) {
      console.log(
        "Failed to get a product in cart based on product and user id",
        err
      );
      throw err;
    }
  }

  public async getProduct(
    userid: string,
    target: "cli" | "api"
  ): Promise<Cart | null> {
    try {
      let result;
      target === "cli"
        ? (result = await cliCartRepository.getProduct(userid))
        : (result = await apiCartRepository.getProduct(userid));
      return result;
    } catch (err) {
      console.log("Failed to get the products from the user's cart", err);
      throw err;
    }
  }

  public async addProduct(
    userid: string,
    productId: string,
    quantity: number,
    target: "cli" | "api"
  ): Promise<Cart[] | null> {
    try {
      let result;
      target === "cli"
        ? (result = await cliCartRepository.addProduct(
            userid,
            productId,
            quantity
          ))
        : (result = await apiCartRepository.addProduct(
            userid,
            productId,
            quantity
          ));

      return result;
    } catch (err) {
      console.log("Failed to add a product to cart for a user", err);
      throw err;
    }
  }

  public async removeProduct(
    userid: string,
    productid: string,
    target: "cli" | "api"
  ): Promise<Cart[] | null> {
    try {
      let result;
      target === "cli"
        ? (result = await cliCartRepository.removeProduct(userid, productid))
        : (result = await apiCartRepository.removeProduct(userid, productid));

      return result;
    } catch (err) {
      console.log("Failed to remove a product from the cart of a user", err);
      throw err;
    }
  }

  public async removeProducts(
    userid: string,
    products: string[],
    target: "cli" | "api"
  ): Promise<Cart[] | null> {
    try {
      let result;
      target === "cli"
        ? (result = await cliCartRepository.removeProducts(userid, products))
        : (result = await apiCartRepository.removeProducts(userid, products));
      return result;
    } catch (err) {
      console.log(
        "Failed to remove multiple products from the cart of a user",
        err
      );
      throw err;
    }
  }

  public async updateProduct(
    uid: string,
    pid: string,
    update: UpdateCart,
    target: "cli" | "api"
  ): Promise<Cart[] | null> {
    try {
      let result;
      target === "cli"
        ? (result = await cliCartRepository.updateProduct(uid, pid, update))
        : (result = await apiCartRepository.updateProduct(uid, pid, update));

      return result;
    } catch (err) {
      console.log("Failed to update a product in the cart of a user", err);
      throw err;
    }
  }

  public async cartTotal(
    userid: string,
    target: "cli" | "api"
  ): Promise<number | null> {
    try {
      let result;
      target === "cli"
        ? (result = await cliCartRepository.totalCartPrice(userid))
        : (result = await apiCartRepository.totalCartPrice(userid));
      return result;
    } catch (err) {
      console.log(
        "Failed to calculate the total cost of products in the cart of a user",
        err
      );
      throw err;
    }
  }
}

export default new CartService();
