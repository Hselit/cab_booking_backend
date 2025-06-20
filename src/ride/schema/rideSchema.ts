import { z } from "zod";

export const createRideSchema = z.object({
  user_id: z.string(),
  pickUp: z.string(),
  pickUpLat: z.number(),
  pickUpLng: z.number(),
  drop: z.string(),
  dropLat: z.number(),
  dropLng: z.number(),
  driver_id: z.string().optional(),
});

export const updateRideStatusSchema = z.object({
  ride_id: z.string(),
  status: z.string(),
});

export const rideIdSchema = z.object({
  id: z.string(),
});
