import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validate =
  (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        status: "Fail",
        errors: result.error.issues.map(({ path, message }) => ({
          path: path.join("."),
          message,
        })),
      });
    }

    req.body = result.data;
    next();
  };
