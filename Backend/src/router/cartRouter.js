const cartRouter = (Command_Prompt) => {
  switch (Command_Prompt[1]) {
    case "add":
      console.log("add a product to cart");
      break;

    case "remove":
      console.log("remove a product from cart");
      break;

    case "view":
      console.log("view products");
      break;

    case "total":
      console.log("Total price of all products in the cart");
      break;

    case "update":
      console.log("update a product in the cart");
      break;

    default:
      console.log("Wrong command");
      console.log("Type 'node index.js help' to view all avialable prompts");
      break;
  }
};

export default cartRouter;
