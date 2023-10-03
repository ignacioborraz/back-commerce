import passport from "passport";
import jwt from "passport-jwt";
import AuthService from "../services/users.service.js";

export default function () {
  passport.serializeUser((user, done) => {
    //console.log(user._id);
    return done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    //console.log(id);
    const User = new AuthService();
    const user = await User.readById(id);
    console.log(user);
    return done(null, user);
  });
  passport.use(
    "jwt",
    new jwt.Strategy(
      {
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([
          (req) => req?.cookies["token"],
        ]),
        secretOrKey: process.env.SECRET_KEY,
      },
      async (payload, done) => {
        try {
          //console.log(payload);
          const model = new AuthService();
          let response = await model.readOne(payload.mail);
          console.log(response);
          if (response) {
            response.password = null;
            done(null, response);
          } else {
            done(null);
          }
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );
}
