import type { Request, Response } from "express";
import { catchAsync } from "../../shared/utils/catchAsync.js";
import { UserService } from "./user.service.js";
import sendResponse from "../../shared/utils/sendResponse.js";

export class UserController {
  constructor(private service: UserService) {}

  register = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body);
    const user = await this.service.register(req.body);
    sendResponse(res, {
      statusCode: 201,
      message: "User registered successfully",
      data: user,
      success: true,
    });
  });

  login = catchAsync(async (req: Request, res: Response) => {
    const user = await this.service.login(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "login successful.",
      data: user,
    });
  });
}
