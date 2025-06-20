import { Response, Request } from "express";
import { RideService } from "../service/rideService";
import { rideDetailsRequest, rideDetailsResponse, updateRideStatusRequest } from "../dto/ride.dto";

export const createRide = async (req: Request, res: Response) => {
  try {
    const rideData: rideDetailsRequest = req.body;
    const createdRide: rideDetailsResponse = await RideService.createNewRide(rideData);
    res.status(201).json({ message: "Ride Created Successfully", data: createdRide });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateRideStatus = async (req: Request, res: Response) => {
  try {
    const rideData: updateRideStatusRequest = req.body;
    const updatedRideStatus = await RideService.updateRide(rideData.ride_id, rideData.status);
    res.status(200).json({ message: "Ride Details Updated", data: updatedRideStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllRides = async (req: Request, res: Response) => {
  try {
    const rideList = await RideService.getAllRide();
    res.status(200).json({ message: "Ride Details Fetched Successfully", data: rideList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRidesById = async (req: Request, res: Response) => {
  try {
    const rideId = req.params.id;
    const rideDetails = await RideService.getRideById(rideId);
    res.status(200).json({ message: "Ride Details Fetched Successfully", data: rideDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const rideId = req.params.id;
    const deletedRide = await RideService.deleteRide(rideId);
    res.status(200).json({ message: "Ride Details Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal  Server Error" });
  }
};
