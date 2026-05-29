import express from "express";
import { chatBotReply } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", chatBotReply);

export default router;