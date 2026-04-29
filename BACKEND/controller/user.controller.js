import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
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

const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  // 1. Validate
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  email = email.trim().toLowerCase();

  // 2. Find user
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  // 3. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid credentials");

  // 4. 🔐 Create JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },   // payload
    process.env.JWT_SECRET,              // secret
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  // 5. Remove password
  const userData = await User.findById(user._id).select("-password");

  // 6. Send response
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: userData,
        token
      },
      "Login successful"
    )
  );
});

export { registerUser,loginUser };