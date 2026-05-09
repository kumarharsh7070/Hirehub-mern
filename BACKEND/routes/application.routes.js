import { Router } from "express";
import { applyJob,viewApplied,getMyApplications } from "../controller/application.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.post(
  "/apply/:jobId",
  verifyJWT,
  authorizeRoles("candidate"),
  applyJob
);

router.get(
  "/job/:jobId",
  verifyJWT,
  authorizeRoles("recruiter"),
  viewApplied
);

router.get(
  "/my-applications",
  verifyJWT,
  authorizeRoles("candidate"),
  getMyApplications
);
export default router;