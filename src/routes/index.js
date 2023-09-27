import MyRouter from "./router.js";

export default class IndexRouter extends MyRouter {
  init() {
    this.read("/", (req, res) => res.status(200).send("TOY STORE API"));
  }
}
