import { faker } from "@faker-js/faker";
import AuthRepository from "../../repositories/users.rep.js";
import OrdersRepository from "../../repositories/orders.rep.js";

const types = ["mozzarella", "vegan", "ham"];
const sizes = ["S", "M", "L", "XL"];

const user = () => {
  let mail = faker.internet.email({ provider: "coder.com" }).toLowerCase();
  let password = "hola1234";
  let role = 0;
  return { mail, password, role };
};

const order = () => {
  const ii = Math.floor(Math.random() * 3);
  const jj = Math.floor(Math.random() * 4);
  let type = types[ii];
  let size = sizes[jj];
  let quantity = 1;
  let price = faker.commerce.price({ min: 2, max: 10 });
  return { type, size, quantity, price };
};

const fakeData = async () => {
  try {
    let auth = new AuthRepository();
    let orderRep = new OrdersRepository();
    for (let i = 0; i < 500; i++) {
      let fakeUser = user();
      let dataUser = await auth.register(fakeUser);
      for (let j = 0; j < 1; j++) {
        let fakeOrder = order();
        fakeOrder.user_id = dataUser.response;
        await orderRep.create(fakeOrder);
      }
    }
    console.log("done!");
  } catch (error) {}
};

fakeData();
