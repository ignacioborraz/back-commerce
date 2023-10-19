import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import compression from "express-compression";

import env from "./config/env.js";
import { __dirname } from "./config/utils.js";
import sessions from "./config/sessions/factory.js";

import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import inicializePassport from "./middlewares/passport.js";
import winston from "./middlewares/winston.js";

import IndexRouter from "./routes/index.js";
const router = new IndexRouter();

const server = express();

//middlewares
server.use(cookieParser(env.SECRET_COOKIE));
server.use(sessions);
inicializePassport();
server.use(passport.initialize());
server.use(passport.session());
server.use(cors());
server.use(winston);
server.use("/", express.static("public"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(
  compression({
    brotli: { enable: true, zlib: {} },
  })
);

//endpoints
server.use("/api", router.getRouter());
server.use(errorHandler);
server.use(notFoundHandler);

export default server;
