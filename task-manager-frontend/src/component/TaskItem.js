import React, { useState } from "react";
import { motion } from "framer-motion";

const TaskItem = ({ task, onStatusChange, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
  });

  const statusStyle = {
    completed: { backgroundColor: "#4caf50", color: "#fff" },
    pending: { backgroundColor: "#ff9800", color: "#fff" },
  };

  const handleSave = () => {
    onUpdate(task._id, editData);
    setEditMode(false);
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ borderBottom: "1px solid #eee" }}
    >
      {editMode ? (
        <>
          <td><input value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} /></td>
          <td><input value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} /></td>
          <td>
            <select value={editData.priority} onChange={(e) => setEditData({ ...editData, priority: e.target.value })}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </td>
          <td><input type="date" value={editData.dueDate} onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })} /></td>
          <td>
            <span style={{ ...statusStyle[task.status], padding: "4px 8px", borderRadius: 4 }}>
              {task.status}
            </span>
          </td>
          <td>
            <button onClick={handleSave} style={{ marginRight: 8 }}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>{task.priority}</td>
          <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</td>
          <td>
            <span style={{ ...statusStyle[task.status], padding: "4px 8px", borderRadius: 4 }}>
              {task.status}
            </span>
          </td>
          <td>
            <button
              onClick={() => onStatusChange(task._id, task.status === "pending" ? "completed" : "pending")}
              style={{ marginRight: 8 }}
            >
              Toggle
            </button>
            <button onClick={() => setEditMode(true)} style={{ marginRight: 8 }}>Edit</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
          </td>
        </>
      )}
    </motion.tr>
  );
};

export default TaskItem;
