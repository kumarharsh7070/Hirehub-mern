import { Router } from "express";
import { applyJob } from "../controller/application.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.post(
  "/apply/:jobId",
  verifyJWT,
  authorizeRoles("candidate"),
  applyJob
);

export default router;