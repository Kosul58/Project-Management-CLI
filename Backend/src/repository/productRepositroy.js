import { readToFile, writeToFile } from "../utils/fileManager.js";
import { generateId, productPath } from "../utils/utils.js";

const getProducts = async () => {
  try {
    const result = await readToFile(productPath);
    return result;
  } catch (err) {
    console.log("Error in product repository getProducts", err);
    throw err;
  }
};

const getProductById = async (productid) => {
  try {
    const data = await readToFile(productPath);
    return data.filter((p) => p.productid === productid);
  } catch (err) {
    console.log("Error in product repository getProductByID", err);
    throw err;
  }
};

const productExists = async (product) => {
  try {
    const products = await readToFile(productPath);
    const prdoductIndex = products.find(
      (p) => p.productid === product.productid
    );
    // if (prdoductIndex > 0)
    //   throw new Error("Product already exists in the database");
    return prdoductIndex;
  } catch (err) {
    console.log("Error in product repository productExists", err);
    throw err;
  }
};

const addProduct = async (product) => {
  try {
    const products = await readToFile(productPath);
    product.productid = generateId();
    const productindex = await productExists(product);
    if (productindex) {
      throw new Error("Product already exists in the database");
    }
    let totalProducts = [...products, product];
    await writeToFile(productPath, totalProducts);
    return totalProducts;
  } catch (err) {
    console.log("Error in product repository addProduct", err);
    throw err;
  }
};

const addProducts = async (products) => {
  try {
    const productsInDb = await readToFile(productPath);
    let totalProducts = [...productsInDb];
    for (let product of products) {
      product.productid = generateId();
      const productindex = await productExists(product);
      if (!productindex) {
        console.log(product);
        totalProducts = [...totalProducts, product];
      }
    }
    await writeToFile(productPath, totalProducts);
    return totalProducts;
  } catch (err) {
    console.log("Error in product repository addProducts", err);
    throw err;
  }
};

const updateProduct = async (productid, update) => {
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
    console.log("Error in product repository update", err);
    throw err;
  }
};

const deleteProduct = async (productid) => {
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
    console.log("Error in product repository delete", err);
    throw err;
  }
};

const increaseProductInventory = async (id, quantity) => {
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
    console.log("Error in product repository invenotry++", err);
    throw err;
  }
};

const decreaseProductInventory = async (id, quantity) => {
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
    console.log("Error in product repository invenotry--", err);
    throw err;
  }
};

export default {
  getProducts,
  getProductById,
  addProduct,
  addProducts,
  updateProduct,
  deleteProduct,
  increaseProductInventory,
  decreaseProductInventory,
};
