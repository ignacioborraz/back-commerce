import MyRouter from "../../router.js";
import Movie from "../../../models/movie.model.js";

export default class MovieRouter extends MyRouter {
  init() {
    this.post("/", ["ADMIN"], async (req, res, next) => {
      try {
        await Movie.create(req.body);
        return res.sendSuccessCreate({
          success: true,
          response: "movie created!",
        });
      } catch (error) {
        next(error);
      }
    });
    this.read("/", ["OLDER", "USER", "PREM"], async (req, res, next) => {
      try {
        let all = await Movie.find();
        if (all) {
          return res.sendSuccess({ success: true, response: all });
        } else {
          return res.sendNotFound();
        }
      } catch (error) {
        next(error);
      }
    });
    this.put("/:id", ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        let id = req.params.id;
        let data = req.body;
        let options = { new: true };
        let one = await Movie.findByIdAndUpdate(id, data, options);
        if (one) {
          return res.sendSuccess({ success: true, response: one });
        } else {
          return res.sendNotFound();
        }
      } catch (error) {
        next(error);
      }
    });
    this.delete("/:id", ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        let id = req.params.id;
        let one = await Movie.findByIdAndDelete(id);
        if (one) {
          return res.sendSuccess({ success: true, response: one });
        } else {
          return res.sendNotFound();
        }
      } catch (error) {
        next(error);
      }
    });
  }
}
