// controllers/projectController.js
const User = require('../models/user');
const Project = require('../models/project');

// Create a new project and add its ObjectId to the user's projects array
exports.createProject = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required.' });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if maximum project limit (4) is reached
    if (user.projects.length >= 4) {
      return res.status(400).json({ message: 'Maximum project limit reached.' });
    }

    // Create a new project document
    const newProject = new Project({ title, description });
    await newProject.save();

    // Add the new project's ObjectId to the user's projects array
    user.projects.push(newProject._id);
    await user.save();

    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (err) {
    console.error('Error creating project:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Retrieve all projects for the authenticated user (using population)
exports.getProjects = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    // Populate the 'projects' field to get full project details
    const user = await User.findById(userId).populate('projects');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ projects: user.projects });
  } catch (err) {
    console.error('Error fetching projects:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Retrieve a single project by its ID (after verifying ownership)
exports.getProjectById = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const { projectId } = req.params;

    // Check if the projectId belongs to the user
    const user = await User.findById(userId);
    if (!user || !user.projects.includes(projectId)) {
      return res.status(404).json({ message: 'Project not found for this user.' });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    res.status(200).json({ project });
  } catch (err) {
    console.error('Error fetching project:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a project (title, description, etc.)
exports.updateProject = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const { projectId } = req.params;
    const { title, description } = req.body;

    // Check user ownership
    const user = await User.findById(userId);
    if (!user || !user.projects.includes(projectId)) {
      return res.status(404).json({ message: 'Project not found for this user.' });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    if (title) project.title = title;
    if (description) project.description = description;
    project.updatedAt = Date.now();

    await project.save();
    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (err) {
    console.error('Error updating project:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a project and remove its reference from the user's projects array
exports.deleteProject = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const { projectId } = req.params;

    // Check if the project belongs to the user
    const user = await User.findById(userId);
    if (!user || !user.projects.includes(projectId)) {
      return res.status(404).json({ message: 'Project not found for this user.' });
    }

    // Delete the project document
    const project = await Project.findByIdAndRemove(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    // Remove the reference from the user's projects array
    user.projects.pull(projectId);
    await user.save();

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};