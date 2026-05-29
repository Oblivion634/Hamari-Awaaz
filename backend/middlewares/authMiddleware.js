import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

// Check user token
export const protect = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Check user role
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};
