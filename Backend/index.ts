import cartRouter from "./src/router/cli_routes/cartRouter.js";
import orderRouter from "./src/router/cli_routes/orderRouter.js";
import productRouter from "./src/router/cli_routes/productRouter.js";
import categoryRouter from "./src/router/cli_routes/categoryRouter.js";
import { helpinfo } from "./src/utils/constants.js";
import userRouter from "./src/router/cli_routes/userRouter.js";
const Command_Prompt: string[] = process.argv.slice(2);
console.log(Command_Prompt);
switch (Command_Prompt[0]) {
  case "help":
    console.log("Help Part");
    console.log(helpinfo);
    break;
  case "product":
    console.log("Product Part");
    productRouter(Command_Prompt);
    break;
  case "cart":
    console.log("Cart Part");
    cartRouter(Command_Prompt);
    break;
  case "order":
    console.log("Order Part");
    orderRouter(Command_Prompt);
    break;
  case "category":
    console.log("Category Part");
    categoryRouter(Command_Prompt);
    break;
  case "user":
    console.log("User Part");
    userRouter(Command_Prompt);
    break;
  default:
    console.log("Invalid Prompt");
    console.log("Type 'node index.js help' to view all avialable prompts");
}
