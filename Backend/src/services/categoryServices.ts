import {
  Category,
  CategoryOption,
  UpdateCategory,
} from "../common/categoryType";
import categoryRepository from "../repository/categoryRepository";

const generateCategory = (category: CategoryOption): Category => {
  const { name, description = "", slug = "", parentId = "" } = category;
  return {
    categoryId: "",
    name,
    description,
    slug,
    parentId,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  };
};

const createCategory = async (
  category: CategoryOption
): Promise<Category[]> => {
  try {
    const newCategory = generateCategory(category);
    const result = await categoryRepository.createCategory(newCategory);
    return result;
  } catch (err) {
    console.log("Failed to create a category", err);
    throw err;
  }
};

const readCategories = async (): Promise<Category[]> => {
  try {
    const result = await categoryRepository.readCategories();
    return result;
  } catch (err) {
    console.log("Failed to read categories", err);
    throw err;
  }
};

const readCategory = async (categoryid: string): Promise<Category | null> => {
  try {
    const result = await categoryRepository.readCategory(categoryid);
    return result;
  } catch (err) {
    console.log("Failed to read a category", err);
    throw err;
  }
};

const updateCategory = async (
  categoryid: string,
  update: UpdateCategory
): Promise<Category[]> => {
  try {
    const result = await categoryRepository.updateCategory(categoryid, update);
    return result;
  } catch (err) {
    console.log("Failed to update category", err);
    throw err;
  }
};

const deleteCategory = async (categoryid: string): Promise<Category[]> => {
  try {
    const result = await categoryRepository.deleteCategory(categoryid);
    return result;
  } catch (err) {
    console.log("Failed to delete category", err);
    throw err;
  }
};

export default {
  createCategory,
  readCategories,
  readCategory,
  deleteCategory,
  updateCategory,
};
