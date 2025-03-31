import fs from "fs";
import { promises as fsPromises } from "fs";

export const getProductList = async () => {
  try {
    const data = await fsPromises.readFile(
      "./src/database/data/products.json",
      "utf8"
    );
    const result = await JSON.parse(data);
    return result;
  } catch (err) {
    console.error("Error in getProductList", err);
    return [];
  }
};

// const generateId = () => {
//   return Date.now().toString(36) + Math.random().toString(36).substring(2);
// };
// console.log(generateId());

export const addAProduct = async (name, price) => {
  try {
    const products = await getProductList();
    const id = products.length + 1;

    const newProduct = { id, name, price };
    const totalProducts = [...products, newProduct];
    // const totalProducts = products.push(newProduct);
    await fsPromises.writeFile(
      "./src/database/data/products.json",
      JSON.stringify(totalProducts, null, 2)
    );

    console.log("Product added successfully!");
  } catch (err) {
    console.error("Error in addAProduct", err);
  }
};

export const updateAProduct = async (id, name, price) => {
  try {
    const products = await getProductList();
    const newProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, name, price };
      }
      // if (product.id === id) {
      //   return { id, name, price };
      // }
      return product;
    });
    if (products.length === newProducts.length) {
      console.log(`Product with id ${id} updated successfully`);
    } else {
      console.log("No products to update");
    }
    console.log(object);
    await fsPromises.writeFile(
      "./src/database/data/products.json",
      JSON.stringify(newProducts, null, 2)
    );
  } catch (err) {
    console.log("Error in updateAProduct", err);
  }
};

export const deleteAProduct = async (id) => {
  try {
    const products = await getProductList();
    const totalProducts = products.filter((product) => product.id !== id);
    await fsPromises.writeFile(
      "./src/database/data/products.json",
      JSON.stringify(totalProducts, null, 2)
    );
    if (products.length === totalProducts.length) {
      console.log("No Products to delete");
    } else {
      console.log(`Product with product id: ${id} deleted successfully`);
    }
  } catch (err) {
    console.log("Error in deleteAProduct", err);
  }
};

export const updateAProductInventory = async (id, quantity) => {
  try {
    let products = await getProductList();
    products = products.map((product) => {
      if (product.id === id) {
        let inventory = product.inventory - quantity;
        return {
          ...product,
          inventory,
        };
      }
      return product;
    });
    await fsPromises.writeFile(
      "./src/database/data/products.json",
      JSON.stringify(products)
    );
  } catch (err) {
    console.log("Error in updateAProduct Inventory", err);
  }
};

// Display all products
// const data = await getProductList();
// console.log(data);

// Add a new product
// addAProduct("Kosul", 55);

// Update a product
// updateAProduct(11, "kaspers", 555);

// Delete a product
// deleteAProduct(11);

// update a product Inventory
// updateAProductQuantity(2,2)
