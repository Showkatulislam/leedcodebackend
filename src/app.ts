import express, { Application } from "express";
import cors from "cors";
import { pinoHttp } from "pino-http";
import { logger } from "./shared/config/logger";
import { notFound } from "./shared/middlewares/not-found";
import { errorHandler } from "./shared/middlewares/error";
/* 
import { errorHandler } from "./middlewares/error.middleware";
import { notFoundHandler } from "./middlewares/notFound.middleware" */ class App {
  public app: Application;
  private readonly port: number | string;

  constructor(port: number | string) {
    this.port = port;
    this.app = express();

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  /**
   * Register application middlewares
   */
  private initializeMiddlewares(): void {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(
      express.urlencoded({
        extended: true,
      }),
    );
    this.app.use(
      pinoHttp({
        logger,
      }),
    );
  }

  /**
   * Register all routes
   */
  private initializeRoutes(): void {
    this.app.get("/health", (req, res) => {
      res.status(200).json({
        success: true,
        message: "Server is running successfully",
        timestamp: new Date().toISOString(),
      });
    });

    // Example
    // this.app.use("/api/v1/auth", authRoutes);
    // this.app.use("/api/v1/problem", problemRoutes);
  }

  /**
   * Register error middlewares
   */
  private initializeErrorHandling(): void {
    this.app.use(notFound);
    this.app.use(errorHandler);
  }
}

export default App;
