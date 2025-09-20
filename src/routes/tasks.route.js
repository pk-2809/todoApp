import express from "express";
import { getDashboardDetails, createTask, updateTask } from "../controllers/task.controller.js";

const TaskRoutes = express.Router();

TaskRoutes.post("/dashboard", getDashboardDetails);
TaskRoutes.post("/create", createTask);
TaskRoutes.post("/update", updateTask);

export default TaskRoutes;
