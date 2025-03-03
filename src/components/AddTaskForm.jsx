import React, { useState } from "react";
import axios from "axios";
import "../css/AddTaskForm.css";

function AddTaskForm({ onTaskAdded }) {
  const [task, setTask] = useState({
    name: "",
    description: "",
    date: "",
    status: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous message

    try {
      const response = await axios.post(
        "http://localhost:8080/task-manager/tasks",
        task,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setMessage("Task added successfully");
      setTask({ name: "", date: "", description: "", status: "" }); // Reset form

      if (onTaskAdded) onTaskAdded(response.data); // Notify parent component
    } catch (error) {
      console.error("Error adding task:", error);
      setMessage("Failed to add task. Try again");
    }
  };

  return (
    <div className="task-form">
      <h2>ADD TASK</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={task.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={task.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTaskForm;
