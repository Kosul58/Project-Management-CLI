import {
  CategoryOption,
  UpdateCategory,
} from "../../common/types/categoryType.js";
import { CategoryResponse } from "../../common/types/responseType.js";
import categoryServices from "../../services/categoryServices.js";

export const createCategory = async (category: CategoryOption) => {
  try {
    if (!category.name) {
      console.log("Name field required");
      return [];
    }
    const result = await categoryServices.createCategory(category);
    if (!result || result.length === 0) {
      return {
        message: "Category creation unsuccessfull",
        response: [],
      };
    } else {
      return {
        message: "Category creation successfull",
        response: result,
      };
    }
  } catch (err) {
    console.log("Failed to create category");
    return [];
  }
};

export const readCategories = async () => {
  try {
    const result = await categoryServices.readCategories();
    if (result.length === 0) {
      return {
        message: "Categories read unsuccessfull",
        response: [],
      };
    } else {
      return {
        message: "Categories read successfull",
        response: result,
      };
    }
  } catch (err) {
    console.log("Failed to read categories");
    return [];
  }
};

export const readCategory = async (categoryid: string) => {
  try {
    if (!categoryid) {
      console.log("Category id required");
      return null;
    }
    const result = await categoryServices.readCategory(categoryid);
    if (!result || Object.keys(result).length < 1) {
      return {
        message: "Category read unsuccessfull",
        response: [],
      };
    } else {
      return {
        message: "Category read successfull",
        response: result,
      };
    }
  } catch (err) {
    console.log("Failed to read a category");
    return [];
  }
};

export const updateCategory = async (
  categoryid: string,
  update: UpdateCategory
) => {
  try {
    if (!categoryid || !update) {
      console.log("Enter all required fields");
      return [];
    }
    const result = await categoryServices.updateCategory(categoryid, update);
    if (!result || result.length === 0) {
      return {
        message: "Category update unsuccessfull",
        response: [],
      };
    } else {
      return {
        message: "Category update successfull",
        response: result,
      };
    }
  } catch (err) {
    console.log("Failed to update a category");
    return [];
  }
};

export const deleteCategory = async (categoryid: string) => {
  try {
    if (!categoryid) {
      console.log("Enter all required fields");
      return [];
    }
    const result = await categoryServices.deleteCategory(categoryid);
    if (!result || result.length === 0) {
      return {
        message: "Category update unsuccessfull",
        response: [],
      };
    } else {
      return {
        message: "Category update successfull",
        response: result,
      };
    }
  } catch (err) {
    console.log("Failed to delete a category");
    return [];
  }
};
