import args from "../arguments.js";
import loggerDev from "./loggerDev.js";
import loggerProd from "./loggerProd.js";
import env from "../env.js";

let logger = null;

switch (args.persistence) {
  case "MEMORY":
    logger = loggerDev;
    break;
  case "FS":
    logger = loggerDev;
    break;
  default: //"MONGO"
    logger = loggerProd;
    break;
}

export default logger;
