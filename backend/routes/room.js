import express from "express";
import Room from "../models/Room.js";
import User from "../models/User.js";

const router = express.Router();

// Get all rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find().populate("occupants.userId", "username");
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Join a room
router.post("/:roomId/join", async (req, res) => {
  try {
    const { userId } = req.body;
    const room = await Room.findById(req.params.roomId);
    const user = await User.findById(userId);

    if (!room || !user) return res.status(404).json({ error: "Room or user not found" });

    if (user.roomNumber && user.roomNumber !== room.roomNumber)
      return res.status(400).json({ error: "You are already in another room" });

    if (room.occupants.length >= room.capacity)
      return res.status(400).json({ error: "Room is full" });

    // Add user
    room.occupants.push({ userId: user._id, username: user.username });
    await room.save();

    user.roomNumber = room.roomNumber;
    await user.save();

    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leave a room
router.post("/:roomId/leave", async (req, res) => {
  try {
    const { userId } = req.body;
    const room = await Room.findById(req.params.roomId);
    const user = await User.findById(userId);

    if (!room || !user) return res.status(404).json({ error: "Room or user not found" });

    room.occupants = room.occupants.filter((o) => o.userId.toString() !== userId);
    await room.save();

    user.roomNumber = null;
    await user.save();

    res.json({ message: "Left room successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;