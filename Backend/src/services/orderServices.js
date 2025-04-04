import orderRepository from "../repository/orderRepository.js";

const getOrder = async (userid) => {
  try {
    const data = await orderRepository.getOrder(userid);
    return data;
  } catch (err) {
    console.log("Error in order service getOrder", err);
    throw err;
  }
};
const addOrder = async (userid, productid) => {
  try {
    const result = await orderRepository.addOrder(userid, productid);
    return result;
  } catch (err) {
    console.log("Error in order service addOrder", err);
    throw err;
  }
};

const addOrders = async (userid, products) => {
  try {
    const result = await orderRepository.addOrders(userid, products);
    return result;
  } catch (err) {
    console.log("Error in order service addOrders", err);
    throw err;
  }
};

const updateOrderStatus = async (orderid, userid, status) => {
  try {
    let orders = await orderRepository.updateOrderStatus(
      orderid,
      userid,
      status
    );
    return orders;
  } catch (err) {
    console.log("Error in order service updateOrderStatus", err);
    throw err;
  }
};

const removeOrders = async (orderid, userid) => {
  try {
    let orders = await orderRepository.removeOrders(orderid, userid);
    return orders;
  } catch (err) {
    console.log("Error in order service removeOrders", err);
    throw err;
  }
};

const removeOrder = async (orderid, userid, productid) => {
  try {
    // console.log(orderid, userid, productid);
    let orders = await orderRepository.removeOrder(orderid, userid, productid);
    return orders;
  } catch (err) {
    console.log("Error in order service removeOrder", err);
    throw err;
  }
};

export default {
  getOrder,
  addOrder,
  addOrders,
  removeOrders,
  removeOrder,
  updateOrderStatus,
};
