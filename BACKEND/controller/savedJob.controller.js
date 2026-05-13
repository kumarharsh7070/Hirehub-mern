import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError }  from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import { SavedJob } from "../models/SavedJob.js";
import { User } from "../models/user.js";
import { Job } from "../models/job.js";
import mongoose, { Mongoose } from "mongoose";

const saveJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  // 🔹 Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new ApiError(400, "Invalid job ID");
  }

  // 🔹 Check job exists
  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // 🔹 Prevent duplicate save
  const alreadySaved = await SavedJob.findOne({
    user: req.user._id,
    job: jobId,
  });

  if (alreadySaved) {
    throw new ApiError(400, "Job already saved");
  }

  // 🔹 Save job
  const savedJob = await SavedJob.create({
    user: req.user._id,
    job: jobId,
  });

  // 🔹 Response
  return res.status(201).json(
    new ApiResponse(
      201,
      savedJob,
      "Job saved successfully"
    )
  );
});

const removeSavedJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  // 🔹 Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new ApiError(400, "Invalid job ID");
  }

  // 🔹 Check job exists
  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // 🔹 Remove saved relation
  const removedSavedJob =
    await SavedJob.findOneAndDelete({
      user: req.user._id,
      job: jobId,
    });

  // 🔹 Check relation exists
  if (!removedSavedJob) {
    throw new ApiError(404, "Saved job not found");
  }

  // 🔹 Response
  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Saved job removed successfully"
    )
  );
});


const getSavedJobs = asyncHandler(async (req, res) => {

  // 🔹 Find saved jobs of logged-in candidate
  const jobs = await SavedJob.find({
    user: req.user._id,
  })
    .populate("job")
    .sort({ createdAt: -1 });

  // 🔹 Response
  return res.status(200).json(
    new ApiResponse(
      200,
      jobs,
      jobs.length
        ? "Saved jobs fetched successfully"
        : "No saved jobs found"
    )
  );
});

export {saveJob,removeSavedJob,getSavedJobs}