import express from "express";
import {
  addProduct,
  calcTotal,
  removeProduct,
  removeProducts,
  updateProduct,
  viewCart,
  viewCartProduct,
  viewCartProducts,
} from "../../controllers/api_controllers/cart.js";
const cartRoutes = express.Router();

//Create cart
cartRoutes.post("/", async (req, res) => {
  const { userid, productid, quantity } = req.body;
  const data = await addProduct(userid, productid, quantity);
  res.json(data);
});

//Read cart
cartRoutes.get("/", async (req, res) => {
  const data = await viewCart();
  res.json(data);
});

cartRoutes.get("/", async (req, res) => {
  const { userid, productid } = req.body;
  const data = await viewCartProduct(productid, userid);
  res.json(data);
});

cartRoutes.get("/:userid", async (req, res) => {
  const { userid } = req.params;
  const data = await viewCartProducts(userid);
  res.json(data);
});

//Update cart
cartRoutes.put("/", async (req, res) => {
  const { userid, productid, update } = req.body;
  const data = await updateProduct(userid, productid, update);
  res.json(data);
});

//Delete cart
cartRoutes.delete("/:userid/:productid", async (req, res) => {
  const { userid, productid } = req.params;
  const data = await removeProduct(userid, productid);
  res.json(data);
});

cartRoutes.delete("/", async (req, res) => {
  const { userid, products } = req.body;
  const data = await removeProducts(userid, products);
  res.json(data);
});

//calculate total price
cartRoutes.get("/total/:id", async (req, res) => {
  const { id } = req.params;
  const data = await calcTotal(id);
  res.json(data);
});

export default cartRoutes;
