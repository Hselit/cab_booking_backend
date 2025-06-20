import { userLogin } from "./../controller/userController";
import prisma from "../../../utils/prisma";
import bcrypt from "bcrypt";
import { userLoginRequest, UserRequest, UserResponse, userTokenRequest } from "../dto/user.dto";
import { error } from "console";
import { checkUserPassword, generateUserToken } from "../middleware/userAuthentication";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/runtime/library";

export class UserService {
  static async getAllUser() {
    try {
      const userlist = await prisma.user.findMany();
      console.log(userlist);
      return userlist;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async addNewUser(userData: UserRequest) {
    try {
      const hashedpass = await bcrypt.hash(userData.password, 10);
      console.log(hashedpass);
      userData.password = hashedpass;
      const createdData = await prisma.user.create({ data: userData });
      return createdData;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        const field = error.meta?.target;

        if (field && Array.isArray(field)) {
          if (field.includes("email")) throw new Error("Email already exists");
          if (field.includes("phone")) throw new Error("Phone number already exists");
        }

        throw new Error("User with these details already exists.");
      }
      throw error;
    }
  }

  static async getUserById(userid: string) {
    try {
      const userData = await prisma.user.findUnique({ where: { user_id: userid } });
      return userData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getUserByEmail(email: string) {
    try {
      const userData = await prisma.user.findUnique({ where: { email: email } });
      return userData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async userLogin(userLoginData: userLoginRequest) {
    try {
      const userData: UserResponse = await this.getUserByEmail(userLoginData.email);
      if (!userData) {
        return { error: "No User Found" };
      }
      const isValidCredentail: boolean = await checkUserPassword(
        userLoginData.password,
        userData.password
      );
      if (!isValidCredentail) {
        return { error: "Invalid Credentials" };
      }
      const token = generateUserToken(
        userData.username,
        userData.email,
        userData.phone,
        userData.role
      );
      return { token };
    } catch (error) {
      throw error;
    }
  }
}
