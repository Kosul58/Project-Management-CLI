import { response } from "express";
import cartServices from "../services/cartServices.js";

export const viewCart = async () => {
  try {
    const data = await cartServices.getProducts();
    return data;
  } catch (err) {
    console.log("Error in cart controller viewCart", err);
    return [];
  }
};

export const viewCartProduct = async (productid, userid) => {
  try {
    const data = await cartServices.getProductById(productid, userid);
    return data;
  } catch (err) {
    console.log("Error in cart controller viewCartProduct", err);
    return [];
  }
};

export const viewCartProducts = async (userid) => {
  try {
    const data = await cartServices.getProduct(userid);
    return data;
  } catch (err) {
    console.log("Error in cart controller viewCartProducts", err);
    return [];
  }
};

export const addProduct = async (userid, productId, quantity) => {
  try {
    if (!userid || !productId || !quantity) {
      return {
        message: "Provide all fields",
        response: [],
      };
    }
    const result = await cartServices.addProduct(userid, productId, quantity);

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
    console.log("Error in cart controller addProduct", err);
    return [];
  }
};

export const removeProduct = async (userid, productid) => {
  try {
    if (!userid) {
      return {
        message: "no userid",
        response: [],
      };
    }
    const result = await cartServices.removeProduct(userid, productid);

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
    console.log("Error in cart controller removeProduct", err);
    return [];
  }
};

// products = [productid1 , productid2 , ...]
export const removeSomeProduct = async (userid, products) => {
  try {
    if (!userid || products.length === 0) {
      return {
        message: "no userid and product ids",
        response: [],
      };
    }
    const result = await cartServices.removeSomeProduct(userid, products);
    if (result.length > 0) {
      return {
        message: "Products removal successfull",
        response: result,
      };
    } else {
      return {
        message: "Products removal unsuccessfull",
        response: [],
      };
    }
  } catch (err) {
    console.log("Error in cart controller removeSomeProduct", err);
    return [];
  }
};

export const removeAllProduct = async (userid) => {
  try {
    if (!userid) {
      return {
        message: "no userid",
        response: [],
      };
    }
    const result = await cartServices.removeAllProduct(userid);

    if (result.length > 0) {
      return {
        message: "Products removal successfull",
        response: result,
      };
    } else {
      return {
        message: "Products removal unsuccessfull",
        response: [],
      };
    }
  } catch (err) {
    console.log("Error in cart controller removeAllProduct", err);
    return [];
  }
};

// update = { price, quantity };

export const updateProduct = async (userid, productid, update) => {
  try {
    if (!userid || !productid || !update) {
      return {
        message: "Enter all fields",
        response: [],
      };
    }
    const result = await cartServices.updateProduct(userid, productid, update);
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
    console.log("Error in cart controller updateProduct", err);
    return [];
  }
};

export const calcTotal = async (userid) => {
  try {
    if (!userid)
      return {
        message: "enter userid",
        response: [],
      };
    const total = await cartServices.cartTotal(userid);
    if (total) {
      return { message: "Total of all products in the cart", response: total };
    } else {
      return {
        message: "Error in total price calculation",
        response: [],
      };
    }
  } catch (err) {
    console.log("error in cart controller calcTotal", err);
    return [];
  }
};
