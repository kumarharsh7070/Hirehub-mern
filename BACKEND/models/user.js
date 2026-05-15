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

    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      default: "candidate",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    // 🔹 Profile fields
    bio: {
      type: String,
      trim: true,
      default: "",
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    education: {
      type: String,
      trim: true,
      default: "",
    },

    experience: {
      type: String,
      trim: true,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    // 🔹 Recruiter/company fields
    companyName: {
      type: String,
      trim: true,
      default: "",
    },

    companyWebsite: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = mongoose.model("User", userSchema);