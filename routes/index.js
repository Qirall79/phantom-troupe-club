var express = require("express");
var router = express.Router();
const passport = require("passport");

// Controller
const indexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", indexController.index);

// Sign up
router.get("/sign-up", indexController.sign_up_get);

router.post("/sign-up", indexController.sign_up_post);

// Login
router.get("/login", indexController.login_get);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/messages",
    failureRedirect: "/login",
  })
);

router.get("/logout", indexController.logout_get);

module.exports = router;
