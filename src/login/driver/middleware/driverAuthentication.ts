import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function generateDriverToken(name: string, email: string, phone: string) {
  const token = jwt.sign(
    { drivername: name, phone: phone, email: email },
    process.env.JWT_SECRET as string
  );
  return token;
}

export async function checkDriverPassword(driverPassword: string, hashedpass: string) {
  const pass = await bcrypt.compare(driverPassword, hashedpass);
  return pass;
}
