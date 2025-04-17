import { Product, ProductOptions } from "../../common/types/productType.js";

import ProductSchema from "../../models/Product.js";
import { getCurrentDateTimeStamp } from "../../utils/utils.js";
class ProductRepository {
  public async getProducts() {
    try {
      return await ProductSchema.find();
    } catch (err) {
      console.log("Failed to get product data", err);
      throw err;
    }
  }
  public async getProductById(productid: string) {
    try {
      return await ProductSchema.findById(productid);
    } catch (err) {
      console.log("Failed to get product data based on productid", err);
      throw err;
    }
  }

  public async addProduct(product: Product) {
    try {
      const check = await ProductSchema.findOne({
        name: product.name,
        price: product.price,
      });
      if (check) return null;
      return await ProductSchema.insertOne(product);
    } catch (err) {
      console.log("Failed to add a product to database", err);
      throw err;
    }
  }

  public async addProducts(products: Product[]) {
    try {
      const existingProducts = await ProductSchema.find({
        $and: products.map((p) => ({
          name: p.name,
          price: p.price,
        })),
      });

      const existingSet = new Set(
        existingProducts.map((p) => `${p.name}-${p.price}`)
      );

      const newProducts = products.filter(
        (p) => !existingSet.has(`${p.name}-${p.price}`)
      );
      for (let product of newProducts) {
        product.createdAt = getCurrentDateTimeStamp();
      }
      if (newProducts.length > 0) {
        return await ProductSchema.insertMany(newProducts);
      } else {
        return null;
      }
    } catch (err) {
      console.error("Failed to add products to the database", err);
      throw err;
    }
  }

  public async updateProduct(productid: string, update: ProductOptions) {
    try {
      return await ProductSchema.findByIdAndUpdate(
        productid,
        { $set: update },
        { new: true }
      );
    } catch (err) {
      console.log("Failed to update a product", err);
      throw err;
    }
  }
  public async deleteProduct(productid: string) {
    try {
      return await ProductSchema.findByIdAndDelete(productid);
    } catch (err) {
      console.log("Failed to remove a product", err);
      throw err;
    }
  }

  public async manageInventory(
    id: string,
    quantity: number,
    operation: "increase" | "decrease"
  ) {
    try {
      const product = await ProductSchema.findById(id);
      if (!product) {
        return undefined;
      }
      let newInventory = product.inventory;
      if (operation === "increase") {
        newInventory += quantity;
      } else {
        // if (product.inventory < quantity) {
        //   return null;
        // }
        newInventory -= quantity;
      }
      product.inventory = newInventory;
      return await product.save();
    } catch (err) {
      console.log("Failed to decrease product inventory", err);
      throw err;
    }
  }
}

export default new ProductRepository();
