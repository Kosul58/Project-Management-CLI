import cartRepositroy from "../repository/cartRepository.js";
import { Cart, CartProduct, UpdateCart } from "../common/types/cartType.js";
import { ProductOptions } from "../common/types/productType.js";

class CartService {
  public async getProducts(): Promise<Cart[]> {
    try {
      const result = await cartRepositroy.getProducts();
      return result;
    } catch (err) {
      console.log("Failed to get all the products in the cart", err);
      throw err;
    }
  }

  public async getProductById(
    productid: string,
    userid: string
  ): Promise<CartProduct | undefined> {
    try {
      const result = await cartRepositroy.getProductById(productid, userid);
      return result;
    } catch (err) {
      console.log(
        "Failed to get a product in cart based on product and user id",
        err
      );
      throw err;
    }
  }

  public async getProduct(userid: string): Promise<Cart[]> {
    try {
      const result = await cartRepositroy.getProduct(userid);
      return result;
    } catch (err) {
      console.log("Failed to get the products from the user's cart", err);
      throw err;
    }
  }

  public async addProduct(
    userid: string,
    productId: string,
    quantity: number
  ): Promise<Cart[]> {
    try {
      const cartItems = await cartRepositroy.addProduct(
        userid,
        productId,
        quantity
      );
      return cartItems;
    } catch (err) {
      console.log("Failed to add a product to cart for a user", err);
      throw err;
    }
  }

  public async removeProduct(
    userid: string,
    productid: string
  ): Promise<Cart[]> {
    try {
      const newCart = await cartRepositroy.removeProduct(userid, productid);
      return newCart;
    } catch (err) {
      console.log("Failed to remove a product from the cart of a user", err);
      throw err;
    }
  }

  public async removeProducts(
    userid: string,
    products: string[]
  ): Promise<Cart[]> {
    try {
      const newCart = await cartRepositroy.removeProducts(userid, products);
      return newCart;
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
    update: UpdateCart
  ): Promise<Cart[]> {
    try {
      const updatedCart = await cartRepositroy.updateProduct(uid, pid, update);
      return updatedCart;
    } catch (err) {
      console.log("Failed to update a product in the cart of a user", err);
      throw err;
    }
  }

  public async cartTotal(userid: string): Promise<number> {
    try {
      const total = await cartRepositroy.totalCartPrice(userid);
      return total;
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
