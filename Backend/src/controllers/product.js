import {
  productDisplayer,
  productAdder,
  productUpdater,
  productDeleter,
  productInventoryUpdater,
} from "../services/productServices.js";

export const getProductList = async () => {
  try {
    const response = await productDisplayer();
    if (response.length === 0) {
      return {
        message: "Product search failed",
        response: "No products found in file",
      };
    } else {
      return {
        message: "Product search successfull",
        response: response,
      };
    }
  } catch (err) {
    console.error("Error in getProductList", err);
    return [];
  }
};

export const addAProduct = async (name, price, inventory) => {
  try {
    if (!name || !price || !inventory) {
      return { message: "Enter all fields", response: [] };
    }
    const result = await productAdder(name, price, inventory);
    if (!result) {
      return {
        message: "Error adding product",
        response: [],
      };
    }
    return {
      message: `Product with name ${result.newProduct.name} and price $${result.newProduct.price} added successfully with productid ${result.newProduct.productid}`,
      response: result.totalProducts,
    };
  } catch (err) {
    console.error("Error in addAProduct", err);
    return [];
  }
};

export const updateAProduct = async (productid, update) => {
  try {
    if (!productid || !update) {
      return { message: "Enter all field" };
    }
    const result = await productUpdater(productid, update);

    if (result.length > 0) {
      return {
        message: `Product with id ${productid} updated successfully`,
        response: result,
      };
    } else {
      return {
        message: "No products to update",
        response: [],
      };
    }
  } catch (err) {
    console.log("Error in updateAProduct", err);
    return [];
  }
};

export const deleteAProduct = async (productid) => {
  try {
    if (!productid) {
      console.log("Product id required");
      return;
    }
    const result = await productDeleter(productid);
    return result;
  } catch (err) {
    console.log("Error in deleteAProduct", err);
    return [];
  }
};

export const updateAProductInventory = async (id, quantity) => {
  try {
    if (!id || !quantity) {
      console.log("Both productid and qunatity required");
      return;
    }
    let result = await productInventoryUpdater(id, quantity);

    if (result.length > 0) {
      return {
        message: "Inventory Update Successfully",
        response: result,
      };
    } else {
      return {
        message: "Invetory Update Unsuccessfull",
        response: [],
      };
    }
  } catch (err) {
    console.log("Error in updateAProduct Inventory", err);
    return [];
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
