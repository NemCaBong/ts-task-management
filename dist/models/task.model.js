"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
const Task = mongoose_1.default.model("Task", taskSchema, "tasks");
exports.default = Task;
