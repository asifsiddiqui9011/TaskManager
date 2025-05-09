// CreateProjectModal.jsx
import React, { useState } from 'react';
import './Home.css';

const CreateProjectModal = ({ onSave, onClose }) => {

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Make the API call when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Check that a title is provided (you could add further validations as needed)
    if (!formData.title) {
      setError('Title is required.');
      return;
    }

    setLoading(true);

    try {
      // Grab token from local storage (if you're using token-based authentication)
      const token = localStorage.getItem('token');

      // Make the POST call to the project API endpoint
      const response = await fetch("http://localhost:3000/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the token in the Authorization header if available
          "Authorization": token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify(formData)
      });

      // Parse the response
      const data = await response.json();

      if (!response.ok) {
        // Display error from the server response
        setError(data.message || "Failed to create project");
        alert(data.message);
      } else {
        console.log("Project created successfully:", data);
        // Optionally call the onSave callback with the new project data
        if (onSave) {
          onSave(data.project);
        }
      }
    } catch (err) {
      console.error("Error creating project:", err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Project</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Project Title"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Project Description"
            required
          />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="modal-actions">
            <button type="submit">Create Project</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;