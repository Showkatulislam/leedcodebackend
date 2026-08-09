import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod/v3";

export const validate =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {};
