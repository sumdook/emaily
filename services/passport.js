const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Local Signup
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const existingUser = await User.findOne({ "local.email": email });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);
        const user = await newUser.save();
        done(null, user);
      }
    }
  )
);

//Facebook Signup
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"],
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ "facebook.id": profile.id });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const newUser = new User();
        newUser.facebook.id = profile.id;
        newUser.facebook.token = accessToken;
        newUser.facebook.name = profile.displayName;
        newUser.facebook.email = profile.emails[0].value;
        const user = await newUser.save();
        done(null, user);
      }
    }
  )
);

//Google Signup
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ "google.id": profile.id });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const newUser = new User();
        newUser.google.id = profile.id;
        newUser.google.token = accessToken;
        newUser.google.name = profile.displayName;
        newUser.google.email = profile.emails[0].value;
        const user = await newUser.save();
        done(null, user);
      }
    }
  )
);
