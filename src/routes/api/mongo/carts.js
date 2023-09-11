import is_admin from "../../../middlewares/is_admin.js";
import verify_token_local from "../../../middlewares/verify_token_local.js";
import Cart from "../../../models/cart.model.js";
import { Router } from "express";

const router = Router();

router.post("/", verify_token_local, is_admin, async (req, res, next) => {
  try {
    await Cart.create(req.body);
    return res.status(201).json({ success: true, response: "cart created" });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let carts = await Cart.find();
    if (carts.length > 0) {
      return res.status(200).json({ success: true, response: carts });
    }
    return res.status(404).json({ success: false, response: "Not found!" });
  } catch (error) {
    next(error);
  }
});

router.get("/:pid", async (req, res, next) => {
  try {
    let id = req.params.pid;
    let one = await Cart.findById(id);
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
    let one = await Cart.findByIdAndUpdate(id, data, { new: true });
    if (one) {
      return res.status(200).json({ success: true, cart: one });
    }
    return res.status(404).json({ success: false, message: "Not found!" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:pid", async (req, res, next) => {
  try {
    let id = req.params.pid;
    let one = await Cart.findByIdAndDelete(id);
    if (one) {
      return res
        .status(200)
        .json({ success: false, message: "cart deleted!" });
    }
    return res.status(404).json({ success: false, message: "Not found!" });
  } catch (error) {
    next(error);
  }
});

export default router;
