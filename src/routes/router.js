import { Router } from "express";
import { User } from "../dao/factory.js";

export default class MyRouter {
  constructor() {
    this.router = Router();
    this.init();
  }
  getRouter() {
    return this.router;
  }
  init() {}
  applyCb(cbs) {
    return cbs.map((cb) => async (...params) => {
      try {
        await cb.apply(this, params);
      } catch (error) {
        params[1].status(500).send(error);
      }
    });
  }
  responses = (req, res, next) => {
    res.sendSuccessCreate = (payload) => res.status(201).json(payload);
    res.sendSuccess = (payload) => res.status(200).json(payload);
    res.sendNotFound = (payload) =>
      res.status(404).json({ response: null, message: payload + " not found" });
    return next();
  };
  handlePolicies = (policies) => async (req, res, next) => {
    if (policies.includes("PUBLIC")) {
      return next();
    } else {
      const token = req?.cookies["token"]
      if (!token) {
        return res.sendNoAuthenticatedError("Unauthenticated");
      } else {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        const model = new User()
        const user = await model.findOne({ mail: payload.mail });
        const role = user.role;
        if (
          (policies.includes("USER") && role === 0) ||
          (policies.includes("ADMIN") && role === 1) ||
          (policies.includes("PREM") && role === 2)
        ) {
          req.user = user;
          return next();
        } else {
          return res.sendNoAuthorizatedError("Unauthorized");
        }
      }
    }
  };
  //create
  create(path, ...cbs) {
    this.router.post(path, this.applyCb(cbs));
  }
  //read
  read(path, ...cbs) {
    this.router.get(path, this.applyCb(cbs));
  }
  //update
  update(path, ...cbs) {
    this.router.put(path, this.applyCb(cbs));
  }
  //destroy
  destroy(path, ...cbs) {
    this.router.delete(path, this.applyCb(cbs));
  }
  //use
  use(path, ...cbs) {
    this.router.use(path, this.responses, this.applyCb(cbs));
  }
}
