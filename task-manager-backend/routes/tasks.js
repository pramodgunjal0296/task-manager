const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: "Unauthorized" });
};

router.use(ensureAuth);

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
