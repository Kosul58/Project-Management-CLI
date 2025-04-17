import express from "express";
import {
  createCategory,
  deleteCategory,
  readCategories,
  readCategory,
  updateCategory,
} from "../../controllers/api_controllers/category.js";
const categoryRoutes = express.Router();

//create category
categoryRoutes.post("/", createCategory);

//read category
categoryRoutes.get("/", readCategories);

categoryRoutes.get("/:id", readCategory);

//update category
categoryRoutes.put("/:id", updateCategory);
//delte category

categoryRoutes.delete("/:id", deleteCategory);
export default categoryRoutes;
