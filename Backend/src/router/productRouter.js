const productRouter = (Command_Prompt) => {
  switch (Command_Prompt[1]) {
    case "list":
      console.log("List of all Products");
      break;
    case "add":
      console.log("add a new product");
      break;
    case "update":
      console.log("update a product");
      break;
    case "delete":
      console.log("delete a product");
      break;
    default:
      console.log("Wrong Command");
      console.log("Type 'node index.js help' to view all avialable prompts");
      break;
  }
};

export default productRouter;
