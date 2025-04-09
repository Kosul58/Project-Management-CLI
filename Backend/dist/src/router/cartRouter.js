import {
  addProduct,
  removeProducts,
  removeProduct,
  viewCartProduct,
  calcTotal,
  viewCartProducts,
  updateProduct,
  viewCart,
} from "../controllers/cart.js";
import { parseOptions } from "../utils/utils.js";
const cartRouter = async (Command_Prompt) => {
  console.log(Command_Prompt);
  const values = parseOptions(Command_Prompt.slice(2));
  // console.log(Command_Prompt);
  console.log("vals", values);
  let { productid, userid, name, price, quantity, productids } = values;
  if (price !== undefined) price = Number(price);
  if (quantity !== undefined) quantity = Number(quantity);
  let update = values;
  switch (Command_Prompt[1]) {
    case "add":
      const addResult = await addProduct(userid, productid, quantity);
      console.log(addResult);
      break;
    case "remove":
      let removeResult;
      productid && userid
        ? (removeResult = await removeProduct(userid, productid))
        : (removeResult = await removeProducts(userid, productids));
      console.log(removeResult);
      break;
    case "view":
      let viewResult;
      if (!productid && !userid) viewResult = await viewCart();
      if (userid && productid)
        viewResult = await viewCartProduct(productid, userid);
      if (userid && !productid) viewResult = await viewCartProducts(userid);
      console.log(viewResult);
      break;
    case "total":
      const totalResult = await calcTotal(userid);
      console.log(totalResult);
      console.log(
        `Total price of all products in the cart of a user ${userid} is $${totalResult}`
      );
      break;
    case "update":
      let myUpdate = {
        name: update.name,
        price: update.price,
        quantity: Number(update.quantity),
        description: update.description,
        category: update.category,
      };
      const updateResult = await updateProduct(userid, productid, myUpdate);
      console.log(updateResult);
      break;
    default:
      console.log("Wrong command");
      console.log("Type 'node index.js help' to view all avialable prompts");
      break;
  }
};
export default cartRouter;
