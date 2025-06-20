import express from "express";
import path from "path";
import logger from "morgan";

import indexRouter from "./routes/index";
import usersRouter from "../src/login/users/routes/userRoutes";
import driverRouter from "./login/driver/routes/driverRoutes";
import carRouter from "./vehicle/car/routes/carRoutes";
import rideRouter from "./ride/routes/rideRoutes";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/", indexRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/driver", driverRouter);
app.use("/api/v1/car", carRouter);
app.use("/api/v1/ride", rideRouter);

export default app;
