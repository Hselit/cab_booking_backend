import { Response, Request } from "express";
import { CarDetailsResponse, createCarRequest, createCarResponse } from "../dto/car.dto";
import { CarService } from "../service/carService";

export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const cardata: createCarRequest = req.body;
    const createdData: createCarResponse = await CarService.createCar(cardata);
    res.status(201).json({ message: "Car Data Created", data: createdData });
  } catch (error: any) {
    console.log(error);
    if (error.message.includes("already exists")) {
      res.status(400).json({ error: error.message });
      return;
    }
    if (error.message.includes("No Driver Found")) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCarById = async (req: Request, res: Response) => {
  try {
    const carId = req.params.id;
    const carDetails: CarDetailsResponse = await CarService.getCarById(carId);
    res.status(200).json({ message: "Car Details Feched Successfully", data: carDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
