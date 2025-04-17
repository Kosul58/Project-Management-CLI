import express from "express";
import {
  signUp,
  signIn,
  deleteUser,
  updateUserInfo,
  getUser,
} from "../../controllers/api_controllers/user.js";

const userRouter = express.Router();

userRouter.get("/:userid", getUser);
userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.delete("/:userid", deleteUser);
userRouter.put("/:userid", updateUserInfo);

export default userRouter;
