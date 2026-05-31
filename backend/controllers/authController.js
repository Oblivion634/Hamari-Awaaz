import UserModel from "../models/user-model.js";
import StatusCodes from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import IssueModel from "../models/issue-model.js";
import fs from "node:fs";
import cloudinary from "../utils/cloudinary.js";
import SignupOtp from "../models/signup-otp-model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendSms } from "../utils/sendSms.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

// ==================== GENERATE OTP ====================

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// ==================== SIGNUP ====================

export const signup = async (req, res) => {
  try {
    const { name, email, phone, city, state, pincode, password, role } =
      req.body;

    // ================= CHECK EXISTING USER =================

    const existingEmail = await UserModel.findOne({
      email,
    });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const existingPhone = await UserModel.findOne({
      phone,
    });

    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone already registered",
      });
    }


    // ================= HASH PASSWORD =================

    const hashedPassword = await bcrypt.hash(password, 10);

    // ================= GENERATE OTP =================

    const emailOtp = generateOtp();

    const phoneOtp = generateOtp();

    // ================= STORE TEMP DATA =================

    await SignupOtp.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,

      city,
      state,
      pincode,

      emailOtp,
      phoneOtp,

      expiresAt: Date.now() + 1 * 60 * 1000,
    });

    // ================= SEND EMAIL OTP =================

    await sendEmail(
      email,
      "Verify Your Email - Hamari Awaaz",

      `
      <div style="font-family:Arial;padding:20px">
        <h2>Email Verification OTP</h2>

        <p>Your OTP is:</p>

        <h1 style="letter-spacing:5px;color:#138808">
          ${emailOtp}
        </h1>

        <p>
          This OTP expires in 10 minutes.
        </p>
      </div>
      `,
    );

    // ================= TEMP PHONE OTP =================

    // SEND SMS OTP
    await sendSms(
      phone,
      `Your Hamari Awaaz OTP is ${phoneOtp}. Valid for 10 minutes.`,
    );
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      email,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// ==================== VERIFY SIGNUP OTP ====================

export const verifySignupOtp = async (req, res) => {
  try {
    console.log(req.body);

    const { email, emailOtp, phoneOtp } = req.body;

    const otpRecord = await SignupOtp.findOne({
      email,
    });

    console.log("OTP RECORD:", otpRecord);

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ================= CHECK OTP EXPIRY =================

    if (otpRecord.expiresAt < Date.now()) {

      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // ================= VERIFY EMAIL OTP =================

    if (otpRecord.emailOtp !== emailOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email OTP",
      });
    }

    // ================= VERIFY PHONE OTP =================

    if (otpRecord.phoneOtp !== phoneOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid Phone OTP",
      });
    }

    // ================= CREATE USER =================

    const newUser = await UserModel.create({
      name: otpRecord.name,

      email: otpRecord.email,

      phone: otpRecord.phone,

      password: otpRecord.password,

      role: otpRecord.role,

      location: {
        city: otpRecord.city,
        state: otpRecord.state,
        pincode: otpRecord.pincode,
      },

      isVerified: true,

      avatar: {
        imageURL: "",
        publicId: "",
      },
    });

    // ================= GENERATE JWT =================

    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );

    // ================= COOKIE =================

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // ================= RESPONSE =================

    return res.status(200).json({
      success: true,
      message: "Account verified successfully",

      token,

      role: newUser.role,

      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const resendSignupOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otpRecord = await SignupOtp.findOne({ email });

    if (!otpRecord) {
      return res.status(404).json({
        success: false,
        message: "Signup session not found. Please register again.",
      });
    }

    const emailOtp = generateOtp();
    const phoneOtp = generateOtp();

    otpRecord.emailOtp = emailOtp;
    otpRecord.phoneOtp = phoneOtp;

    // Fresh expiry
    otpRecord.expiresAt = Date.now() + 10 * 60 * 1000;

    await otpRecord.save();

    await sendEmail(
      email,
      "New OTP - Hamari Awaaz",
      `
      <div style="font-family:Arial;padding:20px">
        <h2>Email Verification OTP</h2>

        <p>Your new OTP is:</p>

        <h1 style="letter-spacing:5px;color:#138808">
          ${emailOtp}
        </h1>

        <p>This OTP expires in 10 minutes.</p>
      </div>
      `,
    );

    await sendSms(
      otpRecord.phone,
      `Your Hamari Awaaz OTP is ${phoneOtp}. Valid for 10 minutes.`,
    );

    return res.status(200).json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
// ==================== LOGIN ====================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    // USER NOT FOUND
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid Email Or Password",
      });
    }

    // NOT VERIFIED
    if (!user.isVerified) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Please verify your account before login",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid Email Or Password",
      });
    }

    // GENERATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );

    // COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Logged In Successfully",
      token,
      role: user.role,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

// Logout user
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error.message);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Logout failed",
    });
  }
};

// Get current user
export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Update user profile
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        location: {
          city: req.body.location?.city,
          state: req.body.location?.state,
          pincode: req.body.location?.pincode,
        },
      },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    // Remove user reference from issues
    await IssueModel.updateMany(
      { createdBy: id },
      { $set: { createdBy: null } },
    );

    await UserModel.findByIdAndDelete(id);

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "User Deleted Successfully",
      user,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error deleting User",
    });
  }
};

// Update avatar
export const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
    });

    // Delete local file
    fs.unlinkSync(req.file.path);

    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      {
        avatar: {
          imageURL: result.secure_url,
          publicId: result.public_id,
        },
      },
      { new: true },
    ).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <h2>Password Reset</h2>
        <p>Click below to reset your password:</p>
        <a href="${resetUrl}">
          Reset Password
        </a>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Reset link sent to your email",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await UserModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token expired or invalid",
      });
    }

    user.password = await bcrypt.hash(password, 10);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
