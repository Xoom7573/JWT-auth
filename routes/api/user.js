const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

// Middleware Imports
const auth = require("../../middleware/auth");

// Modal Imports
const User = require("../../models/userSchema");

// @route   POST api/user/register (Register)
// @desc    Register new user
// @access  Public
router.post("/register", (req, res) => {
  const { name, username, email, password } = req.body;

  // Simple validation
  if (!name || !username || !email || !password)
    return res.status(400).json({ msg: "Pleas enter all fields" });

  // Check for existing user
  User.findOne({ username }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });
  });

  const newUser = new User({
    name,
    username,
    email,
    password,
  });

  // Create password hash and save to passwordHash
  bcrypt.hash(newUser.password, 10, (err, hash) => {
    if (err !== null) {
      return res.status(400).json({ msg: "Hash error" });
    }
    newUser.passwordHash = hash;
  });

  newUser.save().then(user => {
    jwt.sign(
      { id: user.id },
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err !== null) {
          return res.status(400).json({ msg: "Token error" });
        }

        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            registerDate: user.registerDate,
          },
        });
      }
    );
  });
});

// @route   POST api/user/login
// @desc    Login user and return jwt token
// @access  Public
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ username }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    jwt.sign(
      { id: user.id },
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err !== null) {
          return res.status(400).json({ msg: "Token err" });
        }

        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            registerDate: user.registerDate,
          },
        });
      }
    );
  });
});

// @route   GET api/user/data (fetch info)
// @desc    Get user data
// @access  Private
router.get("/data", auth, (req, res) => {
  User.findById(req.user.id)
    .select(["-password", "-passwordHash"])
    .then(user => res.json(user));
});

module.exports = router;
