import { myProduct, ProductOptions } from "../types.js";
import { readToFile, writeToFile } from "../utils/fileManager.js";
import { generateId, productPath } from "../utils/utils.js";

const getProducts = async (): Promise<myProduct[]> => {
  try {
    const result: myProduct[] = await readToFile(productPath);
    return result;
  } catch (err) {
    console.log(
      "Error in product repository getProducts. Failed to get product data",
      err
    );
    throw err;
  }
};

const getProductIndex = (
  products: ProductOptions[],
  productid: string
): number => {
  const productIndex: number = products.findIndex(
    (product) => product.productid === productid
  );
  return productIndex;
};

const getProductById = async (productid: string): Promise<myProduct | []> => {
  try {
    const data: myProduct[] = await readToFile(productPath);
    const productIndex: number = getProductIndex(data, productid);
    console.log(productIndex);
    if (productIndex < 0) {
      console.log("No product found");
      return [];
    } else {
      return data[productIndex];
    }
  } catch (err) {
    console.log(
      "Error in product repository getProductByID. Failed to get product data based on productid",
      err
    );
    throw err;
  }
};

const addProduct = async (product: myProduct): Promise<myProduct[]> => {
  try {
    const products: myProduct[] = await readToFile(productPath);
    product.productid = generateId();
    const productindex: number = getProductIndex(products, product.productid);
    if (productindex >= 0) {
      console.log("Product already exists in the database");
      return [];
    }
    let totalProducts = [...products, product];
    await writeToFile(productPath, totalProducts);
    return totalProducts;
  } catch (err) {
    console.log(
      "Error in product repository addProduct. Failed to add a product to database",
      err
    );
    throw err;
  }
};

const addProducts = async (products: myProduct[]): Promise<myProduct[]> => {
  try {
    const productsInDb: myProduct[] = await readToFile(productPath);
    let totalProducts: myProduct[] = [...productsInDb];
    for (let product of products) {
      product.productid = generateId();
      const productindex = getProductIndex(products, product.productid);
      if (productindex < 0) {
        console.log(product);
        totalProducts = [...totalProducts, product];
      } else {
        console.log("Product Already exists");
      }
    }
    await writeToFile(productPath, totalProducts);
    return totalProducts;
  } catch (err) {
    console.log(
      "Error in product repository addProducts. Failed to add products to the database",
      err
    );
    throw err;
  }
};

const updateProduct = async (
  productid: string,
  update: ProductOptions
): Promise<myProduct[]> => {
  try {
    const products: myProduct[] = await readToFile(productPath);
    const { name, price, description, category, inventory } = update;
    let productIndex: number = getProductIndex(products, productid);
    let product: myProduct = products[productIndex];
    if (productIndex < 0) {
      throw new Error("No product found");
    }
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;
    if (inventory) product.inventory = inventory;
    // const newProducts = products.map((product) => {
    //   if (product.productid === productid) {
    //     return { ...product, ...update };
    //   }
    //   return product;
    // });
    await writeToFile(productPath, products);
    return products;
  } catch (err) {
    console.log(
      "Error in product repository update. Failed to update a product",
      err
    );
    throw err;
  }
};

const deleteProduct = async (productid: string): Promise<myProduct[]> => {
  try {
    const products: myProduct[] = await readToFile(productPath);
    const totalProducts: myProduct[] = products.filter(
      (product: ProductOptions) => product.productid !== productid
    );
    await writeToFile(productPath, totalProducts);
    return totalProducts;
    // if (products.length === totalProducts.length) {
    //   return { message: "No Products to delete", response: totalProducts };
    // } else {
    //   return {
    //     message: `Product with product id: ${productid} deleted successfully`,
    //     response: totalProducts,
    //   };
    // }
  } catch (err) {
    console.log("Error in product repository delete", err);
    throw err;
  }
};

const increaseProductInventory = async (
  id: string,
  quantity: string | number
): Promise<myProduct[]> => {
  try {
    let products: myProduct[] = await readToFile(productPath);
    products = products.map((product: myProduct) => {
      if (product.productid === id) {
        let inventory: number = Number(product.inventory) + Number(quantity);
        return {
          ...product,
          inventory,
        };
      }
      return product;
    });
    await writeToFile(productPath, products);
    return products;
  } catch (err) {
    console.log("Error in product repository invenotry++", err);
    throw err;
  }
};

const decreaseProductInventory = async (
  id: string,
  quantity: number
): Promise<myProduct[]> => {
  try {
    let products: myProduct[] = await readToFile(productPath);
    products = products.map((product: myProduct) => {
      if (product.productid === id) {
        let inventory;
        inventory = Number(product.inventory) - quantity;
        return {
          ...product,
          inventory,
        };
      }
      return product;
    });
    await writeToFile(productPath, products);
    return products;
  } catch (err) {
    console.log("Error in product repository invenotry--", err);
    throw err;
  }
};

export default {
  getProducts,
  getProductById,
  addProduct,
  addProducts,
  updateProduct,
  deleteProduct,
  increaseProductInventory,
  decreaseProductInventory,
};
