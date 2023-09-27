import dotenv from "dotenv";
import command from "./arguments.js";

const environment = command.mode;
const path = environment === "dev" ? "./.env.dev" : "./.env.prod";
dotenv.config({ path });

export default {
  LINK_DB: process.env.LINK_DB,
  SECRET_COOKIE: process.env.SECRET_COOKIE,
  SECRET_SESSION: process.env.SECRET_SESSION,
  SECRET_KEY: process.env.SECRET_KEY,
};
