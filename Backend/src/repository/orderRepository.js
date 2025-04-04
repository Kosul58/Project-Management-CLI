import { readToFile, writeToFile } from "../utils/fileManager.js";
import { cartPath, orderPath } from "../utils/utils.js";
import { removeProduct } from "../controllers/cart.js";
import { updateProductInventory } from "../controllers/product.js";
import { generateId, getCurrentDateTimeStamp } from "../utils/utils.js";

const getOrder = async (userid) => {
  try {
    const data = await readToFile(orderPath);
    const userdata = data.filter((order) => order.userid === userid);
    if (userdata.length === 0) return "No Order Found for the User";
    return userdata;
  } catch (err) {
    console.log("error in order repository getOrder", err);
    throw err;
  }
};

function singleCartFilter(cartItems, userid, productid) {
  return cartItems.filter(
    (item) => item.userid === userid && item.productid === productid
  );
}

function multipleCartFilter(cartItems, userid, products) {
  return cartItems.filter(
    (item) => item.userid === userid && products.includes(item.productid)
  );
}
const orderTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartUpdate = async (products, userid) => {
  for (let i = 0; i < products.length; i++) {
    await removeProduct(userid, products[i]);
  }
};

const inventoryChange = async (items) => {
  for (let { productid, quantity } of items) {
    // console.log(productid, quantity);
    await updateProductInventory(productid, quantity);
  }
};

const myOrder = (userid) => {
  return {
    orderid: generateId(),
    userid,
    timestamp: getCurrentDateTimeStamp(),
    status: "Order Successfully Placed",
  };
};

const addOrder = async (userid, productid) => {
  try {
    let order = myOrder(userid);
    let orders = await readToFile(orderPath);
    let cartItems = await readToFile(cartPath);
    let items = singleCartFilter(cartItems, userid, productid);
    if (items.length === 0) {
      throw new Error("No matching products found in cart.");
    }
    const total = orderTotal(items);
    order.items = items;
    order.total = total;
    orders.push(order);
    await writeToFile(orderPath, orders);
    await cartUpdate([productid], userid);
    console.log("Order createad sucessfully");
    await inventoryChange(items);
    return order;
  } catch (err) {
    console.log("error in order repository addOrder", err);
    throw err;
  }
};

const addOrders = async (userid, products) => {
  try {
    let order = myOrder(userid);
    let orders = await readToFile(orderPath);
    let cartItems = await readToFile(cartPath);
    let items = multipleCartFilter(cartItems, userid, products);
    if (items.length === 0) {
      throw new Error("No matching products found in cart.");
    }
    const total = orderTotal(items);
    order.items = items;
    order.total = total;
    orders.push(order);
    await writeToFile(orderPath, orders);
    await cartUpdate(products, userid);
    console.log("Order createad sucessfully");
    await inventoryChange(items);
    return order;
  } catch (err) {
    console.log("error in order repository addOrders", err);
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

const updateOrderStatus = async (orderid, userid, status) => {
  try {
    let orders = await readToFile(orderPath);
    orders = orderFilter(orders, orderid, userid, status);
    await writeToFile(orderPath, orders);
    console.log(
      `order status updated of order id ${orderid} and user id ${userid}`
    );
    return orders;
  } catch (err) {
    console.log("error in order repository updateOrderStatus", err);
    throw err;
  }
};

async function updateInventory(items) {
  for (let { productid, quantity } of items) {
    // console.log(productid, quantity);
    await updateProductInventory(productid, `${quantity}`);
  }
}
const removeOrders = async (orderid, userid) => {
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
    await updateInventory(canceledORder.items);
    // console.log(orders);
    await writeToFile(orderPath, orders);
    console.log(`order canceled for order id ${orderid} and user id ${userid}`);
    return orders;
  } catch (err) {
    console.log("error in order repostitory removeOrders", err);
    throw err;
  }
};

const removeOrder = async (orderid, userid, productid) => {
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

    await updateInventory(canceledItems);
    await writeToFile(orderPath, orders);
    return orders;
  } catch (err) {
    console.log("error in order repository removeOrder", err);
    throw err;
  }
};

export default {
  addOrder,
  addOrders,
  getOrder,
  removeOrder,
  removeOrders,
  updateOrderStatus,
};
