import { AddUser, UpdateUser, User } from "../common/types/userType.js";
import { encryptPassword } from "../utils/utils.js";
import apiUserRepository from "../repository/api_repository/userRepository.js";
import cliUserRepository from "../repository/cli_repository/userRepository.js";
class UserServices {
  private async generateUser(user: AddUser): Promise<User> {
    const encryptedPassword = await encryptPassword(user.password);
    return {
      userid: "",
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      password: encryptedPassword,
      createdAt: "",
      lastLogin: "",
      role: "",
    };
  }
  public async signUp(user: AddUser, target: "cli" | "api") {
    try {
      const newUser = await this.generateUser(user);
      let result;
      target === "cli"
        ? (result = await cliUserRepository.signUp(newUser))
        : (result = await apiUserRepository.signUp(newUser));
      return result;
    } catch (err) {
      console.log("Failed to register user", err);
      throw err;
    }
  }

  public async signIn(
    username: string,
    email: string,
    password: string,
    target: "cli" | "api"
  ) {
    try {
      let result;
      target === "cli"
        ? (result = await cliUserRepository.signIn(username, email, password))
        : (result = await apiUserRepository.signIn(username, email, password));

      return result;
    } catch (err) {
      console.log("Faile to signin user", err);
      throw err;
    }
  }

  public async getUser(userid: string, target: "cli" | "api") {
    try {
      let result;
      target === "cli"
        ? (result = await cliUserRepository.getUser(userid))
        : (result = await apiUserRepository.getUser(userid));
      return result;
    } catch (err) {
      throw err;
    }
  }
  public async deleteUser(userid: string, target: "cli" | "api") {
    try {
      let result;
      target === "cli"
        ? (result = await cliUserRepository.deleteUser(userid))
        : (result = await apiUserRepository.deleteUser(userid));
      return result;
    } catch (err) {
      console.log("Failed to delete a user", err);
      throw err;
    }
  }

  public async updateUserInfo(
    userid: string,
    update: UpdateUser,
    target: "cli" | "api"
  ) {
    try {
      let result;
      target === "cli"
        ? (result = await cliUserRepository.updateUserInfo(userid, update))
        : (result = await apiUserRepository.updateUserInfo(userid, update));
      return result;
    } catch (err) {
      console.log("Failed to update user info.", err);
      throw err;
    }
  }
  public async updatePassword() {
    try {
    } catch (err) {}
  }
  public async updateEmail() {
    try {
    } catch (err) {}
  }
}

export default new UserServices();
