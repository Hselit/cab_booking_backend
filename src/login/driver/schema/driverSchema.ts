import { z } from "zod";

export const createDriverSchema = z.object({
  drivername: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  status: z.string().optional(),
  address: z.string(),
  rating: z.string().optional(),
  role: z.string().optional(),
});

export const driverLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const driverIdSchema = z.object({
  id: z.string(),
});

export const acceptRideSchema = z.object({
  ride_id: z.string(),
  driver_id: z.string(),
  status: z.string(),
});
