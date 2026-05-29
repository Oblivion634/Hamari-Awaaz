import mongoose from "mongoose";

// ================= ISSUE SCHEMA =================
const issueSchema = new mongoose.Schema(
  {
    // ---------- BASIC INFO ----------
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Road and Infrastructure",
        "Water Supply",
        "Electricity",
        "Sanitation and Waste",
      ],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    // ---------- IMAGE ----------
    image: {
      imageURL: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },
    },

    // ---------- STATUS ----------
    status: {
      type: String,
      enum: ["pending", "under review", "resolved"],
      default: "pending",
    },

    // ---------- COMPLAINT ID ----------
    complaintId: {
      type: String,
      unique: true,
      required: true,
    },

    // ---------- USER ----------
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ---------- UPVOTES ----------
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // ---------- COMMENTS ----------
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        text: {
          type: String,
          required: true,
          trim: true,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  { timestamps: true }
);

const IssueModel = mongoose.model("Issue", issueSchema);

export default IssueModel;