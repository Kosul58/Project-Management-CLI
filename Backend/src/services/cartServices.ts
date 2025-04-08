import cartRepositroy from "../repository/cartRepository";
import { myCart, ProductOptions, updateCart } from "../types";

export const getProducts = async (): Promise<myCart[]> => {
  try {
    const result = await cartRepositroy.getProducts();
    return result;
  } catch (err) {
    console.log("Failed to get all the products in the cart", err);
    throw err;
  }
};

export const getProductById = async (
  productid: string,
  userid: string
): Promise<myCart> => {
  try {
    const result = await cartRepositroy.getProductById(productid, userid);
    return result;
  } catch (err) {
    console.log(
      "Failed to get a product in cart based on product and user id",
      err
    );
    throw err;
  }
};

export const getProduct = async (userid: string): Promise<myCart[]> => {
  try {
    const result = await cartRepositroy.getProduct(userid);
    return result;
  } catch (err) {
    console.log("Failed to get the products from the user's cart", err);
    throw err;
  }
};

export const addProduct = async (
  userid: string,
  productId: string,
  quantity: number
): Promise<myCart[]> => {
  try {
    const cartItems = await cartRepositroy.addProduct(
      userid,
      productId,
      quantity
    );
    return cartItems;
  } catch (err) {
    console.log("Failed to add a product to cart for a user", err);
    throw err;
  }
};

export const removeProduct = async (
  userid: string,
  productid: string
): Promise<myCart[]> => {
  try {
    const newCart = await cartRepositroy.removeProduct(userid, productid);
    return newCart;
  } catch (err) {
    console.log("Failed to remove a product from the cart of a user", err);
    throw err;
  }
};

export const removeProducts = async (
  userid: string,
  products: string[]
): Promise<myCart[]> => {
  try {
    const newCart = await cartRepositroy.removeProducts(userid, products);
    return newCart;
  } catch (err) {
    console.log(
      "Failed to remove multiple products from the cart of a user",
      err
    );
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

export const updateProduct = async (
  uid: string,
  pid: string,
  update: updateCart
) => {
  try {
    console.log(update);
    //cleans the update
    const cleanUpdate = Object.fromEntries(
      Object.entries(update).filter(
        ([_, v]) => v !== null && v !== undefined && !Number.isNaN(v)
      )
    );
    console.log(cleanUpdate);
    const updatedCart = await cartRepositroy.updateProduct(
      uid,
      pid,
      cleanUpdate
    );
    return updatedCart;
  } catch (err) {
    console.log("Failed to update a product in the cart of a user", err);
    throw err;
  }
};

export const cartTotal = async (userid: string) => {
  try {
    let total = await cartRepositroy.totalCartPrice(userid);
    return total;
  } catch (err) {
    console.log(
      "Failed to calculate the total cost of products in the cart of a user",
      err
    );
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
  updateProduct,
};
