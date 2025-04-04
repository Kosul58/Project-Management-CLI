import {
  addProduct,
  removeAllProduct,
  removeProduct,
  viewCartProduct,
  calcTotal,
  viewCartProducts,
  updateProduct,
  viewCart,
} from "../controllers/cart.js";

import { parseOptions } from "../utils/utils.js";
const cartRouter = async (Command_Prompt) => {
  const values = parseOptions(Command_Prompt.slice(2));
  let { productid, userid, price, quantity } = values;
  price = Number(price);
  quantity = Number(quantity);
  let update = { ...values };
  switch (Command_Prompt[1]) {
    case "add":
      const addResult = await addProduct(userid, productid, quantity);
      console.log(addResult);
      break;
    case "remove":
      let removeResult;
      productid && userid
        ? (removeResult = await removeProduct(userid, productid))
        : (removeResult = await removeAllProduct(userid));
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
        `Total price of all products in the cart of a user ${userid} is $${totalResult.response}`
      );
      break;

    case "update":
      const updateResult = await updateProduct(userid, productid, update);
      console.log(updateResult);
      break;

    default:
      console.log("Wrong command");
      console.log("Type 'node index.js help' to view all avialable prompts");
      break;
  }
};

export default cartRouter;
