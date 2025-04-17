import cliProductRepository from "../repository/cli_repository/productRepositroy.js";
import apiProductRepository from "../repository/api_repository/productRepositroy.js";
import {
  AddProduct,
  Product,
  ProductOptions,
} from "../common/types/productType.js";

class ProductServices {
  private createProduct(productData: ProductOptions): Product {
    let { name, price, inventory, description, category } = productData;
    // console.log(name, price, inventory);
    if (!name || !price || !inventory) {
      throw new Error(
        "Important fields missing during the addition of a product"
      );
    }
    return {
      productid: "",
      name,
      price: Number(price),
      inventory: Number(inventory),
      description,
      category,
    };
  }
  public async getProducts(target: "cli" | "api"): Promise<Product[]> {
    try {
      let result;
      target === "cli"
        ? (result = await cliProductRepository.getProducts())
        : (result = await apiProductRepository.getProducts());
      return result;
    } catch (err) {
      console.log("Failed to get the data of all products", err);
      throw err;
    }
  }
  public async getProductById(
    prouctid: string,
    target: "cli" | "api"
  ): Promise<Product | null> {
    try {
      let result;
      target === "cli"
        ? (result = await cliProductRepository.getProductById(prouctid))
        : (result = await apiProductRepository.getProductById(prouctid));
      return result;
    } catch (err) {
      console.log(
        "Failed to get the data of a product based on productid",
        err
      );
      throw err;
    }
  }
  public async addProduct(
    product: AddProduct,
    target: "cli" | "api"
  ): Promise<Product[] | null> {
    try {
      // Create a new product
      const newProduct: Product = this.createProduct(product);
      // Send product data to repository to add to file or api
      let totalProducts;
      target === "cli"
        ? (totalProducts = await cliProductRepository.addProduct(newProduct))
        : (totalProducts = await apiProductRepository.addProduct(newProduct));
      return totalProducts;
    } catch (err) {
      console.log("Failed to add a new product", err);
      throw err;
    }
  }
  public async addProducts(
    products: AddProduct[],
    target: "cli" | "api"
  ): Promise<Product[]> {
    try {
      let Product: Product[] = [];

      for (let product of products) {
        const newProduct = this.createProduct(product);
        Product.push(newProduct);
      }
      let data;
      target === "cli"
        ? (data = await cliProductRepository.addProducts(Product))
        : (data = await apiProductRepository.addProducts(Product));
      // console.log(productsarray);
      return data;
    } catch (err) {
      console.log("Failed to add a batch of new products", err);
      throw err;
    }
  }
  public async updateProduct(
    productid: string,
    update: ProductOptions,
    target: "cli" | "api"
  ): Promise<Product[] | null> {
    try {
      let newProduct;
      target === "cli"
        ? (newProduct = await cliProductRepository.updateProduct(
            productid,
            update
          ))
        : (newProduct = await apiProductRepository.updateProduct(
            productid,
            update
          ));
      return newProduct;
    } catch (err) {
      console.log("Failed to update a product", err);
      throw err;
    }
  }
  public async deleteProduct(
    productid: string,
    target: "cli" | "api"
  ): Promise<Product[] | null> {
    try {
      let data;
      target === "cli"
        ? (data = await cliProductRepository.deleteProduct(productid))
        : (data = await apiProductRepository.deleteProduct(productid));
      return data;
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
  ): Promise<Product[] | null> {
    try {
      let products;
      target === "cli"
        ? (products = await cliProductRepository.manageInventory(
            id,
            quantity,
            modification
          ))
        : (products = await apiProductRepository.manageInventory(
            id,
            quantity,
            modification
          ));
      return products;
    } catch (err) {
      console.log("Failed to increase the inventory of a product", err);
      throw err;
    }
  }
}

export default new ProductServices();
