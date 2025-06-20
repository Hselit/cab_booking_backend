import express from "express";
import {
  createRide,
  deleteById,
  getAllRides,
  getRidesById,
  updateRideStatus,
} from "../controller/rideController";
import { validate } from "../../utils/zod";
import { createRideSchema, rideIdSchema, updateRideStatusSchema } from "../schema/rideSchema";

const router = express.Router();

router.post("/addride", validate(createRideSchema, "body"), createRide);
router.get("/getrides", getAllRides);
router.post("/updatestatus", validate(updateRideStatusSchema, "body"), updateRideStatus);
router.get("/getride/:id", validate(rideIdSchema, "params"), getRidesById);
router.delete("/deleteride/:id", validate(rideIdSchema, "params"), deleteById);

export default router;
