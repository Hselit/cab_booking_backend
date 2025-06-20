import { z } from "zod";

export const createCarSchema = z.object({
  brand: z.string(),
  modelName: z.string(),
  plateNo: z.string(),
  color: z.string(),
  driver_id: z.string().optional(),
});

export const carIdSchema = z.object({
  id: z.string(),
});
