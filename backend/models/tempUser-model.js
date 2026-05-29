// models/tempUser-model.js
import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  role: String,

  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },

  emailOtp: String,
  phoneOtp: String,

  expiresAt: Date,
});

export default mongoose.model("TempUser", tempUserSchema)