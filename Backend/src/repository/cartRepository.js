import { readToFile, writeToFile } from "../utils/fileManager.js";
import { cartPath, productPath } from "../utils/utils.js";

const getProducts = async () => {
  try {
    const result = await readToFile(cartPath);
    return result;
  } catch (err) {
    console.log("Error in cart repository", err);
    throw err;
  }
};

const getProductById = async (productid, userid) => {
  try {
    let result = await readToFile(cartPath);
    return result.filter(
      (p) => p.userid === userid && p.productid === productid
    );
  } catch (err) {
    console.log("Error in cart repository", err);
    throw err;
  }
};

const getProduct = async (userid) => {
  try {
    let result = await readToFile(cartPath);
    return result.filter((p) => p.userid === userid);
  } catch (err) {
    console.log("Error in cart repository", err);
    throw err;
  }
};

const cartCheck = async (productid, userid) => {
  // get all products form the products.json file
  const products = await readToFile(cartPath);
  // search for a product to add in cart
  const productToAdd = products.find(
    (product) => product.productid === productid && product.userid === userid
  );
  return productToAdd;
};

const productAvailable = async (productid, quantity) => {
  const products = await readToFile(productPath);
  const productToAdd = products.find(
    (product) => product.productid === productid
  );
  if (!productToAdd) {
    throw new Error(
      "No matching products found in products.json to add to cart"
    );
  }
  if (productToAdd.inventory < quantity) {
    throw new Error("Not enough inventory");
  }
  return productToAdd;
};

const addProduct = async (userid, productId, quantity) => {
  try {
    //check if product is in product.json file or not
    const productToAdd = await productAvailable(productId, quantity);

    //check if product is already in cart or not
    const isProoductInCart = await cartCheck(productId, userid);

    //get all items in the cart
    let cartItems = await readToFile(cartPath);

    if (!isProoductInCart) {
      //if no product in the cart add the product to cart
      const itemToCart = {
        userid: userid,
        productid: productToAdd.productid,
        name: productToAdd.name,
        price: productToAdd.price,
        quantity: quantity,
      };
      cartItems.push(itemToCart);
    } else {
      //if product in the cart update the product to cart
      cartItems = cartItems.map((item) => {
        if (item.productid === productId) {
          return {
            userid: userid,
            productid: item.productid,
            name: item.name,
            price: item.price,
            quantity: item.quantity + quantity,
          };
        }
        return item;
      });
    }
    // console.log(cartItems);
    await writeToFile(cartPath, cartItems);
    return cartItems;
  } catch (err) {
    console.log("Error in cart repository addproduct", err);
    throw err;
  }
};

const removeProduct = async (userid, productid) => {
  try {
    const cartitems = await readToFile(cartPath);
    let newCart;
    newCart = cartitems.filter((item) => {
      if (item.userid !== userid || item.productid !== productid) return item;
    });
    if (cartitems.length === newCart.length) {
      throw new Error("No Items to remove from the cart");
    }
    await writeToFile(cartPath, newCart);
    console.log(`Product with id ${productid} removed successfully`);
    return newCart;
  } catch (err) {
    console.log("Error in cart repository removeproduct", err);
    throw err;
  }
};

const removeProducts = async (userid, products) => {
  try {
    const cartitems = await readToFile(cartPath);
    let newCart;
    newCart = cartitems.filter((item) => {
      if (item.userid !== userid && !products.includes(item.productid))
        return item;
    });
    if (cartitems.length === newCart.length) {
      console.log("No Items to remove from the cart");
      return cartitems;
    }
    await writeToFile(cartPath, newCart);
    console.log(`Product with id ${productid} removed successfully`);
    return newCart;
  } catch (err) {
    console.log("Error in cart repository removesome", err);
    throw err;
  }
};

// const removeAllProduct = async (userid) => {
//   try {
//     const cartitems = await readToFile(cartPath);
//     let newCart;

//     newCart = cartitems.filter((item) => item.userid !== userid);

//     if (cartitems.length === newCart.length) {
//       throw new Error("No Items to remove from the cart");
//     }
//     await writeToFile(cartPath, newCart);
//     console.log(`Product removed successfully`);
//     return newCart;
//   } catch (err) {
//     console.log("Error in cart repository removeall", err);
//     throw err;
//   }
// };

const updateProduct = async (userid, id, update) => {
  try {
    const cartItems = await readToFile(cartPath);
    const { price, quantity } = update;

    const productToUpdate = await cartCheck(id, userid);
    if (!productToUpdate) throw new Error("No product to update");

    const updatedCart = cartItems.map((product) => {
      if (product.productid === id && product.userid === userid) {
        // if (product.quantity <= quantity) {
        //   quanityChange = quantity - product.quantity;
        // } else if (product.quantity > quantity) {
        //   quanityChange = `${product.quantity - quantity}`;
        // }
        return { ...product, ...update };
      }
      return product;
    });
    // console.log(quanityChange);
    // await updateAProductInventory(id, quanityChange);
    await writeToFile(cartPath, updatedCart);
    console.log("Cart updated succesfully");
    return updatedCart;
  } catch (err) {
    console.log("Error in cart repository update", err);
    throw err;
  }
};

const totalCartPrice = async (userid) => {
  try {
    let cartItems = await readToFile(cartPath);
    cartItems = cartItems.filter((p) => p.userid === userid);
    const total = cartItems.reduce((a, item) => {
      return (a = a + item.quantity * item.price);
    }, 0);
    return total;
  } catch (err) {
    console.log("Error in cart repository total", err);
    throw err;
  }
};

export default {
  totalCartPrice,
  getProducts,
  getProductById,
  getProduct,
  addProduct,
  removeProduct,
  removeProducts,
  updateProduct,
};
