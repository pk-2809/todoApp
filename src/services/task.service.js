import User from "../models/User.js";
import Task from "../models/Task.js";
import { TASK_PRIORITIES, TASK_STATUSES } from "../utils/constants.js";

export const getUserDashboardDetails = async (userObjectId) => {
    const userDetails = await User.findById(userObjectId);
    if(!userDetails) {
        throw createError("User not found", 404);
    }

    const tasks = await Task.find({ user: userObjectId }).sort({ createdAt: -1 });
    if(!tasks) {
        tasks = [];
    }
    return {
        userName: userDetails.name,
        streakCount: userDetails.streakCount,
        taskList: tasks
    }
};

export const createTask = async (taskInfo) => {
    if(!taskInfo.userId) {
        throw createError("User Id is required", 404);
    }
    else if(!taskInfo.name || taskInfo.name?.trim() == "") {
        throw createError("Please enter valid task name", 404);
    }
    
    else if(!taskInfo.priority || !Object.values(TASK_PRIORITIES).includes(taskInfo.priority?.toLowerCase())) {
        throw createError("Please enter valid task priority", 404);
    }
    else if(!taskInfo.category || taskInfo.category?.trim() == "") {
        throw createError("Please enter valid task category", 404);
    }
    else if(!taskInfo.status || !Object.values(TASK_STATUSES).includes(taskInfo.status?.toLowerCase())) {
        throw createError("Please enter valid task status", 404);
    }
    else if(typeof taskInfo.repeating != "boolean") {
        throw createError("Please enter valid task repeating value", 404);
    }
    const userDetails = await User.findById(taskInfo.userId);
    if(!userDetails) {
        throw createError("User not found", 404);
    }
    const taskObj = new Task({
        user: taskInfo.userId,
        taskName: taskInfo.name,
        priority: taskInfo.priority?.toLowerCase(),
        category: taskInfo.category?.toLowerCase(),
        status: taskInfo.status,
        repeating: taskInfo.repeating,
    });
    await taskObj.save();
    return taskObj;
};

export const updateTask = async (taskInfo) => {
    if(!taskInfo.taskId) {
        throw createError("Task Id is required", 404);
    }
    else if(!taskInfo.name || taskInfo.name?.trim() == "") {
        throw createError("Please enter valid task name", 404);
    }
    else if(!taskInfo.priority || !Object.values(TASK_PRIORITIES).includes(taskInfo.priority?.toLowerCase())) {
        throw createError("Please enter valid task priority", 404);
    }
    else if(!taskInfo.category || taskInfo.category?.trim() == "") {
        throw createError("Please enter valid task category", 404);
    }
    else if(!taskInfo.status || !Object.values(TASK_STATUSES).includes(taskInfo.status?.toLowerCase())) {
        throw createError("Please enter valid task status", 404);
    }
    else if(typeof taskInfo.repeating != "boolean") {
        throw createError("Please enter valid task repeating value", 404);
    }

    const newDetails = {
        user: taskInfo.userId,
        taskName: taskInfo.name,
        priority: taskInfo.priority?.toLowerCase(),
        category: taskInfo.category?.toLowerCase(),
        status: taskInfo.status,
        repeating: taskInfo.repeating,
    };

    const taskDetails = await Task.findByIdAndUpdate(taskInfo.taskId, {
        ...newDetails, updatedAt: new Date()
    }, { new: true, runValidators: true });
    if(!taskDetails) {
        throw createError("Task not found", 404);
    }
    return newDetails;
};

const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode
    return error
}