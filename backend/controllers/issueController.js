// ================= issueController.js =================

import fs from "fs";
import cloudinary from "../utils/cloudinary.js";
import IssueModel from "../models/issue-model.js";
import { StatusCodes } from "http-status-codes";
import { sendEmail } from "../utils/sendEmail.js";
import User from "../models/user-model.js";

// =====================================================
// CREATE ISSUE
// =====================================================
export const createIssue = async (req, res) => {
  try {
    const { title, category, description, location } = req.body;

    // Generate complaint ID
    const complaintId = `CMP-${Date.now()}-${Math.floor(
      1000 + Math.random() * 9000,
    )}`;

    // Default image data
    let imageData = {
      imageURL: "",
      publicId: "",
    };

    // Upload image to cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "hamari_awaaz/issues",
      });

      imageData = {
        imageURL: result.secure_url,
        publicId: result.public_id,
      };

      // Delete local uploaded file
      fs.unlinkSync(req.file.path);
    }

    // Create issue
    const issue = await IssueModel.create({
      complaintId,
      title,
      category,
      description,
      location,
      image: imageData,
      createdBy: req.user.id,
    });

    // ================= EMAIL =================
    const user = await User.findById(req.user.id);
    const emailHTML = `

  <div style="font-family:Arial;padding:20px">
    <h2>📝 Complaint Registered Successfully</h2>

    <p>Hi ${user.name},</p>

    <p>Your complaint has been successfully registered on <b>Hamari Awaaz</b>.</p>

    <h3>Complaint Details:</h3>

    <ul>
      <li><b>ID:</b> ${complaintId}</li>
      <li><b>Title:</b> ${title}</li>
      <li><b>Category:</b> ${category}</li>
      <li><b>Location:</b> ${location}</li>
      <li><b>Status:</b> Pending</li>
    </ul>

    <p>We will update you once it is reviewed.</p>

    <br/>
    <p>Thanks,<br/>Hamari Awaaz Team 🇮🇳</p>
  </div>
`;

    if (!user || !user.email) {
      console.log("❌ No user email found");
      return;
    }

    await sendEmail(
      user.email,
      "Your Complaint Has Been Registered",
      emailHTML,
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Issue created successfully",
      data: issue,
    });
  } catch (error) {
    console.log("Create issue error:", error.message);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET LOGGED IN USER ISSUES
// =====================================================
export const getIssues = async (req, res) => {
  try {
    const issues = await IssueModel.find({
      createdBy: req.user.id,
    })
      .populate("createdBy", "name")
      .sort({
        createdAt: -1,
      });

    return res.status(StatusCodes.OK).json({
      success: true,
      issues,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ISSUE STATS
// =====================================================
export const getIssueStats = async (req, res) => {
  try {
    const totalComplaints = await IssueModel.countDocuments({
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

    return res.status(StatusCodes.OK).json({
      success: true,
      stats: {
        totalComplaints,
        pending,
        underReview,
        resolved,
      },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET SINGLE ISSUE BY COMPLAINT ID
// =====================================================
export const getIssue = async (req, res) => {
  try {
    const { cId } = req.params;

    const issue = await IssueModel.findOne({
      complaintId: cId,
    })
      .populate("createdBy", "name")
      .populate("comments.user", "name");

    if (!issue) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "No issue found with given ID",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Issue fetched successfully",
      issue,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ALL ISSUES (COMMUNITY PAGE)
// =====================================================
export const getAllIssues = async (req, res) => {
  try {
    const issues = await IssueModel.find()
      .populate("createdBy", "name")
      .populate("comments.user", "name")
      .sort({
        createdAt: -1,
      });

    return res.status(StatusCodes.OK).json({
      success: true,
      issues,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// TOGGLE UPVOTE
// =====================================================
// ================= LIKE / UNLIKE ISSUE =================

export const toggleUpvote = async (req, res) => {
  try {
    const issue = await IssueModel.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    const userId = req.user.id;

    const alreadyLiked = issue.upvotes.includes(userId);

    if (alreadyLiked) {
      issue.upvotes = issue.upvotes.filter((id) => id.toString() !== userId);
    } else {
      issue.upvotes.push(userId);
    }

    await issue.save();

    return res.status(200).json({
      success: true,
      upvotes: issue.upvotes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =====================================================
// ADD COMMENT
// =====================================================
// ================= ADD COMMENT =================

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment text required",
      });
    }

    const issue = await IssueModel.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    issue.comments.push({
      user: req.user.id,
      text,
    });

    await issue.save();

    const updatedIssue = await IssueModel.findById(req.params.id).populate(
      "comments.user",
      "name",
    );

    return res.status(200).json({
      success: true,
      comments: updatedIssue.comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
