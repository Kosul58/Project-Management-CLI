import { RequestHandler } from "express";
import cartServices from "../../services/cartServices.js";
import { UpdateCart } from "../../common/types/cartType.js";

export const viewCartProducts: RequestHandler = async (req, res) => {
  try {
    const result = await cartServices.getProducts("api");
    if (!result || result.length === 0) {
      res
        .status(404)
        .json({ message: "Cart search unsuccessful", response: [] });
      return;
    }
    res
      .status(200)
      .json({ message: "Cart search successful", response: result });
    return;
  } catch (err) {
    res.status(500).json({ message: "Failed to get products data from cart" });
    return;
  }
};

export const viewCartProduct: RequestHandler = async (req, res) => {
  const { productid, userid } = req.params;
  try {
    const result = await cartServices.getProductById(productid, userid, "api");
    if (!result || Object.keys(result).length === 0) {
      res
        .status(404)
        .json({ message: "Product search unsuccessful", response: [] });
      return;
    }
    res
      .status(200)
      .json({ message: "Product search successful", response: result });
    return;
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to search product in cart of user" });
    return;
  }
};

export const viewCart: RequestHandler = async (req, res) => {
  const { userid } = req.params;
  try {
    const result = await cartServices.getProduct(userid, "api");
    if (!result || Object.keys(result).length === 0) {
      res
        .status(404)
        .json({ message: "Cart search unsuccessful", response: [] });
      return;
    }
    res
      .status(200)
      .json({ message: "Cart search successful", response: result });
    return;
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to search products in cart of user" });
    return;
  }
};

export const addProduct: RequestHandler = async (req, res) => {
  const { userid, productid, quantity } = req.body;
  try {
    if (!userid || !productid || !quantity) {
      res.status(400).json({ message: "Provide all fields", response: [] });
      return;
    }
    const result = await cartServices.addProduct(
      userid,
      productid,
      quantity,
      "api"
    );
    if (result === "noproduct") {
      res.status(404).json({
        message: "Product Not in the Product databasea",
      });
      return;
    }
    if (
      (Array.isArray(result) && result.length < 1) ||
      !result ||
      Object.keys(result).length === 0
    ) {
      res.status(409).json({
        message: "Product addition to cart unsuccessful",
        response: [],
      });
      return;
    }
    res.status(201).json({
      message: "Product addition to cart successful",
      response: result,
    });
    return;
  } catch (err) {
    res.status(500).json({ message: "Failed to add a product to the cart" });
    return;
  }
};

export const removeProduct: RequestHandler = async (req, res) => {
  const { userid, productid } = req.params;
  try {
    if (!userid || !productid) {
      res
        .status(400)
        .json({ message: "User ID and Product ID required", response: [] });
      return;
    }
    const result = await cartServices.removeProduct(userid, productid, "api");
    if (result === "nocart") {
      res.status(404).json({
        message: "No cart found containing the product",
      });
      return;
    }
    if (!result || Object.keys(result).length < 1) {
      res.status(404).json({
        message: "Product removal unsuccessful. Cart has no such product",
        response: [],
      });
      return;
    }
    res
      .status(200)
      .json({ message: "Product removal successful", response: result });
    return;
  } catch (err) {
    res.status(500).json({ message: "Failed to remove a product" });
    return;
  }
};

export const removeProducts: RequestHandler = async (req, res) => {
  const { userid, products } = req.body;
  try {
    if (!userid || !products || products.length === 0) {
      res
        .status(400)
        .json({ message: "User ID and product list required", response: [] });
      return;
    }
    const result = await cartServices.removeProducts(userid, products, "api");
    if (result === "nocart") {
      res.status(404).json({
        message: "No cart found",
      });
    }
    if (!result || Object.keys(result).length < 1) {
      res
        .status(404)
        .json({ message: "Products removal unsuccessful", response: [] });
      return;
    }
    res
      .status(200)
      .json({ message: "Products removal successful", response: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove products" });
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  const { userid, productid, update } = req.body as {
    userid: string;
    productid: string;
    update: UpdateCart;
  };
  try {
    if (!userid || !productid || !update?.quantity) {
      res.status(400).json({ message: "Enter all fields", response: [] });
      return;
    }
    const result = await cartServices.updateProduct(
      userid,
      productid,
      update,
      "api"
    );
    if (result === "nocart") {
      res.status(400).json({ message: "No cart found" });
      return;
    }
    if (result === "noproduct") {
      res.status(404).json({ message: "Product not found in cart" });
    }
    if (!result || Object.keys(result).length < 1) {
      res
        .status(404)
        .json({ message: "Product update unsuccessful", response: [] });
      return;
    }
    res
      .status(200)
      .json({ message: "Product update successful", response: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to update a product" });
  }
};

export const calcTotal: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).json({ message: "Enter user ID", response: [] });
      return;
    }
    const result = await cartServices.cartTotal(id, "api");
    if (!result) {
      res
        .status(500)
        .json({ message: "Error in total price calculation", response: [] });
      return;
    }
    res
      .status(200)
      .json({ message: "Total of all products in the cart", response: result });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to calculate total price of products in cart" });
  }
};
