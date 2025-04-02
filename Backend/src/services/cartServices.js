import { readToFile, writeToFile } from "../repository/fileManager.js";
import { cartPath, productPath } from "../utils/utils.js";

export const cartDisplayer = async () => {
  try {
    const result = await readToFile(cartPath);
    return result;
  } catch (err) {
    console.log("Error in cartDisplayer", err);
    throw err;
  }
};

const validateProductAvailability = (productToAdd, quantity) => {
  if (!productToAdd) {
    throw new Error("No matching products found");
  }
  if (productToAdd.inventory < quantity) {
    throw new Error("Not enough inventory");
  }
};

export const cartAdder = async (userid, productId, quantity) => {
  try {
    // get all products form the products.json file
    const products = await readToFile(productPath);
    // search for a product to add in cart
    const productToAdd = products.find(
      (product) => product.productid === productId
    );

    validateProductAvailability(productToAdd, quantity);

    //get all items in the cart
    let cartItems = await readToFile(cartPath);

    // // update the inventory in products.json file
    // await updateAProductInventory(productId, quantity);
    //search if the product is already in the cart
    const productIndex = cartItems.findIndex(
      (item) => item.productid === productId && item.userid === userid
    );

    if (productIndex < 0) {
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
    console.log("Error in cartAdder", err);
    throw err;
  }
};

export const cartDeleter = async (userid, productid) => {
  try {
    const cartitems = await readToFile(cartPath);
    let newCart;

    if (!productid) {
      newCart = cartitems.filter((item) => item.userid !== userid);
    } else if (productid) {
      newCart = cartitems.filter((item) => {
        if (item.userid !== userid || item.productid !== productid) return item;
      });
    }
    if (cartitems.length === newCart.length) {
      throw new Error("No Items to remove from the cart");
    }
    await writeToFile(cartPath, newCart);
    productid
      ? console.log(`Product with id ${productid} removed successfully`)
      : console.log(`Product removed successfully`);
    return newCart;
  } catch (err) {
    console.log("Error in cartDeleter", err);
    throw err;
  }
};

const productInCart = (cartItems, productid) => {
  const productIndex = cartItems.find((p) => p.productid === productid);
  if (productIndex < 0) {
    throw new Error("Product not found");
  }
};

export const cartUpdater = async (userid, id, update) => {
  try {
    const cartItems = await readToFile(cartPath);
    const { price, quantity } = update;
    // let quanityChange;

    productInCart(cartItems, id);

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
    console.log("Error in cartUpdater", err);
    throw err;
  }
};

export const cartTotal = async (userid) => {
  try {
    let cartItems = await readToFile(cartPath);
    if (userid) {
      cartItems = cartItems.filter((p) => p.userid === userid);
    }
    const total = cartItems.reduce((a, item) => {
      return (a = a + item.quantity * item.price);
    }, 0);
    return total;
  } catch (err) {
    console.log("Error in cartTotal", err);
    throw err;
  }
};
