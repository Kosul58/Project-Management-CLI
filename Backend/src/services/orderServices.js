import { generateId, getCurrentDateTimeStamp } from "../utils/utils.js";

import {
  addAOrderToDb,
  addBatchOrderToDb,
  getOrderForUserFromDb,
  removeOrderFromDb,
  removeSingleOrderFromDb,
  updateOrderStatusInDb,
} from "../repository/orderRepository.js";

export const getOrderForUser = async (userid) => {
  try {
    const data = await getOrderForUserFromDb(userid);
    return data;
  } catch (err) {
    console.log("Error in getOrderForUser", err);
    throw err;
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

export const addAOrderService = async (userid, productid) => {
  try {
    const order = myOrder(userid);
    const result = await addAOrderToDb(order, userid, productid);
    return result;
  } catch (err) {
    console.log("Error in addOrderService", err);
    throw err;
  }
};

export const addBatchOrderService = async (userid, products) => {
  try {
    const order = myOrder(userid);
    const result = await addBatchOrderToDb(order, userid, products);
    return result;
  } catch (err) {
    console.log("Error in addBatchOrderService", err);
    throw err;
  }
};

export const updateOrderStatusService = async (orderid, userid, status) => {
  try {
    let orders = await updateOrderStatusInDb(orderid, userid, status);
    return orders;
  } catch (err) {
    console.log("Error in updateOrderStatusService", err);
    throw err;
  }
};

export const removeOrderService = async (orderid, userid) => {
  try {
    let orders = await removeOrderFromDb(orderid, userid);
    return orders;
  } catch (err) {
    console.log("Error in removeOrderService", err);
    throw err;
  }
};

export const removeASingleOrderService = async (orderid, userid, productid) => {
  try {
    // console.log(orderid, userid, productid);
    let orders = await removeSingleOrderFromDb(orderid, userid, productid);
    return orders;
  } catch (err) {
    console.log("Error in removeASingleOrderService", err);
    throw err;
  }
};
