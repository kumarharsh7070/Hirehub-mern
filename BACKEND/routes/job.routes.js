import { Router } from "express";
import { createJob,deleteJob } from "../controller/job.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

// 🔹 Create Job (Recruiter only)
router.post(
  "/create-job",
  verifyJWT,
  authorizeRoles("recruiter"),
  createJob
);

router.delete(
  "/:jobId",
  verifyJWT,
  authorizeRoles("recruiter"),
  deleteJob
);

export default router;