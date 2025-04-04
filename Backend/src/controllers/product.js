import productService from "../services/productServices.js";

export const getProductList = async () => {
  try {
    const response = await productService.getAllProduct();
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
    console.error("Error in Controller", err);
    return [];
  }
};

export const getProductById = async (productid) => {
  try {
    const data = await productService.getProductById(productid);
    if (data.length > 0) {
      return {
        message: "Product search successfull",
        response: data,
      };
    } else {
      return {
        message: "Product search unsuccessfull",
        response: [],
      };
    }
  } catch (err) {
    console.error("Error in Controller", err);
    return [];
  }
};

export const addProduct = async (name, price, inventory) => {
  try {
    if (!name || !price || !inventory) {
      return { message: "Enter all fields", response: [] };
    }
    const result = await productService.addProduct(name, price, inventory);
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
    console.error("Error in Controller", err);
    return [];
  }
};

export const addProducts = async (productsarray) => {
  try {
    if (productsarray.length == 0) {
      return {
        message: "empty products array",
        response: [],
      };
    }
    const data = productService.addProducts(productsarray);
    if (data.length > 0) {
      return {
        message: "Batch addition of products successfull",
        response: data,
      };
    } else {
      return {
        message: "Batch addition of products unsuccessfull",
        response: [],
      };
    }
  } catch (err) {
    console.error("Error in Controller", err);
    return [];
  }
};

export const updateProduct = async (productid, update) => {
  try {
    if (!productid || !update) {
      return { message: "Enter all field" };
    }
    const result = await productService.updateProduct(productid, update);

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
    console.error("Error in Controller", err);
    return [];
  }
};

export const deleteProduct = async (productid) => {
  try {
    if (!productid) {
      console.log("Product id required");
      return;
    }
    const result = await productService.deleteProduct(productid);
    return result;
  } catch (err) {
    console.error("Error in Controller", err);
    return [];
  }
};

export const updateProductInventory = async (id, quantity) => {
  try {
    if (!id || !quantity) {
      console.log("Both productid and qunatity required");
      return;
    }
    let result = await productService.updateProductInventory(id, quantity);

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
    console.error("Error in Controller", err);
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
