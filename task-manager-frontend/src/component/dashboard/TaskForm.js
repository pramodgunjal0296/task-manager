import React, { useState, useRef } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";

const TaskForm = ({ onCreate }) => {
  const bottomRef = useRef(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium"
  });
  

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onCreate({ ...form, dueDate: new Date(form.dueDate) });
  
      setForm({ title: "", description: "", dueDate: "", priority: "Medium" });
      
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100); 
  };

  return (
    <div>
      <h3>Create Task</h3>
      <InputField
        name="title"
        label="Title"
        value={form.title}
        onChange={handleChange}
      />
      <InputField
        name="description"
        label="Description"
        value={form.description}
        onChange={handleChange}
      />
      <InputField
        name="dueDate"
        type="date"
        label="Due Date"
        value={form.dueDate}
        onChange={handleChange}
      />
      <InputField
        name="priority"
        label="Priority"
        type="select"
        value={form.priority}
        onChange={handleChange}
        options={["Low", "Medium", "High"]}
      />
      <Button label="Add Task" onClick={handleSubmit} color="#1976d2" />
      <div ref={bottomRef} />
    </div>
  );
};

export default TaskForm;
