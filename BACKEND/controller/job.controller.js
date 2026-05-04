import { Job } from "../models/job.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import {mongoose} from "mongoose"
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



const deleteJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  // 🔹 Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new ApiError(400, "Invalid job ID");
  }

  // 🔹 Find job
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // 🔹 Ownership check (only creator can delete)
  if (!job.createdBy.equals(req.user._id)) {
    throw new ApiError(403, "You are not allowed to delete this job");
  }

  // 🔹 Delete job
  await job.deleteOne();

  // 🔹 Response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Job deleted successfully"));
});



export { createJob , deleteJob};