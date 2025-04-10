import {
  createCategory,
  readCategory,
  readCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.js";
import { parseOptions } from "../utils/utils.js";

import {
  CategoryOption,
  CategoryParser,
  UpdateCategory,
} from "../common/types/categoryType.js";

const categoryRouter = async (Command_Prompt: string[]): Promise<void> => {
  const values: CategoryParser = parseOptions(Command_Prompt.slice(2));
  let {
    categoryId,
    name = "",
    description,
    parentId = "",
    isActive,
    slug,
  } = values;
  console.log(values);
  switch (Command_Prompt[1]) {
    case "create":
      let category: CategoryOption = {
        name,
        description,
        slug,
        parentId,
      };
      const createResult = await createCategory(category);
      console.log(createResult);
      break;
    case "read":
      const readResult = await readCategories();
      console.log("read");
      console.log(readResult);
      break;
    case "update":
      let update: UpdateCategory = {
        name,
        description,
        parentId,
        isActive,
      };
      const updateResult = await updateCategory(categoryId as string, update);
      console.log(updateResult);
      break;
    case "delete":
      const deleteResult = await deleteCategory(categoryId as string);
      console.log(deleteResult);
      break;
    default:
      console.log("wrong command");
      console.log("Type 'node index.js help' to view all avialable prompts");
      break;
  }
};

export default categoryRouter;
