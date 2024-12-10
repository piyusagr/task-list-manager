import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const EditableTable = ({ tasks, setTasks }) => {
  const [editingRow, setEditingRow] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do",
  });
  const [showForm, setShowForm] = useState(false);

  const handleEditClick = (taskId) => {
    setEditingRow(taskId === editingRow ? null : taskId);
  };

  const handleSaveClick = () => {
    setEditingRow(null);
    toast.success("Task updated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleInputChange = (e, taskId, field) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, [field]: e.target.value } : task
      )
    );
  };

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleAddTask = () => {
    const newTaskId = tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...newTask, id: newTaskId },
    ]);
    setNewTask({ title: "", description: "", status: "To Do" });
    setShowForm(false);
    toast.success("New task added successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast.success("Task deleted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="container mt-4">

      {/* Insert Task Button */}
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary shadow-sm"
        >
          {showForm ? "Cancel" : "Insert Task"}
        </button>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Add Task Form */}
      {showForm && (
        <form className="mb-4 p-3 border rounded shadow-sm bg-light">
          <div className="form-group mb-3">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={newTask.title}
              onChange={handleNewTaskChange}
              placeholder="Enter task title"
            />
          </div>
          <div className="form-group mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={newTask.description}
              onChange={handleNewTaskChange}
              placeholder="Enter task description"
              rows="3"
            />
          </div>
          <div className="form-group mb-3">
            <label>Status</label>
            <select
              className="form-control"
              name="status"
              value={newTask.status}
              onChange={handleNewTaskChange}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button type="button" className="btn btn-success" onClick={handleAddTask}>
            Add Task
          </button>
        </form>
      )}

      {/* Task Table */}
      <table className="table table-striped table-responsive-sm shadow-sm">
        <thead className="thead-dark">
          <tr>
            <th>Task ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>
                {editingRow === task.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={task.title}
                    onChange={(e) => handleInputChange(e, task.id, "title")}
                  />
                ) : (
                  task.title
                )}
              </td>
              <td>
                {editingRow === task.id ? (
                  <textarea
                    className="form-control"
                    value={task.description}
                    onChange={(e) => handleInputChange(e, task.id, "description")}
                    rows="2"
                  />
                ) : (
                  task.description
                )}
              </td>
              <td>
                {editingRow === task.id ? (
                  <select
                    className="form-control"
                    value={task.status}
                    onChange={(e) => handleInputChange(e, task.id, "status")}
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                ) : (
                  <span
                    className={`badge ${
                      task.status === "Done"
                        ? "badge-success"
                        : task.status === "In Progress"
                        ? "badge-warning"
                        : "badge-secondary"
                    }`}
                  >
                    {task.status}
                  </span>
                )}
              </td>
              <td>
                {editingRow === task.id ? (
                  <button
                    className="btn btn-success btn-sm mr-2"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-warning btn-sm mr-2"
                    onClick={() => handleEditClick(task.id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
