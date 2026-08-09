import { User } from "../../generated/prisma/client.js";
import { prisma } from "../../shared/db/prisma.service.js";
import { IUserRepository } from "./user.interface.js";

export class UserRepository implements IUserRepository{
    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({
            where:{
                id
            }
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where:{
                email
            }
        })
    }

    async findByUsername(username: string): Promise<User | null> {
        return prisma.user.findUnique({
            where:{
                username
            }
        })
    }

    async create(data: { username: string; email: string; password: string; roleId: string }): Promise<User> {
        return prisma.user.create({
            data
        })
    }
}