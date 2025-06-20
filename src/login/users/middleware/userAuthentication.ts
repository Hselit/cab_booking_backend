import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userTokenRequest } from "../dto/user.dto";

dotenv.config();

export function generateUserToken(username: string, email: string, phone: string, role: string) {
  const token = jwt.sign(
    { username: username, phone: phone, email: email, role: role },
    process.env.JWT_SECRET as string
  );
  return token;
}

export function verifyUserToken(token: string) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  console.log(decoded);
  if (typeof decoded === "string") {
    return "Unauthorized: Invalid token structure";
  }
  return decoded;
}

export async function checkUserPassword(driverPassword: string, hashedpass: string) {
  const pass = await bcrypt.compare(driverPassword, hashedpass);
  return pass;
}
