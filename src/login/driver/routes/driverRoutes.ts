import express from "express";
import {
  acceptRide,
  createDriver,
  driverLogin,
  getAvailableDriver,
  getDriverbyId,
  getDriverData,
} from "../controller/driverController";
import { validate } from "../../../utils/zod";
import {
  acceptRideSchema,
  createDriverSchema,
  driverIdSchema,
  driverLoginSchema,
} from "../schema/driverSchema";
const router = express.Router();

router.get("/getdriver", getDriverData);
router.post("/adddriver", validate(createDriverSchema, "body"), createDriver);
router.post("/driverlogin", validate(driverLoginSchema, "body"), driverLogin);
router.post("/acceptride", validate(acceptRideSchema, "body"), acceptRide);
router.get("/availabledriver", getAvailableDriver);
router.get("/getdriver/:id", validate(driverIdSchema, "params"), getDriverbyId);

export default router;
