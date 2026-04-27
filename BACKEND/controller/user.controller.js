import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";

const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password, role } = req.body;

  // 1. Validate fields
  if ([name, email, password].some((f) => !f || !f.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  // 2. Normalize data
  name = name.trim();
  email = email.trim().toLowerCase();

  // 3. Validate role
  const allowedRoles = ["candidate", "recruiter"];
  if (role && !allowedRoles.includes(role)) {
    throw new ApiError(400, "Invalid role");
  }

  // Default role
  if (!role) role = "candidate";

  // 4. Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "Email already taken");
  }

  // 5. Hash password 🔐
  const hashedPassword = await bcrypt.hash(password, 10);

  // 6. Create user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // 7. Remove password from response
  const createdUser = await User.findById(newUser._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "Failed to create user");
  }

  // 8. Send response
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export { registerUser };