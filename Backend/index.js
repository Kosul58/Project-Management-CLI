import cartRouter from "./src/router/cartRouter.js";
import orderRouter from "./src/router/orderRouter.js";
import productRouter from "./src/router/productRouter.js";
import { helpinfo } from "./src/utils/utils.js";
const Command_Prompt = process.argv.slice(2);

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

// import { promises as fsPromises } from "fs";
// import {
//   getProductList,
//   getProductByID,
//   addAProduct,
//   addABatchOfProducts,
//   updateAProduct,
//   deleteAProduct,
//   updateAProductInventory,
// } from "./src/controllers/product.js";
// import {
//   viewCart,
//   viewACartProductByUserId,
//   viewAllCartProductByUserId,
//   addProductToCart,
//   removeAProductFromCartForUser,
//   removeSomeProductFromCartForUser,
//   removeAllProductFromCartForUser,
//   calcTotal,
//   updateAProductCart,
// } from "./src/controllers/cart.js";
// import {
//   createSingleOrder,
//   createBatchOrder,
//   viewOrders,
//   updateOrderStatus,
//   cancelOrder,
//   cancelAOrder,
// } from "./src/controllers/order.js";
// let args = process.argv.slice(2);
// // node ra index.js remove garna
// console.log(args);

// // product || cart || order differentiator
// let x = args[0];

// // operations differentiator
// let y = args[1];

// if (x === "product" || x.toLowerCase() === "product") {
//   console.log("product part");
//   let productid = args[2];
//   let name = args[4];
//   let price = Number(args[6]);
//   if (y === "list") {
//     // node index.js product list
//     const data = await getProductList();
//     console.log(data.message, data.response);
//   } else if (y === "add") {
//     //node index.js product add --name "Laptop" --price 999.99 --inventory 500
//     let inventory = args[7];
//     name = args[3];
//     price = Number(args[5]);
//     console.log(name, price);
//     if (productid && name && price) addAProduct(name, price, inventory);
//   } else if (y === "update") {
//     // node index.js product update <productId> --name "Gaming Laptop" --price 1299.99
//     console.log(`productid ${productid} name ${name} price ${price}`);
//     if (productid && name && price) updateAProduct(productid, { name, price });
//   } else if (y === "delete") {
//     // node index.js product delete <productId>
//     if (productid) deleteAProduct(productid);
//   } else {
//     console.log("wrong comand");
//   }
// } else if (x === "order" || x.toLowerCase() === "order") {
//   let userid = args[3];
//   let productid = args[5];
//   console.log("order part");
//   if (y === "create") {
//     // node index.js order create --userId user123 --productid product123
//     if (productid && userid) {
//       // console.log(userid, productid);
//       createOrder(userid, [productid]);
//     } else if (userid) {
//       // console.log(userid);
//       createOrder(userid);
//     }
//   } else if (y === "list") {
//     // node index.js order list
//     const data = await viewOrders();
//     console.log(data);
//   } else if (y === "cancel") {
//     // node index.js order cancel <userid> <orderid>
//     //cancels all order for a given orderid and userid
//     userid = args[2];
//     let orderid = args[3];
//     if (orderid && userid) cancelOrder(orderid, userid);
//   } else if (y === "cancelaorder") {
//     // node index.js order cancelaorder <userid> <orderid> <productid>
//     userid = args[2];
//     let orderid = args[3];
//     productid = args[4];
//     if (userid && orderid && productid)
//       cancelAOrder(orderid, userid, productid);
//     // cancelAORder("m8wzroo6dpruojup3tv", "2018", "1");
//   } else if (y === "statusupdate") {
//     // node index.js order statusupdate <userid> <orderid> --status pending
//     userid = args[2];
//     let orderid = args[3];
//     let status = args[5];
//     if (userid && orderid && status) updateOrderStatus(orderid, userid, status);
//   } else {
//     console.log("wrong comand");
//   }
// } else if (x === "cart" || x.toLowerCase() === "cart") {
//   console.log("cart part");
//   let productid, userid, quantity;
//   productid = args[3];
//   userid = args[2];
//   quantity = Number(args[5]);
//   if (y === "add") {
//     // node index.js cart add <userId> <productId> --quantity 2
//     if (productid && userid && quantity)
//       addProductToCart(userid, productid, quantity);
//   } else if (y === "remove") {
//     // node index.js cart remove <userId> <productId>
//     if (userid && !productid) removeProductFromCart(userid);
//     if (userid && productid) removeProductFromCart(userid, productid);
//   } else if (y === "view") {
//     // node index.js cart view
//     const data = await viewCart();
//     console.log(data);
//   } else if (y === "total") {
//     // node index.js cart total
//     const data = await calcTotal();
//     console.log(`The total cost of all the items in the cart file is $${data}`);
//   } else if (y === "update") {
//     // node index.js cart update <userid> <productid> --price 1000 --quanity 5
//     let update = {};
//     update.price = Number(args[5]);
//     update.quantity = Number(args[7]);
//     await updateAProductCart(userid, productid, update);
//     // if (update) console.log("update:", update);
//   } else {
//     console.log("wrong comand");
//   }
// } else {
//   console.log("Invalid command");
// }
