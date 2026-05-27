import multer from "multer";
import path from "path";

// storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// image filter
const fileFilter = (req, file, cb) => {

  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

export const uploadAvatar = multer({
  storage,
  fileFilter,
});