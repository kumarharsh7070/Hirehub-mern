import { Router } from "express";
import { saveJob , removeSavedJob,getSavedJobs} from "../controller/savedJob.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.post(
  "/save/:jobId",
  verifyJWT,
  authorizeRoles("candidate"),
  saveJob
);

router.delete(
  "/remove/:jobId",
  verifyJWT,
  authorizeRoles("candidate"),
  removeSavedJob
);

router.get(
  "/my-saved-jobs",
  verifyJWT,
  authorizeRoles("candidate"),
  getSavedJobs
);
export default router;