import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import "dotenv/config.js";
import "../app.js";
import { faker } from "@faker-js/faker";

const createData = async (quantity) => {
  try {
    for (let j = 1; j <= quantity; j++) {
      const name = faker.person.firstName();
      const mail = name.toLowerCase() + "@coder.com";
      const photo = faker.image.avatar();
      const password =
        "$2a$10$22RMW9bX0EZ9mo3lA5zz1OWfcrIxCU5.lcS8QI4iLDsaLi9CRrg.u";
      const age = Math.ceil(Math.random() * 80);
      const role = 1;
      const user = await User.create({
        name,
        age,
        mail,
        photo,
        password,
        role,
      });
      for (let i = 1; i <= quantity * 100; i++) {
        const title = faker.commerce.product();
        const description = faker.commerce.productDescription();
        const stock = Math.ceil(Math.random() * 1000);
        const price = Math.ceil(Math.random() * 100);
        const url_photo = faker.image.urlLoremFlickr({ category: "business" });
        const admin_id = user._id;
        await Product.create({
          title,
          description,
          stock,
          price,
          url_photo,
          admin_id,
        });
      }
    }
    console.log("data created!");
  } catch (error) {
    console.log(error);
  }
};
createData(3);
