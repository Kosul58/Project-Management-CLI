import { Cart, UpdateCart } from "../common/cartType";
import { Product } from "../common/productType";
import { readToFile, writeToFile } from "../utils/fileManager.js";
import { cartPath, productPath } from "../utils/utils.js";

const getProducts = async (): Promise<Cart[]> => {
  try {
    const result: Cart[] = await readToFile(cartPath);
    console.log("Product search in cart complete");
    return result;
  } catch (err) {
    console.log("Failed to get products from cart", err);
    throw err;
  }
};

const productIndex = (
  products: Cart[],
  productid: string,
  userid: string
): number => {
  return products.findIndex(
    (p) => p.userid === userid && p.productid === productid
  );
};

const getProductById = async (
  productid: string,
  userid: string
): Promise<Cart> => {
  try {
    let result: Cart[] = await readToFile(cartPath);
    const index = productIndex(result, productid, userid);
    return result[index];
  } catch (err) {
    console.log("Failed to get product by id for a user from cart", err);
    throw err;
  }
};

const getProduct = async (userid: string): Promise<Cart[]> => {
  try {
    let result: Cart[] = await readToFile(cartPath);
    console.log("Product search in cart complete");
    return result.filter((p) => p.userid === userid);
  } catch (err) {
    console.log("failed to get the products of a user in cart", err);
    throw err;
  }
};

const cartCheck = async (
  productid: string,
  userid: string
): Promise<Cart | undefined> => {
  // get all products form the products.json file
  const products: Cart[] = await readToFile(cartPath);
  // search for a product to add in cart
  const productToAdd: Cart | undefined = products.find(
    (product) => product.productid === productid && product.userid === userid
  );
  return productToAdd;
};

const productAvailable = async (
  productid: string,
  quantity: number
): Promise<Product> => {
  const products: Product[] = await readToFile(productPath);
  const productToAdd: Product | undefined = products.find(
    (product) => product.productid === productid
  );
  if (!productToAdd) {
    throw new Error(
      "No matching products found in products.json to add to cart"
    );
  }
  if (productToAdd.inventory < Number(quantity)) {
    throw new Error("Not enough inventory");
  }
  return productToAdd;
};

const addProduct = async (
  userid: string,
  productId: string,
  quantity: number
): Promise<Cart[]> => {
  try {
    //check if product is in product.json file or not
    const productToAdd: Product = await productAvailable(productId, quantity);

    //check if product is already in cart or not
    const isProoductInCart = await cartCheck(productId, userid);

    //get all items in the cart
    let cartItems: Cart[] = await readToFile(cartPath);

    if (!isProoductInCart) {
      //if no product in the cart add the product to cart
      const itemToCart: Cart = {
        userid: userid,
        productid: productToAdd.productid,
        name: productToAdd.name,
        price: productToAdd.price,
        quantity: Number(quantity),
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
            quantity: Number(item.quantity) + Number(quantity),
          };
        }
        return item;
      });
    }
    // console.log(cartItems);
    await writeToFile(cartPath, cartItems);
    console.log("Product addition in cart complete");
    return cartItems;
  } catch (err) {
    console.log("Failed to add product to the cart of a user", err);
    throw err;
  }
};

const removeProduct = async (
  userid: string,
  productid: string
): Promise<Cart[]> => {
  try {
    const cartitems: Cart[] = await readToFile(cartPath);
    let newCart: Cart[];
    newCart = cartitems.filter((item) => {
      if (item.userid !== userid || item.productid !== productid) return item;
    });
    if (cartitems.length === newCart.length) {
      throw new Error("No Items to remove from the cart");
    }
    await writeToFile(cartPath, newCart);
    console.log(`Product with id ${productid} removed successfully`);
    console.log("Prodcut removal from cart complete");
    return newCart;
  } catch (err) {
    console.log("Failed to remove a product from the cart of a user", err);
    throw err;
  }
};

//proucts = [productid1 , productid2]
const removeProducts = async (
  userid: string,
  products: string[]
): Promise<Cart[]> => {
  try {
    const cartitems: Cart[] = await readToFile(cartPath);
    let newCart: Cart[];
    if (products.length < 1) {
      newCart = cartitems.filter((item) => {
        if (item.userid !== userid) return item;
      });
    } else {
      newCart = cartitems.filter((item) => {
        if (item.userid !== userid && !products.includes(item.productid))
          return item;
      });
    }
    if (cartitems.length === newCart.length) {
      console.log("No Items to remove from the cart");
      return cartitems;
    }
    await writeToFile(cartPath, newCart);
    console.log("Products removal from cart complete");
    return newCart;
  } catch (err) {
    console.log(
      "Failed to remove multiple products from the cart of a user",
      err
    );
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

const updateProduct = async (
  uid: string,
  pid: string,
  update: UpdateCart
): Promise<Cart[]> => {
  try {
    const cartItems: Cart[] = await readToFile(cartPath);
    let { quantity } = update;
    const productToUpdate = await cartCheck(pid, uid);
    if (!productToUpdate) throw new Error("No product to update");
    // const index = productIndex(cartItems, pid, uid);
    // if (index < 0) throw new Error("Product not found in cart");
    // const product = cartItems[index];
    // console.log(product);
    // if (price) product.price = price;
    // if (quantity) product.quantity = quantity;
    // if (name) product.name = name;
    // if (description) product.description = description;
    // if (category) product.category = category;
    // console.log(product);
    const updatedCart: Cart[] = cartItems.map((product) => {
      if (product.productid === pid && product.userid === uid) {
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
    // await writeToFile(cartPath, updatedCart);
    console.log("Cart updated succesfully");
    return updatedCart;
  } catch (err) {
    console.log("Failed to update a product in the cart", err);
    throw err;
  }
};

const totalCartPrice = async (userid: string): Promise<number> => {
  try {
    let cartItems: Cart[] = await readToFile(cartPath);
    cartItems = cartItems.filter((p) => p.userid === userid);
    const total = cartItems.reduce((a, item) => {
      return (a = a + item.quantity * item.price);
    }, 0);
    console.log("Total price calculation complete");
    return total;
  } catch (err) {
    console.log(
      "Failed to calculate total price of products in the cart of a user",
      err
    );
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
