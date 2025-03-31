import { promises as fsPromises } from "fs";

import {
  getProductList,
  addAProduct,
  updateAProduct,
  deleteAProduct,
  updateAProductInventory,
} from "./productHandler/product.js";

// Product Operations

// Display all products
// const data = await getProductList();
// console.log(data);

// Add a new product
// addAProduct("Kosul", 55);

// Update a product
// updateAProduct(11, "kaspers", 555);

// Delete a product
// deleteAProduct(11);

// update a product Inventory
// updateAProductInventory(2, 2);

// Cart operations

const viewCart = async () => {
  try {
    const data = await fsPromises.readFile("./data/cart.json", "utf8");
    const result = await JSON.parse(data);
    // console.log(result);
    return result;
  } catch (err) {
    console.log("Error in viewCart", err);
  }
};

const addProductToCart = async (productId, quantity) => {
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
    console.log(cartItems);

    await fsPromises.writeFile(
      "./data/cart.json",
      JSON.stringify(cartItems, null, 2)
    );
  } catch (err) {
    console.log("Error in addProductToCart", err);
  }
};

// View all products in the cart
// console.log(viewCart())

// Add a product to the cart
// addProductToCart(2, 2);
