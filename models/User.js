import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  interests: [String],
  profilePicture: { type: String, default: "" } // <-- New field
});


export default mongoose.model("User", UserSchema);
