import { Cart, CartProduct, UpdateCart } from "../../common/types/cartType.js";
import { Product } from "../../common/types/productType.js";
import FileManager from "../../utils/fileManager.js";
import { cartPath, productPath } from "../../utils/constants.js";

class CartRepository {
  private readonly cartPath: string;
  private readonly productPath: string;
  private cart: Cart[] = [];
  private products: Product[] = [];
  constructor() {
    this.productPath = productPath;
    this.cartPath = cartPath;
  }

  private async loadCart(): Promise<void> {
    this.cart = await FileManager.readFromFile(this.cartPath);
  }

  private async saveCart(cart: Cart[]): Promise<void> {
    await FileManager.writeToFile(this.cartPath, cart);
    this.cart = cart;
  }

  private async loadProduct(): Promise<void> {
    this.products = await FileManager.readFromFile(this.productPath);
  }

  // check if the product is in products file
  private async productAvailable(
    productid: string,
    quantity: number
  ): Promise<Product | null> {
    const productToAdd: Product | undefined = this.products.find(
      (product) => product.productid === productid
    );
    if (!productToAdd) {
      console.log("No matching products found in products.json to add to cart");
      return null;
    }
    if (productToAdd.inventory < Number(quantity)) {
      throw new Error("Not enough inventory");
    }
    return productToAdd;
  }

  // check if the cart exists
  private cartSearch(userid: string): Cart | undefined {
    const cart = this.cart.find((product) => product.userid === userid);
    return cart;
  }

  public async getProducts(): Promise<Cart[]> {
    try {
      await this.loadCart();
      console.log("Product search in cart complete");
      return this.cart;
    } catch (err) {
      console.log("Failed to get products from cart", err);
      throw err;
    }
  }

  public async getProductById(
    productid: string,
    userid: string
  ): Promise<CartProduct | null> {
    try {
      await this.loadCart();
      const userCart = this.cartSearch(userid);
      if (!userCart) {
        console.log("No Cart Found for the given user");
        return null;
      }
      const userProduct = userCart.products.find(
        (product) => product.productid === productid
      );
      if (!userProduct) {
        console.log("No product found in the cart of the user");
        return null;
      }
      return userProduct;
    } catch (err) {
      console.log("Failed to get product by id for a user from cart", err);
      throw err;
    }
  }

  public async getProduct(userid: string): Promise<Cart | null> {
    try {
      await this.loadCart();
      const userCart = this.cartSearch(userid);
      if (!userCart) {
        console.log("No cart found for the user");
        return null;
      }
      console.log("Cart search complete");
      return userCart;
    } catch (err) {
      console.log("failed to get the products of a user in cart", err);
      throw err;
    }
  }

  public async addProduct(
    userid: string,
    productId: string,
    quantity: number
  ): Promise<Cart[] | null> {
    try {
      await this.loadCart();
      await this.loadProduct();
      // Check if product is available in product list
      const productToAdd = await this.productAvailable(productId, quantity);
      if (!productToAdd) {
        console.log("No product to add to cart");
        return null;
      }
      // Find user cart entry
      let userCart = this.cartSearch(userid);
      if (!userCart) {
        const newCart: Cart = {
          userid,
          products: [
            {
              userid: userid,
              productid: productToAdd.productid,
              name: productToAdd.name,
              price: productToAdd.price,
              quantity: Number(quantity),
              description: productToAdd.description,
              category: productToAdd.category,
            },
          ],
        };
        this.cart.push(newCart);
      } else {
        const productIndex = userCart.products.findIndex(
          (p) => p.productid === productId
        );

        if (productIndex >= 0) {
          userCart.products[productIndex].quantity += Number(quantity);
        } else {
          userCart.products.push({
            userid: userid,
            productid: productToAdd.productid,
            name: productToAdd.name,
            price: productToAdd.price,
            quantity: Number(quantity),
            description: productToAdd.description,
            category: productToAdd.category,
          });
        }
      }
      await this.saveCart(this.cart);
      console.log("Product addition in cart complete");
      return this.cart;
    } catch (err) {
      console.log("Failed to add product to the cart of a user", err);
      throw err;
    }
  }

  public async removeProduct(
    userid: string,
    productid: string
  ): Promise<Cart[] | null> {
    try {
      await this.loadCart();
      let userCart = this.cartSearch(userid);
      if (!userCart) {
        console.log("no cart found for the user");
        return null;
      }
      let length1 = userCart.products.length;
      userCart.products = userCart.products.filter((item) => {
        if (item.productid !== productid) return item;
      });
      let length2 = userCart.products.length;
      if (length1 === length2) {
        console.log("No Items to remove from the cart");
        return this.cart;
      }
      if (userCart.products.length === 0) {
        this.cart = this.cart.filter((c) => c.userid !== userid);
      }
      await this.saveCart(this.cart);
      console.log(`Product with id ${productid} removed successfully`);
      console.log("Prodcut removal from cart complete");
      return this.cart;
    } catch (err) {
      console.log("Failed to remove a product from the cart of a user", err);
      throw err;
    }
  }

  public async removeProducts(
    userid: string,
    products: string[]
  ): Promise<Cart[] | null> {
    try {
      await this.loadCart();
      const userCart = this.cartSearch(userid);
      if (!userCart) {
        console.log("no cart found for the user");
        return null;
      }
      let length1 = userCart.products.length;
      userCart.products = userCart.products.filter((item) => {
        if (!products.includes(item.productid)) return item;
      });
      let length2 = userCart.products.length;
      if (length1 === length2) {
        console.log("No Items to remove from the cart");
        return this.cart;
      }
      if (userCart.products.length === 0) {
        this.cart = this.cart.filter((c) => c.userid !== userid);
      }
      await this.saveCart(this.cart);
      console.log("Products removal from cart complete");
      return this.cart;
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
  ): Promise<Cart[] | null> {
    try {
      await this.loadCart();
      let { quantity } = update;
      let cartToUpdate = this.cartSearch(uid);
      if (!cartToUpdate) throw new Error("No Cart to update");
      const productIndex = cartToUpdate.products.findIndex(
        (product) => product.productid === pid
      );
      if (productIndex === -1) {
        console.log("Product not found in user's cart");
        return null;
      }
      // Update product details
      cartToUpdate.products[productIndex] = {
        ...cartToUpdate.products[productIndex],
        ...update,
      };
      await this.saveCart(this.cart);
      console.log("Cart updated succesfully");
      return this.cart;
    } catch (err) {
      console.log("Failed to update a product in the cart", err);
      throw err;
    }
  }

  public async totalCartPrice(userid: string): Promise<number | null> {
    try {
      await this.loadCart();
      const userCart = this.cartSearch(userid);
      if (!userCart) {
        console.log("no cart found for the user");
        return null;
      }
      const total = userCart.products.reduce((a, item) => {
        return (a = a + item.quantity * item.price);
      }, 0);
      console.log("Total price calculation complete");
      return total;
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
