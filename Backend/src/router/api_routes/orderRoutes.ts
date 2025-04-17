import express from "express";
import {
  cancelWholeOrder,
  cancelSingleOrder,
  createOrder,
  createOrders,
  updateOrderStatus,
  viewOrders,
} from "../../controllers/api_controllers/order.js";
const orderRoutes = express.Router();

orderRoutes.get("/:userid", async (req, res) => {
  const { userid } = req.params;
  const data = await viewOrders(userid);
  res.json(data);
});

orderRoutes.post("/", async (req, res) => {
  const { userid, productid } = req.body;
  const data = await createOrder(userid, productid);
  res.json(data);
});

orderRoutes.post("/createOrders", async (req, res) => {
  const { userid, products } = req.body;
  const data = await createOrders(userid, products);
  res.json(data);
});

orderRoutes.put("/", async (req, res) => {
  const { orderid, userid, status } = req.body;
  const data = await updateOrderStatus(orderid, userid, status);
  res.json(data);
});

orderRoutes.delete("/cancelWhole", async (req, res) => {
  const { orderid, userid } = req.body;
  const data = await cancelWholeOrder(orderid, userid);
  res.json(data);
});

orderRoutes.delete("/cancelSingle", async (req, res) => {
  const { orderid, userid, productid } = req.body;
  const data = await cancelSingleOrder(orderid, userid, productid);
  res.json(data);
});
export default orderRoutes;
