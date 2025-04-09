import { readToFile, writeToFile } from "../utils/fileManager.js";
import { generateId, productPath } from "../utils/utils.js";
const getProducts = async () => {
  try {
    const result = await readToFile(productPath);
    console.log("Product search complete");
    return result;
  } catch (err) {
    console.log("Failed to get product data", err);
    throw err;
  }
};
const getProductIndex = (products, productid) => {
  const productIndex = products.findIndex(
    (product) => product.productid === productid
  );
  return productIndex;
};
const getProductById = async (productid) => {
  try {
    const data = await readToFile(productPath);
    const productIndex = getProductIndex(data, productid);
    console.log(productIndex);
    if (productIndex < 0) {
      console.log("No product found");
      return [];
    } else {
      console.log("Product search complete");
      return data[productIndex];
    }
  } catch (err) {
    console.log("Failed to get product data based on productid", err);
    throw err;
  }
};
const addProduct = async (product) => {
  try {
    const products = await readToFile(productPath);
    product.productid = generateId();
    const productindex = getProductIndex(products, product.productid);
    if (productindex >= 0) {
      console.log("Product already exists in the database");
      return [];
    }
    let totalProducts = [...products, product];
    await writeToFile(productPath, totalProducts);
    console.log("Product addition complete");
    return totalProducts;
  } catch (err) {
    console.log("Failed to add a product to database", err);
    throw err;
  }
};
const addProducts = async (products) => {
  try {
    const productsInDb = await readToFile(productPath);
    let totalProducts = [...productsInDb];
    for (let product of products) {
      product.productid = generateId();
      const productindex = getProductIndex(products, product.productid);
      if (productindex < 0) {
        console.log(product);
        totalProducts = [...totalProducts, product];
      } else {
        console.log("Product Already exists");
      }
    }
    await writeToFile(productPath, totalProducts);
    console.log("Products addition complete");
    return totalProducts;
  } catch (err) {
    console.log("Failed to add products to the database", err);
    throw err;
  }
};
const updateProduct = async (productid, update) => {
  try {
    const products = await readToFile(productPath);
    const { name, price, description, category, inventory } = update;
    let productIndex = getProductIndex(products, productid);
    let product = products[productIndex];
    if (productIndex < 0) {
      throw new Error("No product found");
    }
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;
    if (inventory) product.inventory = inventory;
    // const newProducts = products.map((product) => {
    //   if (product.productid === productid) {
    //     return { ...product, ...update };
    //   }
    //   return product;
    // });
    await writeToFile(productPath, products);
    console.log("Product update complete");
    return products;
  } catch (err) {
    console.log("Failed to update a product", err);
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
    console.log("Product removal complete");
    return totalProducts;
    // if (products.length === totalProducts.length) {
    //   return { message: "No Products to delete", response: totalProducts };
    // } else {
    //   return {
    //     message: `Product with product id: ${productid} deleted successfully`,
    //     response: totalProducts,
    //   };
    // }
  } catch (err) {
    console.log("Failed to remove a product", err);
    throw err;
  }
};
const increaseProductInventory = async (id, quantity) => {
  try {
    let products = await readToFile(productPath);
    products = products.map((product) => {
      if (product.productid === id) {
        let inventory = Number(product.inventory) + Number(quantity);
        return {
          ...product,
          inventory,
        };
      }
      return product;
    });
    await writeToFile(productPath, products);
    console.log("Product inventory increased");
    return products;
  } catch (err) {
    console.log("Failed to increase product inventory", err);
    throw err;
  }
};
const decreaseProductInventory = async (id, quantity) => {
  try {
    let products = await readToFile(productPath);
    products = products.map((product) => {
      if (product.productid === id) {
        let inventory;
        inventory = Number(product.inventory) - quantity;
        return {
          ...product,
          inventory,
        };
      }
      return product;
    });
    await writeToFile(productPath, products);
    console.log("Product inventory decreased");
    return products;
  } catch (err) {
    console.log("Failed to decrease product inventory", err);
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
