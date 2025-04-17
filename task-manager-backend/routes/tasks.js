const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: "Unauthorized" });
};

router.use(ensureAuth);

// Create a task
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description, userId: req.user._id });
  res.json(task);
});

// Get all tasks for the user
router.get("/", async (req, res) => {
  console.log("req", req);
  const tasks = await Task.find({ userId: req.user._id });
  res.json(tasks);
});

// Update status
router.put("/:id", async (req, res) => {
  console.log(req.body);
  const { status, description, title, priority, dueDate } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { status, description, title, priority, dueDate },
    { new: true }
  );
  res.json(task);
});

// Delete task
router.delete("/:id", async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  res.sendStatus(204);
});

// update task
router.put("/:id", async (req, res) => {
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

  res.json(task);
});

module.exports = router;
