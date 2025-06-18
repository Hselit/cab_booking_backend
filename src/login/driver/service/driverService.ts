import bcrypt from "bcrypt";
import prisma from "../../../utils/prisma";
import { driverLoginRequest, driverRequest, driverResponse } from "../dto/driver.dto";
import { checkDriverPassword, generateDriverToken } from "../middleware/driverAuthentication";
import { error } from "console";

export class DriverService {
  static async getAllDrivers() {
    try {
      const driverData = await prisma.driver.findMany();
      return driverData;
    } catch (error) {
      throw error;
    }
  }

  static async addNewDriver(driverData: driverRequest) {
    try {
      const hashedpass = await bcrypt.hash(driverData.password, 10);
      // console.log(hashedpass);
      driverData.password = hashedpass;
      const createdDriver = await prisma.driver.create({ data: driverData });
      return createdDriver;
    } catch (error) {
      throw error;
    }
  }

  static async getDriverbyEmail(email: string) {
    try {
      const driverData = await prisma.driver.findUnique({ where: { email: email } });
      console.log(driverData);
      if (!driverData) {
        return null;
      }
      return driverData;
    } catch (err) {
      throw err;
    }
  }

  static async driverLogin(loginData: driverLoginRequest) {
    try {
      const driverExist: driverResponse = await DriverService.getDriverbyEmail(loginData.email);
      if (!driverExist) {
        return { error: "No Driver Found" };
      }
      const isValidCredentail: boolean = await checkDriverPassword(
        loginData.password,
        driverExist.password
      );
      if (!isValidCredentail) {
        return { error: "Invalid Password" };
      }
      const token = await generateDriverToken(
        driverExist.drivername,
        driverExist.email,
        driverExist.phone
      );
      console.log(token);
      return { token };
    } catch (error) {
      throw error;
    }
  }
}
