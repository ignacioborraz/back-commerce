import AuthRepository from "../repositories/users.rep.js";

export default class AuthService {
  constructor() {
    this.repository = new AuthRepository();
  }
  register = (data) => this.repository.register(data);
  login = () => this.repository.login();
  signout = () => this.repository.signout();
  readOne = (mail) => this.repository.readOne(mail);
}
