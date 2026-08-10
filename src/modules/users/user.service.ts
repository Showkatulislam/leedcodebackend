import { email } from "zod";
import { AppError } from "../../shared/errors/app-errors.js";
import { hashPassword } from "../../shared/utils/password.js";
import { IUserRepository } from "./user.interface.js";
import { RegisterInput } from "./user.schema.js";

export class UserService {
    constructor(private readonly userRepository: IUserRepository) { }
    async register(data: RegisterInput) {
        const existingEmail = await this.userRepository.findByEmail(data.email)

        if (existingEmail) {
            throw new AppError("Email is already registered.", 409)
        }

        const existingUsername = await this.userRepository.findByUsername(data.username);

        if (existingUsername) {
            throw new AppError("Username name is already Taken.", 409);
        }

        const role = await this.userRepository.findRoleByName("USER");

        if (!role) {
            throw new AppError("Default USER role is not configured.", 500)
        }

        const hashedPassword = await await hashPassword(data.password);

        const user = await this.userRepository.create({
            username: data.username,
            email: data.email,
            password: hashedPassword,
            roleId: role.id
        })

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            rating: user.rating,
            status: user.status,
            roleId: user.roleId,
            createdAt: user.updatedAt
        }
    }


}