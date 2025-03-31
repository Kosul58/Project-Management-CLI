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

// Product Operations

// Display all products
// const data = await getProductList();
// console.log(data);

// Add a new product
// addAProduct("Kosul", 55);

// Update a product
// updateAProduct(11, "kaspers", 555);

// Delete a product
// deleteAProduct(11);

// update a product Inventory
// updateAProductInventory(2, 2);

// Cart operations

// View all products in the cart
// const data = await viewCart();
// console.log(data);

// Add a product to the cart
// addProductToCart(1, 10);

// update a product in the cart
// updateAProductCart(1, { price: 1500, quantity: 50 });

// to remove a product from the cart
// removeProductFromCart(2);

// to calculate total cost
// const total = await calcTotal();
// console.log(`Total price = $${total}`);

// Order Operations

const viewOrders = async (userid) => {
  try {
    const orders = await fsPromises.readFile(
      "./src/database/data/orders.json",
      "utf8"
    );
    const result = await JSON.parse(orders);
    if (!userid) {
      return result;
    } else {
      const data = result.filter((order) => order.userid === userid);
      return data;
    }
  } catch (err) {
    console.log("Error in viewOrders", err);
  }
};

function getCurrentDateTimeStamp() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}-${hours}:${minutes}`;
}

// products = [productId1 , productId2]
const createOrder = async (userid, products) => {
  try {
    let orders = await viewOrders();

    const order = {};
    order.id = orders.length + 1;
    order.userid = userid;

    const cartItems = await viewCart();

    const items = cartItems.filter((item) => products.includes(item.id));

    if (items.length === 0) {
      console.error("No matching products found in cart.");
      return;
    }

    order.items = items;

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    order.total = total;
    order.timestamp = getCurrentDateTimeStamp();
    order.status = "";
    orders.push(order);
    await fsPromises.writeFile(
      "./src/database/data/orders.json",
      JSON.stringify(orders)
    );
  } catch (err) {
    console.log("Error in createOrder", err);
  }
};

const updateOrderStatus = async (orderid, userid) => {
  try {
  } catch (err) {
    console.log("Error in updateOrderStatus", err);
  }
};

const cancelOrder = async (orderid, userid) => {
  try {
  } catch (err) {
    console.log("Error in cancelOrder", err);
  }
};

// to view total orders
// console.log(await viewOrders())

// to view orders based on userid
// console.log(await viewOrders(1125));

// to create a new order
// createOrder(2015, [1]);
