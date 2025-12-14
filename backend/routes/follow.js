import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// FOLLOW USER
router.post("/follow/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.following.includes(targetUser._id)) {
      return res.status(400).json({ message: "Already following" });
    }

    user.following.push(targetUser._id);
    targetUser.followers.push(user._id);

    await user.save();
    await targetUser.save();

    res.json({ message: "User followed" });
  } catch (err) {
    res.status(500).json({ message: "Follow failed" });
  }
});

// UNFOLLOW USER
router.post("/unfollow/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const targetUser = await User.findById(req.params.id);

    user.following = user.following.filter(
      (id) => id.toString() !== targetUser._id.toString()
    );

    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== user._id.toString()
    );

    await user.save();
    await targetUser.save();

    res.json({ message: "User unfollowed" });
  } catch (err) {
    res.status(500).json({ message: "Unfollow failed" });
  }
});

export default router;
