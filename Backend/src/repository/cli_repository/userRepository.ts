import { StripTypeScriptTypesOptions } from "module";
import { UpdateUser, User } from "../../common/types/userType.js";
import fileManager from "../../utils/fileManager.js";
import {
  generateId,
  getCurrentDateTimeStamp,
  comparePassword,
} from "../../utils/utils.js";
import { userPath } from "../../utils/constants.js";
class UserRepository {
  private readonly userPath: string;
  private users: User[] = [];
  constructor() {
    this.userPath = userPath;
  }
  private async loadUsers() {
    this.users = await fileManager.readFromFile(this.userPath);
  }
  private async setUsers() {
    await fileManager.writeToFile(this.userPath, this.users);
  }

  public async signIn(username: string, email: string, password: string) {
    try {
      await this.loadUsers();
      const user = this.users.find(
        (u) => u.username === username && u.email === email
      );
      if (!user) {
        console.log("No user found for the given information");
        return null;
      }
      const savedpassword = user.password;
      const validatePassword = await comparePassword(password, savedpassword);
      if (validatePassword) {
        console.log("User Logged in");
        user.lastLogin = getCurrentDateTimeStamp();
        await this.setUsers();
        return user;
      } else {
        console.log("User Password does not match");
        return null;
      }
    } catch (err) {
      console.log("Failed to signin user");
      throw err;
    }
  }

  private checkUser(user: User) {
    return this.users.find(
      (u) => u.username === user.username && u.email === user.email
    );
  }
  public async signUp(user: User): Promise<User | null> {
    try {
      await this.loadUsers();
      user.userid = generateId();
      user.createdAt = getCurrentDateTimeStamp();
      const isUnique = this.checkUser(user);
      if (isUnique) {
        console.log("User already exists");
        return null;
      }
      this.users.push(user);
      await this.setUsers();
      return user;
    } catch (err) {
      console.log("Failed to register user", err);
      throw err;
    }
  }

  private userIndex(userid: string) {
    return this.users.findIndex((u) => u.userid === userid);
  }

  public async getUser(userid: string) {
    try {
      await this.loadUsers();
      const userIndex = this.userIndex(userid);
      if (userIndex < 0) {
        return null;
      }
      return this.users[userIndex];
    } catch (err) {
      console.log("failed to search user", err);
      throw err;
    }
  }
  public async deleteUser(userid: string) {
    try {
      await this.loadUsers();
      const userIndex = this.userIndex(userid);
      if (userIndex < 0) {
        console.log("No User found");
        return null;
      }
      this.users.splice(userIndex, 1);
      await this.setUsers();
      return this.users;
    } catch (err) {
      console.log("Failed to remove user", err);
      throw err;
    }
  }

  public async updateUserInfo(userid: string, update: UpdateUser) {
    try {
      await this.loadUsers();
      const userIndex = this.userIndex(userid);
      if (userIndex < 0) {
        console.log("User Not found");
        return null;
      }
      const user = this.users[userIndex];
      this.users[userIndex] = {
        ...user,
        ...(update.firstname && { firstname: update.firstname }),
        ...(update.lastname && { lastname: update.lastname }),
        ...(update.username && { username: update.username }),
      };
      await this.setUsers();
      return this.users;
    } catch (err) {
      console.log("failed to update user information", err);
      throw err;
    }
  }

  public async updatePassword(userid: string, password: string) {}
  public async updateEmail(userid: string, email: string) {}
}

export default new UserRepository();
