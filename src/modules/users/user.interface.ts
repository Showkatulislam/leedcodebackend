import { Role } from "../../generated/prisma/browser.js";
import { User } from "../../generated/prisma/client.js";
export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findRoleByName(name: string): Promise<Role | null>;
    create(data: {
        username: string;
        email: string;
        password: string;
        roleId: string;
    }): Promise<User>;
}