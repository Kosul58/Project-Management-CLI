import {
  addAProductToCartInDb,
  getAllCartProductsFromDb,
  getAllProductFromCartForUserInDb,
  getAProductFromCartForUserInDb,
  totalCartPrice,
  updateAProductInCartInDb,
  removeAProductInCartFromDb,
  removeAllProductInCartFromDb,
  removeSomeProductInCartFromDb,
} from "../repository/cartRepository.js";

export const getAllCartProducts = async () => {
  try {
    const result = await getAllCartProductsFromDb();
    return result;
  } catch (err) {
    console.log("Error in getAllCartProducts", err);
    throw err;
  }
};

export const getAProductFromCartForAUser = async (productid, userid) => {
  try {
    const result = await getAProductFromCartForUserInDb(productid, userid);
    return result;
  } catch (err) {
    console.log("Error in getAProductFromCart", err);
    throw err;
  }
};

export const getAllProductFromCartForAUser = async (userid) => {
  try {
    const result = await getAllProductFromCartForUserInDb(userid);
    return result;
  } catch (err) {
    console.log("Error in getAProductFromCart", err);
    throw err;
  }
};

export const addAProductToCartService = async (userid, productId, quantity) => {
  try {
    const cartItems = await addAProductToCartInDb(userid, productId, quantity);
    return cartItems;
  } catch (err) {
    console.log("Error in addAProductToCartService", err);
    throw err;
  }
};

export const removeAProductFromCartService = async (userid, productid) => {
  try {
    const newCart = await removeAProductInCartFromDb(userid, productid);
    return newCart;
  } catch (err) {
    console.log("Error in removeAProductFromCartService", err);
    throw err;
  }
};

export const removeSomeProductFromCartForUserService = async (
  userid,
  products
) => {
  try {
    const newCart = await removeSomeProductInCartFromDb(userid, products);
    return newCart;
  } catch (err) {
    console.log("Error in removeAProductFromCartService", err);
    throw err;
  }
};

export const removeAllProductFromCartForUserService = async (userid) => {
  try {
    const newCart = await removeAllProductInCartFromDb(userid);
    return newCart;
  } catch (err) {
    console.log("Error in removeAllProductFromCartForUserService", err);
    throw err;
  }
};

export const updateAProductInCartService = async (userid, id, update) => {
  try {
    const updatedCart = await updateAProductInCartInDb(userid, id, update);
    return updatedCart;
  } catch (err) {
    console.log("Error in removeAProductFromCartService", err);
    throw err;
  }
};

export const cartTotal = async (userid) => {
  try {
    let total = await totalCartPrice(userid);
    return total;
  } catch (err) {
    console.log("Error in cartTotal", err);
    throw err;
  }
};
