import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../../controllers/api_controllers/product.js";
const productRoutes = express.Router();

//Create product
productRoutes.post("/", addProduct);

//Read product
productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProductById);

//Update product
productRoutes.put("/", updateProduct);

//Delete product
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;

// import express from "express";
// import {
//   addProduct,
//   deleteProduct,
//   getProductById,
//   getProducts,
//   updateProduct,
// } from "../controllers/product.js";
// const productRoutes = express.Router();

// //Create product
// productRoutes.post("/", async (req, res) => {
//   const { name, price, inventory } = req.body;
//   const data = await addProduct({ name, price, inventory });
//   res.json(data);
// });

// //Read product
// productRoutes.get("/", async (req, res) => {
//   const data = await getProducts();
//   res.json(data);
// });
// productRoutes.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   const data = await getProductById(id);
//   res.json(data);
// });

// //Update product
// productRoutes.put("/", async (req, res) => {
//   const { productid, update } = req.body;
//   const data = await updateProduct(productid, update);
//   res.json(data);
// });

// //Delete product
// productRoutes.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   const data = await deleteProduct(id);
//   res.json(data);
// });

// export default productRoutes;
