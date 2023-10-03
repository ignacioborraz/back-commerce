import args from "../config/arguments.js";
import MongoConnect from "../config/Mongo.js";
import env from "../config/env.js";

let dao = {}; //objeto donde voy a tener los diferentes modelos SEGUN la presistencia elegida al iniciar el srevidor

switch (args.persistence) {
  case "MEMORY":
    console.log("memory: connected");
    break;
  case "FS":
    console.log("file system: connected");
    break;
  default: //"MONGO"
    const mongo = new MongoConnect(env.LINK_DB);
    mongo.connect_mongo();
    const { default: OrderMongo } = await import("./mongo/orders.mongo.js");
    const { default: AuthMongo } = await import("./mongo/users.mongo.js");
    dao = { Order: OrderMongo, User: AuthMongo };
    break;
}

export default dao;
