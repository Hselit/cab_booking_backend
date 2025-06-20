import bcrypt from "bcrypt";
import prisma from "../../../utils/prisma";
import {
  driverId,
  driverLoginRequest,
  driverRequest,
  driverResponse,
  driverRideResponse,
  getAllDrivers,
  getSingleDriverResponse,
} from "../dto/driver.dto";
import { checkDriverPassword, generateDriverToken } from "../middleware/driverAuthentication";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/runtime/library";
import { RideService } from "../../../ride/service/rideService";
import { getRideResponse } from "../../../ride/dto/ride.dto";

export class DriverService {
  static async getAllDrivers() {
    try {
      const driverData: getAllDrivers = await prisma.driver.findMany();
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
      const createdDriver: driverResponse = await prisma.driver.create({ data: driverData });
      return createdDriver;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new Error(`A driver with this email already exists.`);
      }
      throw error;
    }
  }

  static async getDriverbyEmail(email: string) {
    try {
      const driverData: getSingleDriverResponse = await prisma.driver.findUnique({
        where: { email: email },
      });
      console.log(driverData);
      if (!driverData) {
        return null;
      }
      return driverData;
    } catch (err) {
      throw err;
    }
  }

  static async getDriverbyId(id: driverId) {
    try {
      const driverData: getSingleDriverResponse = await prisma.driver.findUnique({
        where: { driver_id: id },
      });
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
      const driverExist: getSingleDriverResponse = await DriverService.getDriverbyEmail(
        loginData.email
      );
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
      const token = generateDriverToken(
        driverExist.drivername,
        driverExist.email,
        driverExist.phone,
        driverExist.role
      );
      console.log(token);
      return { token };
    } catch (error) {
      throw error;
    }
  }

  static async getAvailableDrivers() {
    try {
      const availableDriver: getAllDrivers = await prisma.driver.findMany({
        where: {
          status: "Available",
          car: { isNot: null },
        },
      });
      return availableDriver;
    } catch (error) {
      throw error;
    }
  }

  static async acceptRide(rideId: string, driverId: driverId, status: string) {
    try {
      const isValidDriver: getSingleDriverResponse = await DriverService.getDriverbyId(driverId);
      if (!isValidDriver) {
        throw new Error("No Driver Found with the Id");
      }
      const isValidRide: getRideResponse = await RideService.getRideById(rideId);
      if (!isValidRide) {
        throw new Error("No Ride Found with the Id");
      }
      const updatedRide: driverRideResponse = await prisma.driver.update({
        where: { driver_id: driverId },
        data: {
          status: status,
          rides: { connect: { ride_id: rideId } },
        },
        include: {
          rides: true,
        },
      });
      return updatedRide;
    } catch (error) {
      throw error;
    }
  }
}
