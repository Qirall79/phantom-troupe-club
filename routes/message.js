const express = require("express");
const router = express.Router();

// Controller
const messageController = require("../controllers/messagesController");

router.get("/", messageController.display_messages);

module.exports = router;
