import { Cart, CartProduct, UpdateCart } from "../../common/types/cartType.js";
import { Product } from "../../common/types/productType.js";

import CartSchema from "../../models/Cart.js";

class CartRepository {
  public async getProducts() {
    try {
      return await CartSchema.find();
    } catch (err) {
      console.log("Failed to get products from cart", err);
      throw err;
    }
  }

  public async getProductById(productid: string, userid: string) {
    try {
      const cart = await CartSchema.findOne({ userid });
      if (!cart) return undefined;
      return cart.products.find((p) => p.productid === productid);
    } catch (err) {
      console.log("Failed to get product by id for a user from cart", err);
      throw err;
    }
  }

  public async getProduct(userid: string) {
    try {
      return await CartSchema.findOne({ userid });
    } catch (err) {
      console.log("Failed to get the products of a user in cart", err);
      throw err;
    }
  }

  public async addProduct(
    userid: string,
    product: CartProduct,
    quantity: number
  ) {
    try {
      let cart = await CartSchema.findOne({ userid });
      if (!cart) {
        const newCart = new CartSchema({
          userid,
          products: [product],
        });
        await newCart.save();
        return newCart;
      } else {
        const existingProduct = cart.products.find(
          (p) => p.productid.toString() === product.productid.toString()
        );

        if (!existingProduct) {
          cart.products.push(product);
        } else {
          existingProduct.quantity += quantity;
        }
        await cart.save();
        return cart;
      }
    } catch (err) {
      console.log("Failed to add product to the cart of a user", err);
      throw err;
    }
  }

  public async removeProduct(userid: string, productid: string) {
    try {
      const cart = await CartSchema.findOne({ userid });
      if (!cart) return "nocart";
      const productIndex = cart.products.findIndex(
        (p) => p.productid === productid
      );
      if (productIndex < 0) return null;
      cart.products.splice(productIndex, 1);
      const result = await cart.save();
      if (cart.products.length === 0) {
        console.log("cart deleted");
        await CartSchema.findOneAndDelete({ userid });
      }
      return result;
    } catch (err) {
      console.log("Failed to remove a product from the cart of a user", err);
      throw err;
    }
  }

  public async removeProducts(userid: string, products: string[]) {
    try {
      const cart = await CartSchema.findOne({ userid });
      if (!cart) return "nocart";

      for (let i = cart.products.length - 1; i >= 0; i--) {
        if (products.includes(cart.products[i].productid.toString())) {
          cart.products.splice(i, 1);
        }
      }
      const result = await cart.save();
      if (cart.products.length === 0) {
        console.log("cart deleted");
        await CartSchema.findOneAndDelete({ userid });
      }
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
    userid: string,
    productid: string,
    update: UpdateCart
  ) {
    try {
      const cart = await CartSchema.findOne({ userid });
      if (!cart) return "nocart";

      const product = cart.products.find((p) => p.productid === productid);
      if (!product) return "noproduct";

      product.quantity = update.quantity;

      return await cart.save();
    } catch (err) {
      console.log("Failed to update a product in the cart", err);
      throw err;
    }
  }

  public async totalCartPrice(userid: string) {
    try {
      const cart = await CartSchema.findOne({ userid });
      if (!cart) return undefined;
      return cart.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    } catch (err) {
      console.log(
        "Failed to calculate total price of products in the cart of a user",
        err
      );
      throw err;
    }
  }
}

export default new CartRepository();
