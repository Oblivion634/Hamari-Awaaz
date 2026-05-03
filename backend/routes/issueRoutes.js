import { Router } from "express";
import upload from "../middlewares/upload.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createIssue,
  getIssue,
  getIssues,
  getIssueStats,
} from "../controllers/issueController.js";

const router = Router();

// Issue routes
router.post("/createissue", protect, upload.single("image"), createIssue);
router.get("/getstats", protect, getIssueStats);
router.get("/getissues", protect, getIssues);
router.get("/getissue/:cId", protect, getIssue);

export default router;
