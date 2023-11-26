import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    status: String,
    timeStart: Date,
    timeFinish: Date,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    createdBy: String,
    listUsers: Array,
    taskParentID: String,
  },
  {
    timestamps: true,
  }
);
const Task = mongoose.model("Task", taskSchema, "tasks");

export default Task;
