import {
  acceptRideRequest,
  driverId,
  driverRideResponse,
  getAllDrivers,
  getSingleDriverResponse,
} from "./../dto/driver.dto";
import { Response, Request } from "express";
import { DriverService } from "../service/driverService";
import {
  driverLoginRequest,
  driverLoginResponse,
  driverRequest,
  driverResponse,
} from "../dto/driver.dto";

export const getDriverData = async (req: Request, res: Response) => {
  try {
    const driverData: getAllDrivers = await DriverService.getAllDrivers();
    res.status(200).json({ message: "Data Fetched Successfully", data: driverData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Occured" });
  }
};

export const createDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const driverData: driverRequest = req.body;
    const createdDriver: driverResponse = await DriverService.addNewDriver(driverData);
    res.status(200).json({ message: "Driver Created Successfully", data: createdDriver });
  } catch (err: any) {
    console.error(err);
    if (err.message.includes("already exists")) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(500).json({ error: "Error Occured" });
  }
};

export const driverLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const loginData: driverLoginRequest = req.body;
    const responsedata: driverLoginResponse = await DriverService.driverLogin(loginData);
    if (responsedata.error) {
      if (responsedata.error == "No Driver Found") {
        res.status(404).json({ error: responsedata.error });
        return;
      } else if (responsedata.error == "Invalid Password") {
        res.status(401).json({ error: responsedata.error });
        return;
      }
    }
    res.status(200).json({ message: "Logged In Success", token: responsedata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const acceptRide = async (req: Request, res: Response) => {
  try {
    const acceptRideData: acceptRideRequest = req.body;
    const acceptedRideData: driverRideResponse = await DriverService.acceptRide(
      acceptRideData.ride_id,
      acceptRideData.driver_id,
      acceptRideData.status
    );
    res.status(200).json({ message: "Ride Accepted Successfully", data: acceptedRideData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAvailableDriver = async (req: Request, res: Response) => {
  try {
    const availDrivers: getAllDrivers = await DriverService.getAvailableDrivers();
    res.status(200).json({ message: "Fetched Available Driver", data: availDrivers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDriverbyId = async (req: Request, res: Response) => {
  try {
    const driverId: driverId = req.params.id;
    const driverData: getSingleDriverResponse = await DriverService.getDriverbyId(driverId);
    res.status(200).json({ message: "Fetched Available Driver", data: driverData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
