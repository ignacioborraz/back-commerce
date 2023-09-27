import server from "./app.js";
import program from "./config/arguments.js";

const port = program.p;
const environment = program.mode;

//console.log(options);
const PORT = process.env.PORT || port;
const ready = () => {
  console.log("mode: " + environment);
  console.log("server ready on port: " + PORT);
};

server.listen(PORT, ready);
