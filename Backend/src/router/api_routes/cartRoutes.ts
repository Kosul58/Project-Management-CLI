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

// Create cart item
cartRoutes.post("/", addProduct);

// View all carts (for all users)
cartRoutes.get("/", viewCartProducts);

// View all products in a user's cart
cartRoutes.get("/:userid", viewCart);

// View specific product in a user's cart
cartRoutes.get("/:userid/:productid", viewCartProduct);

// Update product in cart
cartRoutes.put("/", updateProduct);

// Delete specific product from cart
cartRoutes.delete("/:userid/:productid", removeProduct);

// Delete multiple products from a user's cart
cartRoutes.delete("/", removeProducts);

// Calculate total cart price for a user
cartRoutes.get("/total/:id", calcTotal);

export default cartRoutes;
