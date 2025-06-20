import express from "express";
import { createCar, getCarById } from "../controller/carController";
import { validate } from "../../../utils/zod";
import { carIdSchema, createCarSchema } from "../schema/carSchema";
const router = express.Router();

router.post("/addvehicle", validate(createCarSchema, "body"), createCar);
router.get("/getcar/:id", validate(carIdSchema, "params"), getCarById);

export default router;
