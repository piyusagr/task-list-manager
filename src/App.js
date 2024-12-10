import React, { useState, useEffect } from "react";
import axios from "axios";
import EditableTable from "./components/EditableTable";
import TaskFilters from "./components/TaskFilters";
import SearchBar from "./components/SearchBar";
import { notify, ToastContainer } from "./components/Toast";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
      const mappedTasks = response.data.slice(0, 20).map((task) => ({
        id: task.id,
        title: task.title,
        description: "",
        status: task.completed ? "Done" : "To Do",
      }));
      setTasks(mappedTasks);
    };
    fetchTasks();
  }, []);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    notify("Task added successfully!");
  };

  const handleEditTask = () => notify("Task updated successfully!");

  const handleDeleteTask = () => notify("Task deleted successfully!");

  const filteredTasks = tasks
    .filter((task) =>
      filter === "All" ? true : task.status === filter
    )
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="container">
      <h1 className="my-4">Task List Manager</h1>


      <div className="d-flex justify-content-between mb-4 ">
        <TaskFilters filter={filter} setFilter={setFilter} />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

     
      <EditableTable tasks={filteredTasks} setTasks={setTasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />

      <ToastContainer />
    </div>
  );
};

export default App;
