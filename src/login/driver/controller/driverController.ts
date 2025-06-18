import { Response, Request } from "express";
import { DriverService } from "../service/driverService";
import {
  driverLoginRequest,
  driverLoginResponse,
  driverRequest,
  driverResponse,
} from "../dto/driver.dto";
import { token } from "morgan";
import { error } from "console";

export const getDriverData = async (req: Request, res: Response) => {
  try {
    const driverData = await DriverService.getAllDrivers();
    res.status(200).json({ message: "Data Fetched Successfully", data: driverData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Occured" });
  }
};

export const createDriver = async (req: Request, res: Response) => {
  try {
    const driverData: driverRequest = req.body;
    const createdDriver: driverResponse = await DriverService.addNewDriver(driverData);
    res.status(200).json({ message: "Driver Created Successfully", data: createdDriver });
  } catch (err) {
    console.error(err);
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
