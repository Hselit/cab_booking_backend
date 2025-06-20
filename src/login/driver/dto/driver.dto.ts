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
  role: string;
};

export type driverRequest = {
  drivername: string;
  email: string;
  phone: string;
  password: string;
  status?: string;
  address: string;
  rating?: number;
  role?: string;
};

export type getSingleDriverResponse = driverResponse | null;

export type getAllDrivers = driverResponse[];

export type driverId = string;

export type driverTokenRequest = Pick<driverRequest, "drivername" | "email" | "phone" | "role">;

export type driverLoginRequest = Pick<driverRequest, "email" | "password">;

export type driverRideResponse = driverResponse & {
  ride?: {
    ride_id: string;
    driver_id: string;
    user_id: string;
    pickup: string;
    drop: string;
    status: string;
    createdAt: Date;
  };
};

export type driverLoginResponse = {
  error?: string;
  token?: string;
};

export type acceptRideRequest = {
  ride_id: string;
  driver_id: string;
  status: string;
};
