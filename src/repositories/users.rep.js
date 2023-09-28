import UserDto from "../dto/register.dto.js";
import dao from "../dao/factory.js";
const { User } = dao;

export default class AuthRepository {
  constructor() {
    this.model = new User();
  }
  register(data) {
    let dataDto = new UserDto(data);
    let response = this.model.register(dataDto);
    return response;
  }
  login = () => this.model.login();
  signout = () => this.model.signout();
  readOne = (mail) => this.model.readOne(mail);
}
