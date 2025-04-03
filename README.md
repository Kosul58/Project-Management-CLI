# Project Management CLI

// Data storage

// ./src/database/data

- Product data is stored in data/products.json
- Cart data is stored in data/cart.json
- Order data is stored in data/orders.json

# Product functions are in product.js

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

# Cart functions are in cart.js

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

# Order functions are in order.js

## Description of all fucntions in order.js

1. viewOrders()
   -argument -> userid
   -return -> an array of all the orders in the order.json file for a given user based on userid if userid else it returns an array of all the orders in the order.json file

2) createOrder()
   -argument -> userid , products
   products = [productid1 , productid2]

   -return -> none

   createOrder(userid , products)
   -> used to create an order for a user in the order.json file
   -> creates order based on cart.json file
   -> update product inventory also

3) updateOrderStatus()
   -argument -> orderid , userid , newstatus
   -return -> none

   updateOrderStatus(orderid , userid , status)
   -> used to update the status of an order in the order.json file

4) cancelOrder()
   -argument -> (orderid , userid)
   -return -> none

   cancelOrder(orderid,userid)
   -> used to cancel an order of products based on the order id and user id
   -> changes product inventory based on order quanity

5) cancelAOrder()
   -argument -> orderid , userid , productid
   -return -> none

   cancelAOrder(orderid , userid , productid)
   -> used to cancel the order of a single product based on orderid , userid and productid

## Order Operations

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

## file read and write functions are exported from fileFuncs.js in handlers folder

### Functions in fileFunc.js

1. readCartFile()
   -> used to read data from the cart.json file

2) writeCartFile()
   -> used to write data to the cart.json file

3) readProductFile()
   -> used to read data from the products.json file

4) writeProductFile()
   -> used to write data to the products.josn file

5) readOrderfile()
   -> used to read data from the orders.json file

6) writeOrderFile()
   -> used to wrtie data to the orders.json file

7) generateId()
   -> used to generate a unique id based on present data and a random number string

8) getCurrentDateTImeStamp()
   -> used to generate a date+time stamp

# CLI command list

## Product part

1. add a product
   -> node index.js product add --name "Laptop" --price 999.99 --inventory 500

2. list all products
   -> node index.js product list

3. update a product
   ->node index.js product update --productid 10 --name Fantech Mouse --price 5000 --inventory 80

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
   -> node index.js order list

3. to cancel a order of products
   -> node index.js order cancel userid orderid

4. to cancel the order of a single product
   -> node index.js order cancelaorder userid orderid productid
