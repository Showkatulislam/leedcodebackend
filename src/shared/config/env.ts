import dotenv from "dotenv";

dotenv.config();

function getEnv(key: string): string {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const env = {
  nodeEnv: getEnv("NODE_ENV"),

  port: Number(getEnv("PORT")),

  database: {
    url: getEnv("DATABASE_URL"),
    host: getEnv("DATABASE_HOST"),
    port: Number(getEnv("DATABASE_PORT")),
    user: getEnv("DATABASE_USER"),
    password: getEnv("DATABASE_PASSWORD"),
    name: getEnv("DATABASE_NAME"),
  },

  jwt: {
    accessSecret: getEnv("JWT_ACCESS_SECRET"),
    refreshSecret: getEnv("JWT_REFRESH_SECRET"),
    accessExpiresIn: getEnv("JWT_ACCESS_EXPIRES_IN"),
    refreshExpiresIn: getEnv("JWT_REFRESH_EXPIRES_IN"),
  },

  logLevel: getEnv("LOG_LEVEL"),
};
