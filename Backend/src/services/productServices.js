import { response } from "express";
import {
  readToFile,
  writeToFile,
  appendToFile,
} from "../repository/fileManager.js";
import { generateId, productPath } from "../utils/utils.js";

export const productDisplayer = async () => {
  try {
    const result = await readToFile(productPath);
    return result;
  } catch (err) {
    console.log("error in productDisplayer", err);
    throw err;
  }
};

const productCreator = (name, price, inventory) => {
  return { productid: generateId(), name, price, inventory };
};

export const productAdder = async (name, price, inventory) => {
  try {
    const products = await readToFile(productPath);
    const newProduct = productCreator(name, price, inventory);
    const totalProducts = [...products, newProduct];
    await writeToFile(productPath, totalProducts);
    // await appendToFile(productPath, newProduct);
    console.log("Product added successfully!");
    return { newProduct, totalProducts };
  } catch (err) {
    console.log("error in productAdder", err);
    throw err;
  }
};

export const productUpdater = async (productid, update) => {
  try {
    const products = await readToFile(productPath);
    const { name, price } = update;
    const newProducts = products.map((product) => {
      if (product.productid === productid) {
        return { ...product, ...update };
      }
      return product;
    });
    await writeToFile(productPath, newProducts);
    return newProducts;
  } catch (err) {
    console.log("error in productAdder", err);
    throw err;
  }
};

export const productDeleter = async (productid) => {
  try {
    const products = await readToFile(productPath);
    const totalProducts = products.filter(
      (product) => product.productid !== productid
    );
    await writeToFile(productPath, totalProducts);

    if (products.length === totalProducts.length) {
      return { message: "No Products to delete", response: totalProducts };
    } else {
      return {
        message: `Product with product id: ${productid} deleted successfully`,
        response: totalProducts,
      };
    }
  } catch (err) {
    console.log("error in productAdder", err);
    throw err;
  }
};

export const productInventoryUpdater = async (id, quantity) => {
  try {
    let products = await readToFile(productPath);
    products = products.map((product) => {
      if (product.productid === id) {
        let inventory;
        if (typeof quantity == "string") {
          inventory = product.inventory + Number(quantity);
        } else {
          inventory = product.inventory - quantity;
        }
        return {
          ...product,
          inventory,
        };
      }
      return product;
    });
    await writeToFile(productPath, products);
    return products;
  } catch (err) {
    console.log("error in productAdder", err);
    throw err;
  }
};
