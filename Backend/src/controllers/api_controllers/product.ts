import productService from "../../services/productServices.js";
import { AddProduct, UpdateProdcut } from "../../common/types/productType.js";
import { RequestHandler } from "express";

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const response = await productService.getProducts("api");
    if (response.length === 0) {
      res.status(404).json({ message: "No Products found", response: [] });
      return;
    }
    res.status(200).json({
      message: "Product search successfull",
      response: response,
    });
    return;
  } catch (err) {
    console.error("Failed to get products", err);
    res.status(500).json({
      message: "Product search Unsucessfull",
      response: [],
    });
    return;
  }
};

export const getProductById: RequestHandler = async (req, res) => {
  const { productid } = req.params;
  try {
    if (!productid) {
      res.status(400).json({
        message: "Provide ProductID",
        response: [],
      });
      return;
    }
    const data = await productService.getProductById(productid, "api");
    if (!data || Object.keys(data).length === 0) {
      res.status(404).json({
        message: "No matching product found",
        response: [],
      });
      return;
    }
    res.status(200).json({
      message: "Product search successfull",
      response: data,
    });
    return;
  } catch (err) {
    console.error("Failed to get product by id", err);
    res.status(500).json({
      message: "Failed to get product by id",
      response: [],
    });
    return;
  }
};

export const addProduct: RequestHandler = async (req, res) => {
  try {
    const productData: AddProduct = req.body;
    if (!productData.name || !productData.price || !productData.inventory) {
      res.status(400).json({ message: "Enter all fields", response: [] });
      return;
    }
    const result = await productService.addProduct(productData, "api");
    if (!result) {
      res.status(400).json({
        message: "Product Already Exists",
        response: [],
      });
      return;
    }
    res.status(201).json({
      message: `Product with name ${productData.name} and price $${productData.price} added successfully.`,
      response: result,
    });
    return;
  } catch (err) {
    console.error("Failed to add product", err);
    res.status(500).json({
      message: "Failed to add product",
      response: [],
    });
  }
};

export const addProducts: RequestHandler = async (req, res) => {
  const products: AddProduct[] = req.body;
  try {
    if (products.length == 0) {
      res.status(400).json({
        message: "empty products array",
        response: "",
      });
    }
    const data = await productService.addProducts(products, "api");
    if (data.length > 0) {
      res.status(201).json({
        message: "Batch addition of products successfull",
        response: data,
      });
      return;
    }
    res.status(400).json({
      message: "Batch addition of products unsuccessfull",
      response: "",
    });
    return;
  } catch (err) {
    console.error("Failed to add multiple products", err);
    res.status(500).json({
      message: "Failed to add products",
      response: [],
    });
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
    const result = await productService.updateProduct(productid, update, "api");

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
    const result = await productService.deleteProduct(productid, "api");
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
      "api"
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
