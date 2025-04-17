import {
  Category,
  CategoryOption,
  UpdateCategory,
} from "../common/types/categoryType.js";
import cliCategoryRepository from "../repository/cli_repository/categoryRepository.js";
import apiCategoryRepository from "../repository/api_repository/categoryRepository.js";

class CategoryService {
  private getRepository(target: "cli" | "api") {
    return target === "cli" ? cliCategoryRepository : apiCategoryRepository;
  }

  private generateCategory(category: CategoryOption): Category {
    const { name, description = "", slug = "", parentId = "" } = category;
    return {
      name,
      description,
      slug,
      parentId,
      isActive: true,
      createdAt: "",
      updatedAt: "",
    };
  }

  public async createCategory(category: CategoryOption, target: "cli" | "api") {
    try {
      const newCategory = this.generateCategory(category);
      const repository = this.getRepository(target);
      return await repository.createCategory(newCategory);
    } catch (err) {
      console.log("Failed to create a category", err);
      throw err;
    }
  }

  public async readCategories(target: "cli" | "api") {
    try {
      const repository = this.getRepository(target);
      return await repository.readCategories();
    } catch (err) {
      console.log("Failed to read categories", err);
      throw err;
    }
  }

  public async readCategory(categoryid: string, target: "cli" | "api") {
    try {
      const repository = this.getRepository(target);
      return await repository.readCategory(categoryid);
    } catch (err) {
      console.log("Failed to read a category", err);
      throw err;
    }
  }

  public async updateCategory(
    categoryid: string,
    update: UpdateCategory,
    target: "cli" | "api"
  ) {
    try {
      const updateFields = Object.fromEntries(
        Object.entries(update).filter(([_, value]) => value !== undefined)
      ) as Partial<UpdateCategory>;
      const repository = this.getRepository(target);
      return await repository.updateCategory(categoryid, updateFields);
    } catch (err) {
      console.log("Failed to update category", err);
      throw err;
    }
  }

  public async deleteCategory(categoryid: string, target: "cli" | "api") {
    try {
      const repository = this.getRepository(target);
      return await repository.deleteCategory(categoryid);
    } catch (err) {
      console.log("Failed to delete category", err);
      throw err;
    }
  }
}

export default new CategoryService();
