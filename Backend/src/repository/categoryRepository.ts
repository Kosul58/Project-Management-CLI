import { Category, UpdateCategory } from "../common/categoryType";
import { readToFile, writeToFile } from "../utils/fileManager";
import {
  generateId,
  categoryPath,
  getCurrentDateTimeStamp,
} from "../utils/utils";

const checkCategory = (categories: Category[], name: string) => {
  return !categories.some(
    (cat) => cat.name.trim().toLowerCase() === name.trim().toLowerCase()
  );
};

const createCategory = async (category: Category): Promise<Category[]> => {
  try {
    const categories = await readToFile(categoryPath);
    category.categoryId = generateId();
    category.createdAt = getCurrentDateTimeStamp();
    const isUnique = checkCategory(categories, category.name);
    if (!isUnique) {
      console.log("Category alerady exists in file");
      return categories;
    }
    categories.push(category);
    await writeToFile(categoryPath, categories);
    console.log("New category created.");
    return categories;
  } catch (err) {
    console.log("Failed to create a category", err);
    throw err;
  }
};

// to get all the category data from the category.json file
const readCategories = async (): Promise<Category[]> => {
  try {
    const categories: Category[] = await readToFile(categoryPath);
    console.log("Categorires read from file.");
    return categories;
  } catch (err) {
    console.log("Failed to read the categories in the file", err);
    throw err;
  }
};

// to get a category based on its id and name
const readCategory = async (categoryid: string): Promise<Category | null> => {
  try {
    const categoires: Category[] = await readToFile(categoryPath);
    const categoryIndex = getCategoryIndex(categoires, categoryid);
    if (categoryIndex < 0) {
      return null;
    }
    console.log("Category read from file.");
    const data: Category = categoires[categoryIndex];
    return data;
  } catch (err) {
    console.log("Failed to read a category from the file", err);
    throw err;
  }
};

const getCategoryIndex = (
  categoires: Category[],
  categoryid: string
): number => {
  const data = categoires.findIndex((c) => c.categoryId === categoryid);
  return data;
};

const updateCategory = async (
  categoryid: string,
  update: UpdateCategory
): Promise<Category[]> => {
  try {
    const categoires: Category[] = await readToFile(categoryPath);
    const categorIndex = getCategoryIndex(categoires, categoryid);
    if (categorIndex < 0) {
      console.log("No category found to update");
      return categoires;
    }
    const { name, description, parentId, isActive } = update;
    const category = categoires[categorIndex];
    const isUnique = checkCategory(categoires, name as string);
    if (!isUnique) {
      console.log("Category with same name already exists");
      return categoires;
    }
    if (name) category.name = name;
    if (description) category.description = description;
    if (parentId) category.parentId = parentId;
    if (typeof isActive === "boolean") category.isActive = isActive;
    const updateAt = getCurrentDateTimeStamp();
    category.updatedAt = updateAt;
    console.log("Category Updated");
    await writeToFile(categoryPath, categoires);
    return categoires;
  } catch (err) {
    console.log("Failed to update a category", err);
    throw err;
  }
};

const deleteCategory = async (categoryid: string): Promise<Category[]> => {
  try {
    const categoires: Category[] = await readToFile(categoryPath);
    const categorIndex = getCategoryIndex(categoires, categoryid);
    if (categorIndex < 0) {
      console.log("No Category found to remove");
      return categoires;
    }
    categoires.splice(categorIndex, 1);
    await writeToFile(categoryPath, categoires);
    return categoires;
  } catch (err) {
    console.log("Failed to delete category from the file", err);
    throw err;
  }
};

export default {
  createCategory,
  readCategories,
  readCategory,
  updateCategory,
  deleteCategory,
};
