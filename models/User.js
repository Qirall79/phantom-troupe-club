const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  membership: {
    type: String,
    enum: ["admin", "member", "visitor"],
    required: true,
    default: "visitor",
  },
});

User.virtual("full_name").get(function () {
  return this.first_name + " " + this.last_name;
});

module.exports = mongoose.model("User", User);
