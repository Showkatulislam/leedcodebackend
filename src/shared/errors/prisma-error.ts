import { Prisma } from "../../generated/prisma/client.js"
import { AppError } from "./app-errors.js";

export function handlePrismaError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002":
                throw new AppError(
                    "A record with this value already exists.", 409
                );

            case "P2025":
                throw new AppError(

                    "The requested record was not found.", 404
                );

            case "P2003":
                throw new AppError(
                    "Related record does not exist.", 400
                );

            default:
                throw new AppError(
                    "Database operation failed.", 500
                );
        }
    }

    throw error;
}