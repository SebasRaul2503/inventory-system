const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info", // default level
  format: format.combine(
    format.timestamp(), // timestamp
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // logs to console
    new transports.File({ filename: "logs/app.log" }), // saves logs in a file
  ],
});

module.exports = logger;
