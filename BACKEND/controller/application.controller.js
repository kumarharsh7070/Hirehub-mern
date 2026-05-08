import {Job} from "../models/job.js"
import {User} from "../models/user.js"
import { Application } from "../models/application.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiResponse } from "../utils/ApiResponses.js"
import { ApiError } from "../utils/ApiError.js"
import {mongoose} from "mongoose"

const applyJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  // 🔹 Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new ApiError(400, "Invalid job ID");
  }

  // 🔹 Find job
  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // 🔹 Prevent recruiter applying to own job
  if (job.createdBy.equals(req.user._id)) {
    throw new ApiError(
      400,
      "You cannot apply to your own job"
    );
  }

  // 🔹 Prevent duplicate application
  const alreadyApplied = await Application.findOne({
    user: req.user._id,
    job: jobId,
  });

  if (alreadyApplied) {
    throw new ApiError(
      400,
      "You already applied for this job"
    );
  }

  // 🔹 Create application
  const newApplication = await Application.create({
    user: req.user._id,
    job: jobId,
  });

  // 🔹 Send response
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newApplication,
        "Applied successfully"
      )
    );
});

export {applyJob}