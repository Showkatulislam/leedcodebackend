import type { Request, Response } from "express";
import { catchAsync } from "../../shared/utils/catchAsync.js";
import { UserService } from "./user.service.js";

export class UserController{
    constructor(private service:UserService){}
    
    register = catchAsync(async(req:Request,res:Response)=>{
        const user = await this.service.register(req.body);
        
    })
    
}