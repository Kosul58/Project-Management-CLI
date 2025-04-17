import { AddUser, UpdateUser, User } from "../common/types/userType.js";
import { encryptPassword } from "../utils/utils.js";
import apiUserRepository from "../repository/api_repository/userRepository.js";
import cliUserRepository from "../repository/cli_repository/userRepository.js";

class UserServices {
  private getRepository(target: "cli" | "api") {
    return target === "cli" ? cliUserRepository : apiUserRepository;
  }
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
      const repository = this.getRepository(target);
      return await repository.signUp(newUser);
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
      const repository = this.getRepository(target);
      return await repository.signIn(username, email, password);
    } catch (err) {
      console.log("Faile to signin user", err);
      throw err;
    }
  }

  public async getUser(userid: string, target: "cli" | "api") {
    try {
      const repository = this.getRepository(target);
      return await repository.getUser(userid);
    } catch (err) {
      throw err;
    }
  }

  public async deleteUser(userid: string, target: "cli" | "api") {
    try {
      const repository = this.getRepository(target);
      return await repository.deleteUser(userid);
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
      const updateFields = Object.fromEntries(
        Object.entries(update).filter(([_, value]) => value !== undefined)
      ) as Partial<UpdateUser>;

      const repository = this.getRepository(target);

      return await repository.updateUserInfo(userid, updateFields);
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
