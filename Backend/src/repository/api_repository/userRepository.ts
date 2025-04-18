import { UpdateUser, User } from "../../common/types/userType.js";
import fileManager from "../../utils/fileManager.js";
import { getCurrentDateTimeStamp, comparePassword } from "../../utils/utils.js";

import UserSchema from "../../models/User.js";
class UserRepository {
  private async passwordCheck(password: string, encryptedPassword: string) {
    const check = await comparePassword(password, encryptedPassword);
    return check;
  }

  private async usernameCheck(newUsername: string, id: string) {
    const user = await UserSchema.findOne({ username: newUsername });
    if (user?._id.toString() === id) return false;
    return user;
  }
  public async signIn(username: string, email: string, password: string) {
    try {
      const user = await UserSchema.findOne({
        username: username,
        email: email,
      });
      if (!user) {
        return undefined;
      }
      const check = await this.passwordCheck(password, user.password);
      if (!check) {
        return null;
      }
      user.lastLogin = getCurrentDateTimeStamp();
      await user.save();
      return user;
    } catch (err) {
      console.log("Failed to signin user");
      throw err;
    }
  }

  public async signUp(user: User) {
    try {
      const searchUser = await UserSchema.findOne({
        username: user.username,
        email: user.email,
      });
      if (searchUser) {
        return null;
      }
      const newUser = new UserSchema({
        ...user,
        createdAt: getCurrentDateTimeStamp(),
        lastLogin: getCurrentDateTimeStamp(),
      });
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log("Failed to register user", err);
      throw err;
    }
  }

  public async getUser(userid: string) {
    try {
      const user = await UserSchema.findOne({ _id: userid });
      if (!user) {
        return null;
      }
      return user;
    } catch (err) {
      console.log("failed to search user", err);
      throw err;
    }
  }

  public async deleteUser(userid: string) {
    try {
      const user = UserSchema.findByIdAndDelete({ _id: userid });
      if (!user) return null;
      return user;
    } catch (err) {
      console.log("Failed to remove user", err);
      throw err;
    }
  }

  public async updateUserInfo(userid: string, update: UpdateUser) {
    try {
      if (update.username) {
        const check = await this.usernameCheck(update.username, userid);
        if (check) return null;
      }
      // console.log(update);
      const user = await UserSchema.findByIdAndUpdate(
        userid,
        { $set: update },
        { new: true }
      );
      if (!user) {
        return undefined; // User not found
      }
      return user;
    } catch (err) {
      console.log("failed to update user information", err);
      throw err;
    }
  }

  public async updatePassword(userid: string, password: string) {}
  public async updateEmail(userid: string, email: string) {}
}

export default new UserRepository();
