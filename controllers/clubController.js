const User = require("../models/User");

// Joining the club
exports.join_get = (req, res, next) => {
  res.render("join", {
    title: "Join Club",
  });
};

exports.join_post = (req, res, next) => {
  const pass = "walid123";

  if (req.body.password !== pass) {
    res.render("join", {
      title: "Join Club",
      error: "Incorrect pass code.",
    });
    return;
  }
  User.findByIdAndUpdate(
    req.user.id,
    { membership: "member" },
    {},
    (err, user) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    }
  );
};

// Managing the club
exports.admin_get = (req, res, next) => {
  res.render("admin", {
    title: "Admin",
  });
};

exports.admin_post = (req, res, next) => {
  const pass = "chrollo123";

  if (req.body.password !== pass) {
    res.render("admin", {
      title: "Admin",
      error: "Incorrect password",
    });
    return;
  }
  User.findByIdAndUpdate(
    req.user.id,
    { membership: "admin" },
    {},
    (err, user) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    }
  );
};
