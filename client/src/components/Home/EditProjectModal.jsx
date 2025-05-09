import React, { useState } from 'react';
import './Home.css'; // Optional: include your styles here

const EditProject = ({ project, onSave,onClose }) => {
  // Initialize form state with the existing project data.
  const [formData, setFormData] = useState({
    title: project.title || '',
    description: project.description || ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle change for input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update project.
  // The onSave callback is called with the project ID and the updated project data.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate the title field (you can add further validations if needed)
    if (!formData.title) {
      setError('Title is required.');
      return;
    }

    setLoading(true);
    try {
      // Retrieve token (if using token based authentication) from local storage.
      const token = localStorage.getItem('token');

      // Assuming your backend is running at localhost:3000 and
      // the update project endpoint is /api/project/:projectId.
      const response = await fetch(`http://localhost:3000/api/project/${project._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Attach the token for back-end verification, if available.
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to update project');
      } else {
        console.log('Project updated successfully:', data);
        // Call the onSave callback with the project id and the updated project data.
        onSave(project.id, data.project);
      }
    } catch (err) {
      console.error('Error updating project:', err);
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-project-container">
      <h2 className="edit-project-title">Edit Project</h2>
      <form onSubmit={handleSubmit} className="edit-project-form">
        <div className="form-field">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-input"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project title"
          />
        </div>
        <div className="form-field">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            className="form-input"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter project description"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Updating...' : 'Update Project'}
        </button>
        <button className='cancel-button' onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProject;