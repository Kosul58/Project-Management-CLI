import { response } from "express";
import {
  addAProductToCartService,
  removeAProductFromCartService,
  getAllCartProducts,
  cartTotal,
  updateAProductInCartService,
  getAProductFromCartForAUser,
  getAllProductFromCartForAUser,
  removeAllProductFromCartForUserService,
  removeSomeProductFromCartForUserService,
} from "../services/cartServices.js";

export const viewCart = async () => {
  try {
    const data = await getAllCartProducts();
    return data;
  } catch (err) {
    console.log("Error in viewCart", err);
    return [];
  }
};

export const viewACartProductByUserId = async (productid, userid) => {
  try {
    const data = await getAProductFromCartForAUser(productid, userid);
    return data;
  } catch (err) {
    console.log("Error in viewACartProductByUserId", err);
    return [];
  }
};

export const viewAllCartProductByUserId = async (userid) => {
  try {
    const data = await getAllProductFromCartForAUser(userid);
    return data;
  } catch (err) {
    console.log("Error in viewAllCartProductsByUserId", err);
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

    const result = await addAProductToCartService(userid, productId, quantity);

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

export const removeAProductFromCartForUser = async (userid, productid) => {
  try {
    if (!userid) {
      return {
        message: "no userid",
        response: [],
      };
    }
    const result = await removeAProductFromCartService(userid, productid);

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
    console.log("Error in removeAProductFromCartForUser", err);
    return [];
  }
};

// products = [productid1 , productid2 , ...]
export const removeSomeProductFromCartForUser = async (userid, products) => {
  try {
    if (!userid || products.length === 0) {
      return {
        message: "no userid and product ids",
        response: [],
      };
    }
    const result = await removeSomeProductFromCartForUserService(
      userid,
      products
    );
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
    console.log("Error in removeSomeProductFromCartForUser", err);
    return [];
  }
};

export const removeAllProductFromCartForUser = async (userid) => {
  try {
    if (!userid) {
      return {
        message: "no userid",
        response: [],
      };
    }
    const result = await removeAllProductFromCartForUserService(userid);

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
    console.log("Error in removeAllProductFromCartForUser", err);
    return [];
  }
};

// update = { price, quantity };

export const updateAProductCart = async (userid, productid, update) => {
  try {
    if (!userid || !productid || !update) {
      return {
        message: "Enter all fields",
        response: [],
      };
    }
    const result = await updateAProductInCartService(userid, productid, update);
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
    if (!userid)
      return {
        message: "enter userid",
        response: [],
      };
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
