import transporter from "../config/transporter.js";
import env from "../config/env.js";
import { __dirname } from "../../utils.js";

const { G_MAIL } = env;

export default async (req, res, next) => {
  try {
    let to = req.body.to;
    let subject = "CORREO DE PRUEBA";
    let html = (product) => `
        <h1>TITULO DE PRUEBA</h1>
        <p>parrafo de prueba</p>
        <img src="cid:foto_logo" />
        ${product.name} - ${product.price}
      `;
    await transporter.sendMail({
      from: G_MAIL,
      to,
      subject,
      html: html({ name: "PELOTA", price: "10usd" }),
      attachments: [
        {
          filename: "foto.png",
          path: __dirname + "/public/foto.png",
          cid: "foto_logo",
        },
      ],
    });
    let response = { response: "sent" };
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
