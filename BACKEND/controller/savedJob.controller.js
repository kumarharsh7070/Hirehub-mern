import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError }  from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponses.js";
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

export {saveJob}