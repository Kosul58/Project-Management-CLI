import {
  cancelAOrder,
  cancelOrder,
  createOrder,
  updateOrderStatus,
  viewOrders,
} from "../controllers/order.js";
import { parseOptions } from "../utils/utils.js";
const orderRouter = async (Command_Prompt) => {
  const values = parseOptions(Command_Prompt.slice(2));
  let { orderid, productid, userid, status } = values;
  switch (Command_Prompt[1]) {
    case "create":
      const createResult = await createOrder(userid, productid);
      console.log(createResult);
      break;
    case "list":
      const listResult = await viewOrders(userid);
      console.log(listResult);
      break;
    case "cancel":
      const cancelResult = await cancelOrder(orderid, userid);
      console.log(cancelResult);
      break;
    case "cancelaorder":
      const cancelOneOrder = await cancelAOrder(orderid, userid, productid);
      console.log(cancelOneOrder);
      break;
    case "statusupdate":
      const statusResult = await updateOrderStatus(orderid, userid, status);
      console.log(statusResult);
      break;
    default:
      console.log("wrong command");
      console.log("Type 'node index.js help' to view all avialable prompts");
      break;
  }
};
export default orderRouter;
