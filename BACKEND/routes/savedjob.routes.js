import { Router } from "express";
import { saveJob } from "../controller/savedJob.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.post(
  "/save/:jobId",
  verifyJWT,
  authorizeRoles("candidate"),
  saveJob
);

export default router;