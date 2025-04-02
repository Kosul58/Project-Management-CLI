import { readToFile, writeToFile } from "../repository/fileManager.js";
import { cartPath, orderPath } from "../utils/utils.js";
import { generateId, getCurrentDateTimeStamp } from "../utils/utils.js";

import { updateAProductInventory } from "../controllers/product.js";
import { removeProductFromCart } from "../controllers/cart.js";

export const orderDisplayer = async (userid) => {
  try {
    const data = await readToFile(orderPath);
    if (!userid) {
      return data;
    } else {
      const userdata = result.filter((order) => order.userid === userid);
      return userdata;
    }
  } catch (err) {
    console.log("Error in orderDisplayer", err);
    throw err;
  }
};

const myOrder = (userid, items, total) => {
  return {
    orderid: generateId(),
    userid,
    items,
    total,
    timestamp: getCurrentDateTimeStamp(),
    status: "Order Successfully Places",
  };
};

function cartFilter(cartItems, userid) {
  return cartItems.filter((item) => item.userid === userid);
}

const orderTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartUpdate = async (products, userid) => {
  if (!products) {
    await removeProductFromCart(userid);
  } else {
    for (let i = 0; i < products.length; i++) {
      await removeProductFromCart(userid, products[i]);
    }
  }
};

const inventoryChange = async (items) => {
  for (let { productid, quantity } of items) {
    // console.log(productid, quantity);
    await updateAProductInventory(productid, quantity);
  }
};

export const orderAdder = async (userid, products) => {
  try {
    let orders = await readToFile(orderPath);
    let cartItems = await readToFile(cartPath);
    cartItems = cartFilter(cartItems, userid);
    let items;
    products
      ? (items = cartItems.filter((item) => products.includes(item.productid)))
      : (items = cartItems);

    if (items.length === 0) {
      console.error("No matching products found in cart.");
      return;
    }
    const total = orderTotal(items);
    const order = myOrder(userid, items, total);
    orders.push(order);
    await writeToFile(orderPath, orders);
    await cartUpdate(products, userid);
    console.log("Order createad sucessfully");
    await inventoryChange(items);
    return order;
  } catch (err) {
    console.log("Error in orderAdder", err);
    throw err;
  }
};

const orderFilter = (orders, orderid, userid, status) => {
  return orders.map((order) => {
    if (order.orderid === orderid && order.userid === userid) {
      return { ...order, status };
    }
    return order;
  });
};
export const orderStatusUpdater = async (orderid, userid, status) => {
  try {
    let orders = await readToFile(orderPath);
    orders = orderFilter(orders, orderid, userid, status);
    await writeToFile(orderPath, orders);
    console.log(
      `order status updated of order id ${orderid} and user id ${userid}`
    );
    return orders;
  } catch (err) {
    console.log("Error in orderStatusUpdater", err);
    throw err;
  }
};

async function updateManyInventory(canceledORder) {
  for (let { productid, quantity } of canceledORder.items) {
    // console.log(productid, quantity);
    await updateAProductInventory(productid, `${quantity}`);
  }
}

export const orderRemover = async (orderid, userid) => {
  try {
    let orders = await readToFile(orderPath);
    let canceledORder = orders.find(
      (order) => order.orderid === orderid && order.userid === userid
    );
    orders = orders.filter((order) => {
      if (order.orderid !== orderid && order.userid !== userid) {
        return order;
      }
    });
    await updateManyInventory(canceledORder);
    // console.log(orders);
    await writeToFile(orderPath, orders);
    console.log(`order canceled for order id ${orderid} and user id ${userid}`);
    return orders;
  } catch (err) {
    console.log("Error in orderRemover", err);
    throw err;
  }
};

async function updateSingleInventory(items) {
  for (let { productid, quantity } of items) {
    // console.log(productid, quantity);
    await updateAProductInventory(productid, `${quantity}`);
  }
}
export const singleOrderRemover = async (orderid, userid, productid) => {
  try {
    // console.log(orderid, userid, productid);
    let orders = await readToFile(orderPath);
    // console.log(orders);
    let order = orders.filter(
      (order) => order.orderid === orderid && order.userid === userid
    );

    let items = order[0].items.filter((item) => item.productid !== productid);

    let canceledItems = order[0].items.filter(
      (item) => item.productid === productid
    );

    // console.log(items, canceledItems);

    orders = orders.map((order) => {
      if (order.orderid === orderid && order.userid === userid) {
        return { ...order, items };
      }
      return order;
    });

    await updateSingleInventory(canceledItems);
    await writeToFile(orderPath, orders);
    return orders;
  } catch (err) {
    console.log("Error in singleOrderRemover", err);
    throw err;
  }
};
