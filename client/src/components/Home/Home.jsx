

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProjectModal from './EditProjectModal';
import CreateProjectModal from './CreateProjectModal';
import './Home.css';
import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

const Home = () => {

  const{url} = useContext(TaskContext);
  const [projects, setProjects] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const navigate = useNavigate();

  // Fetch projects when component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${url}/project`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Navigate to project description page using the project id.
  const handleVisit = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  // Open edit modal with selected project data
  const handleEdit = (project) => {
    setCurrentProject(project);
    setIsEditModalOpen(true);
  };

  // Update project details
  const handleSaveEdit = async (projectId, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${url}/project/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      const data = await response.json();
      setProjects((prevProjects) =>
        prevProjects.map((proj) => (proj._id === projectId ? data.project : proj))
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  // Delete a project after confirmation
  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/project/${projectId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete project');
        }

        setProjects((prevProjects) => prevProjects.filter((proj) => proj._id !== projectId));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  // Open the create project modal
  const handleCreateProjectClick = () => {
    setIsCreateModalOpen(true);
  };

  // Create new project
  const handleSaveCreate = async (newProject) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${url}/project`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const data = await response.json();
      setProjects([...projects, data.project]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className="home">
      <h1>Welcome to Your Projects</h1>
      <div className="project-container">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project._id} className="project-card">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <p><strong>Status:</strong> {project.status}</p>
              <div className="project-buttons">
                <button onClick={() => handleVisit(project._id)}>Visit</button>
                <button onClick={() => handleEdit(project)}>Edit</button>
                <button onClick={() => handleDelete(project._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
      <button className="create-project" onClick={handleCreateProjectClick}>Create Project</button>

      {isEditModalOpen && currentProject && (
        <EditProjectModal project={currentProject} onSave={handleSaveEdit} onClose={() => setIsEditModalOpen(false)} />
      )}

      {isCreateModalOpen && (
        <CreateProjectModal onSave={handleSaveCreate} onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  );
};

export default Home;