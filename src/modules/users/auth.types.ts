import { id } from "zod/locales";
import { User } from "../../generated/prisma/client.js";
import { UserStatus } from "../../generated/prisma/enums.js";

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export type UserResponse = {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  rating: number;
  status: UserStatus;
  roleId: string;
  token:string
};

export const mapUserToResponse = (user: User,token:string): UserResponse => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    rating: user.rating,
    status: user.status,
    roleId: user.roleId,
    token
  };
};
