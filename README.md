# Project Management CLI

// Data storage

// ./src/database/data

- Product data is stored in data/products.json
- Cart data is stored in data/cart.json
- Order data is stored in data/orders.json

## Folder Structure

1. router
   -> to handle routing of user command

2. controllers
   -> used to handle request from router and send response
   -> sends data to services

3. services
   -> used to handle business logic
   -> sends data to repository

4. repository
   -> used to store data to files in database/data folder files

5. utils
   -> used to provide commonly used functions to all

6. database
   -> used to store data

# Product

## Product Operations

// Display all products
// const data = await getProductList();
// console.log(data);

// display product by id
// console.log(await getProductById(productid123))

// Add a new product (name, price , inventory)
// addAProduct("Mouse", 55 , 200);

// add a batch of products
// addProducts([{name , price , inventory} , {...} , {...} ,...])

// Update a product (productid , newname , newprice)
// updateProduct("m8wzk6l9p5npgvh17qj", "kaspers", 555);

// Delete a product (productid)
// deleteProduct('10');

// update a product Inventory (productid , quantity)
// updateProductInventory('20254sd5fs', 2);

# Cart

## Cart Operations

// View all products in the cart
// const data = await viewCart();
// console.log(data);

// view all products in the cart of a user
// viewCartProducts(userid)

// view a product in the cart of a user
// viewCartProduct(productid , userid)

// Add a product to the cart (userid , productid , quantity)
// addProductToCart('1515', '5' , 10);

// update a product in the cart (userid , productid , update)
// updateProduct('1515', '1', { price: 1500, quantity: 50 });

// to remove a product from the cart (userid , productid)
// removeProduct('1515' ,'5');

// to remove some products from the cart (userid , products)
// removeSomeProduct(userid , productsarray)

// to remove all products from the cart (userid)
// removeAllProduct(userid)

// to calculate total cost
// const total = await calcTotal();
// console.log(`Total price = $${total}`);

# Order

## Order Operations

// to view all orders for a user
// console.log(await viewOrders(userid))

// to create a new order (userid , productid)
// createOrder('2018', '5');

// to create a order of multiple products
// createOrders(userid , productsarray)

// to update a order status (orderid , userid , status)
// updateOrderStatus('3', '1015' , "done");

// to cancel order for a user (orderid , userid)
// cancelOrder('4', '2015');

// to cancel the order of a single product
// cancelAOrder ('orderid' , 'userid' , 'productid' )

## file read and write functions are exported from fileManager.js in utils folder

### Functions in fileManager.js

1. readToFile()
   -> used to read data from the cart.json file

2) writeToFile()
   -> used to write data to the cart.json file

## utility functions are in utils.js in utils folder

1. generateId()
   -> used to generate a unique id based on present data and a random number string

2. getCurrentDateTImeStamp()
   -> used to generate a date+time stamp

3. parseOptions()
   -> used to parse command line prompts for routing

# CLI command list

## Product part

1. add a product
   -> node index.js product add --name "Laptop" --price 999.99 --inventory 500

2. list products
   -> node index.js product list (list of all products)
   -> node index.js product list --productid 5 (product based on product id)

3. update a product
   -> node index.js product update --productid 10 --name Fantech Mouse --price 5000 --inventory 80

4. delete a product
   -> node index.js product delete --productid 10

## Cart part

1. add a product to the cart
   -> node index.js cart add --userid kos7 --productid 3 --quantity 10

2. view products in the cart
   -> node index.js cart view --userid kos7 --productid 3 (view a product in the cart of a user)
   -> node index.js cart view --userid kos7 (view all products in the cart of a user)
   -> node index.js cart view (view all products in the cart)

3. remove product from the cart for a user
   -> node index.js cart remove --userid kos7 --productid 9
   (removes a product by matching productid and userid)

   -> node index.js cart remove --userid kos7
   (removes products by matching userid)

4. update a product for a user in the cart
   -> node index.js cart update --userid kos7 --productid 3 --price 90

5. calculate total price of all products in the cart of a user
   -> node index.js cart total --userid kos7

## Order part

1. add a product in cart to order
   -> node index.js order create --userid user123 --productid product123

2. view all orders in the order.json file
   -> node index.js order list --userid k202

3. to cancel a order of products
   -> node index.js order cancel --userid user123 --orderid order123

4. to cancel the order of a single product
   -> node index.js order cancelaorder --userid user123 --orderid order123 --productid product123
