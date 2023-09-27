import args from "../config/arguments.js"; //para traerme la persistencia
import MongoConnect from "../config/Mongo.js"; //para traerme la conexion de mongo
import env from "../config/env.js"; //para traerme las variables de entorno

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
    //const { default: UserMongo } = await import("../dao/mongo/users.mongo.js");
    //dao = { User: UserMongo };
    break;
}

export default dao;
