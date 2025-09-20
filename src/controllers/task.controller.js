import * as TaskService from "../services/task.service.js";

export const getDashboardDetails = async (req, res) => {
  try {
    const userObjId = req.body?.userId;
    console.log(req.body);
    const userDetails = await TaskService.getUserDashboardDetails(userObjId);

    res.status(201).json({
      message: "Dashboard details fetched successfully",
      data: userDetails,
      status: true
    });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      message: err.message || "Server error",
      status: false
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const taskInfo = req.body;
    console.log(req.body);
    const userDetails = await TaskService.createTask(taskInfo);

    res.status(201).json({
      message: "New task created successfully",
      data: userDetails,
      status: true
    });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      message: err.message || "Server error",
      status: false
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskInfo = req.body;
    console.log(req.body);
    const userDetails = await TaskService.updateTask(taskInfo);

    res.status(201).json({
      message: "Updated task successfully",
      data: userDetails,
      status: true
    });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      message: err.message || "Server error",
      status: false
    });
  }
};