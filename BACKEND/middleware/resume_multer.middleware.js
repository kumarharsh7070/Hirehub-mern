import multer from "multer";
import path from "path";

// 🔹 Storage configuration
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },

  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// 🔹 PDF filter
const fileFilter = (req, file, cb) => {

  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};

// 🔹 Export upload middleware
export const uploadResumes = multer({
  storage,
  fileFilter,
});