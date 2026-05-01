import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    location: {
  city: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  countryCode: {
    type: String,
    required: true,
    uppercase: true,
    minlength: 2,
    maxlength: 2
  }
},

    salary: {
      type: Number,   // ✅ better for filtering
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   // 🔗 link with user
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Job = mongoose.model("Job", jobSchema);