import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../models/user-model.js";

// Google OAuth setup
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:9000/api/auth/google/callback",
    },

    // Handle Google login
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        // If email not found
        if (!email) {
          return done(null, false);
        }

        // Check existing user
        let user = await UserModel.findOne({
          $or: [{ googleId: profile.id }, { email }],
        });

        // Create new user
        if (!user) {
          user = await UserModel.create({
            googleId: profile.id,
            name: profile.displayName,
            email,
            avatar: {
              imageURL: profile.photos?.[0]?.value,
              publicId: null,
            },
            isGoogleUser: true,
            role: "user",
          });
        }

        // Link Google if not already linked
        else if (!user.googleId) {
          user.googleId = profile.id;
          user.isGoogleUser = true;
          user.avatar = profile.photos?.[0]?.value;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

export default passport;