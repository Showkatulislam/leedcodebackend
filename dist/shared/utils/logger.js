"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
// Define custom log levels and colors (optional customization)
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};
winston_1.default.addColors(colors);
// Set log level based on environment
const level = () => {
    const env = process.env.NODE_ENV || 'development';
    return env === 'development' ? 'debug' : 'warn';
};
// Custom log format
const format = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), winston_1.default.format.errors({ stack: true }), // Capture stack traces
winston_1.default.format.splat(), winston_1.default.format.printf((info) => {
    const { timestamp, level, message, stack } = info;
    // Include stack trace if available (for errors)
    return stack
        ? `[${timestamp}] [${level.toUpperCase()}]: ${message}\n${stack}`
        : `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
}));
// Define transports (targets where logs go)
const transports = [
    // Console Transport (Colorized output)
    new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize({ all: true }), format),
    }),
    // Error Log File Transport
    new winston_1.default.transports.File({
        filename: path_1.default.join('logs', 'error.log'),
        level: 'error',
        format,
    }),
    // Combined Log File Transport
    new winston_1.default.transports.File({
        filename: path_1.default.join('logs', 'combined.log'),
        format,
    }),
];
// Create the Winston Logger instance
exports.logger = winston_1.default.createLogger({
    level: level(),
    levels,
    format,
    transports,
});
exports.default = exports.logger;
