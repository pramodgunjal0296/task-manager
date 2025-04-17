// hooks/useTasks.js
import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/user")
      .then(res => {
        setUser(res.data);
        return axios.get("http://localhost:5000/tasks");
      })
      .then(res => setTasks(res.data))
      .catch(() => setError("Session expired! Please login again."))
      .finally(() => setLoading(false));
  }, []);

  const createTask = async taskData => {
    const res = await axios.post("http://localhost:5000/tasks", taskData);
    setTasks(prev => [...prev, res.data]);
  };

  const updateTask = async (id, data) => {
    const res = await axios.put(`http://localhost:5000/tasks/${id}`, data);
    setTasks(prev => prev.map(t => (t._id === id ? res.data : t)));
  };

  const deleteTask = async id => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  return {
    tasks,
    setTasks,
    user,
    error,
    loading,
    createTask,
    updateTask,
    deleteTask
  };
};

export default useTasks;
