import { ZodSchema } from "zod";
import { Response, Request, NextFunction } from "express";
import { methodType } from "../ride/dto/ride.dto";

export const validate = (zodschema: ZodSchema, type: methodType): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = zodschema.parse(req[type]);
    if (!result.success) {
      return res.status(400).json({ message: "Validation Error ", result });
    }
    req[type] = result.data;
    next();
  };
};
