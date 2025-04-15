import productRepository from "../repository/productRepositroy.js";
import { Product, ProductOptions } from "../common/types/productType.js";

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
  public async getProducts(prouctid: string): Promise<Product[]> {
    try {
      let result: Product[] = await productRepository.getProducts();
      return result;
    } catch (err) {
      console.log("Failed to get the data of all products", err);
      throw err;
    }
  }
  public async getProductsById(prouctid: string): Promise<Product | []> {
    try {
      const data: Product | [] = await productRepository.getProductById(
        prouctid
      );
      return data;
    } catch (err) {
      console.log(
        "Failed to get the data of a product based on productid",
        err
      );
      throw err;
    }
  }
  public async addProduct(
    product: ProductOptions
  ): Promise<{ newProduct: Product; totalProducts: Product[] }> {
    try {
      // Create a new product
      const newProduct: Product = this.createProduct(product);
      // Send product data to repository to add to file
      const totalProducts: Product[] = await productRepository.addProduct(
        newProduct
      );
      return { newProduct, totalProducts };
    } catch (err) {
      console.log("Failed to add a new product", err);
      throw err;
    }
  }
  public async addProducts(products: ProductOptions[]): Promise<Product[]> {
    try {
      let Product: Product[] = [];
      for (let product of products) {
        const newProduct = this.createProduct(product);
        Product.push(newProduct);
      }
      const data: Product[] = await productRepository.addProducts(Product);
      // console.log(productsarray);
      return data;
    } catch (err) {
      console.log("Failed to add a batch of new products", err);
      throw err;
    }
  }
  public async updateProduct(
    productid: string,
    update: ProductOptions
  ): Promise<Product[]> {
    try {
      const newProducts: Product[] = await productRepository.updateProduct(
        productid,
        update
      );
      return newProducts;
    } catch (err) {
      console.log("Failed to update a product", err);
      throw err;
    }
  }
  public async deleteProduct(productid: string): Promise<Product[]> {
    try {
      const data: Product[] = await productRepository.deleteProduct(productid);
      return data;
    } catch (err) {
      console.log("Failed to delete a product", err);
      throw err;
    }
  }
  public async modifyInventory(
    id: string,
    quantity: number,
    modification: "increase" | "decrease"
  ): Promise<Product[]> {
    try {
      let products = await productRepository.manageInventory(
        id,
        quantity,
        modification
      );
      return products;
    } catch (err) {
      console.log("Failed to increase the inventory of a product", err);
      throw err;
    }
  }
}

export default new ProductServices();
