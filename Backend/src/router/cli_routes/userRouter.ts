import {
  AddUser,
  UpdateUser,
  UserParser,
} from "../../common/types/userType.js";
import {
  signUp,
  signIn,
  deleteUser,
  updateUserInfo,
  getUser,
} from "../../controllers/cli_controllers/user.js";

import { parseOptions } from "../../utils/utils.js";
const userRouter = async (Command_Prompt: string[]): Promise<void> => {
  const values: UserParser = parseOptions(Command_Prompt.slice(2));
  console.log("val in routes", values);
  let {
    userid,
    firstname = "",
    lastname = "",
    username = "",
    email = "",
    password = "",
  } = values;

  switch (Command_Prompt[1]) {
    case "read":
      const list = await getUser(userid as string);
      console.log(list);
      break;
    case "signup":
      const user: AddUser = {
        firstname,
        lastname,
        username,
        email,
        password,
      };
      const data1 = await signUp(user);
      console.log(data1);
      break;

    case "signin":
      const data2 = await signIn(username, email, password);
      console.log(data2);
      break;

    case "update":
      const update: UpdateUser = {
        firstname,
        lastname,
        username,
      };
      const data3 = await updateUserInfo(userid as string, update);
      console.log(data3);
      break;

    case "delete":
      const data4 = await deleteUser(userid as string);
      console.log(data4);
      break;

    default:
      console.log("Wrong Command");
      console.log("Type 'node index.js help' to view all avialable prompts");
      break;
  }
};

export default userRouter;
