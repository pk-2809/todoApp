import mongoose from "mongoose";
import { TASK_PRIORITIES, TASK_STATUSES } from "../utils/constants.js";

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    taskName: { type: String, required: true },
    priority: {
      type: String,
      enum: Object.values(TASK_PRIORITIES),
      default: "medium",
    },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(TASK_STATUSES),
      default: "pending",
    },
    repeating: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
