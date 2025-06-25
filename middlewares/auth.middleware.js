import passport from "passport";
import { sendError } from "../utils/response.util.js";

const verifyUser = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    return reject("Unauthorized user");
  }
  req.user = user;
  resolve();
};

export const Auth = () => async (req, res, next) => {
  try {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "user_auth",
        { session: false },
        verifyUser(req, resolve, reject)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => {
        return sendError(res, {}, "Unauthorized", 401);
      });
  } catch (error) {
    next(error);
  }
};
