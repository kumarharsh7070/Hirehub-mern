import {Job} from "../models/job.js"
import {User} from "../models/user.js"
import { Application } from "../models/application.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiResponse } from "../utils/ApiResponses.js"
import { ApiError } from "../utils/ApiError.js"
import {isValidObjectId, mongoose} from "mongoose"

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

const getMyApplications = asyncHandler(async (req, res) => {

  // 🔹 Find applications of logged-in candidate
  const applications = await Application.find({
    user: req.user._id,
  })
    .populate("job")
    .sort({ createdAt: -1 });

  // 🔹 Response
  return res.status(200).json(
    new ApiResponse(
      200,
      applications,
      applications.length
        ? "Applications fetched successfully"
        : "No applications found"
    )
  );
});
const viewApplied = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  // 🔹 Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new ApiError(400, "Invalid job ID");
  }

  // 🔹 Find job
  const job = await Job.findById(jobId);

  // 🔹 Check job exists
  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // 🔹 Ownership check
  if (!job.createdBy.equals(req.user._id)) {
    throw new ApiError(
      403,
      "You are not allowed to view applicants for this job"
    );
  }

  // 🔹 Find applications
  const applications = await Application.find({
    job: jobId,
  }).populate("user", "name email");

  // 🔹 Response
  return res.status(200).json(
    new ApiResponse(
      200,
      applications,
      applications.length
        ? "Applicants fetched successfully"
        : "No applicants yet"
    )
  );
});

const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  // 🔹 Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(applicationId)) {
    throw new ApiError(400, "Invalid application ID");
  }

  // 🔹 Validate status
  const allowedStatus = ["accepted", "rejected"];

  if (!allowedStatus.includes(status)) {
    throw new ApiError(
      400,
      "Status must be accepted or rejected"
    );
  }

  // 🔹 Find application
  const application = await Application.findById(applicationId)
    .populate("job");

  // 🔹 Check application exists
  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  // 🔹 Ownership check
  if (
    !application.job.createdBy.equals(req.user._id)
  ) {
    throw new ApiError(
      403,
      "You are not allowed to update this application"
    );
  }

  // 🔹 Update status
  application.status = status;

  await application.save();

  // 🔹 Response
  return res.status(200).json(
    new ApiResponse(
      200,
      application,
      `Application ${status} successfully`
    )
  );
});
export {applyJob,viewApplied,getMyApplications,updateApplicationStatus}