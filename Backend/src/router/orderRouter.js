const orderRouter = (Command_Prompt) => {
  switch (Command_Prompt[1]) {
    case "create":
      console.log("create");
      break;

    case "list":
      console.log("list");
      break;

    case "cancel":
      console.log("cancel");
      break;

    case "cancelaorder":
      console.log("cancel a order");
      break;

    case "statusupdate":
      console.log("update a order status");
      break;

    default:
      console.log("wrong command");
      break;
  }
};

export default orderRouter;
