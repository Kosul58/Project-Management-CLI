import {
  addProduct,
  removeProducts,
  removeProduct,
  viewCartProduct,
  calcTotal,
  viewCartProducts,
  updateProduct,
  viewCart,
} from "../controllers/cart";

import { ProductOptions } from "../common/productType";
import { UpdateCart } from "../common/cartType";
import { parseOptions } from "../utils/utils";

const cartRouter = async (Command_Prompt: string[]): Promise<void> => {
  console.log(Command_Prompt);
  const values: ProductOptions = parseOptions(Command_Prompt.slice(2));
  // console.log(Command_Prompt);
  console.log("vals", values);
  let { productid, userid, name, price, quantity, productids } = values;
  if (price !== undefined) price = Number(price);
  if (quantity !== undefined) quantity = Number(quantity);
  let update = values;
  switch (Command_Prompt[1]) {
    case "add":
      const addResult = await addProduct(
        userid as string,
        productid as string,
        quantity as number
      );
      console.log(addResult);
      break;
    case "remove":
      let removeResult;
      productid && userid
        ? (removeResult = await removeProduct(userid, productid))
        : (removeResult = await removeProducts(userid as string, productids));
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
      const totalResult = await calcTotal(userid as string);
      console.log(totalResult);
      console.log(
        `Total price of all products in the cart of a user ${userid} is $${totalResult}`
      );
      break;

    case "update":
      let myUpdate: UpdateCart = {
        quantity: Number(update.quantity),
      };
      const updateResult = await updateProduct(
        userid as string,
        productid as string,
        myUpdate
      );
      console.log(updateResult);
      break;

    default:
      console.log("Wrong command");
      console.log("Type 'node index.js help' to view all avialable prompts");
      break;
  }
};

export default cartRouter;
