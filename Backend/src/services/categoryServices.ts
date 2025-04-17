import {
  Category,
  CategoryOption,
  UpdateCategory,
} from "../common/types/categoryType.js";
import cliCategoryRepository from "../repository/cli_repository/categoryRepository.js";
import apiCategoryRepositoryr from "../repository/api_repository/categoryRepository.js";

class CategoryService {
  private generateCategory(category: CategoryOption): Category {
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
  }

  public async createCategory(
    category: CategoryOption,
    target: "cli" | "api"
  ): Promise<Category[] | null> {
    try {
      const newCategory = this.generateCategory(category);
      let result;
      target === "cli"
        ? (result = await cliCategoryRepository.createCategory(newCategory))
        : (result = await apiCategoryRepositoryr.createCategory(newCategory));

      return result;
    } catch (err) {
      console.log("Failed to create a category", err);
      throw err;
    }
  }

  public async readCategories(target: "cli" | "api"): Promise<Category[]> {
    try {
      let result;
      target === "cli"
        ? (result = await cliCategoryRepository.readCategories())
        : (result = await apiCategoryRepositoryr.readCategories());

      return result;
    } catch (err) {
      console.log("Failed to read categories", err);
      throw err;
    }
  }

  public async readCategory(
    categoryid: string,
    target: "cli" | "api"
  ): Promise<Category | null> {
    try {
      let result;
      target === "cli"
        ? (result = await cliCategoryRepository.readCategory(categoryid))
        : (result = await apiCategoryRepositoryr.readCategory(categoryid));

      return result;
    } catch (err) {
      console.log("Failed to read a category", err);
      throw err;
    }
  }

  public async updateCategory(
    categoryid: string,
    update: UpdateCategory,
    target: "cli" | "api"
  ): Promise<Category[] | null> {
    try {
      let result;
      target === "cli"
        ? (result = await cliCategoryRepository.updateCategory(
            categoryid,
            update
          ))
        : (result = await apiCategoryRepositoryr.updateCategory(
            categoryid,
            update
          ));
      return result;
    } catch (err) {
      console.log("Failed to update category", err);
      throw err;
    }
  }

  public async deleteCategory(
    categoryid: string,
    target: "cli" | "api"
  ): Promise<Category[] | null> {
    try {
      let result;
      target === "cli"
        ? (result = await cliCategoryRepository.deleteCategory(categoryid))
        : (result = await apiCategoryRepositoryr.deleteCategory(categoryid));
      return result;
    } catch (err) {
      console.log("Failed to delete category", err);
      throw err;
    }
  }
}

export default new CategoryService();
