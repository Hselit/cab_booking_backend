export type rideResponse = {
  ride_id: string;
  driver_id?: string | null;
  user_id: string;
  pickUp: string;
  pickUpLat: number;
  pickUpLng: number;
  drop: string;
  dropLat: number;
  dropLng: number;
  status: string;
  fare: number | null;
  createdAt: Date;
  updatedAt: Date;
  acceptedAt: Date | null;
};

export type methodType = "body" | "params" | "query";

export type getRideResponse = rideResponse | null;

export type rideDetailsResponse = rideResponse & {
  driver: {
    driver_id: string;
    drivername: string;
    email: string;
    phone: string;
    status: string;
    password: string;
    address: string;
    rating: number;
    createdAt: Date;
    role: string;
    car?: {
      car_id: string;
      brand: string;
      modelName: string;
      plateNo: string;
      color: string;
    } | null;
  } | null;
};

export type rideDetailsRequest = {
  driver_id: string;
  user_id: string;
  pickUp: string;
  pickUpLat: number;
  pickUpLng: number;
  drop: string;
  dropLat: number;
  dropLng: number;
};

export type updateRideStatusRequest = Pick<rideResponse, "ride_id" | "status">;
