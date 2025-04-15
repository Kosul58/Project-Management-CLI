import { Cart, CartProduct, UpdateCart } from "../common/types/cartType.js";
import { Product } from "../common/types/productType.js";
import FileManager from "../utils/fileManager.js";
import { cartPath, productPath } from "../utils/utils.js";

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
  ): Promise<Product> {
    const productToAdd: Product | undefined = this.products.find(
      (product) => product.productid === productid
    );
    if (!productToAdd) {
      throw new Error(
        "No matching products found in products.json to add to cart"
      );
    }
    if (productToAdd.inventory < Number(quantity)) {
      throw new Error("Not enough inventory");
    }
    return productToAdd;
  }

  // check if the cart exists
  private cartCheck(userid: string): Cart | undefined {
    // get all products form the cart.json file
    // search for a product to add in cart
    const cart = this.cart.find((product) => product.userid === userid);
    if (!cart) {
      console.log("No cart found for the user");
    }
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
  ): Promise<CartProduct | undefined> {
    try {
      await this.loadCart();
      const userCart = this.cart.find((entry) => entry.userid === userid);
      if (!userCart) {
        console.log("No Cart Found for the given user");
        return userCart;
      }
      const userProduct = userCart.products.find(
        (product) => product.productid === productid
      );

      return userProduct;
    } catch (err) {
      console.log("Failed to get product by id for a user from cart", err);
      throw err;
    }
  }

  public async getProduct(userid: string): Promise<Cart[]> {
    try {
      await this.loadCart();
      console.log("Product search in cart complete");
      return this.cart.filter((p) => p.userid === userid);
    } catch (err) {
      console.log("failed to get the products of a user in cart", err);
      throw err;
    }
  }

  public async addProduct(userid: string, productId: string, quantity: number) {
    try {
      await this.loadCart();
      await this.loadProduct();

      // Check if product is available in product list
      const productToAdd: Product = await this.productAvailable(
        productId,
        quantity
      );

      // Find user cart entry
      let userCart = this.cartCheck(userid);

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
  ): Promise<Cart[]> {
    try {
      await this.loadCart();
      let userCart = this.cartCheck(userid);
      if (!userCart) {
        console.log("no cart found for the user");
        return [];
      }
      let length1 = userCart?.products.length;
      userCart.products = userCart.products.filter((item) => {
        if (item.productid !== productid) return item;
      });
      let length2 = userCart?.products.length;
      if (length1 === length2) {
        throw new Error("No Items to remove from the cart");
      }
      console.log(userCart.products.length);
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
  ): Promise<Cart[]> {
    try {
      await this.loadCart();

      const userCart = this.cartCheck(userid);
      if (!userCart) {
        console.log("no cart found for the user");
        return [];
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
  ): Promise<Cart[]> {
    try {
      await this.loadCart();
      let { quantity } = update;
      let cartToUpdate = this.cartCheck(uid);
      if (!cartToUpdate) throw new Error("No Cart to update");
      const productIndex = cartToUpdate.products.findIndex(
        (product) => product.productid === pid
      );

      if (productIndex === -1) {
        throw new Error("Product not found in user's cart");
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

  public async totalCartPrice(userid: string): Promise<number> {
    try {
      await this.loadCart();
      const userCart = this.cartCheck(userid);
      if (!userCart) {
        console.log("no cart found for the user");
        return 0;
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
