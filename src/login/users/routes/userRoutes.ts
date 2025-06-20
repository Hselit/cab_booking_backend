import express from "express";
import { addNewUser, getAllUser, getSingleUser, userLogin } from "../controller/userController";
import { validate } from "../../../utils/zod";
import { createUserSchema, userIdSchema, userLoginSchema } from "../schema/usersSchema";
const router = express.Router();

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/getusers", getAllUser);
router.post("/adduser", validate(createUserSchema, "body"), addNewUser);
router.post("/userlogin", validate(userLoginSchema, "body"), userLogin);
router.get("/getuser/:id", validate(userIdSchema, "params"), getSingleUser);

export default router;
