var express = require("express");
var router = express.Router();
const passport = require("passport");

// Controller
const indexController = require("../controllers/indexController");
const clubController = require("../controllers/clubController");

/* GET home page. */
router.get("/", indexController.index);

// Sign up
router.get("/sign-up", indexController.sign_up_get);

router.post("/sign-up", indexController.sign_up_post);

// Login
router.get("/login", indexController.login_get);

router.post("/login", indexController.login_post);

router.get("/logout", indexController.logout_get);

// Club
router.get("/join", clubController.join_get);
router.post("/join", clubController.join_post);

router.get("/admin", clubController.admin_get);
router.post("/admin", clubController.admin_post);

module.exports = router;
