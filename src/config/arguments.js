import { Command } from "commander";

const program = new Command();

program
  .option("-p <port>", "port", 7000)
  .option("--persistence <persistence>", "persistence", "MONGO")
  .option("--mode <mode>", "mode", "dev");

program.parse();

export default program.opts();
