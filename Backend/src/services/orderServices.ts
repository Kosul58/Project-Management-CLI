import orderRepository from "../repository/orderRepository";
import { myOrder } from "../types";

const getOrder = async (userid: string): Promise<myOrder[]> => {
  try {
    const data = await orderRepository.getOrder(userid);
    return data;
  } catch (err) {
    console.log("Failed to get order data", err);
    throw err;
  }
};
const addOrder = async (
  userid: string,
  productid: string
): Promise<myOrder[]> => {
  try {
    const result = await orderRepository.addOrder(userid, productid);
    return result;
  } catch (err) {
    console.log("Failed to add order of single product", err);
    throw err;
  }
};

const addOrders = async (
  userid: string,
  products: string[]
): Promise<myOrder[]> => {
  try {
    const result = await orderRepository.addOrders(userid, products);
    return result;
  } catch (err) {
    console.log("Failed to add order of multiple products", err);
    throw err;
  }
};

const updateOrderStatus = async (
  orderid: string,
  userid: string,
  status: string
): Promise<myOrder[]> => {
  try {
    let orders = await orderRepository.updateOrderStatus(
      orderid,
      userid,
      status
    );
    return orders;
  } catch (err) {
    console.log("failed to update order status", err);
    throw err;
  }
};

//to remove a whole order
const removeOrders = async (
  orderid: string,
  userid: string
): Promise<myOrder[]> => {
  try {
    let orders = await orderRepository.removeOrders(orderid, userid);
    return orders;
  } catch (err) {
    console.log("Failed to remove order", err);
    throw err;
  }
};

// to remove a product from the order
const removeOrder = async (
  orderid: string,
  userid: string,
  productid: string
): Promise<myOrder[]> => {
  try {
    // console.log(orderid, userid, productid);
    let orders = await orderRepository.removeOrder(orderid, userid, productid);
    return orders;
  } catch (err) {
    console.log("Failed to remove product from order", err);
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
