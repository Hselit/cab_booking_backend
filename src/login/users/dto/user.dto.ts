import { token } from "morgan";
import { error } from "console";
import { Double } from "mongodb";

export type UserResponse = {
  user_id: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  rating?: number | null;
  createdAt: Date | null;
  rides?: {
    ride_id: string;
    driver_id: string;
    user_id: string;
    pickup: string;
    drop: string;
    status: string;
    createdAt: Date;
  };
} | null;

export type UserRequest = {
  username: string;
  email: string;
  phone: string;
  password: string;
  rating: number;
};

export type userTokenRequest = {
  username: string;
  email: string;
  phone: string;
};

export type userLoginRequest = Pick<UserRequest, "email" | "password">;

export type userLoginResponse = {
  error?: string;
  token?: string;
};
