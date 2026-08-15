import { Role } from "../../generated/prisma/browser.js";
import { RefreshToken, User } from "../../generated/prisma/client.js";
import { prisma } from "../../shared/db/prisma.service.js";
import { IUserRepository } from "./user.interface.js";

export class UserRepository implements IUserRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async findUserByusername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
  async findRoleByName(name: string): Promise<Role | null> {
    return prisma.role.findUnique({
      where: {
        name,
      },
    });
  }

  async createUser(data: {
    username: string;
    email: string;
    password: string;
    roleId: string;
  }): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({
      where:{
        token
      }
    })
  }

  async createRefreshToken(token: string, userId: string, expiresAt: Date): Promise<RefreshToken> {
     return prisma.refreshToken.create({
      data:{
        token,
        userId,
        expiresAt
      }
     })
  }

  async deleteRefreshToken(token: string): Promise<void> {
    await prisma.refreshToken.delete({
      where:{
        token
      }
    })
  }

}
