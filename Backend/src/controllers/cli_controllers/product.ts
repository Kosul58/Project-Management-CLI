import productService from "../../services/productServices.js";
import {
  AddProduct,
  ProductOptions,
  UpdateProdcut,
} from "../../common/types/productType.js";

export const getProducts = async () => {
  try {
    const response = await productService.getProducts("cli");
    if (response.length === 0) {
      return { message: "No Products found", response: [] };
    }
    return {
      message: "Product search successfull",
      response: response,
    };
  } catch (err) {
    console.error("Failed to get products", err);

    return [];
  }
};

export const getProductById = async (productid: string) => {
  try {
    if (!productid) {
      return {
        message: "Provide ProductID",
        response: [],
      };
    }
    const data = await productService.getProductById(productid, "cli");
    if (!data || Object.keys(data).length === 0) {
      return {
        message: "No matching product found",
        response: [],
      };
    }
    return {
      message: "Product search successfull",
      response: data,
    };
  } catch (err) {
    console.error("Failed to get product by id", err);

    return [];
  }
};

export const addProduct = async (productData: AddProduct) => {
  try {
    if (!productData.name || !productData.price || !productData.inventory) {
      return { message: "Enter all fields", response: [] };
    }
    const result = await productService.addProduct(productData, "cli");
    if (!result) {
      return {
        message: "Product Already Exists",
        response: [],
      };
    }
    return {
      message: `Product with name ${productData.name} and price $${productData.price} added successfully.`,
      response: result,
    };
  } catch (err) {
    console.error("Failed to add product", err);
    return [];
  }
};

export const addProducts = async (products: AddProduct[]) => {
  try {
    if (products.length == 0) {
      return {
        message: "empty products array",
        response: "",
      };
    }
    const data = await productService.addProducts(products, "cli");
    if (data.length > 0) {
      return {
        message: "Batch addition of products successfull",
        response: data,
      };
    }
    return {
      message: "Batch addition of products unsuccessfull",
      response: "",
    };
  } catch (err) {
    console.error("Failed to add multiple products", err);
    return [];
  }
};

export const updateProduct = async (
  productid: string,
  update: UpdateProdcut
) => {
  try {
    if (!productid || !update) {
      return { message: "Enter all field", response: "" };
    }
    const result = await productService.updateProduct(productid, update, "cli");

    if (result && result.length > 0) {
      return {
        message: `Product with id ${productid} updated successfully`,
        response: result,
      };
    } else {
      return {
        message: "No products to update",
        response: "",
      };
    }
  } catch (err) {
    console.error("Failed to update a product", err);
    return null;
  }
};

export const deleteProduct = async (productid: string) => {
  try {
    if (!productid) {
      console.log("Product id required");
      return null;
    }
    const result = await productService.deleteProduct(productid, "cli");
    if (!result) {
      return {
        message: "Product deletion unsuccessfull",
        response: "",
      };
    }
    return {
      message: "Product deleted successfully",
      response: result,
    };
  } catch (err) {
    console.error("Failed to delete a product", err);
    return null;
  }
};

export const modifyInventory = async (
  id: string,
  quantity: number,
  modification: "increase" | "decrease"
) => {
  try {
    console.log(id, quantity, modification);
    if (!id || !quantity || !modification) {
      console.log("Provide all required fields");
      return [];
    }
    let result = await productService.modifyInventory(
      id,
      quantity,
      modification,
      "cli"
    );
    if (!result || result.length === 0) {
      return {
        message: "Invetory modification Unsuccessfull",
        response: [],
      };
    }
    return {
      message: "Invetory modification successfull",
      response: result,
    };
  } catch (err) {
    console.error("Failed to increase a product inventory", err);
    return [];
  }
};
