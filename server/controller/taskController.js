// controllers/taskController.js
const Project = require('../models/project.js');

// Create a new task within a specific project
exports.createTask = async (req, res) => {
  try {
    const { projectId } = req.params; // projectId comes from the URL parameter
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required for a task.' });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    // Add new task to the project's tasks array
    project.tasks.push({ title, description, status });
    await project.save();

    // The new task is the last element in the tasks array
    const newTask = project.tasks[project.tasks.length - 1];
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (err) {
    console.error('Error creating task:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Retrieve a single task from a project
exports.getTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    const task = project.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json({ task });
  } catch (err) {
    console.error('Error retrieving task:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing task within a project
exports.updateTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const { title, description, status } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    const task = project.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) {
      task.status = status;
      if (status === 'Completed' && !task.completedAt) {
        task.completedAt = Date.now();
      }
    }

    await project.save();
    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (err) {
    console.error('Error updating task:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task within a project

exports.deleteTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    const task = project.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    // Use the pull method on the tasks array to remove the task by its ID.
    project.tasks.pull(taskId);
    await project.save();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};