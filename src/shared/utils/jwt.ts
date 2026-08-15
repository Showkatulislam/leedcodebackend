import jwt, { SignOptions } from "jsonwebtoken"
import { env } from "../config/env.js"

export interface TokenPayload{
    userId:string,
    email:string,
    role:string
}

export interface RefreshTokenPayload {
  userId: string;
}

export const generateToken=(payload:TokenPayload):string=>{
    return jwt.sign(payload,env.jwt.accessSecret,{
        expiresIn:env.jwt.accessExpiresIn as SignOptions["expiresIn"]
    })
}

export const verifyToken = (token:string):TokenPayload=>{
    return jwt.verify(token,env.jwt.accessSecret) as TokenPayload;
}

export const generateRefreshToken = (payload:RefreshTokenPayload):string=>{
    return jwt.sign(payload,env.jwt.refreshSecret,{
        expiresIn:env.jwt.refreshExpiresIn as SignOptions["expiresIn"]
    })
}


export const verifyRefreshToken = (token:string):RefreshTokenPayload=>{
    return jwt.verify(token,env.jwt.refreshSecret) as RefreshTokenPayload
}