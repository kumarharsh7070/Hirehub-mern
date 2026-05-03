import { Job } from "../models/job.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const createJob = asyncHandler(async (req, res) => {
  let { title, company, location, salary, description } = req.body;

  // 🔹 Validate basic fields
  if (!title || !company || !salary || !description || !location) {
    throw new ApiError(400, "All fields are required");
  }

  // 🔹 Validate nested location
  if (!location.city || !location.country || !location.countryCode) {
    throw new ApiError(400, "Complete location required");
  }

  // 🔹 Clean data
  title = title.trim();
  description = description.trim();

  // 🔹 Create job
  const newJob = await Job.create({
    title,
    company,
    location,
    salary,
    description,
    createdBy: req.user._id,   // ✅ from middleware
  });

  // 🔹 Response
  return res
    .status(201)
    .json(new ApiResponse(201, newJob, "Job created successfully"));
});

export { createJob };