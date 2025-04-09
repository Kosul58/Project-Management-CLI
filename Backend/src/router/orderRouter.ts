import {
  cancelAOrder,
  cancelOrder,
  createOrder,
  updateOrderStatus,
  viewOrders,
} from "../controllers/order.js";
import { parseOptions } from "../utils/utils";

import { ProductOptions } from "../types";

const orderRouter = async (Command_Prompt: string[]): Promise<void> => {
  const values: ProductOptions = parseOptions(Command_Prompt.slice(2));
  let { orderid, productid, userid, status } = values;

  switch (Command_Prompt[1]) {
    case "create":
      const createResult = await createOrder(
        userid as string,
        productid as string
      );
      console.log(createResult);
      break;

    case "list":
      const listResult = await viewOrders(userid as string);
      console.log(listResult);
      break;

    case "cancel":
      const cancelResult = await cancelOrder(
        orderid as string,
        userid as string
      );
      console.log(cancelResult);
      break;

    case "cancelaorder":
      const cancelOneOrder = await cancelAOrder(
        orderid as string,
        userid as string,
        productid as string
      );
      console.log(cancelOneOrder);
      break;

    case "statusupdate":
      const statusResult = await updateOrderStatus(
        orderid as string,
        userid as string,
        status as string
      );
      console.log(statusResult);
      break;

    default:
      console.log("wrong command");
      console.log("Type 'node index.js help' to view all avialable prompts");
      break;
  }
};

export default orderRouter;
