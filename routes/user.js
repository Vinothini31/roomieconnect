// routes/user.js
import express from "express";
import User from "../models/User.js";

const router = express.Router();

// ✅ Update interests (keep as-is)
router.put("/:id/interests", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { interests: req.body.interests },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get similar users with score + shared interests
router.get("/:id/match", async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const allUsers = await User.find({ _id: { $ne: userId } });

    const matches = allUsers.map((u) => {
      const sharedInterests = u.interests.filter((i) =>
        currentUser.interests.includes(i)
      );
      const score = sharedInterests.length;

      return {
        id: u._id,
        username: u.username,
        score,
        sharedInterests,
      };
    });

    matches.sort((a, b) => b.score - a.score);

    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get a single user profile (NEW)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
