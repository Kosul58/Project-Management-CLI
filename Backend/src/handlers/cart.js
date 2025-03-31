import { promises as fsPromises } from "fs";

import {
  getProductList,
  addAProduct,
  updateAProduct,
  deleteAProduct,
  updateAProductInventory,
} from "../handlers/product.js";

export const viewCart = async () => {
  try {
    const data = await fsPromises.readFile(
      "./src/database/data/cart.json",
      "utf8"
    );
    const result = await JSON.parse(data);
    // console.log(result);
    return result;
  } catch (err) {
    console.log("Error in viewCart", err);
  }
};

export const addProductToCart = async (productId, quantity) => {
  try {
    // get all products form the products.json file
    const products = await getProductList();
    // search for a product to add in cart
    const productToAdd = products.find((product) => product.id === productId);

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

    // update the inventory in products.json file
    await updateAProductInventory(productId, quantity);

    //search if the product is already in the cart
    const productIndex = cartItems.findIndex((item) => item.id === productId);

    if (productIndex < 0) {
      //if no product in the cart add the product to cart
      const itemToCart = {
        id: productToAdd.id,
        name: productToAdd.name,
        price: productToAdd.price,
        quantity: quantity,
      };
      cartItems.push(itemToCart);
    } else {
      //if product in the cart update the product to cart
      cartItems = cartItems.map((item) => {
        if (item.id === productId) {
          return {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity + quantity,
          };
        }
        return item;
      });
    }
    // console.log(cartItems);

    await fsPromises.writeFile(
      "./src/database/data/cart.json",
      JSON.stringify(cartItems, null, 2)
    );
    console.log(
      `Product with product id ${productId} and name ${productToAdd.name} added to cart`
    );
  } catch (err) {
    console.log("Error in addProductToCart", err);
  }
};

export const removeProductFromCart = async (id) => {
  try {
    const cartitems = await viewCart();
    const newCart = cartitems.filter((item) => item.id !== id);
    if (cartitems.length === newCart.length) {
      console.log("No Items to remove from the cart");
    }

    await fsPromises.writeFile(
      "./src/database/data/cart.json",
      JSON.stringify(newCart, null, 2)
    );

    console.log(`Product with id ${id} removed successfully`);
  } catch (err) {
    console.log("Error in removeProductFromCart", err);
  }
};

// update = { price, quantity };

export const updateAProductCart = async (id, update) => {
  try {
    const cartItems = await viewCart();
    const { price, quantity } = update;
    const updatedCart = cartItems.map((product) => {
      if (product.id === id) {
        return { ...product, ...update };
      }
      return product;
    });
    // check if the product is in the cart or not
    if (cartItems.length !== updatedCart.length) {
      console.log("Product not found in the cart");
    }

    await fsPromises.writeFile(
      "./src/database/data/cart.json",
      JSON.stringify(updatedCart)
    );
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
