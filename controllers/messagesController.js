const User = require("../models/User");
const Message = require("../models/Message");

exports.display_messages = (req, res, next) => {
  Message.find()
    .populate("user")
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
