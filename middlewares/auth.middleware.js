import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.util.js";
import appConstant from "../constants/app.constant.js";

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Authorization token is required.");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Authorization token is required.");
    }

    const decoded = jwt.verify(token, appConstant.JWT.JWT_SECRET);

    if (!decoded || !decoded.id) {
      throw new ApiError(401, "Invalid token.");
    }

    // Attach user to request
    req.user = decoded;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      new ApiError(401, "Token has expired.");
    } else if (err.name === "JsonWebTokenError") {
      new ApiError(401, "Invalid token.");
    } else {
      next(err);
    }
  }
};

export default authenticate;
