import cartServices from "../../services/cartServices.js";
import { Cart, UpdateCart } from "../../common/types/cartType.js";

export const viewCartProducts = async () => {
  try {
    const data = await cartServices.getProducts("cli");
    if (data.length > 0)
      return {
        message: "Cart search successful",
        response: data,
      };
    else {
      return {
        message: "Cart search unsuccessful",
        response: [],
      };
    }
  } catch (err) {
    console.log("Failed to get products data from cart", err);
    return [];
  }
};

export const viewCartProduct = async (productid: string, userid: string) => {
  try {
    const data = await cartServices.getProductById(productid, userid, "cli");
    if (!data || Object.keys(data).length === 0)
      return {
        message: "Product search unsuccessfull",
        response: [],
      };
    if (Object.keys(data).length > 0)
      return {
        message: "Product search successfull",
        response: data,
      };
    else {
      return {
        message: "Product search unsuccessfull",
        response: [],
      };
    }
  } catch (err) {
    console.log("Failed to search product in cart of user", err);
    return [];
  }
};

export const viewCart = async (userid: string) => {
  try {
    const data = await cartServices.getProduct(userid, "cli");
    if (!data || Object.keys(data).length === 0)
      return {
        message: "Cart search unsuccessful",
        response: [],
      };
    else {
      return {
        message: "Cart search successful",
        response: data,
      };
    }
  } catch (err) {
    console.log("Failed to search products in cart of user", err);
    return [];
  }
};

export const addProduct = async (
  userid: string,
  productId: string,
  quantity: number
) => {
  try {
    if (!userid || !productId || !quantity) {
      return {
        message: "Provide all fields",
        response: [],
      };
    }
    const result = await cartServices.addProduct(
      userid,
      productId,
      quantity,
      "cli"
    );

    if (!result || result.length === 0) {
      return {
        message: "Product addition to cart unsuccessfully",
        response: [],
      };
    } else {
      return {
        message: "Product addition to cart successfully",
        response: result,
      };
    }
  } catch (err) {
    console.log("Failed to add a product to the cart", err);
    return [];
  }
};

export const removeProduct = async (userid: string, productid: string) => {
  try {
    if (!userid) {
      return {
        message: "no userid",
        response: [],
      };
    }
    const result = await cartServices.removeProduct(userid, productid, "cli");

    if (!result || result.length === 0) {
      return {
        message: "Product removal unsuccessfull",
        response: [],
      };
    } else {
      return {
        message: "Product removal successfull",
        response: result,
      };
    }
  } catch (err) {
    console.log("Failed to remove a product", err);
    return [];
  }
};

// products = [productid1 , productid2 , ...]
export const removeProducts = async (userid: string, productids: string[]) => {
  try {
    if (!userid || productids.length === 0) {
      return {
        message: "no userid and product ids",
        response: [],
      };
    }
    const result = await cartServices.removeProducts(userid, productids, "cli");
    if (!result || result.length === 0) {
      return {
        message: "Products removal unsuccessfull",
        response: [],
      };
    } else {
      return {
        message: "Products removal successfull",
        response: result,
      };
    }
  } catch (err) {
    console.log("Failed to remove products", err);
    return [];
  }
};

// export const removeAllProduct = async (userid) => {
//   try {
//     if (!userid) {
//       return {
//         message: "no userid",
//         response: [],
//       };
//     }
//     const result = await cartServices.removeAllProduct(userid);

//     if (result.length > 0) {
//       return {
//         message: "Products removal successfull",
//         response: result,
//       };
//     } else {
//       return {
//         message: "Products removal unsuccessfull",
//         response: [],
//       };
//     }
//   } catch (err) {
//     console.log("Error in cart controller removeAllProduct", err);
//     return [];
//   }
// };

// update = { price, quantity };

export const updateProduct = async (
  userid: string,
  productid: string,
  update: UpdateCart
) => {
  try {
    if (!userid || !productid || !update.quantity) {
      return {
        message: "Enter all fields",
        response: [],
      };
    }
    const result = await cartServices.updateProduct(
      userid,
      productid,
      update,
      "cli"
    );
    if (!result || result.length === 0) {
      return {
        message: "Product update unsuccessfull",
        response: [],
      };
    } else {
      return {
        message: "Product update successfull",
        response: result,
      };
    }
  } catch (err) {
    console.log("Failed to update a product", err);
    return [];
  }
};

export const calcTotal = async (userid: string) => {
  try {
    if (!userid)
      return {
        message: "enter userid",
        response: [],
      };
    const total = await cartServices.cartTotal(userid, "cli");
    if (total) {
      return { message: "Total of all products in the cart", response: total };
    } else {
      return {
        message: "Error in total price calculation",
        response: [],
      };
    }
  } catch (err) {
    console.log("Failed to calculate total price of products in cart", err);
    return [];
  }
};
