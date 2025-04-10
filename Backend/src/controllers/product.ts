import productService from "../services/productServices.js";
import { Product, ProductOptions } from "../common/types/productType.js";
import { ProductResponse } from "../common/types/responseType.js";

export const getProducts = async (): Promise<ProductResponse | []> => {
  try {
    const response = await productService.getProducts();
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
    console.error("Failed to get products", err);
    return [];
  }
};

export const getProductById = async (
  productid: string
): Promise<ProductResponse | []> => {
  try {
    const data = await productService.getProductById(productid);
    if (Object.keys(data).length > 0) {
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
    console.error("Failed to get product by id", err);
    return [];
  }
};

export const addProduct = async (
  restData: ProductOptions
): Promise<ProductResponse | []> => {
  try {
    let { name, price, inventory } = restData;
    if (!name || !price || !inventory) {
      return { message: "Enter all fields", response: [] };
    }
    const result = await productService.addProduct(restData);
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
    console.error("Failed to add product", err);
    return [];
  }
};

export const addProducts = async (
  products: ProductOptions[]
): Promise<ProductResponse | []> => {
  try {
    if (products.length == 0) {
      return {
        message: "empty products array",
        response: [],
      };
    }
    const data = await productService.addProducts(products);
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
    console.error("Failed to add multiple products", err);
    return [];
  }
};

export const updateProduct = async (
  productid: string,
  update: ProductOptions
): Promise<ProductResponse | []> => {
  try {
    if (!productid || !update) {
      return { message: "Enter all field", response: [] };
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
    console.error("Failed to update a product", err);
    return [];
  }
};

export const deleteProduct = async (
  productid: string
): Promise<ProductResponse | []> => {
  try {
    if (!productid) {
      console.log("Product id required");
      return [];
    }
    const result = await productService.deleteProduct(productid);
    return {
      message: "Product deleted successfully",
      response: result,
    };
  } catch (err) {
    console.error("Failed to delete a product", err);
    return [];
  }
};

export const increaseProductInventory = async (
  id: string,
  quantity: number
): Promise<ProductResponse | []> => {
  try {
    if (!id || !quantity) {
      console.log("Both productid and qunatity required");
      return [];
    }
    let result = await productService.increaseProductInventory(id, quantity);
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
    console.error("Failed to increase a product inventory", err);
    return [];
  }
};

export const decreaseProductInventory = async (
  id: string,
  quantity: number
): Promise<ProductResponse | []> => {
  try {
    if (!id || !quantity) {
      console.log("Both productid and qunatity required");
      return [];
    }
    let result = await productService.decreaseProductInventory(id, quantity);
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
    console.error("Failed to decrease a product inventory", err);
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
