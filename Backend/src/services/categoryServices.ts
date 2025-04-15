import {
  Category,
  CategoryOption,
  UpdateCategory,
} from "../common/types/categoryType.js";
import categoryRepository from "../repository/categoryRepository.js";

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

  public async createCategory(category: CategoryOption): Promise<Category[]> {
    try {
      const newCategory = this.generateCategory(category);
      const result = await categoryRepository.createCategory(newCategory);
      return result;
    } catch (err) {
      console.log("Failed to create a category", err);
      throw err;
    }
  }

  public async readCategories(): Promise<Category[]> {
    try {
      const result = await categoryRepository.readCategories();
      return result;
    } catch (err) {
      console.log("Failed to read categories", err);
      throw err;
    }
  }

  public async readCategory(categoryid: string): Promise<Category | null> {
    try {
      const result = await categoryRepository.readCategory(categoryid);
      return result;
    } catch (err) {
      console.log("Failed to read a category", err);
      throw err;
    }
  }

  public async updateCategory(
    categoryid: string,
    update: UpdateCategory
  ): Promise<Category[]> {
    try {
      const result = await categoryRepository.updateCategory(
        categoryid,
        update
      );
      return result;
    } catch (err) {
      console.log("Failed to update category", err);
      throw err;
    }
  }

  public async deleteCategory(categoryid: string): Promise<Category[]> {
    try {
      const result = await categoryRepository.deleteCategory(categoryid);
      return result;
    } catch (err) {
      console.log("Failed to delete category", err);
      throw err;
    }
  }
}

export default new CategoryService();
