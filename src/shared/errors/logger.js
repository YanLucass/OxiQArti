// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createLogger, format, transports, addColors } = require("winston");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const logsDir = path.join(__dirname, "logs"); // Path to the logs directory inside src

const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
        custom: 5,
    },
    colors: {
        error: "red",
        warn: "yellow",
        info: "green",
        http: "magenta",
        debug: "blue",
        custom: "cyan",
    },
};

addColors(customLevels.colors);

class Logger {
    constructor() {
        this.logger = createLogger({
            levels: customLevels.levels, // Define custom log levels
            format: format.combine(
                // Combine different log formats
                format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss", // Timestamp format
                }),
                format.errors({ stack: true }), // Format for capturing error stacks
                format.splat(), // Enable splat interpolation for log messages
                format.json(), // JSON format for logs
                format.prettyPrint(), // Pretty print format
            ),
            transports: [
                new transports.File({ filename: path.join(logsDir, "error.log"), level: "error" }), // Transport for error logs
                new transports.File({ filename: path.join(logsDir, "combined.log") }), // Transport for combined logs
                new transports.Console({
                    // Transport for console logs
                    format: format.combine(
                        format.colorize(), // Format for console colorization
                        format.printf(info => {
                            return `${info.timestamp} [${info.level}]: ${info.message} ${info.stack || ""}`;
                        }),
                    ),
                }),
            ],
        });
    }

    // Methods for each log level
    debug(message, ...meta) {
        this.logger.debug(message, ...meta);
    }

    info(message, ...meta) {
        this.logger.info(message, ...meta);
    }

    warn(message, ...meta) {
        this.logger.warn(message, ...meta);
    }

    error(message, ...meta) {
        this.logger.error(message, ...meta);
    }

    custom(message, ...meta) {
        this.logger.custom(message, ...meta);
    }
}

module.exports = new Logger();

