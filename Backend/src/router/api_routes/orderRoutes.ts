import express from "express";
import {
  viewOrders,
  createOrder,
  createOrders,
  updateOrderStatus,
  cancelWholeOrder,
  cancelSingleOrder,
} from "../../controllers/api_controllers/order.js";

const orderRoutes = express.Router();

orderRoutes.get("/:userid", viewOrders);
orderRoutes.post("/", createOrder);
orderRoutes.post("/createOrders", createOrders);
orderRoutes.put("/", updateOrderStatus);
orderRoutes.delete("/cancelWhole", cancelWholeOrder);
orderRoutes.delete("/cancelSingle", cancelSingleOrder);

export default orderRoutes;
