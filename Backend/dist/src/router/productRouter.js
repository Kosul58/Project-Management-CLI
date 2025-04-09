import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.js";
import { parseOptions } from "../utils/utils.js";
const productRouter = async (Command_Prompt) => {
  const values = parseOptions(Command_Prompt.slice(2));
  console.log("val in routes", values);
  let { productid, userid, ...restData } = values;
  switch (Command_Prompt[1]) {
    case "list":
      console.log("List of all Products");
      let list;
      !productid
        ? (list = await getProducts())
        : (list = await getProductById(productid));
      console.log(list);
      break;
    case "add":
      const add = await addProduct(restData);
      console.log(add);
      break;
    case "addBatch":
      console.log("add a new batch of products");
      break;
    case "update":
      const update = { ...values };
      const updateResult = await updateProduct(productid, update);
      console.log(updateResult);
      break;
    case "delete":
      const deleteResult = await deleteProduct(productid);
      console.log(deleteResult);
      break;
    default:
      console.log("Wrong Command");
      console.log("Type 'node index.js help' to view all avialable prompts");
      break;
  }
};
export default productRouter;
