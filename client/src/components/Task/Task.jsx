// Task.jsx
import React, { useContext, useState } from 'react';
import './Task.css'; // Optional: Create and import corresponding CSS for styling
import { TaskContext } from '../../context/TaskContext';

const Task = ({ task, projectId }) => {

  const{getUserProjects,url} = useContext(TaskContext);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    status: task.status
  });

  console.log('Task:', task);

  // Opens the modal and populates it with the current task data
  const handleEditClick = () => {
    setEditData({
      title: task.title,
      description: task.description,
      status: task.status
    });
    setEditModalOpen(true);
  };

  // Closes the modal without saving any changes
  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  // Update state on input change inside the modal
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // API call for updating an existing task
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${url}/project/${projectId}/task/${task._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
          },
          body: JSON.stringify(editData)
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log('Task updated successfully:', data);
        // Optionally call the parent's callback with the updated task data

        setEditModalOpen(false);
        getUserProjects();

      } else {
        console.error('Failed to update task:', data.message);
      }
    } catch (error) {
      console.error('Error while updating task:', error);
    }
  };

  // API call for deleting a task
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `${url}/project/${projectId}/task/${task._id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token ? `Bearer ${token}` : ''
            }
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log('Task deleted successfully:', data);
          // Optionally call the parent's callback to remove this task from the UI
          if (onTaskDeleted) {
            getUserProjects();
          }
        } else {
          console.error('Failed to delete task:', data.message);
        }
      } catch (error) {
        console.error('Error while deleting task:', error);
      }
    }
  };

  return (
    <div className="task">
      <div className="task-details">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>
          <strong>Status:</strong> {task.status}
        </p>
        <p>
          <strong>Date Created:</strong> {task.dateCreated}
        </p>
        <p>
          <strong>Date Completed:</strong> {task.dateCompleted ? task.dateCompleted : 'Not Completed'}
        </p>
      </div>
      <div className="task-actions">
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>

      {editModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Task</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <div className="form-field">
                <label htmlFor="editTitle">Title:</label>
                <input
                  type="text"
                  id="editTitle"
                  name="title"
                  value={editData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label htmlFor="editDescription">Description:</label>
                <textarea
                  id="editDescription"
                  name="description"
                  value={editData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-field">
                <label htmlFor="editStatus">Status:</label>
                <select
                  id="editStatus"
                  name="status"
                  value={editData.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="InProgress">InProgress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={handleCloseModal}>Cancel</button>
                <button type="submit">Update Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;