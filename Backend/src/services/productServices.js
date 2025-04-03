// import { response } from "express";
// import { readToFile, writeToFile, appendToFile } from "../utils/fileManager.js";
import { generateId, productPath } from "../utils/utils.js";
import {
  addABatchOfProductInDb,
  addProductToDb,
  checkProductAlreadyInDb,
  deleteProductFromDb,
  getAllProductFromDb,
  getProductByIDFromDb,
  increaseAProductInventoryInDb,
  decreaseAProductInventoryInDb,
  updateProductInDb,
} from "../repository/productRepositroy.js";

export const getAllProduct = async () => {
  try {
    let result = await getAllProductFromDb();
    return result;
  } catch (err) {
    console.log("error in productDisplayer", err);
    throw err;
  }
};

export const getProductByIDService = async (prouctid) => {
  try {
    const data = await getProductByIDFromDb(prouctid);
    return data;
  } catch (err) {
    console.log("error in getProductByIDService", err);
    throw err;
  }
};

const createAProduct = (name, price, inventory) => {
  return { productid: generateId(), name, price, inventory };
};

export const addAProductService = async (name, price, inventory) => {
  try {
    //create a new product
    const newProduct = createAProduct(name, price, inventory);
    //check if the product is already in the database
    const productindex = await checkProductAlreadyInDb(newProduct);
    if (productindex) {
      throw new Error("Product already exists in the database");
    }
    //send product data to repository to add to file
    const totalProducts = await addProductToDb(newProduct);
    // await appendToFile(productPath, newProduct);
    console.log("Product added successfully!");
    return { newProduct, totalProducts };
  } catch (err) {
    console.log("error in productAdder", err);
    throw err;
  }
};

// productsarray = [{name: , price: , inventory: }]
export const addABatchOfProductService = async (productsarray) => {
  try {
    for (let product of productsarray) {
      product.productid = generateId();
    }
    const data = await addABatchOfProductInDb(productsarray);
    // console.log(productsarray);
  } catch (err) {
    console.log("errror in addABatchOfProductService", err);
    throw err;
  }
};

export const updateAProductService = async (productid, update) => {
  try {
    const newProducts = await updateProductInDb(productid, update);
    return newProducts;
  } catch (err) {
    console.log("error in productAdder", err);
    throw err;
  }
};

export const deleteAProductService = async (productid) => {
  try {
    const data = await deleteProductFromDb(productid);
    return data;
  } catch (err) {
    console.log("error in productAdder", err);
    throw err;
  }
};

export const productInventoryUpdater = async (id, quantity) => {
  try {
    let products;
    if (typeof quantity === "string") {
      products = await increaseAProductInventoryInDb(id, quantity);
    } else {
      products = await decreaseAProductInventoryInDb(id, quantity);
    }
    return products;
  } catch (err) {
    console.log("error in productAdder", err);
    throw err;
  }
};
