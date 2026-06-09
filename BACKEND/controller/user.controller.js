import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";


const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

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


  // 6. Create user
  const newUser = await User.create({
  name,
  email,
  password,
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

  // 1. Validate input
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  email = email.trim().toLowerCase();

  // 2. Find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }
console.log("Entered Password:", password);
console.log("Stored Password:", user.password);
  // 3. Verify password
  const isMatch = await user.isPasswordCorrect(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  // 4. Generate tokens
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

  // 5. Get user without sensitive fields
  const userData = await User.findById(user._id)
    .select("-password -refreshToken");

  // 6. Send response
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: userData,
        accessToken,
        refreshToken,
      },
      "Login successful"
    )
  );
});
const getProfile = asyncHandler(async (req, res) => {

  // 🔹 Find logged-in user
  const user = await User.findById(req.user._id)
    .select("-password");

  // 🔹 Check user exists
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // 🔹 Response
  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "Profile fetched successfully"
    )
  );
});

const updateProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // 🔹 ADD THIS
  const {
    bio,
    skills,
    education,
    experience,
    linkedin,
    github,
    companyName,
    companyWebsite,
  } = req.body;

  // 🔹 Validation
  if (
    !bio &&
    !skills &&
    !education &&
    !experience &&
    !linkedin &&
    !github &&
    !companyName &&
    !companyWebsite
  ) {
    throw new ApiError(
      400,
      "At least one field is required"
    );
  }

  // 🔹 Updates
  if (bio) user.bio = bio.trim();

  if (skills) user.skills = skills;

  if (education)
    user.education = education.trim();

  if (experience)
    user.experience = experience.trim();

  if (linkedin)
    user.linkedin = linkedin.trim();

  if (github)
    user.github = github.trim();

  if (companyName)
    user.companyName = companyName.trim();

  if (companyWebsite)
    user.companyWebsite =
      companyWebsite.trim();

  await user.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "Profile updated successfully"
    )
  );
});

const refreshAccessToken = asyncHandler(
  async (req, res) => {

    const incomingRefreshToken =
      req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(
        401,
        "Refresh token required"
      );
    }

    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(
      decoded._id
    );

    if (!user) {
      throw new ApiError(
        401,
        "Invalid refresh token"
      );
    }

    if (
      incomingRefreshToken !==
      user.refreshToken
    ) {
      throw new ApiError(
        401,
        "Refresh token expired"
      );
    }

    const {
      accessToken,
      refreshToken
    } =
      await generateAccessAndRefreshTokens(
        user._id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
        },
        "Access token refreshed"
      )
    );
  }
);
const uploadResume = asyncHandler(async (req, res) => {

  // 🔹 Check file exists
  if (!req.file) {
    throw new ApiError(400, "Resume file is required");
  }

  // 🔹 Upload to cloudinary
  const cloudinaryResponse =
    await uploadOnCloudinary(req.file.path);

  // 🔹 Check upload success
  if (!cloudinaryResponse) {
    throw new ApiError(
      500,
      "Failed to upload resume"
    );
  }

  // 🔹 Find logged-in user
  const user = await User.findById(req.user._id);

  // 🔹 Save cloudinary URL
  user.resume = cloudinaryResponse.secure_url;

  await user.save();

  // 🔹 Response
  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "Resume uploaded successfully"
    )
  );
});

const uploadProfile = asyncHandler(async (req, res) => {

  // 🔹 Check image exists
  if (!req.file) {
    throw new ApiError(
      400,
      "Profile picture is required"
    );
  }

  // 🔹 Upload image to cloudinary
  const cloudinaryResponse =
    await uploadOnCloudinary(req.file.path);

  // 🔹 Check cloudinary upload success
  if (!cloudinaryResponse) {
    throw new ApiError(
      500,
      "Failed to upload profile picture"
    );
  }

  // 🔹 Find logged-in user
  const user = await User.findById(req.user._id);

  // 🔹 Check user exists
  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  // 🔹 Save cloudinary image URL
  user.profilePhoto =
    cloudinaryResponse.secure_url;

  // 🔹 Save updated user
  await user.save();

  // 🔹 Response
  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "Profile picture uploaded successfully"
    )
  );
});
  
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: "",
      },
    }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Logged out successfully"
    )
  );
});
export { registerUser,loginUser ,getProfile,updateProfile,uploadResume,uploadProfile,refreshAccessToken,logoutUser};