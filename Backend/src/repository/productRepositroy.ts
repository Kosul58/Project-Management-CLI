import { Product, ProductOptions } from "../common/types/productType.js";
import { createCategory } from "../controllers/category.js";
import FileManager from "../utils/fileManager.js";
import { generateId, productPath } from "../utils/utils.js";

const getProducts = async (): Promise<Product[]> => {
  try {
    const result: Product[] = await FileManager.readFromFile(productPath);
    console.log("Product search complete");
    return result;
  } catch (err) {
    console.log("Failed to get product data", err);
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

const getProductById = async (productid: string): Promise<Product | []> => {
  try {
    const data: Product[] = await FileManager.readFromFile(productPath);
    const productIndex: number = getProductIndex(data, productid);
    console.log(productIndex);
    if (productIndex < 0) {
      console.log("No product found");
      return [];
    } else {
      console.log("Product search complete");
      return data[productIndex];
    }
  } catch (err) {
    console.log("Failed to get product data based on productid", err);
    throw err;
  }
};

const addProduct = async (product: Product): Promise<Product[]> => {
  try {
    const products: Product[] = await FileManager.readFromFile(productPath);
    product.productid = generateId();
    const productindex: number = getProductIndex(products, product.productid);
    if (productindex >= 0) {
      console.log("Product already exists in the database");
      return [];
    }
    let totalProducts = [...products, product];
    await FileManager.writeToFile(productPath, totalProducts);
    if (product.category) {
      const category = {
        name: product.category,
        parentId: "",
      };
      await createCategory(category);
    }
    console.log("Product addition complete");
    return totalProducts;
  } catch (err) {
    console.log("Failed to add a product to database", err);
    throw err;
  }
};

const addProducts = async (products: Product[]): Promise<Product[]> => {
  try {
    const productsInDb: Product[] = await FileManager.readFromFile(productPath);
    let totalProducts: Product[] = [...productsInDb];
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
    await FileManager.writeToFile(productPath, totalProducts);
    console.log("Products addition complete");
    return totalProducts;
  } catch (err) {
    console.log("Failed to add products to the database", err);
    throw err;
  }
};

const updateProduct = async (
  productid: string,
  update: ProductOptions
): Promise<Product[]> => {
  try {
    const products: Product[] = await FileManager.readFromFile(productPath);
    const { name, price, description, category, inventory } = update;
    let productIndex: number = getProductIndex(products, productid);
    let product: Product = products[productIndex];
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
    if (product.category) {
      const category = {
        name: product.category,
        parentId: "",
      };
      await createCategory(category);
    }
    await FileManager.writeToFile(productPath, products);
    console.log("Product update complete");
    return products;
  } catch (err) {
    console.log("Failed to update a product", err);
    throw err;
  }
};

const deleteProduct = async (productid: string): Promise<Product[]> => {
  try {
    const products: Product[] = await FileManager.readFromFile(productPath);
    const totalProducts: Product[] = products.filter(
      (product: ProductOptions) => product.productid !== productid
    );
    await FileManager.writeToFile(productPath, totalProducts);
    console.log("Product removal complete");
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
    console.log("Failed to remove a product", err);
    throw err;
  }
};

const increaseProductInventory = async (
  id: string,
  quantity: string | number
): Promise<Product[]> => {
  try {
    let products: Product[] = await FileManager.readFromFile(productPath);
    products = products.map((product: Product) => {
      if (product.productid === id) {
        let inventory: number = Number(product.inventory) + Number(quantity);
        return {
          ...product,
          inventory,
        };
      }
      return product;
    });
    await FileManager.writeToFile(productPath, products);
    console.log("Product inventory increased");
    return products;
  } catch (err) {
    console.log("Failed to increase product inventory", err);
    throw err;
  }
};
const checkProductInventory = (
  products: Product[],
  id: string,
  quantity: number
): boolean => {
  return products.some(
    (product) => product.productid === id && product.inventory >= quantity
  );
};
const decreaseProductInventory = async (
  id: string,
  quantity: number
): Promise<Product[]> => {
  try {
    let products: Product[] = await FileManager.readFromFile(productPath);
    const checkInventory = checkProductInventory(products, id, quantity);
    if (!checkInventory) {
      console.log("Insufficient Inventory");
      throw new Error("Insufficient Inventory");
    }
    products = products.map((product: Product) => {
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
    await FileManager.writeToFile(productPath, products);
    console.log("Product inventory decreased");
    return products;
  } catch (err) {
    console.log("Failed to decrease product inventory", err);
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

// import { Product, ProductOptions } from "../common/productType";
// import { createCategory } from "../controllers/category";
// import FileManager from "../utils/fileManager";
// import { generateId, productPath } from "../utils/utils";

// class ProductService {
//   static async getProducts(): Promise<Product[]> {
//     try {
//       const result = await FileManager.readFromFile(productPath);
//       console.log("Product search complete");
//       return result;
//     } catch (err) {
//       console.log("Failed to get product data", err);
//       throw err;
//     }
//   }

//   static getProductIndex(products: ProductOptions[], productid: string): number {
//     return products.findIndex(product => product.productid === productid);
//   }

//   static async getProductById(productid: string): Promise<Product | []> {
//     try {
//       const data = await FileManager.readFromFile(productPath);
//       const productIndex = this.getProductIndex(data, productid);
//       if (productIndex < 0) {
//         console.log("No product found");
//         return [];
//       }
//       console.log("Product search complete");
//       return data[productIndex];
//     } catch (err) {
//       console.log("Failed to get product data based on productid", err);
//       throw err;
//     }
//   }

//   static async addProduct(product: Product): Promise<Product[]> {
//     try {
//       const products = await FileManager.readFromFile(productPath);
//       product.productid = generateId();
//       if (this.getProductIndex(products, product.productid) >= 0) {
//         console.log("Product already exists in the database");
//         return [];
//       }
//       const totalProducts = [...products, product];
//       await FileManager.writeToFile(productPath, totalProducts);
//       if (product.category) {
//         await createCategory({ name: product.category, parentId: "" });
//       }
//       console.log("Product addition complete");
//       return totalProducts;
//     } catch (err) {
//       console.log("Failed to add a product to database", err);
//       throw err;
//     }
//   }

//   static async addProducts(products: Product[]): Promise<Product[]> {
//     try {
//       const productsInDb = await FileManager.readFromFile(productPath);
//       let totalProducts = [...productsInDb];
//       for (const product of products) {
//         product.productid = generateId();
//         if (this.getProductIndex(products, product.productid) < 0) {
//           console.log(product);
//           totalProducts.push(product);
//         } else {
//           console.log("Product Already exists");
//         }
//       }
//       await FileManager.writeToFile(productPath, totalProducts);
//       console.log("Products addition complete");
//       return totalProducts;
//     } catch (err) {
//       console.log("Failed to add products to the database", err);
//       throw err;
//     }
//   }

//   static async updateProduct(productid: string, update: ProductOptions): Promise<Product[]> {
//     try {
//       const products = await FileManager.readFromFile(productPath);
//       const productIndex = this.getProductIndex(products, productid);
//       if (productIndex < 0) throw new Error("No product found");
//       const product = products[productIndex];

//       Object.assign(product, {
//         ...(update.name && { name: update.name }),
//         ...(update.price && { price: update.price }),
//         ...(update.description && { description: update.description }),
//         ...(update.category && { category: update.category }),
//         ...(update.inventory && { inventory: update.inventory }),
//       });

//       if (product.category) {
//         await createCategory({ name: product.category, parentId: "" });
//       }

//       await FileManager.writeToFile(productPath, products);
//       console.log("Product update complete");
//       return products;
//     } catch (err) {
//       console.log("Failed to update a product", err);
//       throw err;
//     }
//   }

//   static async deleteProduct(productid: string): Promise<Product[]> {
//     try {
//       const products = await FileManager.readFromFile(productPath);
//       const totalProducts = products.filter(product => product.productid !== productid);
//       await FileManager.writeToFile(productPath, totalProducts);
//       console.log("Product removal complete");
//       return totalProducts;
//     } catch (err) {
//       console.log("Failed to remove a product", err);
//       throw err;
//     }
//   }

//   static async increaseProductInventory(id: string, quantity: string | number): Promise<Product[]> {
//     try {
//       const products = await FileManager.readFromFile(productPath);
//       const updated = products.map(product =>
//         product.productid === id
//           ? { ...product, inventory: Number(product.inventory) + Number(quantity) }
//           : product
//       );
//       await FileManager.writeToFile(productPath, updated);
//       console.log("Product inventory increased");
//       return updated;
//     } catch (err) {
//       console.log("Failed to increase product inventory", err);
//       throw err;
//     }
//   }

//   static checkProductInventory(products: Product[], id: string, quantity: number): boolean {
//     return products.some(product => product.productid === id && product.inventory >= quantity);
//   }

//   static async decreaseProductInventory(id: string, quantity: number): Promise<Product[]> {
//     try {
//       const products = await FileManager.readFromFile(productPath);
//       if (!this.checkProductInventory(products, id, quantity)) {
//         console.log("Insufficient Inventory");
//         throw new Error("Insufficient Inventory");
//       }
//       const updated = products.map(product =>
//         product.productid === id
//           ? { ...product, inventory: Number(product.inventory) - quantity }
//           : product
//       );
//       await FileManager.writeToFile(productPath, updated);
//       console.log("Product inventory decreased");
//       return updated;
//     } catch (err) {
//       console.log("Failed to decrease product inventory", err);
//       throw err;
//     }
//   }
// }

// export default ProductService;
