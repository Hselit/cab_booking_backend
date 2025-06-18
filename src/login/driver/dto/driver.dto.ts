import { token } from "morgan";
import { error } from "console";
export type driverResponse = {
  driver_id: string;
  drivername: string;
  email: string;
  phone: string;
  password: string;
  status: string;
  address: string;
  rating: number;
  createdAt: Date;
  ride?: {
    ride_id: string;
    driver_id: string;
    user_id: string;
    pickup: string;
    drop: string;
    status: string;
    createdAt: Date;
  };
} | null;

export type driverRequest = {
  drivername: string;
  email: string;
  phone: string;
  password: string;
  status?: string;
  address: string;
  rating?: number;
};

export type driverTokenRequest = Pick<driverRequest, "drivername" | "email" | "phone">;

export type driverLoginRequest = {
  email: string;
  password: string;
};

export type driverLoginResponse = {
  error?: string;
  token?: string;
};
