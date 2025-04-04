export function parseOptions(args) {
  const options = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].slice(2);
      let nextArg = args[i + 1];
      if (nextArg !== undefined && !nextArg.startsWith("--")) {
        if (key === "price" || key === "inventory") {
          nextArg = Number(nextArg);
        }
        options[key] = nextArg;
        i++;
      }
    }
  }
  return options;
}

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export function getCurrentDateTimeStamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}-${hours}:${minutes}`;
}

export const productPath = "./src/database/data/products.json";

export const cartPath = "./src/database/data/cart.json";

export const orderPath = "./src/database/data/orders.json";

export const helpinfo = `# CLI command list

// ## Product part

// 1. add a product
//    -> node index.js product add --name "Laptop" --price 999.99 --inventory 500

// 2. list all products
//    -> node index.js product list

// 3. update a product
//    -> node index.js product update productid --name 'Gaming Laptop' --price 1299.99

// 4. delete a product
//    -> node index.js product delete productid

// ## Cart part

// 1. add a product to the cart
//    -> node index.js cart add userid productid --quantity 20

// 2. view products in the cart
//    -> node index.js cart view

// 3. remove a product from the cart for a user
//    -> node index.js cart remove userid productid

// 4. update a product for a user in the cart
//    -> node index.js cart update userid productid --price 200 --quantity 5

// ## Order part

// 1. add a product in cart to order
//    -> node index.js order create --userid user123 --productid product123

// 2. view all orders in the order.json file
//    -> node index.js order list

// 3. to cancel a order of products
//    -> node index.js order cancel userid orderid

// 4. to cancel the order of a single product
//    -> node index.js order cancelaorder userid orderid productid `;
