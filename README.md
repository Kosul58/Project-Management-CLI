# Project Management CLI

// Data storage

// ./src/database/data

- Product data is stored in data/products.json
- Cart data is stored in data/cart.json
- Order data is stored in data/orders.json

// Product functions are in product.js

## Description of all fucntions in product.js

1. getProductList()  
   -arguments -> none  
   -return -> an array of all the products in the products.json file

2. addAProduct()
   -arguments -> product name as name and product price as price
   -return -> none

   addProduct(name , price)
   -used to add a product to the products.json file

3. updateAProduct()
   -argument -> productid , name and price
   -return -> none

   updateAProduct(productid , name , price)
   -used to update a product in the products.json file

4. deleteAProduct()
   -argument -> productid
   -return -> none

   deleteAProduct(id)
   -used to delete a product from the products.json file

5. updateAProductInventory()
   -argument -> id , quantity
   -return -> none

   updateAProductInventory(id,quantity)
   -used to change the inventory of a product in products.json file based on if the product is being ordered or canceled by the user

## Product Operations

// Display all products
// const data = await getProductList();
// console.log(data);

// Add a new product (name, price , inventory)
// addAProduct("Mouse", 55 , 200);

// Update a product (productid , newname , newprice)
// updateAProduct("m8wzk6l9p5npgvh17qj", "kaspers", 555);

// Delete a product (productid)
// deleteAProduct('10');

// update a product Inventory (productid , quantity)
// updateAProductInventory('20254sd5fs', 2);

// Cart functions are in cart.js

## Description of all fucntions in product.js

1. viewCart()
   -arguments -> none
   -return -> an array of all the products in the cart.json file

2. addProductToCart()
   -arguments -> userid , productid , quantity
   -return -> none

   addProductToCart(userid, productid , quantity)
   ->used to add a product to the cart.json file
   -> if a product is already in the cart.json file then it simply increases the quantity

3. removeProductFromCart()
   -argument -> userid , productid
   -return none

   removeProductFromCart(userid, productid)
   -> used to remove a product for a user from the cart.json file

4. updateAProductCart()
   -arguments -> userid , productid , update
   update = {price: 500 , quantity: 20}
   -return -> none

   updateAProductCart(useid , productid , update)
   ->used to update a product for a user

5. calcTotal()
   -arguments -> none
   -return -> sum of all the products in the cart.json file

## Cart Operations

// View all products in the cart
// const data = await viewCart();
// console.log(data);

// Add a product to the cart (userid , productid , quantity)
// addProductToCart('1515', '5' , 10);

// update a product in the cart (userid , productid , update)
// updateAProductCart('1515', '1', { price: 1500, quantity: 50 });

// to remove a product from the cart (userid , productid)
// removeProductFromCart('1515' ,'5');

// to calculate total cost
// const total = await calcTotal();
// console.log(`Total price = $${total}`);

// Order functions are in order.js

// file read and write functions are exported from fileFuncs.js in handlers folder

// Cart operations

// Order Operations

// to view total orders
// console.log(await viewOrders())

// to view orders based on userid
// console.log(await viewOrders(1125));

// to create a new order
// createOrder(2018, [1, 5]);

// to update a order status
// updateOrderStatus(3, 1015, "done");

// to cancel order
// cancelOrder(4, 2015);
