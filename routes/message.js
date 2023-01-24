const express = require("express");
const router = express.Router();

// Controller
const messageController = require("../controllers/messagesController");

router.get("/", messageController.display_messages);

router.get("/new", messageController.create_get);
router.post("/new", messageController.create_post);

router.post("/delete", messageController.delete_message);

module.exports = router;
