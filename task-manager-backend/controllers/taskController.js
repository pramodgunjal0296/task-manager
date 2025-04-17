const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({
      title,
      description,
      userId: req.user._id
    });
    res.status(201).json(task);
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.json(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, priority } = req.body;
    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;
    if (status) updatedFields.status = status;
    if (dueDate) updatedFields.dueDate = dueDate;
    if (priority) updatedFields.priority = priority;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updatedFields,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
