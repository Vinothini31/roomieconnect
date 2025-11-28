import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  occupants: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: String,
    },
  ],
  capacity: { type: Number, default: 3 },
});

export default mongoose.model("Room", RoomSchema);