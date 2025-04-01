import { promises as fsPromises } from "fs";

import {
  getProductList,
  addAProduct,
  updateAProduct,
  deleteAProduct,
  updateAProductInventory,
} from "./product.js";

import { readCartFile, writeCartFile } from "./fileFuncs.js";

export const viewCart = async () => {
  try {
    const result = await readCartFile();
    return result;
  } catch (err) {
    console.log("Error in viewCart", err);
  }
};

export const addProductToCart = async (userid, productId, quantity) => {
  try {
    // get all products form the products.json file
    const products = await getProductList();
    // search for a product to add in cart
    const productToAdd = products.find(
      (product) => product.productid === productId
    );
    if (!productToAdd) {
      console.log("No matching products found");
      return;
    }
    if (productToAdd.inventory < quantity) {
      console.log("Not enough inventory");
      return;
    }

    //get all items in the cart
    let cartItems = await viewCart();

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

    await writeCartFile(cartItems);

    console.log(
      `Product with product id ${productId} and name ${productToAdd.name} added to cart`
    );
  } catch (err) {
    console.log("Error in addProductToCart", err);
  }
};

export const removeProductFromCart = async (userid, id) => {
  try {
    const cartitems = await viewCart();
    let newCart;
    if (!userid) {
      console.log("userid required");
      return;
    }
    if (!id) {
      newCart = cartitems.filter((item) => item.userid !== userid);
    } else if (id) {
      newCart = cartitems.filter((item) => {
        if (item.userid !== userid || item.productid !== id) return item;
      });
    }
    if (cartitems.length === newCart.length) {
      console.log("No Items to remove from the cart");
    }
    await writeCartFile(newCart);
    console.log(`Product with id ${id} removed successfully`);
  } catch (err) {
    console.log("Error in removeProductFromCart", err);
  }
};

// update = { price, quantity };

export const updateAProductCart = async (userid, id, update) => {
  try {
    const cartItems = await viewCart();
    const { price, quantity } = update;
    // let quanityChange;
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
    // check if the product is in the cart or not
    if (cartItems.length !== updatedCart.length) {
      console.log("Product not found in the cart");
    }

    // console.log(quanityChange);
    // await updateAProductInventory(id, quanityChange);
    await writeCartFile(updatedCart);

    console.log("Cart updated succesfully");
  } catch (err) {
    console.log("Error in updateAProduct", err);
  }
};

export const calcTotal = async () => {
  try {
    const cartItems = await viewCart();
    const total = cartItems.reduce((a, item) => {
      return (a = a + item.quantity * item.price);
    }, 0);
    return total;
  } catch (err) {
    console.log("error in calcTotal", err);
  }
};
