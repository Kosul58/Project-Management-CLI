import express from "express";
import {
  addProduct,
  addProducts,
  deleteProduct,
  getProductById,
  getProducts,
  modifyInventory,
  updateProduct,
} from "../../controllers/api_controllers/product.js";
const productRoutes = express.Router();

//Create product
productRoutes.post("/", addProduct);
productRoutes.post("/addbatch", addProducts);

//Read product
productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProductById);

//Update product
productRoutes.put("/:id", updateProduct);

//Delete product
productRoutes.delete("/:id", deleteProduct);

//Modify inventory
productRoutes.put("/modify/:id", modifyInventory);

export default productRoutes;
