import { promises as fsPromises } from "fs";

import {
  getProductList,
  addAProduct,
  updateAProduct,
  deleteAProduct,
  updateAProductInventory,
} from "./src/handlers/product.js";

import {
  viewCart,
  addProductToCart,
  removeProductFromCart,
  calcTotal,
  updateAProductCart,
} from "./src/handlers/cart.js";

import {
  createOrder,
  viewOrders,
  updateOrderStatus,
  cancelOrder,
} from "./src/handlers/order.js";

// Product Operations

// Display all products
// const data = await getProductList();
// console.log(data);

// Add a new product
// addAProduct("Kosul", 55);

// Update a product
// updateAProduct("m8wzk6l9p5npgvh17qj", "kaspers", 555);

// Delete a product
// deleteAProduct(10);

// update a product Inventory
// updateAProductInventory(2, 2);

// Cart operations

// View all products in the cart
// const data = await viewCart();
// console.log(data);

// Add a product to the cart
// addProductToCart(5, 10);

// update a product in the cart
// updateAProductCart(1, { price: 1500, quantity: 50 });

// to remove a product from the cart
// removeProductFromCart(5);

// to calculate total cost
// const total = await calcTotal();
// console.log(`Total price = $${total}`);

// Order Operations

// to view total orders
// console.log(await viewOrders())

// to view orders based on userid
// console.log(await viewOrders(1125));

// to create a new order
// createOrder(2018, [1, 5]);

// to update a order status
// updateOrderStatus(3, 1015, "done");

// to cancel order
// cancelOrder(4, 2015);
