import { createLogger, format, transports, addColors } from "winston";
const { colorize, simple } = format;

const levels = {
  FATAL: 1,
  ERROR: 2,
  INFO: 3,
  HTTP: 4,
};
const colors = {
  FATAL: "red",
  ERROR: "yellow",
  INFO: "white",
  HTTP: "blue",
};
addColors(colors);

export default createLogger({
  levels,
  format: colorize(),
  transports: [
    new transports.Console({ level: "HTTP", format: simple() }),
    new transports.File({
      level: "ERROR",
      format: simple(),
      filename: "./src/config/loggers/errors/errors.dev.log",
    }),
  ],
});
