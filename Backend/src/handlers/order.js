import { promises as fsPromises } from "fs";
import {
  viewCart,
  addProductToCart,
  removeProductFromCart,
  calcTotal,
  updateAProductCart,
} from "./cart.js";

export const viewOrders = async (userid) => {
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

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// products = [productId1 , productId2]
export const createOrder = async (userid, products) => {
  try {
    let orders = await viewOrders();

    const order = {};
    order.id = generateId();
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

export const updateOrderStatus = async (orderid, userid, status) => {
  try {
    let orders = await viewOrders();
    orders = orders.map((order) => {
      if (order.id === orderid && order.userid === userid) {
        return { ...order, status };
      }
      return order;
    });
    // console.log(orders);

    await fsPromises.writeFile(
      "./src/database/data/orders.json",
      JSON.stringify(orders)
    );
    console.log(
      `order status updated of order id ${orderid} and user id ${userid}`
    );
  } catch (err) {
    console.log("Error in updateOrderStatus", err);
  }
};

export const cancelOrder = async (orderid, userid) => {
  try {
    let orders = await viewOrders();
    orders = orders.filter((order) => {
      if (order.id !== orderid && order.userid !== userid) {
        return order;
      }
    });
    // console.log(orders);
    await fsPromises.writeFile(
      "./src/database/data/orders.json",
      JSON.stringify(orders)
    );
    console.log(`order canceled for order id ${orderid} and user id ${userid}`);
  } catch (err) {
    console.log("Error in cancelOrder", err);
  }
};
