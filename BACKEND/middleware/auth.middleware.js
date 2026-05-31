import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const verifyJWT = asyncHandler(async (req, res, next) => {

  // 🔹 Extract token from Authorization header
  const token = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;

  // 🔹 Check if token exists
  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  // 🔹 Verify Access Token
  const decoded = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );

  // 🔹 Find user
  const user = await User.findById(decoded._id)
    .select("-password -refreshToken");

  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }

  // 🔹 Attach user to request
  req.user = user;

  next();
});

export { verifyJWT };