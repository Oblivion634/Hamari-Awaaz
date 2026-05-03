import mongoose from "mongoose";

// User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
    },

    password: {
      type: String,
      required: function () {
        return !this.isGoogleUser;
      },
      minlength: [8, "Password must be at least 8 characters"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    location: {
      city: {
        type: String,
        required: function () {
          return !this.isGoogleUser;
        },
      },
      state: {
        type: String,
        required: function () {
          return !this.isGoogleUser;
        },
      },
      pincode: {
        type: Number,
        required: function () {
          return !this.isGoogleUser;
        },
      },
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    isGoogleUser: {
      type: Boolean,
      default: false,
    },

    avatar: {
      imageURL: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true, versionKey: false },
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
