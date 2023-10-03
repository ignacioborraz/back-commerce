import AuthService from "../services/users.service.js";

export default class AuthController {
  constructor() {
    this.service = new AuthService();
  }
  register = (data) => this.service.register(data);
  login = () => this.service.login();
  signout = () => this.service.signout();
}
