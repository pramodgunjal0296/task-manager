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
  const tasks = await Task.find({ userId: req.user._id });
  res.json(tasks);
});

// Update status
router.put("/:id", async (req, res) => {
  const { status } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { status },
    { new: true }
  );
  res.json(task);
});

// Delete task
router.delete("/:id", async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  res.sendStatus(204);
});

module.exports = router;
