import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod/v3";

export const validate =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    // Pass only req.body because registerSchema validates body properties directly
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        status: "Fail",
        errors: (result.error as ZodError).errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
    }

    // Assign the cleanly parsed/sanitized data back to req.body
    req.body = result.data;
    return next();
  };