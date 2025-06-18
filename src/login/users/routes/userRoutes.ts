import express from "express";
import { addNewUser, getAllUser, getSingleUser, userLogin } from "../controller/userController";
const router = express.Router();

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/get", getAllUser);
router.post("/add", addNewUser);
router.post("/userlogin", userLogin);
router.get("/get/:id", getSingleUser);

export default router;
