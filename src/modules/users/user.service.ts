import { AppError } from "../../shared/errors/app-errors.js";
import { generateToken, verifyRefreshToken } from "../../shared/utils/jwt.js";
import { comparePassword, hashPassword } from "../../shared/utils/password.js";
import { mapUserToResponse } from "./auth.types.js";
import { IUserRepository } from "./user.interface.js";
import { LoginInput, RegisterInput } from "./user.schema.js";

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}
  async register(data: RegisterInput) {
    const existingEmail = await this.userRepository.findUserByEmail(data.email);
    console.log(existingEmail);
    if (existingEmail) {
      throw new AppError("Email is already registered.", 409);
    }

    const exisitingUsername = await this.userRepository.findUserByusername(data.username);

    if (exisitingUsername) {
      throw new AppError("Username is already taken.");
    }

    const role = await this.userRepository.findRoleByName("USER");

    if (!role) {
      throw new AppError("Default user role is not configured.", 500);
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await this.userRepository.createUser({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      roleId: role.id,
    });

    const accessToken = generateToken({userId:user.id,email:user.email,role:user.roleId})

    return mapUserToResponse(user,accessToken)
  }

  async login(data: LoginInput) {
    const user = await this.userRepository.findUserByEmail(data.email);
    if (!user) {
      throw new AppError("Invalid email or password.", 401);
    }

    if (user.status !== "ACTIVE") {
      throw new AppError("Your account is not active.", 403);
    }

    const passwordMatches = await comparePassword(data.password, user.password);
    if (!passwordMatches) {
      throw new AppError("Invalid email or password", 401);
    }
    const token = generateToken({userId:user.id,email:user.email,role:user.roleId})

    return mapUserToResponse(user,token);
  }

  async refresh(refreshToken:string){
    let payload;
    try {
       payload = verifyRefreshToken(refreshToken);
    } catch (error) {
      throw new AppError("Invalid or expired refresh token.",401);
    }
    const tokenHash =
  }
}
