import { hashSync, genSaltSync } from "bcrypt";

export default class {
  constructor(obj) {
    this.mail = obj.mail;
    this.password = hashSync(obj.password, genSaltSync(10));
    this.role = obj.role;
  }
}
