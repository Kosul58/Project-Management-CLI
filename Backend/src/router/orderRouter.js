import { parseOptions } from "../utils/utils.js";
const orderRouter = (Command_Prompt) => {
  switch (Command_Prompt[1]) {
    case "create":
      console.log("create");
      break;

    case "list":
      console.log("list");
      break;

    case "cancel":
      console.log("cancel");
      break;

    case "cancelaorder":
      console.log("cancel a order");
      break;

    case "statusupdate":
      console.log("update a order status");
      break;

    default:
      console.log("wrong command");
      console.log("Type 'node index.js help' to view all avialable prompts");
      break;
  }
};

export default orderRouter;
