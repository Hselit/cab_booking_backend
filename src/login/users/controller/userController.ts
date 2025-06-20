import { Response, Request } from "express";
import { UserService } from "../service/userService";
import { userLoginRequest, userLoginResponse, UserRequest, UserResponse } from "../dto/user.dto";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const userlist = await UserService.getAllUser();
    res.status(200).json(userlist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Occured" });
  }
};

export const addNewUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUserData: UserRequest = req.body;
    const createdData: UserResponse = await UserService.addNewUser(newUserData);
    res.status(201).json({ message: "User Created Successfully", data: createdData });
  } catch (err: any) {
    console.log(err);
    if (err.message.includes("already exists")) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(500).json({ message: "Error Occured" });
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userid = req.params.id;
    const userData = await UserService.getUserById(userid);
    res.status(200).json({ message: "Fetched Successfully", data: userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Occured" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const userdata: userLoginRequest = req.body;
    const userResponse = await UserService.userLogin(userdata);
    if (userResponse.error) {
      if (userResponse.error == "No User Found") {
        res.status(404).json({ error: "No User Found" });
        return;
      } else if (userResponse.error == "Invalid Credentials") {
        res.status(401).json({ error: "Invalid User Credentials" });
        return;
      }
    }
    res.status(200).json({ message: "User Logged In Successfully", token: userResponse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
