import express from "express";
import { createDriver, driverLogin, getDriverData } from "../controller/driverController";
const router = express.Router();

router.get("/get", getDriverData);
router.post("/add", createDriver);
router.post("/driverlogin", driverLogin);

export default router;
