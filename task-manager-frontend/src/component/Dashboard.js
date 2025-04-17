import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import { AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
   const [error,setError]=useState(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium'
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
const [search, setSearch] = useState("");

   axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:5000/auth/user')
      .then(res => {
        setUser(res.data);
        return axios.get('http://localhost:5000/tasks');
      })
      .then(res => setTasks(res.data))
      .catch(err=>setError('Session expired! Please try after Relogin'))
      .finally(() => setLoading(false));
  }, []);
//   useEffect(() => {
//     axios.get('http://localhost:5000/auth/user')
//       .then(res => setUser(res.data))
//       .catch(() => window.location.href = '/');

//     axios.get('http://localhost:5000/tasks')
//       .then(res => setTasks(res.data));
//   }, []);

  const handleCreate = async () => {
    const res = await axios.post('http://localhost:5000/tasks', {
      ...form,
      dueDate: new Date(form.dueDate)
    });
    setTasks(prev => [...prev, res.data]);
    setForm({ title: '', description: '' });
  };

  const handleStatusChange = async (id, status) => {
    const res = await axios.put(`http://localhost:5000/tasks/${id}`, { status });
    setTasks(tasks.map(t => (t._id === id ? res.data : t)));
  };
  const handleUpdate = async (id, data) => {
    const res = await axios.put(`http://localhost:5000/tasks/${id}`, data);
    setTasks(tasks.map(t => (t._id === id ? res.data : t)));
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filter === "All" || task.status === filter;
    return matchesSearch && matchesStatus;
  });

  const logout = () => {
    axios.get('http://localhost:5000/auth/logout').then(() => {
      window.location.href = '/';
    });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
    <h2>Welcome, {user?.displayName}</h2>
    <button onClick={logout}>Logout</button>
   { error ? <p>{error}</p>:null}
    <div style={{ marginTop: '2rem' }}>
      <h3>Create Task</h3>
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        style={{ width: '100%', padding: '8px', marginBottom: '0.5rem' }}
      />
      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        style={{ width: '100%', padding: '8px', marginBottom: '0.5rem' }}
      />
      <input
  type="date"
  value={form.dueDate}
  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
  style={{ width: '100%', padding: '8px', marginBottom: '0.5rem' }}
/>

<select
  value={form.priority}
  onChange={(e) => setForm({ ...form, priority: e.target.value })}
  style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>
      <button onClick={handleCreate} style={{ padding: '8px 12px' }}>Add Task</button>
    </div>
  
    <div style={{ marginTop: '2rem' }}>
      <h3>Your Tasks</h3>
      <div style={{ marginBottom: '1rem' }}>
  <input
    placeholder="Search tasks..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{ marginRight: 8, padding: '6px' }}
  />

  <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: '6px' }}>
    <option value="All">All</option>
    <option value="pending">Pending</option>
    <option value="completed">Completed</option>
  </select>
</div>
{filteredTasks.length === 0 ? (
  <p>No tasks found</p>
) : (
  <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
  <thead>
    <tr style={{ backgroundColor: "#f5f5f5", textAlign: "left" }}>
      <th>Title</th>
      <th>Description</th>
      <th>Priority</th>
      <th>Due Date</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <AnimatePresence>
      {filteredTasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </AnimatePresence>
  </tbody>
</table>

)}
        
    </div>
 

  </div>
  );
};

export default Dashboard;
