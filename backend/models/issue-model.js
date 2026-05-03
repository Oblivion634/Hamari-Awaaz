import mongoose from "mongoose";

// Issue schema
const issueSchema = new mongoose.Schema(
  {
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

    status: {
      type: String,
      enum: ["pending", "under review", "resolved"],
      default: "pending",
    },

    complaintId: {
      type: String,
      unique: true,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const IssueModel = mongoose.model("Issue", issueSchema);

export default IssueModel;
