import fs from "fs";
import cloudinary from "../utils/cloudinary.js";
import IssueModel from "../models/issue-model.js";
import { StatusCodes } from "http-status-codes";

// Create issue
export const createIssue = async (req, res) => {
  try {
    const { title, category, description, location } = req.body;

    const complaintId = `CMP-${Date.now()}-${Math.floor(
      1000 + Math.random() * 9000,
    )}`;

    let imageData = {
      imageURL: "",
      publicId: "",
    };

    // Upload issue image
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "hamari_awaaz/issues",
      });

      imageData = {
        imageURL: result.secure_url,
        publicId: result.public_id,
      };

      fs.unlinkSync(req.file.path);
    }

    const issue = await IssueModel.create({
      complaintId,
      title,
      category,
      description,
      location,
      image: imageData,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: issue,
    });
  } catch (error) {
    console.log("Create issue error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user issues
export const getIssues = async (req, res) => {
  try {
    const issues = await IssueModel.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      issues,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// Get issue stats
export const getIssueStats = async (req, res) => {
  try {
    const totalcomplaints = await IssueModel.countDocuments({
      createdBy: req.user.id,
    });

    const pending = await IssueModel.countDocuments({
      createdBy: req.user.id,
      status: "pending",
    });

    const underReview = await IssueModel.countDocuments({
      createdBy: req.user.id,
      status: "under review",
    });

    const resolved = await IssueModel.countDocuments({
      createdBy: req.user.id,
      status: "resolved",
    });

    res.status(StatusCodes.OK).json({
      success: true,
      stats: { totalcomplaints, pending, underReview, resolved },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// Track issue
export const getIssue = async (req, res) => {
  try {
    const { cId } = req.params;

    const issue = await IssueModel.findOne({ complaintId: cId }).populate(
      "createdBy",
      "name",
    );

    if (!issue) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "No issue found with given ID",
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Issue Fetched Successfully",
      issue,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};
