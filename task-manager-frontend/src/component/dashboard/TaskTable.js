import React from "react";
import TaskItem from "./TaskItem";
import { AnimatePresence } from "framer-motion";

const TaskTable = ({ tasks, onStatusChange, onDelete, onUpdate }) => {
  if (!tasks.length) return <p>No tasks found</p>;

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "1rem",
        textAlign: "center"
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#f5f5f5" }}>
          {[
            "Title",
            "Description",
            "Priority",
            "Due Date",
            "Status",
            "Actions"
          ].map(heading =>
            <th
              key={heading}
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                fontWeight: "600"
              }}
            >
              {heading}
            </th>
          )}
        </tr>
      </thead>

      <tbody>
        <AnimatePresence>
          {tasks.map(task =>
            <TaskItem
              key={task._id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          )}
        </AnimatePresence>
      </tbody>
    </table>
  );
};

export default TaskTable;
