import { Router } from "express";
import { createContactMessage } from "../controllers/contactController.js";

const router = Router();

router.post("/create", createContactMessage);

export default router;