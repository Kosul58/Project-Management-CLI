import { Product, ProductOptions } from "../../common/types/productType.js";
import { createCategory } from "../../controllers/cli_controllers/category.js";
import FileManager from "../../utils/fileManager.js";
import { generateId } from "../../utils/utils.js";
import { productPath } from "../../utils/constants.js";
class ProductRepository {
  private readonly productPath: string;
  private products: Product[] = [];
  constructor() {
    this.productPath = productPath;
  }
  private async loadProducts(): Promise<void> {
    this.products = await FileManager.readFromFile(this.productPath);
  }
  private async saveProducts(products: Product[]): Promise<void> {
    await FileManager.writeToFile(this.productPath, products);
  }
  private getProductIndex(productid: string): number {
    const productIndex: number = this.products.findIndex(
      (product) => product.productid === productid
    );
    return productIndex;
  }
  private checkInventory(id: string, quantity: number): boolean {
    return this.products.some(
      (product) => product.productid === id && product.inventory >= quantity
    );
  }
  private async categoryManager(category: string | undefined) {
    if (category) {
      const newCategory = {
        name: category,
        parentId: "",
      };
      await createCategory(newCategory);
    }
  }
  public async getProducts(): Promise<Product[]> {
    try {
      await this.loadProducts();
      console.log("Product search complete");
      return this.products;
    } catch (err) {
      console.log("Failed to get product data", err);
      throw err;
    }
  }
  public async getProductById(productid: string): Promise<Product | null> {
    try {
      await this.loadProducts();
      const productIndex: number = this.getProductIndex(productid);
      if (productIndex < 0) {
        console.log("No product found");
        return null;
      } else {
        console.log("Product search complete");
        return this.products[productIndex];
      }
    } catch (err) {
      console.log("Failed to get product data based on productid", err);
      throw err;
    }
  }

  public async addProduct(product: Product): Promise<Product[] | null> {
    try {
      await this.loadProducts();
      product.productid = generateId();
      const productindex: number = this.getProductIndex(product.productid);
      if (productindex >= 0) {
        console.log("Product already exists in the database");
        return null;
      }
      let totalProducts = [...this.products, product];
      await this.saveProducts(totalProducts);
      await this.categoryManager(product.category);
      console.log("Product addition complete");
      return totalProducts;
    } catch (err) {
      console.log("Failed to add a product to database", err);
      throw err;
    }
  }
  public async addProducts(products: Product[]): Promise<Product[]> {
    try {
      await this.loadProducts();
      let totalProducts: Product[] = [...this.products];
      for (let product of products) {
        product.productid = generateId();
        const productindex = this.getProductIndex(product.productid);
        if (productindex < 0) {
          totalProducts = [...totalProducts, product];
        } else {
          console.log("Product Already exists");
        }
      }
      await this.saveProducts(totalProducts);
      console.log("Products addition complete");
      return totalProducts;
    } catch (err) {
      console.log("Failed to add products to the database", err);
      throw err;
    }
  }
  public async updateProduct(
    productid: string,
    update: ProductOptions
  ): Promise<Product[] | null> {
    try {
      await this.loadProducts();
      const { name, price, description, category, inventory } = update;
      let productIndex: number = this.getProductIndex(productid);
      let product: Product = this.products[productIndex];
      if (productIndex < 0) {
        console.log("No product found");
        return null;
      }
      if (name) product.name = name;
      if (price) product.price = price;
      if (description) product.description = description;
      if (category) product.category = category;
      if (inventory) product.inventory = inventory;
      if (product.category) {
        const category = {
          name: product.category,
          parentId: "",
        };
        await createCategory(category);
      }
      await this.saveProducts(this.products);
      console.log("Product update complete");
      return this.products;
    } catch (err) {
      console.log("Failed to update a product", err);
      throw err;
    }
  }
  public async deleteProduct(productid: string): Promise<Product[] | null> {
    try {
      await this.loadProducts();

      const productIndex = this.getProductIndex(productid);
      if (productIndex < 0) {
        console.log("Product does not exists");
        return null;
      }
      this.products.splice(productIndex, 1);
      await this.saveProducts(this.products);
      console.log("Product removal complete");
      return this.products;
    } catch (err) {
      console.log("Failed to remove a product", err);
      throw err;
    }
  }

  public async manageInventory(
    id: string,
    quantity: number,
    operation: "increase" | "decrease"
  ): Promise<Product[] | null> {
    try {
      await this.loadProducts();
      const isAvailabe = this.checkInventory(id, quantity);
      if (operation === "decrease" && !isAvailabe) {
        console.log("Insufficient Inventory");
        return null;
      }
      this.products = this.products.map((product: Product) => {
        if (product.productid === id) {
          let newInventory = product.inventory;
          if (operation === "increase") {
            newInventory += quantity;
          } else {
            newInventory -= quantity;
          }
          return {
            ...product,
            inventory: newInventory,
          };
        }
        return product;
      });
      await this.saveProducts(this.products);
      console.log("Product inventory decreased");
      return this.products;
    } catch (err) {
      console.log("Failed to decrease product inventory", err);
      throw err;
    }
  }
  // public async increaseProductInventory(
  //   id: string,
  //   quantity: string | number
  // ): Promise<Product[]> {
  //   try {
  //     await this.loadProducts();
  //     this.products = this.products.map((product: Product) => {
  //       if (product.productid === id) {
  //         let inventory: number = Number(product.inventory) + Number(quantity);
  //         return {
  //           ...product,
  //           inventory,
  //         };
  //       }
  //       return product;
  //     });
  //     await this.saveProducts(this.products);
  //     console.log("Product inventory increased");
  //     return this.products;
  //   } catch (err) {
  //     console.log("Failed to increase product inventory", err);
  //     throw err;
  //   }
  // }
  // public async decreaseProductInventory(
  //   id: string,
  //   quantity: number
  // ): Promise<Product[]> {
  //   try {
  //     await this.loadProducts();
  //     const checkInventory = this.checkInventory(id, quantity);
  //     if (!checkInventory) {
  //       console.log("Insufficient Inventory");
  //       throw new Error("Insufficient Inventory");
  //     }
  //     this.products = this.products.map((product: Product) => {
  //       if (product.productid === id) {
  //         let inventory;
  //         inventory = Number(product.inventory) - quantity;
  //         return {
  //           ...product,
  //           inventory,
  //         };
  //       }
  //       return product;
  //     });
  //     await this.saveProducts(this.products);
  //     console.log("Product inventory decreased");
  //     return this.products;
  //   } catch (err) {
  //     console.log("Failed to decrease product inventory", err);
  //     throw err;
  //   }
  // }
}

export default new ProductRepository();
