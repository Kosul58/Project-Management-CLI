import { promises as fsPromises } from "fs";
import {
  viewCart,
  addProductToCart,
  removeProductFromCart,
  calcTotal,
  updateAProductCart,
} from "./cart.js";

import {
  readOrderFile,
  writeOrderFile,
  generateId,
  getCurrentDateTimeStamp,
} from "./fileFuncs.js";
import { json } from "stream/consumers";

export const viewOrders = async (userid) => {
  try {
    const result = await readOrderFile();
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

// products = [productId1 , productId2]
export const createOrder = async (userid, products) => {
  try {
    let orders = await viewOrders();
    const order = {};
    order.orderid = generateId();
    order.userid = userid;
    let cartItems = await viewCart();
    cartItems = cartItems.filter((item) => item.userid === userid);
    let items;
    products
      ? (items = cartItems.filter((item) => products.includes(item.productid)))
      : (items = cartItems);

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
    await writeOrderFile(orders);

    if (!products) {
      await removeProductFromCart(userid);
    } else {
      for (let i = 0; i < products.length; i++) {
        await removeProductFromCart(userid, products[i]);
      }
    }
  } catch (err) {
    console.log("Error in createOrder", err);
  }
};

export const updateOrderStatus = async (orderid, userid, status) => {
  try {
    let orders = await viewOrders();
    orders = orders.map((order) => {
      if (order.orderid === orderid && order.userid === userid) {
        return { ...order, status };
      }
      return order;
    });
    console.log(orders);

    await writeOrderFile(orders);
    console.log(
      `order status updated of order id ${orderid} and user id ${userid}`
    );
  } catch (err) {
    console.log("Error in updateOrderStatus", err);
  }
};
//cancels all orders for a given orderid
export const cancelOrder = async (orderid, userid) => {
  try {
    let orders = await viewOrders();
    orders = orders.filter((order) => {
      if (order.orderid !== orderid && order.userid !== userid) {
        return order;
      }
    });
    // console.log(orders);

    await writeOrderFile(orders);
    console.log(`order canceled for order id ${orderid} and user id ${userid}`);
  } catch (err) {
    console.log("Error in cancelOrder", err);
  }
};

// cancels a specific order based on orderid + userid + productid
export const cancelAORder = async (orderid, userid, productid) => {
  try {
    let orders = await viewOrders();
    console.log(orders);
    let order = orders.filter(
      (order) => order.orderid === orderid && order.userid === userid
    );
    let items = order[0].items.filter((item) => item.productid !== productid);

    orders = orders.map((order) => {
      if (order.orderid === orderid && order.userid === userid) {
        return { ...order, items };
      }
      return order;
    });

    await writeOrderFile(orders);
  } catch (err) {
    console.log("Error in cancelAOrder", err);
  }
};
