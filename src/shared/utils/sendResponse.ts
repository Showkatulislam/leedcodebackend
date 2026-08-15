import { Response } from "express";

interface ResponsePayload<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
  error?: any;
}

const sendResponse = <T>(res: Response, jsonData: ResponsePayload<T>): void => {
  const responseData: ResponsePayload<T> = {
    statusCode: jsonData.statusCode,
    success: jsonData.success,
    message: jsonData.message,
    data: jsonData.data,
    error: jsonData.error,
  };

  res.status(jsonData.statusCode).json(responseData);
};

export default sendResponse;
