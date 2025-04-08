import cartRouter from "./src/router/cartRouter";
import orderRouter from "./src/router/orderRouter";
import productRouter from "./src/router/productRouter";
import { helpinfo } from "./src/utils/utils";
const Command_Prompt = process.argv.slice(2);
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
    default:
        console.log("Invalid Prompt");
        console.log("Type 'node index.js help' to view all avialable prompts");
}
