import orderServices from "../services/orderServices";
import { orderResponse } from "../types";

export const viewOrders = async (
  userid: string
): Promise<orderResponse | []> => {
  try {
    const result = await orderServices.getOrder(userid);
    if (!result) {
      throw new Error("error fetching order data");
    }
    return {
      message: "Order search sucessfull",
      response: result,
    };
  } catch (err) {
    console.log("Failed to search for orders", err);
    return [];
  }
};

export const createOrder = async (
  userid: string,
  productid: string
): Promise<orderResponse | []> => {
  try {
    if (!userid) return { message: "Userid required", response: [] };
    const result = await orderServices.addOrder(userid, productid);
    if (!result || Object.keys(result).length === 0) {
      return { message: "Order creation unsuccessfull", response: [] };
    }
    return { message: "Order creation successfull", response: result };
  } catch (err) {
    console.log("Failed to create an order of a product", err);
    return [];
  }
};

// products = [productId1 , productId2]
export const createOrders = async (
  userid: string,
  products: string[]
): Promise<orderResponse | []> => {
  try {
    if (!userid || products.length < 1)
      return { message: "Userid and products array required", response: [] };

    const result = await orderServices.addOrders(userid, products);

    if (!result || Object.keys(result).length === 0) {
      return { message: "Order creation unsuccessfull", response: [] };
    }
    return { message: "Order creation successfull", response: result };
  } catch (err) {
    console.log("Failed to create order of multiple products", err);
    return [];
  }
};

export const updateOrderStatus = async (
  orderid: string,
  userid: string,
  status: string
): Promise<orderResponse | []> => {
  try {
    if (!orderid || !userid || !status) {
      return {
        message: "enter all fields",
        response: [],
      };
    }
    const result = await orderServices.updateOrderStatus(
      orderid,
      userid,
      status
    );
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
    console.log("Failed to update order status", err);
    return [];
  }
};

//cancels all orders for a given orderid
export const cancelOrder = async (
  orderid: string,
  userid: string
): Promise<orderResponse | []> => {
  try {
    if (!userid || !orderid)
      return {
        message: "Enter all fields",
        response: [],
      };
    const result = await orderServices.removeOrders(orderid, userid);
    // console.log(result);
    if (result.length >= 0) {
      return {
        message: "Order removal successfull",
        response: result,
      };
    } else {
      return {
        message: "Order removal unsuccessfull",
        response: [],
      };
    }
  } catch (err) {
    console.log("Failed to cancel a order", err);
    return [];
  }
};

// cancels a specific order based on orderid + userid + productid
export const cancelAOrder = async (
  orderid: string,
  userid: string,
  productid: string
): Promise<orderResponse | []> => {
  try {
    if (!orderid || !userid || !productid) {
      return {
        message: "Enter all fields",
        response: [],
      };
    }
    const result = await orderServices.removeOrder(orderid, userid, productid);
    if (result.length > 0) {
      return {
        message: "Order of a product canceled successfully",
        response: result,
      };
    } else {
      return {
        message: "Cancelation of a product order unsuccessfull",
        response: [],
      };
    }
  } catch (err) {
    console.log("Failed to cancel the order of a product", err);
    return [];
  }
};
