import { Router } from "express";
import {
  login,
  signup,
  getUser,
  logout,
  updateUser,
  deleteUser,
  updateAvatar,
} from "../controllers/authController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import upload from "../middlewares/upload.js";

const router = Router();

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/getuser", protect, getUser);
router.post("/logout", logout);

// Admin route
router.get("/admin-dashboard", protect, authorizeRoles("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin",
    user: req.user,
  });
});

// User management
router.put("/update/:id", updateUser);
router.delete("/deleteUser/:id", protect, deleteUser);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "https://hamari-awaaz.vercel.app/login",
  }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("https://hamari-awaaz.vercel.app/oauth-success");
  },
);

// Avatar upload
router.put("/update-avatar", protect, upload.single("avatar"), updateAvatar);

export default router;
