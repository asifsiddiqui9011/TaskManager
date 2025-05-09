import { useContext } from 'react';
import './ProjectDesc.css';
import { TaskContext } from '../../context/TaskContext';
import { useParams } from 'react-router-dom';
import Task from '../Task/Task';



function ProjectDesc() {

const {projectId} = useParams();
const {projects} = useContext(TaskContext)

const project = projects.find((proj) => proj._id === (projectId));
if (!project) {
    return <div>Project not found</div>;
  }

return (
    <div className="project-desc-container">
    <div className="project-desc">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <p>Status: {project.status}</p>
      <p>Created At: {new Date(project.createdAt).toLocaleDateString()}</p>
      <p>Updated At: {new Date(project.updatedAt).toLocaleDateString()}</p>
    </div>
    <h2>Tasks</h2>
    {project.tasks.length > 0 ? (
        project.tasks.map(task => (
          <Task 
            key={task._id} 
            task={task}
            projectId={projectId}  
          />
        ))
      ) : (
        <p>No tasks available.</p>
      )}
    </div>

  );
}


export default ProjectDesc;