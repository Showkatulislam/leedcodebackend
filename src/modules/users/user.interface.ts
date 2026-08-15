import { Role } from "../../generated/prisma/browser.js";
import { RefreshToken, User } from "../../generated/prisma/client.js";
export interface IUserRepository {
  findUserByEmail(email: string): Promise<User | null>;
  findUserByusername(username: string): Promise<User | null>;
  findRoleByName(name: string): Promise<Role | null>;
  createUser(data: {
    username: string;
    email: string;
    password: string;
    roleId: string;
  }): Promise<User>;
  findRefreshToken(token:string):Promise<RefreshToken | null>;
  createRefreshToken(token:string,userId:string,expiresAt:Date):Promise<RefreshToken>;
  deleteRefreshToken(token:string):Promise<void>
}
