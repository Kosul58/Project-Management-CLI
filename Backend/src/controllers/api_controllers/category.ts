import {
  CategoryOption,
  UpdateCategory,
} from "../../common/types/categoryType.js";
import { RequestHandler } from "express";
import categoryServices from "../../services/categoryServices.js";

// Create Category
export const createCategory: RequestHandler = async (req, res) => {
  const category: CategoryOption = req.body;
  try {
    if (!category.name) {
      res.status(400).json({ message: "Name field required" });
      return;
    }

    const result = await categoryServices.createCategory(category, "api");
    if (result === null) {
      res.status(409).json({
        message: "Category with same name already exits",
        response: [],
      });
      return;
    }
    if (
      (Array.isArray(result) && result.length === 0) ||
      (!Array.isArray(result) && Object.keys(result).length === 0)
    ) {
      res.status(404).json({
        message: "Category creation unsuccessful",
        response: [],
      });
      return;
    }

    res.status(201).json({
      message: "Category creation successful",
      response: result,
    });
    return;
  } catch (err) {
    res.status(500).json({ message: "Failed to create category" });
    return;
  }
};

// Read All Categories
export const readCategories: RequestHandler = async (req, res) => {
  try {
    const result = await categoryServices.readCategories("api");
    if (!result || result.length === 0) {
      res.status(404).json({
        message: "Categories read unsuccessful",
        response: [],
      });
      return;
    }
    res.status(200).json({
      message: "Categories read successful",
      response: result,
    });
    return;
  } catch (err) {
    res.status(500).json({ message: "Failed to read categories" });
    return;
  }
};

// Read Single Category
export const readCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).json({ message: "Category id required" });
      return;
    }

    const result = await categoryServices.readCategory(id, "api");
    if (!result || Object.keys(result).length < 1) {
      res.status(404).json({
        message: "Category read unsuccessful",
        response: [],
      });
      return;
    }
    res.status(200).json({
      message: "Category read successful",
      response: result,
    });
    return;
  } catch (err) {
    res.status(500).json({ message: "Failed to read category" });
    return;
  }
};

// Update Category
export const updateCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const update: UpdateCategory = req.body;
  try {
    if (!id || Object.keys(update).length < 1) {
      res.status(400).json({ message: "Enter all required fields" });
      return;
    }

    const result = await categoryServices.updateCategory(id, update, "api");

    if (result === null) {
      res.status(409).json({
        message: "Category with same name already exists",
      });
      return;
    }

    if (result === undefined) {
      res.status(404).json({
        message: "Category not found",
      });
    }
    if (Array.isArray(result) && result.length === 0) {
      res.status(404).json({
        message: "Category update unsuccessful",
        response: [],
      });
      return;
    }

    res.status(200).json({
      message: "Category update successful",
      response: result,
    });
    return;
  } catch (err) {
    res.status(500).json({ message: "Failed to update category" });
    return;
  }
};

// Delete Category
export const deleteCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).json({ message: "Enter all required fields" });
      return;
    }

    const result = await categoryServices.deleteCategory(id, "api");
    if (!result) {
      res.status(404).json({
        message: "Category not found",
      });
      return;
    }
    if (Array.isArray(result) && result.length === 0) {
      res.status(404).json({
        message: "Category delete unsuccessful",
        response: [],
      });
      return;
    }
    res.status(200).json({
      message: "Category delete successful",
      response: result,
    });
    return;
  } catch (err) {
    res.status(500).json({ message: "Failed to delete category" });
    return;
  }
};
