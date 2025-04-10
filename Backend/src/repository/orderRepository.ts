import { readToFile, writeToFile } from "../utils/fileManager";

import { cartPath, orderPath } from "../utils/utils";

import { removeProduct } from "../controllers/cart";

import {
  increaseProductInventory,
  decreaseProductInventory,
} from "../controllers/product";
import { generateId, getCurrentDateTimeStamp } from "../utils/utils";
import { Cart } from "../common/cartType";
import { Order } from "../common/orderType";

const getOrder = async (userid: string): Promise<Order[]> => {
  try {
    const data: Order[] = await readToFile(orderPath);
    const userdata = data.filter((order) => order.userid === userid);
    if (userdata.length === 0) {
      console.log("No Order Found for the User");
      return [];
    }
    console.log("Order search complete");
    return userdata;
  } catch (err) {
    console.log("failed to search orders of user", err);
    throw err;
  }
};

function singleCartFilter(
  cartItems: Cart[],
  userid: string,
  productid: string
): Cart[] {
  return cartItems.filter(
    (item) => item.userid === userid && item.productid === productid
  );
}

function multipleCartFilter(
  cartItems: Cart[],
  userid: string,
  products: string[]
): Cart[] {
  return cartItems.filter(
    (item) => item.userid === userid && products.includes(item.productid)
  );
}

const orderTotal = (items: Cart[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartUpdate = async (products: string[], userid: string) => {
  for (let i = 0; i < products.length; i++) {
    await removeProduct(userid, products[i]);
  }
};

const inventoryIncrease = async (items: Cart[]) => {
  for (let { productid, quantity } of items) {
    // console.log(productid, quantity);
    await increaseProductInventory(productid, quantity);
  }
};
const inventoryDecrease = async (items: Cart[]) => {
  for (let { productid, quantity } of items) {
    // console.log(productid, quantity);
    await decreaseProductInventory(productid, quantity);
  }
};

const createOrder = (userid: string): Order => {
  return {
    orderid: generateId(),
    userid,
    timestamp: getCurrentDateTimeStamp(),
    status: "Order Successfully Placed",
    items: [],
    total: 0,
  };
};

const addOrder = async (
  userid: string,
  productid: string
): Promise<Order[]> => {
  try {
    let orders: Order[] = await readToFile(orderPath);
    let cartItems: Cart[] = await readToFile(cartPath);
    let items: Cart[] = singleCartFilter(cartItems, userid, productid);
    if (items.length === 0) {
      throw new Error("No matching products found in cart.");
    }
    const total: number = orderTotal(items);
    let order: Order = createOrder(userid);
    order.items = items;
    order.total = total;
    orders.push(order);
    await writeToFile(orderPath, orders);
    await cartUpdate([productid], userid);
    console.log("Order createad sucessfully");
    await inventoryDecrease(items);
    return orders;
  } catch (err) {
    console.log("Failed to add order for user", err);
    throw err;
  }
};

const addOrders = async (
  userid: string,
  products: string[]
): Promise<Order[]> => {
  try {
    let order: Order = createOrder(userid);
    let orders: Order[] = await readToFile(orderPath);
    let cartItems: Cart[] = await readToFile(cartPath);
    let items: Cart[] = multipleCartFilter(cartItems, userid, products);
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
    await inventoryDecrease(items);
    return orders;
  } catch (err) {
    console.log("Failed to add order", err);
    throw err;
  }
};

const orderFilter = (
  orders: Order[],
  orderid: string,
  userid: string,
  status: string
) => {
  return orders.map((order) => {
    if (order.orderid === orderid && order.userid === userid) {
      return { ...order, status };
    }
    return order;
  });
};

const updateOrderStatus = async (
  orderid: string,
  userid: string,
  status: string
): Promise<Order[]> => {
  try {
    let orders: Order[] = await readToFile(orderPath);
    orders = orderFilter(orders, orderid, userid, status);
    await writeToFile(orderPath, orders);
    console.log(
      `order status updated of order id ${orderid} and user id ${userid}`
    );
    return orders;
  } catch (err) {
    console.log("Failed to update order status", err);
    throw err;
  }
};

const removeOrders = async (
  orderid: string,
  userid: string
): Promise<Order[]> => {
  try {
    let orders: Order[] = await readToFile(orderPath);
    let canceledORder: Order | undefined = orders.find(
      (order) => order.orderid === orderid && order.userid === userid
    );
    orders = orders.filter((order) => {
      if (order.orderid !== orderid && order.userid !== userid) {
        return order;
      }
    });
    if (!canceledORder) {
      console.log("No orders to cancel");
      return [];
    }
    await inventoryIncrease(canceledORder.items);
    // console.log(orders);
    await writeToFile(orderPath, orders);
    console.log(`order canceled for order id ${orderid} and user id ${userid}`);
    return orders;
  } catch (err) {
    console.log("Failed to remove a order", err);
    throw err;
  }
};

const removeOrder = async (
  orderid: string,
  userid: string,
  productid: string
): Promise<Order[]> => {
  try {
    // console.log(orderid, userid, productid);
    let orders: Order[] = await readToFile(orderPath);
    // console.log(orders);
    console.log(orders);
    let order = orders.filter(
      (order) => order.orderid === orderid && order.userid === userid
    );
    console.log(order);
    let items = order[0].items.filter((item) => item.productid !== productid);
    console.log(items);
    let canceledItems = order[0].items.filter(
      (item) => item.productid === productid
    );

    // console.log(items, canceledItems);
    if (items.length !== 0) {
      orders = orders.map((order) => {
        if (order.orderid === orderid && order.userid === userid) {
          return { ...order, items };
        }
        return order;
      });
    } else {
      orders = orders.filter(
        (order) => order.orderid !== orderid && order.userid !== userid
      );
    }

    await inventoryIncrease(canceledItems);
    await writeToFile(orderPath, orders);
    console.log("Order of a product removed successfully");
    return orders;
  } catch (err) {
    console.log("Failed to remove the order of a product", err);
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
