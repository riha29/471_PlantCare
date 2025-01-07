const express = require("express");
const Post = require("../models/post");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// Create a new post
router.post("/", protect, async (req, res) => {
    try {
      const { text, photo } = req.body;
      if (!text) {
        return res.status(400).json({ message: "Text is required to create a post" });
      }
  
      const post = new Post({ userId: req.userId, text, photo });
      const savedPost = await post.save();
      res.status(201).json(savedPost);
    } catch (err) {
      console.error("Error creating post:", err.message);
      res.status(500).json({ message: "Failed to create post" });
    }
  });

// Fetch all posts
router.get("/", protect, async (req, res) => {
    try {
      const posts = await Post.find()
        .populate("userId", "name")
        .populate("comments.userId", "name");
      res.status(200).json(posts);
    } catch (err) {
      console.error("Error fetching posts:", err.message);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });
  
// Like/Unlike a post
router.put("/:postId/like", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const index = post.likes.indexOf(req.userId);
    if (index === -1) {
      post.likes.push(req.userId); // Add like
    } else {
      post.likes.splice(index, 1); // Remove like
    }
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to like/unlike post" });
  }
});

// Add a comment to a post
router.post("/:postId/comment", protect, async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // setTimeout(async () => {
    //   try {
    //     post.comments.push({ userId: req.userId, text });
    //     await post.save();
    //     res.status(200).json(post);
    //   } catch (saveErr) {
    //     console.error(saveErr);
    //     res.status(500).json({ message: "Failed to save comment after delay" });
    //   }
    // }, 5000);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add comment" });
  }
});

// Share a post
router.post("/:postId/share", protect, async (req, res) => {
  try {
    const { postId } = req.params;

    // Find the original post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Add the shared post to the user's shared posts
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.sharedPosts.push(postId);
    await user.save();

    res.status(200).json({ message: "Post shared successfully", post });
  } catch (error) {
    console.error("Error sharing post:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
