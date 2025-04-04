import {
  addProduct,
  deleteProduct,
  getProductById,
  getProductList,
  updateProduct,
} from "../controllers/product.js";

import { parseOptions } from "../utils/utils.js";

const productRouter = async (Command_Prompt) => {
  const values = parseOptions(Command_Prompt.slice(2));

  // console.log(values);
  let { productid, name, price, inventory } = values;
  price = Number(price);

  inventory = Number(inventory);

  switch (Command_Prompt[1]) {
    case "list":
      console.log("List of all Products");
      let list;
      !productid
        ? (list = await getProductList())
        : (list = await getProductById(productid));
      console.log(list);
      break;

    case "add":
      const add = await addProduct(name, price, inventory);
      console.log(add);
      break;

    case "addBatch":
      console.log("add a new product");
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
