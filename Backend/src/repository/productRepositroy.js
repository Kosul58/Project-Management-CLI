import { readToFile, writeToFile } from "../utils/fileManager.js";
import { productPath } from "../utils/utils.js";

export const getAllProductFromDb = async () => {
  try {
    const result = await readToFile(productPath);
    return result;
  } catch (err) {
    console.log("Error in displayProductFromDb", err);
    throw err;
  }
};

export const getProductByIDFromDb = async (productid) => {
  try {
    const data = await readToFile(productPath);
    return data.filter((p) => p.productid === productid);
  } catch (err) {
    console.log("Error in getProductByIdFromDb", err);
    throw err;
  }
};

export const checkProductAlreadyInDb = async (product) => {
  try {
    const products = await readToFile(productPath);
    const prdoductIndex = products.find(
      (p) => p.productid === product.productid
    );
    // if (prdoductIndex > 0)
    //   throw new Error("Product already exists in the database");
    return prdoductIndex;
  } catch (err) {
    console.log("Error in checkProductAlreadyInDb", err);
    throw err;
  }
};

export const addProductToDb = async (product) => {
  try {
    const products = await readToFile(productPath);
    let totalProducts = [...products, product];
    await writeToFile(productPath, totalProducts);
    return totalProducts;
  } catch (err) {
    console.log("Error in addProdcitToDb", err);
    throw err;
  }
};

export const addABatchOfProductInDb = async (products) => {
  try {
    const productsInDb = await readToFile(productPath);
    let totalProducts = [...productsInDb];
    for (let product of products) {
      const productindex = await checkProductAlreadyInDb(product);
      if (!productindex) {
        console.log(product);
        totalProducts = [...totalProducts, product];
      }
    }
    await writeToFile(productPath, totalProducts);
    return totalProducts;
  } catch (err) {
    console.log("error in addABatchOfProductInDb", err);
    throw err;
  }
};

export const updateProductInDb = async (productid, update) => {
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
    console.log("Error in updateProductInDb", err);
    throw err;
  }
};

export const deleteProductFromDb = async (productid) => {
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

export const increaseAProductInventoryInDb = async (id, quantity) => {
  try {
    let products = await readToFile(productPath);
    products = products.map((product) => {
      if (product.productid === id) {
        let inventory;
        inventory = product.inventory + Number(quantity);
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
    console.log("error in increaseAProductInventoryInDb", err);
    throw err;
  }
};

export const decreaseAProductInventoryInDb = async (id, quantity) => {
  try {
    let products = await readToFile(productPath);
    products = products.map((product) => {
      if (product.productid === id) {
        let inventory;
        inventory = product.inventory - quantity;
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
    console.log("error in decreaseAProductInventoryInDb", err);
    throw err;
  }
};
