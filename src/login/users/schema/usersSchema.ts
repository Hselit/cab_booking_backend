import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  rating: z.number(),
});

export const userLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const userIdSchema = z.object({
  id: z.string(),
});
