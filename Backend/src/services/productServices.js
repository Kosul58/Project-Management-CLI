import productRepository from "../repository/productRepositroy.js";

const getAllProduct = async () => {
  try {
    let result = await productRepository.getProducts();
    return result;
  } catch (err) {
    console.log("error in product Services getAllProduct", err);
    throw err;
  }
};

const getProductById = async (prouctid) => {
  try {
    const data = await productRepository.getProductById(prouctid);
    return data;
  } catch (err) {
    console.log("error in product Services getProductById", err);
    throw err;
  }
};

const addProduct = async (name, price, inventory) => {
  try {
    //create a new product
    const newProduct = { name, price, inventory };
    //send product data to repository to add to file
    const totalProducts = await productRepository.addProduct(newProduct);
    // await appendToFile(productPath, newProduct);
    console.log("Product added successfully!");
    return { newProduct, totalProducts };
  } catch (err) {
    console.log("error in product Services addProduct", err);
    throw err;
  }
};

// productsarray = [{name: , price: , inventory: }]
const addProducts = async (productsarray) => {
  try {
    const data = await productRepository.addProducts(productsarray);
    // console.log(productsarray);
  } catch (err) {
    console.log("error in product Services addProducts", err);
    throw err;
  }
};

const updateProduct = async (productid, update) => {
  try {
    const newProducts = await productRepository.updateProduct(
      productid,
      update
    );
    return newProducts;
  } catch (err) {
    console.log("error in product Services updateProduct", err);
    throw err;
  }
};

const deleteProduct = async (productid) => {
  try {
    const data = await productRepository.deleteProduct(productid);
    return data;
  } catch (err) {
    console.log("error in product Services delete", err);
    throw err;
  }
};

const updateProductInventory = async (id, quantity) => {
  try {
    let products;
    if (typeof quantity === "string") {
      products = await productRepository.increaseProductInventory(id, quantity);
    } else {
      products = await productRepository.decreaseProductInventory(id, quantity);
    }
    return products;
  } catch (err) {
    console.log("error in product Services product inventory", err);
    throw err;
  }
};

export default {
  getAllProduct,
  getProductById,
  addProduct,
  addProducts,
  updateProduct,
  deleteProduct,
  updateProductInventory,
};
