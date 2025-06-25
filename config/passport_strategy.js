import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import appConstant from "../constants/app.constant.js";

export const authenticateUser = () => {
  const jwtSecret = appConstant.JWT.ADMIN_SECRET;
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
  };

  passport.use(
    "user_auth",
    new Strategy(options, async (payload, done) => {
      try {
        const user = payload;

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
