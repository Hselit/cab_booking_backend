import {
  getRideResponse,
  rideDetailsRequest,
  rideDetailsResponse,
  rideResponse,
} from "./../dto/ride.dto";
import { UserService } from "../../login/users/service/userService";
import prisma from "../../utils/prisma";

export class RideService {
  static async createNewRide(rideDetails: rideDetailsRequest) {
    try {
      const isValidUser = await UserService.getUserById(rideDetails.user_id);
      if (!isValidUser) {
        throw new Error("No User Found with the Id");
      }
      const createdRide: rideDetailsResponse = await prisma.ride.create({
        data: rideDetails,
        include: {
          driver: {
            include: { car: true },
          },
        },
      });
      return createdRide;
    } catch (error) {
      throw error;
    }
  }

  static async getRideById(rideId: string) {
    try {
      const rideDetails: getRideResponse = await prisma.ride.findUnique({
        where: { ride_id: rideId },
      });
      return rideDetails;
    } catch (error) {
      throw error;
    }
  }

  static async updateRide(rideId: string, status: string) {
    try {
      const isValidRide: getRideResponse = await RideService.getRideById(rideId);
      if (!isValidRide) {
        throw new Error("No Ride Found with the Id");
      }
      const updatedRide: rideResponse = await prisma.ride.update({
        where: { ride_id: rideId },
        data: { status: status },
      });
      return updatedRide;
    } catch (error) {
      throw error;
    }
  }

  static async getAllRide() {
    try {
      const rideDetails = await prisma.ride.findMany();
      return rideDetails;
    } catch (error) {
      throw error;
    }
  }

  static async deleteRide(rideId: string) {
    try {
      const deletedride = await prisma.ride.delete({ where: { ride_id: rideId } });
      return deletedride;
    } catch (error) {
      throw error;
    }
  }
}
