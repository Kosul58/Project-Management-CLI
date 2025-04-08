import cartRepositroy from "../repository/cartRepository.js";

export const getProducts = async () => {
  try {
    const result = await cartRepositroy.getProducts();
    return result;
  } catch (err) {
    console.log("Error in cart service getProducts", err);
    throw err;
  }
};

export const getProductById = async (productid, userid) => {
  try {
    const result = await cartRepositroy.getProductById(productid, userid);
    return result;
  } catch (err) {
    console.log("Error in cart service getProductById", err);
    throw err;
  }
};

export const getProduct = async (userid) => {
  try {
    const result = await cartRepositroy.getProduct(userid);
    return result;
  } catch (err) {
    console.log("Error in cart service getProduct", err);
    throw err;
  }
};

export const addProduct = async (userid, productId, quantity) => {
  try {
    const cartItems = await cartRepositroy.addProduct(
      userid,
      productId,
      quantity
    );
    return cartItems;
  } catch (err) {
    console.log("Error in cart service addProduct", err);
    throw err;
  }
};

export const removeProduct = async (userid, productid) => {
  try {
    const newCart = await cartRepositroy.removeProduct(userid, productid);
    return newCart;
  } catch (err) {
    console.log("Error in cart service removeProduct", err);
    throw err;
  }
};

export const removeProducts = async (userid, products) => {
  try {
    const newCart = await cartRepositroy.removeProducts(userid, products);
    return newCart;
  } catch (err) {
    console.log("Error in cart service removeSomeProduct", err);
    throw err;
  }
};

// export const removeAllProduct = async (userid) => {
//   try {
//     const newCart = await cartRepositroy.removeAllProduct(userid);
//     return newCart;
//   } catch (err) {
//     console.log("Error in cart service removeAllProduct", err);
//     throw err;
//   }
// };

export const updateProduct = async (userid, id, update) => {
  try {
    const updatedCart = await cartRepositroy.updateProduct(userid, id, update);
    return updatedCart;
  } catch (err) {
    console.log("Error in cart service updateProduct", err);
    throw err;
  }
};

export const cartTotal = async (userid) => {
  try {
    let total = await cartRepositroy.totalCartPrice(userid);
    return total;
  } catch (err) {
    console.log("Error in cart servie cartTotal", err);
    throw err;
  }
};

export default {
  getProducts,
  cartTotal,
  getProductById,
  getProduct,
  addProduct,
  removeProduct,
  removeProducts,
  // removeAllProduct,
  updateProduct,
};
