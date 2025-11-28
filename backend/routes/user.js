// routes/user.js
import express from "express";
import User from "../models/User.js";

const router = express.Router();

// ✅ Update interests
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

    if (!currentUser) return res.status(404).json({ error: "User not found" });

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

// ✅ Update profile picture
router.put("/:id/profile-picture", async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { profilePicture },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get a single user profile (only one route)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "username email interests roomNumber profilePicture"
    ); // include roomNumber here
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "username email roomNumber");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;