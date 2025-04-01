import { promises as fsPromises } from "fs";
import { readProductFile, writeProductFile, generateId } from "./fileFuncs.js";

export const getProductList = async () => {
  try {
    const result = await readProductFile();
    return result;
  } catch (err) {
    console.error("Error in getProductList", err);
    return [];
  }
};

export const addAProduct = async (name, price, inventory) => {
  try {
    const products = await getProductList();
    const productid = generateId();
    const newProduct = { productid, name, price, inventory };
    const totalProducts = [...products, newProduct];
    // const totalProducts = products.push(newProduct);

    await writeProductFile(totalProducts);
    console.log("Product added successfully!");
  } catch (err) {
    console.error("Error in addAProduct", err);
  }
};

export const updateAProduct = async (id, name, price) => {
  try {
    const products = await getProductList();
    const newProducts = products.map((product) => {
      if (product.productid === id) {
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

    await writeProductFile(newProducts);
  } catch (err) {
    console.log("Error in updateAProduct", err);
  }
};

export const deleteAProduct = async (id) => {
  try {
    const products = await getProductList();
    const totalProducts = products.filter(
      (product) => product.productid !== id
    );

    await writeProductFile(totalProducts);
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

    await writeProductFile(products);
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
