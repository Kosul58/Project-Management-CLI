import cliProductRepository from "../repository/cli_repository/productRepositroy.js";
import apiProductRepository from "../repository/api_repository/productRepositroy.js";

import categoryService from "../services/categoryServices.js";
import {
  AddProduct,
  Product,
  ProductOptions,
} from "../common/types/productType.js";

class ProductServices {
  private getRepository(target: "cli" | "api") {
    return target === "cli" ? cliProductRepository : apiProductRepository;
  }

  private async categoryManager(name: string | undefined) {
    if (name) {
      const newCategory = {
        name: name,
        parentId: "",
      };
      await categoryService.createCategory(newCategory, "api");
    }
  }

  private async createProduct(productData: ProductOptions): Promise<Product> {
    const { name, price, inventory, description, category } = productData;
    if (!name || !price || !inventory) {
      throw new Error(
        "Important fields missing during the addition of a product"
      );
    }
    if (category) {
      await this.categoryManager(category);
    }
    return {
      name,
      price: Number(price),
      inventory: Number(inventory),
      description,
      category,
    };
  }

  public async getProducts(target: "cli" | "api") {
    try {
      const repository = this.getRepository(target);
      return await repository.getProducts();
    } catch (err) {
      console.log("Failed to get the data of all products", err);
      throw err;
    }
  }

  public async getProductById(productid: string, target: "cli" | "api") {
    try {
      const repository = this.getRepository(target);
      return await repository.getProductById(productid);
    } catch (err) {
      console.log(
        "Failed to get the data of a product based on productid",
        err
      );
      throw err;
    }
  }

  public async addProduct(product: AddProduct, target: "cli" | "api") {
    try {
      const newProduct: Product = await this.createProduct(product);
      const repository = this.getRepository(target);
      return await repository.addProduct(newProduct);
    } catch (err) {
      console.log("Failed to add a new product", err);
      throw err;
    }
  }

  public async addProducts(products: AddProduct[], target: "cli" | "api") {
    try {
      const productList: Product[] = [];
      for (let i = 0; i < products.length; i++) {
        const product = await this.createProduct(products[i]);
        productList.push(product);
      }
      const repository = this.getRepository(target);
      return await repository.addProducts(productList);
    } catch (err) {
      console.log("Failed to add a batch of new products", err);
      throw err;
    }
  }

  public async updateProduct(
    productid: string,
    update: ProductOptions,
    target: "cli" | "api"
  ) {
    try {
      const updateFields = Object.fromEntries(
        Object.entries(update).filter(([_, value]) => value !== undefined)
      ) as Partial<ProductOptions>;

      const repository = this.getRepository(target);
      return await repository.updateProduct(productid, updateFields);
    } catch (err) {
      console.log("Failed to update a product", err);
      throw err;
    }
  }

  public async deleteProduct(productid: string, target: "cli" | "api") {
    try {
      const repository = this.getRepository(target);
      return await repository.deleteProduct(productid);
    } catch (err) {
      console.log("Failed to delete a product", err);
      throw err;
    }
  }

  public async modifyInventory(
    id: string,
    quantity: number,
    modification: "increase" | "decrease",
    target: "cli" | "api"
  ) {
    try {
      const repository = this.getRepository(target);
      return await repository.manageInventory(id, quantity, modification);
    } catch (err) {
      console.log("Failed to update the inventory of a product", err);
      throw err;
    }
  }
}

export default new ProductServices();
