import productRepository from "../repository/productRepositroy";
const getProducts = async () => {
    try {
        let result = await productRepository.getProducts();
        return result;
    }
    catch (err) {
        console.log("error in product Services getAllProduct.Failed to get the data of all products", err);
        throw err;
    }
};
const getProductById = async (prouctid) => {
    try {
        const data = await productRepository.getProductById(prouctid);
        return data;
    }
    catch (err) {
        console.log("error in product Services getProductById. Failed to get the data of a product based on productid", err);
        throw err;
    }
};
const createProduct = (restData) => {
    let { name, price, invenotry, description, category } = restData;
    if (!name || !price || !invenotry) {
        throw new Error("Important fields missing during the addition of a product");
    }
    return {
        productid: "",
        name,
        price: Number(price),
        inventory: Number(invenotry),
        description,
        category,
    };
};
const addProduct = async (restData) => {
    try {
        // Create a new product
        const newProduct = createProduct(restData);
        // Send product data to repository to add to file
        const totalProducts = await productRepository.addProduct(newProduct);
        console.log("Product added successfully!");
        return { newProduct, totalProducts };
    }
    catch (err) {
        console.log("error in product Services addProduct. Failed to add a new product", err);
        throw err;
    }
};
// productsarray = [{name: , price: , inventory: }]
const addProducts = async (products) => {
    try {
        let myProduct = [];
        for (let product of products) {
            const newProduct = createProduct(product);
            myProduct.push(newProduct);
        }
        const data = await productRepository.addProducts(myProduct);
        // console.log(productsarray);
        return data;
    }
    catch (err) {
        console.log("error in product Services addProducts. Failed to add a batch of new products", err);
        throw err;
    }
};
const updateProduct = async (productid, update) => {
    try {
        const newProducts = await productRepository.updateProduct(productid, update);
        return newProducts;
    }
    catch (err) {
        console.log("error in product Services updateProduct. Failed to update a product", err);
        throw err;
    }
};
const deleteProduct = async (productid) => {
    try {
        const data = await productRepository.deleteProduct(productid);
        return data;
    }
    catch (err) {
        console.log("error in product Services delete. Failed to delete a product", err);
        throw err;
    }
};
const increaseProductInventory = async (id, quantity) => {
    try {
        let products;
        products = await productRepository.increaseProductInventory(id, quantity);
        return products;
    }
    catch (err) {
        console.log("error in product Services product inventory increase. Failed to increase the inventory of a product", err);
        throw err;
    }
};
const decreaseProductInventory = async (id, quantity) => {
    try {
        let products;
        products = await productRepository.decreaseProductInventory(id, quantity);
        return products;
    }
    catch (err) {
        console.log("error in product Services product inventory decrease. Failed to decrease the inventory of a product", err);
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
