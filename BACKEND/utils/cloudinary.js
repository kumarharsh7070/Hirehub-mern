import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

// 🔹 Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Upload function
const uploadOnCloudinary = async (localFilePath) => {

  try {

    // 🔹 Check local file exists
    if (!localFilePath) {
      return null;
    }

    // 🔹 Upload file to cloudinary
    const response =
      await cloudinary.uploader.upload(
        localFilePath,
        {
          resource_type: "auto",
        }
      );

    // 🔹 Delete local file after successful upload
    fs.unlinkSync(localFilePath);

    // 🔹 Success log
    console.log(
      "File uploaded successfully on cloudinary",
      response.secure_url
    );

    // 🔹 Return cloudinary response
    return response;

  } catch (error) {

    // 🔹 Delete local file if upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    console.log(
      "Cloudinary upload error",
      error
    );

    return null;
  }
};

export { uploadOnCloudinary };