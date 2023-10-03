import dotenv from "dotenv";
import args from "./arguments.js";

const environment = args.mode;
const path = environment === "dev" ? "./.env.dev" : "./.env.prod";
dotenv.config({ path });

export default {
  LINK_DB: process.env.LINK_DB,
  SECRET_COOKIE: process.env.SECRET_COOKIE,
  SECRET_SESSION: process.env.SECRET_SESSION,
  SECRET_KEY: process.env.SECRET_KEY,
  G_MAIL: process.env.G_MAIL,
  G_PASS: process.env.G_PASS
};
