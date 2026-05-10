import { Router } from "express";
import { applyJob,viewApplied,getMyApplications ,updateApplicationStatus} from "../controller/application.controller.js";
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

router.patch(
  "/status/:applicationId",
  verifyJWT,
  authorizeRoles("recruiter"),
  updateApplicationStatus
);
export default router;