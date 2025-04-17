import { Category, UpdateCategory } from "../../common/types/categoryType.js";
import fileManager from "../../utils/fileManager.js";
import { generateId, getCurrentDateTimeStamp } from "../../utils/utils.js";
import { categoryPath } from "../../utils/constants.js";

class CategoryRepository {
  private readonly categoryPath: string;
  private categories: Category[] = [];
  constructor() {
    this.categoryPath = categoryPath;
  }

  private async loadCategories() {
    this.categories = await fileManager.readFromFile(this.categoryPath);
  }
  private async setCategories() {
    await fileManager.writeToFile(this.categoryPath, this.categories);
  }

  private checkName(name: string): boolean {
    return !this.categories.some(
      (cat) => cat.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
  }

  private getCategoryIndex(categoryid: string): number {
    const data = this.categories.findIndex((c) => c.categoryId === categoryid);
    return data;
  }

  public async createCategory(category: Category): Promise<Category[] | null> {
    try {
      await this.loadCategories();
      category.categoryId = generateId();
      category.createdAt = getCurrentDateTimeStamp();
      const isUnique = this.checkName(category.name);
      if (!isUnique) {
        console.log("Category alerady exists in file");
        return null;
      } else {
        this.categories.push(category);
        await this.setCategories();
        console.log("New category created.");
      }
      return this.categories;
    } catch (err) {
      console.log("Failed to create a category", err);
      throw err;
    }
  }
  public async readCategories(): Promise<Category[]> {
    try {
      await this.loadCategories();
      console.log("Categorires read from file.");
      return this.categories;
    } catch (err) {
      console.log("Failed to read the categories in the file", err);
      throw err;
    }
  }
  public async readCategory(categoryid: string): Promise<Category | null> {
    try {
      await this.loadCategories();
      const categoryIndex = this.getCategoryIndex(categoryid);
      if (categoryIndex < 0) {
        console.log("No category found");
        return null;
      }
      console.log("Category read from file.");
      return this.categories[categoryIndex];
    } catch (err) {
      console.log("Failed to read a category from the file", err);
      throw err;
    }
  }
  public async updateCategory(
    categoryid: string,
    update: UpdateCategory
  ): Promise<Category[] | null> {
    try {
      await this.loadCategories();
      const categorIndex = this.getCategoryIndex(categoryid);
      if (categorIndex < 0) {
        console.log("No category found to update");
        return null;
      }
      const { name, description, parentId, isActive } = update;
      const category = this.categories[categorIndex];
      let isUnique;
      if (category.name === name) {
        isUnique = true;
      } else {
        isUnique = this.checkName(name as string);
      }
      if (!isUnique) {
        console.log("Category with same name already exists");
        return null;
      }
      if (name) category.name = name;
      if (description) category.description = description;
      if (parentId) category.parentId = parentId;
      if (typeof isActive === "boolean") category.isActive = isActive;
      const updateAt = getCurrentDateTimeStamp();
      category.updatedAt = updateAt;
      console.log("Category Updated");
      await this.setCategories();
      return this.categories;
    } catch (err) {
      console.log("Failed to update a category", err);
      throw err;
    }
  }

  public async deleteCategory(categoryid: string): Promise<Category[] | null> {
    try {
      await this.loadCategories();
      const categorIndex = this.getCategoryIndex(categoryid);
      if (categorIndex < 0) {
        console.log("No Category found to remove");
        return null;
      }
      this.categories.splice(categorIndex, 1);
      await this.setCategories();
      return this.categories;
    } catch (err) {
      console.log("Failed to delete category from the file", err);
      throw err;
    }
  }
}

export default new CategoryRepository();
