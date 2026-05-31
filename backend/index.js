import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db-config.js";
import cookieParser from "cookie-parser";
import issueRoutes from "./routes/issueRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import passport from "./config/passport.js";
import contactRoutes from "./routes/contactRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "https://hamari-awaaz-cb8cou6vl-shalini-singhs-projects-b2733fca.vercel.app",
    credentials: true,
  }),
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/issue", issueRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Server Connected at port", process.env.PORT);
});
