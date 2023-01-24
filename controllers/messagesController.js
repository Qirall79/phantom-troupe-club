const User = require("../models/User");
const Message = require("../models/Message");
const { body, validationResult } = require("express-validator");

exports.display_messages = (req, res, next) => {
  Message.find()
    .populate("user")
    .sort({ timestamp: -1 })
    .exec((err, messages) => {
      if (err) {
        return next(err);
      }
      res.render("messages_display", {
        title: "Messages",
        user: req.user,
        messages,
      });
    });
};

exports.create_get = (req, res, next) => {
  res.render("message_create", {
    title: "Create Message",
  });
};

exports.create_post = [
  body("title").isLength({ min: 1 }).withMessage("Title is required"),
  body("message")
    .isLength({ min: 1 })
    .withMessage("Message body is required")
    .isLength({ min: 10 })
    .withMessage("Message is so small."),
  (req, res, next) => {
    const errors = validationResult(req);
    const message = new Message({
      title: req.body.title,
      text: req.body.message,
      timestamp: new Date(),
      user: req.user.id,
    });

    if (!errors.isEmpty()) {
      res.render("message_create", {
        title: "Create Message",
        errors: errors.array(),
      });
      return;
    }
    message.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/messages");
    });
  },
];

exports.delete_message = (req, res, next) => {
  if (req.user.membership !== "admin") {
    res.redirect("/logout");
    return;
  }
  Message.findByIdAndDelete(req.body.message_id, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/messages");
  });
};
