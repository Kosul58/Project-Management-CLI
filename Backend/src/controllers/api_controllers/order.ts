import { RequestHandler } from "express";
import orderServices from "../../services/orderServices.js";

export const viewOrders: RequestHandler = async (req, res) => {
  const { userid } = req.params;
  try {
    const result = await orderServices.getOrder(userid, "api");
    if (!result) {
      res
        .status(404)
        .json({ message: "Error fetching order data", response: [] });
      return;
    }
    res.status(200).json({
      message: "Order search successful",
      response: result,
    });
    return;
  } catch (err) {
    console.log("Failed to search for orders", err);
    res.status(500).json({ message: "Internal server error", response: [] });
    return;
  }
};

export const createOrder: RequestHandler = async (req, res) => {
  const { userid, productid } = req.body;
  try {
    if (!userid) {
      res.status(400).json({ message: "Userid required", response: [] });
      return;
    }
    const result = await orderServices.addOrder(userid, productid, "api");
    if (result === "noproduct") {
      res.status(404).json({
        message: "No Product found",
      });
    }
    if (!result || Object.keys(result).length === 0) {
      res
        .status(400)
        .json({ message: "Order creation unsuccessful", response: [] });
      return;
    }
    res
      .status(201)
      .json({ message: "Order creation successful", response: result });
    return;
  } catch (err) {
    console.log("Failed to create an order of a product", err);
    res.status(500).json({ message: "Internal server error", response: [] });
    return;
  }
};

export const createOrders: RequestHandler = async (req, res) => {
  const { userid, products } = req.body;
  try {
    if (!userid || products.length < 1) {
      res
        .status(400)
        .json({ message: "Userid and products array required", response: [] });
      return;
    }
    const result = await orderServices.addOrders(userid, products, "api");
    if (!result || Object.keys(result).length === 0) {
      res
        .status(400)
        .json({ message: "Order creation unsuccessful", response: [] });
      return;
    }
    res
      .status(201)
      .json({ message: "Order creation successful", response: result });
    return;
  } catch (err) {
    console.log("Failed to create order of multiple products", err);
    res.status(500).json({ message: "Internal server error", response: [] });
    return;
  }
};

export const updateOrderStatus: RequestHandler = async (req, res) => {
  const { orderid, userid, status } = req.body;
  try {
    if (!orderid || !userid || !status) {
      res.status(400).json({ message: "Enter all fields", response: [] });
      return;
    }
    const result = await orderServices.updateOrderStatus(
      orderid,
      userid,
      status,
      "api"
    );
    if (result === "noorder") {
      res.status(400).json({
        message: "No order found",
      });
    }
    if (!result || Object.keys(result).length === 0) {
      res
        .status(400)
        .json({ message: "Order status update unsuccessful", response: [] });
      return;
    }
    res
      .status(200)
      .json({ message: "Order status update successful", response: result });
    return;
  } catch (err) {
    console.log("Failed to update order status", err);
    res.status(500).json({ message: "Internal server error", response: [] });
    return;
  }
};

export const cancelWholeOrder: RequestHandler = async (req, res) => {
  const { orderid, userid } = req.body;
  try {
    if (!userid || !orderid) {
      res.status(400).json({ message: "Enter all fields", response: [] });
      return;
    }
    const result = await orderServices.removeOrders(orderid, userid, "api");
    if (!result || Object.keys(result).length === 0) {
      res
        .status(400)
        .json({ message: "Order removal unsuccessful", response: [] });
      return;
    }
    res
      .status(200)
      .json({ message: "Order removal successful", response: result });
    return;
  } catch (err) {
    console.log("Failed to cancel an order", err);
    res.status(500).json({ message: "Internal server error", response: [] });
    return;
  }
};

export const cancelSingleOrder: RequestHandler = async (req, res) => {
  const { orderid, userid, productid } = req.body;
  try {
    if (!orderid || !userid || !productid) {
      res.status(400).json({ message: "Enter all fields", response: [] });
      return;
    }
    const result = await orderServices.removeOrder(
      orderid,
      userid,
      productid,
      "api"
    );
    if (result === "noorder") {
      res.status(400).json({ message: "No order found" });
      return;
    }

    if (result === "noproduct") {
      res.status(400).json({ message: "No product found" });
      return;
    }

    if (!result || Object.keys(result).length === 0) {
      res.status(400).json({
        message: "Cancellation of a product order unsuccessful",
        response: [],
      });
      return;
    }
    res.status(200).json({
      message: "Order of a product canceled successfully",
      response: result,
    });
    return;
  } catch (err) {
    console.log("Failed to cancel the order of a product", err);
    res.status(500).json({ message: "Internal server error", response: [] });
    return;
  }
};
