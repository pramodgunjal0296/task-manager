import React, { useState } from "react";
import useTasks from "../../hooks/useTasks";
import TaskForm from "./TaskForm";
import TaskFilters from "./TaskFilters";
import TaskTable from "./TaskTable";
import {useNavigate} from "react-router-dom";
import Button from "../common/Button";

const Dashboard = () => {
  const { tasks, user, error, loading, createTask, updateTask, deleteTask } = useTasks();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate=useNavigate()


  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "All" || task.status === filter)
  );

  const handleStatusChange = (id, status) => updateTask(id, { status });

  const logout = () => {
   navigate('/')
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      // justifyContent: 'center',
      flexDirection:'column',
      // alignItems: 'flex-start',
      width: '100%',
      minHeight: '100vh',
      gap: '2rem',
      padding: '2rem',
      boxSizing: 'border-box',
    }}
>
  <div  style={{
      flex: '1 1 400px', // grow, shrink, min width
      maxWidth: '600px',
    }}>
    <h2>Welcome, {user?.displayName}</h2>
    <Button label="Logout" onClick={logout} color={`red`} />
    {error && <p>{error}</p>}
    <TaskForm onCreate={createTask} />
  </div>

  <div >
    <TaskFilters search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
    <TaskTable
      tasks={filteredTasks}
      onStatusChange={handleStatusChange}
      onDelete={deleteTask}
      onUpdate={updateTask}
    />
  </div>
</div>
  );
};

export default Dashboard;
