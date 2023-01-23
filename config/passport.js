const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Verify function
const verifyFunction = new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }).exec((err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: "Incorrect Username" });
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    });
  });
});

passport.use(verifyFunction);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
