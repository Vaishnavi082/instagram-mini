import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// CREATE POST
router.post("/posts", auth, async (req, res) => {
  try {
    const { imageUrl, caption } = req.body;

    const post = new Post({
      author: req.userId,
      imageUrl,
      caption,
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Post creation failed" });
  }
});

// FEED (posts from followed users)
router.get("/feed", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const posts = await Post.find({
      author: { $in: user.following },
    })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Feed fetch failed" });
  }
});

// LIKE POST
router.post("/posts/:id/like", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.userId)) {
      post.likes.push(req.userId);
      await post.save();
    }

    res.json({ message: "Post liked" });
  } catch (err) {
    res.status(500).json({ message: "Like failed" });
  }
});

// UNLIKE POST
router.post("/posts/:id/unlike", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    post.likes = post.likes.filter(
      (id) => id.toString() !== req.userId
    );

    await post.save();
    res.json({ message: "Post unliked" });
  } catch (err) {
    res.status(500).json({ message: "Unlike failed" });
  }
});

// COMMENT ON POST
router.post("/posts/:id/comment", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    post.comments.push({
      user: req.userId,
      text: req.body.text,
    });

    await post.save();
    res.json({ message: "Comment added" });
  } catch (err) {
    res.status(500).json({ message: "Comment failed" });
  }
});

export default router;
