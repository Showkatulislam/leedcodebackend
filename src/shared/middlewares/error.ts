import { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger";
import { AppError } from "../errors/app-errors";
import { env } from "../config/env";

export function errorHandler(error: Error, req: Request, res: Response, _next: NextFunction) {
  logger.error(error);
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors,
    });
  }
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: env.nodeEnv === "development" ? error.stack : undefined,
  });
}
