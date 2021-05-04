const router = require("express").Router();

// @route   GET /
// @desc    Sends the home page
// @access  Public
router.get("/", (req, res) => {
  res.render("index.ejs");
});

// @route   GET /login
// @desc    Sends the login page
// @access  Public
router.get("/login", (req, res) => {
  res.render("login.ejs");
});

// @route   GET /register
// @desc    Send the register page
// @access  Public
router.get("/register", (req, res) => {
  res.render("register.ejs");
});

// @route   GET /app
// @desc    Send the app page
// @access  Public
router.get("/app", (req, res) => {
  res.render("app.ejs");
});

module.exports = router;
