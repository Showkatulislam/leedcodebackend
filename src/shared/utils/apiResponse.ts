import { Response } from "express";

export function apiResponse<T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: T,
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}
