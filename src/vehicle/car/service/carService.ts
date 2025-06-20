import { createCarRequest, createCarResponse } from "../dto/car.dto";
import prisma from "../../../utils/prisma";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/runtime/library";
import { DriverService } from "../../../login/driver/service/driverService";
import { driverResponse } from "../../../login/driver/dto/driver.dto";

export class CarService {
  static async createCar(carData: createCarRequest) {
    try {
      const dirverId = carData.driver_id;
      const isDriverExist: driverResponse = await DriverService.getDriverbyId(dirverId);
      if (!isDriverExist) {
        throw new Error("No Driver Found with the driver_Id");
      }
      const createdCar: createCarResponse = await prisma.car.create({ data: carData });
      return createdCar;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new Error(`A car with plate Number already exists.`);
      }
      throw error;
    }
  }

  static async getCarById(id: string) {
    try {
      const carData = await prisma.car.findUnique({ where: { car_id: id } });
      if (!carData) {
        return null;
      }
      return carData;
    } catch (err) {
      throw err;
    }
  }
}
