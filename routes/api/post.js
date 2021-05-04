const router = require("express").Router();

// Middleware Imports
const auth = require("../../middleware/auth");

// Modal Imports
const Post = require("../../models/postSchema");

// @route   POST api/post/create
// @desc    Make a new post
// @access  Private
router.post("/create", auth, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content)
    return res.status(400).json({ msg: "Pleas enter all fields" });

  const newPost = new Post({
    title,
    content,
  });

  User.findById(req.user.id)
    .select(["-password", "-passwordHash"])
    .then(user => {
      newPost.creator = user.username;

      newPost.save().then(user => res.json(newPost));
    });
});

module.exports = router;
