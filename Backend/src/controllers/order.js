import {
  addAOrderService,
  getOrderForUser,
  removeOrderService,
  updateOrderStatusService,
  removeASingleOrderService,
  addBatchOrderService,
} from "../services/orderServices.js";

export const viewOrders = async (userid) => {
  try {
    const result = await getOrderForUser(userid);
    if (!result) {
      throw new Error("error fetching order data");
    }
    return result;
  } catch (err) {
    console.log("Error in viewOrders", err);
    return [];
  }
};

export const createSingleOrder = async (userid, productid) => {
  try {
    if (!userid) return { message: "Userid required", response: [] };
    const result = await addAOrderService(userid, productid);
    if (!result || Object.keys(result).length === 0) {
      return { message: "Order creation unsuccessfull", response: [] };
    }
    return { message: "Order creation successfull", response: result };
  } catch (err) {
    console.log("Error in createOrder", err);
    return [];
  }
};

// products = [productId1 , productId2]
export const createBatchOrder = async (userid, products) => {
  try {
    if (!userid || products.length < 1)
      return { message: "Userid and products array required", response: [] };

    const result = await addBatchOrderService(userid, products);

    if (!result || Object.keys(result).length === 0) {
      return { message: "Order creation unsuccessfull", response: [] };
    }
    return { message: "Order creation successfull", response: result };
  } catch (err) {
    console.log("Error in createOrder", err);
    return [];
  }
};

export const updateOrderStatus = async (orderid, userid, status) => {
  try {
    if (!orderid || !userid || !status) {
      return {
        message: "enter all fields",
        response: [],
      };
    }
    const result = await updateOrderStatusService(orderid, userid, status);
    if (result.length > 0) {
      return {
        message: "Order status update successfull",
        response: result,
      };
    } else {
      return {
        message: "Order status update unsuccessfull",
        response: [],
      };
    }
  } catch (err) {
    console.log("Error in updateOrderStatus", err);
    return [];
  }
};

//cancels all orders for a given orderid
export const cancelOrder = async (orderid, userid) => {
  try {
    if (!userid || !orderid)
      return {
        message: "Enter all fields",
        response: [],
      };
    const result = await removeOrderService(orderid, userid);
    // console.log(result);
    if (result.length >= 0) {
      return {
        response: "Order removal successfull",
        return: result,
      };
    } else {
      return {
        response: "Order removal unsuccessfull",
        return: [],
      };
    }
  } catch (err) {
    console.log("Error in cancelOrder", err);
    return [];
  }
};

// cancels a specific order based on orderid + userid + productid
export const cancelAOrder = async (orderid, userid, productid) => {
  try {
    if (!orderid || !userid || !productid) {
      return {
        message: "Enter all fields",
        response: [],
      };
    }
    const result = await removeASingleOrderService(orderid, userid, productid);
    return result;
  } catch (err) {
    console.log("Error in cancelAOrder", err);
  }
};
