import User from "./models/User.js";

export default class AuthMongo {
  constructor() {}
  async register(data) {
    let one = await User.create(data);
    return {
      message: "user registered",
      response: "user_id: " + one._id,
    };
  }
  login() {
    return {
      message: "user logged in",
      response: true,
    };
  }
  signout() {
    return {
      message: "user signed out",
      response: true,
    };
  }
}
