import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    bio:{
      type: String,
      trim: true,
      default: "",
    },

    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      default: "candidate",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true,
    versionKey: false
   }
);

export const User = mongoose.model("User", userSchema);