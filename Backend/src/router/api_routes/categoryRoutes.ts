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
categoryRoutes.post("/", async (req, res) => {
  const { name, description, slug, parentId } = req.body;
  console.log({ name, description, slug, parentId });
  const data = await createCategory({ name, description, slug, parentId });
  res.json(data);
});

//read category
categoryRoutes.get("/", async (req, res) => {
  const data = await readCategories();
  res.json(data);
});

categoryRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await readCategory(id);
  res.json(data);
});

//update category
categoryRoutes.put("/", async (req, res) => {
  const { categoryid, name, description, parentId, isActive } = req.body;
  const data = await updateCategory(categoryid, {
    name,
    description,
    parentId,
    isActive,
  });
  res.json(data);
});
//delte category

categoryRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await deleteCategory(id);
  res.json(data);
});
export default categoryRoutes;
