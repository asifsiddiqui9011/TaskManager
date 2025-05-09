// // // import React from 'react';
// // // import './Home.css';

// // // const projects = [
// // //   { id: 1, title: "Project Alpha", description: "This is the first amazing project.", status: "In Progress" },
// // //   { id: 2, title: "Project Beta", description: "An exciting venture into new territories.", status: "Completed" },
// // //   { id: 3, title: "Project Gamma", description: "Experimenting with innovative designs.", status: "Pending" },
// // //   { id: 4, title: "Project Delta", description: "A futuristic concept brought to life.", status: "In Progress" }
// // // ];

// // // const Home = () => {
// // //   return (
// // //     <div className="home">
// // //       <h1>Welcome to Your Projects</h1>
// // //       <div className="project-container">
// // //         {projects.map((project) => (
// // //           <div key={project.id} className="project-card">
// // //             <h2>{project.title}</h2>
// // //             <p>{project.description}</p>
// // //             <p><strong>Status:</strong> {project.status}</p>
// // //           </div>
// // //         ))}
// // //       </div>
// // //       <button className="create-project">Create Project</button>
// // //     </div>
// // //   );
// // // };

// // // export default Home; 









// // // Home.jsx
// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import EditProjectModal from './EditProjectModal';
// // import './Home.css';

// // const dummyProjects = [
// //   {
// //     id: 1,
// //     title: 'Project Alpha',
// //     description: 'This is the first amazing project.',
// //     status: 'In Progress',
// //   },
// //   {
// //     id: 2,
// //     title: 'Project Beta',
// //     description: 'An exciting venture into new territories.',
// //     status: 'Completed',
// //   },
// //   {
// //     id: 3,
// //     title: 'Project Gamma',
// //     description: 'Experimenting with innovative designs.',
// //     status: 'Pending',
// //   },
// //   {
// //     id: 4,
// //     title: 'Project Delta',
// //     description: 'A futuristic concept brought to life.',
// //     status: 'In Progress',
// //   },
// // ];

// // const Home = () => {
// //   const [projects, setProjects] = useState(dummyProjects);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [currentProject, setCurrentProject] = useState(null);
// //   const navigate = useNavigate();

// //   // Navigate to project description page using the project id.
// //   const handleVisit = (projectId) => {
// //     navigate(`/project/${projectId}`);
// //   };

// //   // Opens the edit modal by setting the current project.
// //   const handleEdit = (project) => {
// //     setCurrentProject(project);
// //     setIsModalOpen(true);
// //   };

// //   // Delete a project after confirmation.
// //   const handleDelete = (projectId) => {
// //     if (window.confirm('Are you sure you want to delete this project?')) {
// //       setProjects((prevProjects) =>
// //         prevProjects.filter((proj) => proj.id !== projectId)
// //       );
// //     }
// //   };

// //   // Save the updated project details from the modal.
// //   const handleSave = (projectId, updatedData) => {
// //     setProjects((prevProjects) =>
// //       prevProjects.map((proj) =>
// //         proj.id === projectId ? { ...proj, ...updatedData } : proj
// //       )
// //     );
// //     setIsModalOpen(false);
// //     setCurrentProject(null);
// //   };

// //   const handleCloseModal = () => {
// //     setIsModalOpen(false);
// //     setCurrentProject(null);
// //   };

// //   return (
// //     <div className="home">
// //       <h1>Welcome to Your Projects</h1>
// //       <div className="project-container">
// //         {projects.map((project) => (
// //           <div key={project.id} className="project-card">
// //             <h2>{project.title}</h2>
// //             <p>{project.description}</p>
// //             <p>
// //               <strong>Status:</strong> {project.status}
// //             </p>
// //             <div className="project-buttons">
// //               <button onClick={() => handleVisit(project.id)}>Visit</button>
// //               <button onClick={() => handleEdit(project)}>Edit</button>
// //               <button onClick={() => handleDelete(project.id)}>Delete</button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //       <button className="create-project">Create Project</button>
// //       {isModalOpen && currentProject && (
// //         <EditProjectModal
// //           project={currentProject}
// //           onSave={handleSave}
// //           onClose={handleCloseModal}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default Home; 




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import EditProjectModal from './EditProjectModal';
// import CreateProjectModal from './CreateProjectModal';
// import './Home.css';
// import { useContext } from 'react';
// import { TaskContext } from '../../context/TaskContext';

// const dummyProjects = [
//   { id: 1, title: 'Project Alpha', description: 'First amazing project.', status: 'In Progress' },
//   { id: 2, title: 'Project Beta', description: 'Exciting venture.', status: 'Completed' },
//   { id: 3, title: 'Project Gamma', description: 'Innovative designs.', status: 'Pending' },
//   { id: 4, title: 'Project Delta', description: 'Futuristic concept.', status: 'In Progress' }
// ];

// const Home = () => {
//   const{projects,setProjects} = useContext(TaskContext)
//   // const [projects, setProjects] = useState(dummyProjects);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [currentProject, setCurrentProject] = useState(null);
//   const navigate = useNavigate();

//   // Navigate to project description page using the project id.
//   const handleVisit = (projectId) => {
//     navigate(`/project/${projectId}`);
//   };

//   // Opens the edit modal by setting the current project.
//    const handleEdit = (project) => {
//     setCurrentProject(project);
//     setIsEditModalOpen(true);
//   };

//   // Delete a project after confirmation.
//   const handleDelete = (projectId) => {
//     if (window.confirm('Are you sure you want to delete this project?')) {
//       setProjects((prevProjects) => prevProjects.filter((proj) => proj.id !== projectId));
//     }
//   };

//   // Save the updated project details from the edit modal.
//   const handleSaveEdit = (projectId, updatedData) => {
//     setProjects((prevProjects) =>
//       prevProjects.map((proj) => (proj.id === projectId ? { ...proj, ...updatedData } : proj))
//     );
//     setIsEditModalOpen(false);
//   };

//   // Open the create project modal.
//   const handleCreateProjectClick = () => {
//     setIsCreateModalOpen(true);
//   };

//   // Save the new project from the create modal.
//   const handleSaveCreate = (newProject) => {
//     setProjects([...projects, { id: Date.now(), ...newProject }]);
//     setIsCreateModalOpen(false);
//   };

//   return (
//     <div className="home">
//       <h1>Welcome to Your Projects</h1>
//       <div className="project-container">
//         {projects.map((project) => (
//           <div key={project.id} className="project-card">
//             <h2>{project.title}</h2>
//             <p>{project.description}</p>
//             <p><strong>Status:</strong> {project.status}</p>
//             <div className="project-buttons">
//               <button onClick={() => handleVisit(project._id)}>Visit</button>
//               <button onClick={() => handleEdit(project)}>Edit</button>
//               <button onClick={() => handleDelete(project._id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button className="create-project" onClick={handleCreateProjectClick}>Create Project</button>
      
//       {isEditModalOpen && currentProject && (
//         <EditProjectModal project={currentProject} onSave={handleSaveEdit} onClose={() => setIsEditModalOpen(false)} />
//       )}
      
//       {isCreateModalOpen && (
//         <CreateProjectModal onSave={handleSaveCreate} onClose={() => setIsCreateModalOpen(false)} />
//       )}
//     </div>
//   );
// };

// export default Home;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProjectModal from './EditProjectModal';
import CreateProjectModal from './CreateProjectModal';
import './Home.css';

const Home = () => {
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
      const response = await fetch('http://localhost:3000/api/project', {
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
      const response = await fetch(`http://localhost:3000/api/project/${projectId}`, {
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
        const response = await fetch(`http://localhost:3000/api/project/${projectId}`, {
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
      const response = await fetch('http://localhost:3000/api/project', {
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