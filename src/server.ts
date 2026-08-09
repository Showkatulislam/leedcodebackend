import App from "./app";
import { env } from "./shared/config/env";
import { logger } from "./shared/config/logger";

const app = new App(env.port);

const server = app.app.listen(env.port, () => {
  logger.info(`🚀 Server running in ${env.nodeEnv} mode on http://localhost:${env.port}`);
});

/**
 * Graceful Shutdown
 */
const shutdown = (signal: string) => {
  logger.fatal(`\n${signal} received. Shutting down server...`);

  server.close(() => {
    logger.info("✅ HTTP server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

/**
 * Handle unexpected errors
 */
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason);

  server.close(() => {
    process.exit(1);
  });
});
