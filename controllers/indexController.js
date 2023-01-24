const User = require("../models/User");
const Message = require("../models/Message");
const { body, validationResult, check } = require("express-validator");
const passport = require("passport");

// password encryption
const hashPassword = require("../utils/hashPassword");

exports.index = (req, res, next) => {
  res.redirect("/messages");
};

exports.sign_up_get = (req, res, next) => {
  res.render("sign-up", {
    title: "Sign Up",
  });
};

exports.sign_up_post = [
  body("first_name")
    .isLength({ min: 1 })
    .withMessage("First name is required.")
    .isLength({ min: 3 })
    .withMessage("First name must contain at least 3 characters.")
    .isAlpha()
    .withMessage("First name must only contain alphabetic characters."),
  body("last_name")
    .isLength({ min: 1 })
    .withMessage("Last name is required.")
    .isLength({ min: 3 })
    .withMessage("Last name must contain at least 3 characters.")
    .isAlpha()
    .withMessage("Last name must only contain alphabetic characters."),
  body("username")
    .isLength({ min: 1 })
    .withMessage("Username is required.")
    .isLength({ min: 3 })
    .withMessage("Username must contain at least 3 characters."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
  check("password_confirmation", "Password don't match.")
    .exists()
    .custom((value, { req }) => value === req.body.password),
  (req, res, next) => {
    const errors = validationResult(req);
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: hashPassword(req.body.password),
      avatar: req.body.avatar,
    });

    if (!errors.isEmpty()) {
      res.render("sign-up", {
        title: "Sign Up",
        errors: errors.array(),
        user,
      });
      return;
    }
    user.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  },
];
exports.login_get = (req, res, next) => {
  if (req.user) {
    res.redirect("/messages");
    return;
  }
  res.render("login", {
    title: "Login",
  });
};

exports.login_post = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.render("login", {
        title: "Login",
        error: "Username or password incorrect",
      });
      return;
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  })(req, res, next);
};

exports.logout_get = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};
