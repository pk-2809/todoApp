import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  streakCount: {
    type: Number,
    required: false,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
