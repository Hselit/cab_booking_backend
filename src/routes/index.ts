import express from "express";
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send({ message: "Welcome to TaxiCab" });
});

export default router;
