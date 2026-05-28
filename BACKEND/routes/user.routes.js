import { Router} from "express";
import {registerUser,loginUser,getProfile,updateProfile,uploadResume,uploadProfile} from "../controller/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";
import { uploadResumes } from "../middleware/resume_multer.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {uploadAvatar} from "../middleware/profile_multer.middleware.js"
const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

router.get(
  "/profile",
  verifyJWT,
  getProfile
);

router.patch(
  "/profile",
  verifyJWT,
  updateProfile
);

router.post(
  "/upload-resume",
  uploadResumes.single("resume"),
  uploadResume
);

router.post(
  "/upload-avatar",
  verifyJWT,
  uploadAvatar.single("avatar"),
  uploadProfile
);
// router.get(
//   "/test-protected",
//   verifyJWT,
//   (req, res) => {
//     res.json({
//       message: "Access granted",
//       user: req.user
//     });
//   }
// );
// router.get(
//   "/test-recruiter",
//   verifyJWT,
//   authorizeRoles("candidate"),
//   (req, res) => {
//     res.send("Recruiter access granted");
//   }
// );

export default router;