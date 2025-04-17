import { ProductOptions } from "../../common/types/productType.js";
import { AddUser, UpdateUser } from "../../common/types/userType.js";
import userServices from "../../services/userServices.js";

export const signUp = async (user: AddUser) => {
  try {
    if (
      !user.firstname ||
      !user.lastname ||
      !user.username ||
      !user.email ||
      !user.password
    ) {
      return {
        message: "Please provide all required user info",
      };
    }
    const result = await userServices.signUp(user, "cli");
    if (!result) {
      return { message: "Sign up failed. User Already Exists" };
    }
    return { message: "User registered successfully", response: result };
  } catch (err) {
    console.error("Sign up error:", err);
    return [];
  }
};

export const signIn = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    if (!username || !email || !password) {
      return { message: "Please provide username, email, and password" };
    }
    const result = await userServices.signIn(username, email, password, "cli");
    if (!result) {
      return { message: "Login failed. User not found" };
      return;
    }
    return { message: "Login successful", response: result };
  } catch (err) {
    console.error("Sign in error:", err);
    return [];
  }
};

export const deleteUser = async (userid: string) => {
  try {
    if (!userid) {
      return { message: "User ID required" };
    }
    const result = await userServices.deleteUser(userid, "cli");
    if (!result) {
      return { message: "User deletion failed or user not found" };
    }
    return { message: "User deleted successfully", response: result };
  } catch (err) {
    console.error("Delete user error:", err);
    return [];
  }
};

export const updateUserInfo = async (userid: string, update: UpdateUser) => {
  try {
    if (!userid) {
      return { message: "User ID is required" };
    }

    if (Object.keys(update).length === 0) {
      return { message: "Provide at least one field to update" };
    }

    const result = await userServices.updateUserInfo(userid, update, "cli");
    if (!result) {
      return { message: "User update failed or user not found" };
    }
    return { message: "User information updated", response: result };
  } catch (err) {
    console.error("Update user error:", err);
    return [];
  }
};

export const getUser = async (userid: string) => {
  try {
    if (!userid) {
      return { message: "User ID is required" };
    }
    const result = await userServices.getUser(userid, "cli");
    if (!result) {
      return { message: "User not found" };
    }
    return { message: "User search successfull", response: result };
  } catch (err) {
    console.error("Search user error:", err);
    return { message: "Unexpected error during search" };
  }
};
