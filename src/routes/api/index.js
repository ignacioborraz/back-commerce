import { Router } from "express";
import fs_router from "./fs/index.js";
import mongo_router from "./mongo/index.js";

const router = Router();

router.use("/fs", fs_router);
router.use("/", mongo_router);
router.param("word", (req, res, next, word) => {
  if (word.length > 5) {
    req.params.word = req.params.word.toLowerCase();
    return next();
  } else {
    req.params.word = null;
    return next();
  }
});
router.get("/test/:word", (req, res) => res.status(200).send(req.params.word));

export default router;
