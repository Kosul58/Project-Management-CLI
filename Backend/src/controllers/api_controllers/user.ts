import { RequestHandler } from "express";
import { AddUser, UpdateUser } from "../../common/types/userType.js";
import userServices from "../../services/userServices.js";

export const signUp: RequestHandler = async (req, res) => {
  const user: AddUser = req.body;
  try {
    if (
      !user.firstname ||
      !user.lastname ||
      !user.username ||
      !user.email ||
      !user.password
    ) {
      res
        .status(400)
        .json({ message: "Please provide all required user info" });
      return;
    }
    const result = await userServices.signUp(user, "api");
    if (!result) {
      res.status(409).json({ message: "Sign up failed. User Already Exists" });
      return;
    }
    res
      .status(201)
      .json({ message: "User registered successfully", response: result });

    return;
  } catch (err) {
    console.error("Sign up error:", err);
    res.status(500).json({ message: "Unexpected error during sign up" });
    return;
  }
};

export const signIn: RequestHandler = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      res
        .status(400)
        .json({ message: "Please provide username, email, and password" });
      return;
    }
    const result = await userServices.signIn(username, email, password, "api");
    if (result === undefined) {
      res.status(404).json({ message: "Signin failed. User not found" });
      return;
    }
    if (result === null) {
      res.status(400).json({ message: "Signin failed. Password do not match" });
      return;
    }
    res.status(200).json({ message: "Signin successful", response: result });
    return;
  } catch (err) {
    console.error("Sign in error:", err);
    res.status(500).json({ message: "Unexpected error during sign in" });
    return;
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  const { userid } = req.params;
  try {
    if (!userid) {
      res.status(400).json({ message: "User ID required" });
      return;
    }
    const result = await userServices.deleteUser(userid, "api");
    if (!result) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", response: result });

    return;
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Unexpected error during user deletion" });
    return;
  }
};

export const updateUserInfo: RequestHandler = async (req, res) => {
  const { userid } = req.params;
  const update: UpdateUser = req.body;
  try {
    if (!userid) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    if (Object.keys(update).length === 0) {
      res.status(400).json({ message: "Provide at least one field to update" });
      return;
    }

    const result = await userServices.updateUserInfo(userid, update, "api");
    if (result === undefined) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (result === null) {
      res
        .status(400)
        .json({ message: "Another user with same Username already exits" });
      return;
    }
    res
      .status(200)
      .json({ message: "User information updated", response: result });
    return;
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Unexpected error during update" });
    return;
  }
};

export const getUser: RequestHandler = async (req, res) => {
  const { userid } = req.params;
  try {
    if (!userid) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    const result = await userServices.getUser(userid, "api");
    if (!result) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "User search successfull", response: result });
    return;
  } catch (err) {
    console.error("Search user error:", err);
    res.status(500).json({ message: "Unexpected error during search" });
    return;
  }
};
