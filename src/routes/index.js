import MyRouter from "./router.js";
import AuthRouter from "./api/users.route.js";

const auth = new AuthRouter();

export default class IndexRouter extends MyRouter {
  init() {
    this.read("/", ["PUBLIC"], (req, res) => res.status(200).send("TOY STORE API"));
    this.use("/auth", ["PUBLIC"], auth.getRouter());
  }
}
