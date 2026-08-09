"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
class App {
    app;
    port;
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.intializeMiddleware();
        this.intializeRouter();
    }
    intializeMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
    }
    intializeRouter() {
        this.app.get("/health  ", (req, res) => {
            res.status(200).json({
                status: "success",
                message: "Server is running",
                timestamp: new Date().toISOString()
            });
        });
    }
}
