import is_admin from "../../../middlewares/is_admin.js";
//import verify_token from "../../../middlewares/verify_token.js";
import passport from "passport";
//import passport_call from "../../../middlewares/passport_call.js";
import Product from "../../../models/product.model.js";
import { Router } from "express";

const router = Router();

//router.post("/", passport_call('jwt'), is_admin, async (req, res, next) => {
router.post(
  "/",
  passport.authenticate("jwt"),
  is_admin,
  async (req, res, next) => {
    //router.post("/", verify_token, is_admin, async (req, res, next) => {
    try {
      await Product.create(req.body);
      return res
        .status(201)
        .json({ success: true, response: "product created" });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    let products = await Product.find();
    if (products.length > 0) {
      return res.status(200).json({ success: true, response: products });
    }
    return res.status(404).json({ success: false, response: "Not found!" });
  } catch (error) {
    next(error);
  }
});

router.get("/:pid", async (req, res, next) => {
  try {
    let id = req.params.pid;
    let one = await Product.findById(id);
    if (one) {
      return res.status(200).json({ success: true, response: one });
    }
    return res.status(404).json({ success: false, response: "Not found!" });
  } catch (error) {
    next(error);
  }
});

router.put("/:pid", async (req, res, next) => {
  try {
    let id = req.params.pid;
    let data = req.body;
    let one = await Product.findByIdAndUpdate(id, data, { new: true });
    if (one) {
      return res.status(200).json({ success: true, product: one });
    }
    return res.status(404).json({ success: false, message: "Not found!" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:pid", async (req, res, next) => {
  try {
    let id = req.params.pid;
    let one = await Product.findByIdAndDelete(id);
    if (one) {
      return res
        .status(200)
        .json({ success: false, message: "Product deleted!" });
    }
    return res.status(404).json({ success: false, message: "Not found!" });
  } catch (error) {
    next(error);
  }
});

export default router;
