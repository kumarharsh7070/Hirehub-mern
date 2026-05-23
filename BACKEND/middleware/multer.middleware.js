import multer from "multer";
import path from "path";

// 🔹 Storage configuration
const storage = multer.diskStorage({

  // 🔹 Destination folder
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});