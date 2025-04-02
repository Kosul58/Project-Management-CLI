import { response } from "express";
import {
  cartAdder,
  cartDeleter,
  cartDisplayer,
  cartTotal,
  cartUpdater,
} from "../services/cartServices.js";

export const viewCart = async () => {
  try {
    const data = await cartDisplayer();
    return data;
  } catch (err) {
    console.log("Error in viewCart", err);
    return [];
  }
};

export const addProductToCart = async (userid, productId, quantity) => {
  try {
    if (!userid || !productId || !quantity) {
      return {
        message: "Provide all fields",
        response: [],
      };
    }

    const result = await cartAdder(userid, productId, quantity);

    if (result.length > 0) {
      return {
        message: "Product addition to cart successfully",
        response: result,
      };
    } else {
      return {
        message: "Product addition to cart unsuccessfully",
        response: [],
      };
    }
  } catch (err) {
    console.log("Error in addProductToCart", err);
    return [];
  }
};

export const removeProductFromCart = async (userid, id) => {
  try {
    if (!userid) {
      return {
        message: "no userid",
        response: [],
      };
    }
    const result = await cartDeleter(userid, id);

    if (result.length > 0) {
      return {
        message: "Product removal successfull",
        response: result,
      };
    } else {
      return {
        message: "Product removal unsuccessfull",
        response: [],
      };
    }
  } catch (err) {
    console.log("Error in removeProductFromCart", err);
    return [];
  }
};

// update = { price, quantity };

export const updateAProductCart = async (userid, id, update) => {
  try {
    if (!userid || !id || !update) {
      return {
        message: "Enter all fields",
        response: [],
      };
    }
    const result = await cartUpdater(userid, id, update);
    if (result.length > 0) {
      return {
        message: "Product update successfull",
        response: result,
      };
    } else {
      return {
        message: "Product update unsuccessfull",
        response: [],
      };
    }
  } catch (err) {
    console.log("Error in updateAProduct", err);
    return [];
  }
};

export const calcTotal = async (userid) => {
  try {
    const total = await cartTotal(userid);
    if (total) {
      return { message: "Total of all products in the cart", response: total };
    } else {
      return {
        message: "Error in total price calculation",
        response: [],
      };
    }
  } catch (err) {
    console.log("error in calcTotal", err);
    return [];
  }
};
