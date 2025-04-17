import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";
import InputField from "../common/InputField";

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
          <td >
          <InputField  value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} /></td>
          <td> <InputField value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} /></td>
          <td>
            <InputField 
            type="select"
            value={editData.priority} 
            onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
            options={["Low", "Medium", "High"]}
            />
          </td>
          <td ><InputField style={{width:'65%'}}type="date" value={editData.dueDate} onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })} /></td>
          <td>
            <span style={{ ...statusStyle[task.status], padding: "2px 4px", borderRadius: 4 }}>
              {task.status}
            </span>
          </td>
          <td>
            <Button label="Save" onClick={handleSave} color={`#1976D2`}/>
            <Button label="Cancel" color={`red`} onClick={() => setEditMode(false)}/>
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
            <Button
            color={`#1976D2`}
            label={'Update Status'}
              onClick={() => onStatusChange(task._id, task.status === "pending" ? "completed" : "pending")}
            
           />
             
            <Button label="Edit" color={`#1976D2`} onClick={() => setEditMode(true)} />
            <Button label="Delete"color={`red`} onClick={() => onDelete(task._id)}/>
          </td>
        </>
      )}
    </motion.tr>
  );
};

export default TaskItem;
