import express from "express";
import path from "path";
import logger from "morgan";

import indexRouter from "./routes/index";
import usersRouter from "./users/routes/userRoutes";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
