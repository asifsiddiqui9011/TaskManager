// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');
const fetchUser = require('../middleware/fetchUser');

// API endpoint constants for clarity
const CREATE_PROJECT = '/';
const GET_PROJECTS = '/';
const GET_PROJECT_BY_ID = '/:projectId';
const UPDATE_PROJECT = '/:projectId';
const DELETE_PROJECT = '/:projectId';

// Create a new project
router.post(CREATE_PROJECT,fetchUser, projectController.createProject);

// Get all projects for the authenticated user
router.get(GET_PROJECTS,fetchUser, projectController.getProjects);

// Get a single project by its ID
router.get(GET_PROJECT_BY_ID,fetchUser, projectController.getProjectById);

// Update a project by its ID
router.put(UPDATE_PROJECT,fetchUser, projectController.updateProject);

// Delete a project by its ID
router.delete(DELETE_PROJECT,fetchUser, projectController.deleteProject);

module.exports = router;