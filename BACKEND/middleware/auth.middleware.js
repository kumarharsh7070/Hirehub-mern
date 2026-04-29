import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  // 🔹 Safe token extraction
  const token = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;

  // 🔹 Check token exists
  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  // 🔹 Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 🔹 Get user from DB
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new ApiError(401, "Invalid token");
  }

  // 🔹 Attach user to request
  req.user = user;

  // 🔹 Move to next middleware/route
  next();
});

export { verifyJWT };