// ================= issueRoutes.js =================

import { Router } from "express";

import upload from "../middlewares/upload.js";
import { protect } from "../middlewares/authMiddleware.js";

import {
  createIssue,
  getIssues,
  getIssueStats,
  getIssue,
  getAllIssues,
  toggleUpvote,
  addComment,
} from "../controllers/issueController.js";

const router = Router();

// =====================================================
// CREATE ISSUE
// =====================================================
router.post(
  "/createissue",
  protect,
  upload.single("image"),
  createIssue
);

// =====================================================
// GET LOGGED IN USER ISSUES
// =====================================================
router.get("/getissues", protect, getIssues);

// =====================================================
// GET USER ISSUE STATS
// =====================================================
router.get("/stats", protect, getIssueStats);

// =====================================================
// GET SINGLE ISSUE USING COMPLAINT ID
// =====================================================
router.get("/track/:cId", getIssue);

// =====================================================
// GET ALL ISSUES (COMMUNITY PAGE)
// =====================================================
router.get("/all", getAllIssues);

// =====================================================
// TOGGLE UPVOTE
// =====================================================
router.put("/upvote/:id", protect, toggleUpvote);

// =====================================================
// ADD COMMENT
// =====================================================
router.post("/comment/:id", protect, addComment);

export default router;