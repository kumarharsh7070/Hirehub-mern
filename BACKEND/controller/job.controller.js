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

const updateJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  const { title, company, location, salary, description } = req.body;

  // 🔹 Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new ApiError(400, "Invalid job ID");
  }

  // 🔹 Check at least one field
  if (!title && !company && !location && !salary && !description) {
    throw new ApiError(400, "At least one field is required");
  }

  // 🔹 Find job
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // 🔹 Ownership check
  if (!job.createdBy.equals(req.user._id)) {
    throw new ApiError(403, "You are not allowed to update this job");
  }

  // 🔹 Update fields
  if (title) job.title = title.trim();
  if (company) job.company = company.trim();
  if (salary) job.salary = salary;
  if (description) job.description = description.trim();

  // 🔹 Nested location update
  if (location) {
    if (location.city) job.location.city = location.city;
    if (location.country) job.location.country = location.country;
    if (location.countryCode) job.location.countryCode = location.countryCode;
  }

  await job.save();

  return res
    .status(200)
    .json(new ApiResponse(200, job, "Job updated successfully"));
});

const getAllJob = asyncHandler(async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      jobs,
      jobs.length ? "Jobs fetched successfully" : "No jobs found"
    )
  );
});

export { createJob , deleteJob, updateJob,getAllJob};