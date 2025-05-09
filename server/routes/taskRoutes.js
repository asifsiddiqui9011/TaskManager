// routes/taskRoutes.js
const express = require('express');
const router = express.Router({ mergeParams: true });
const taskController = require('../controller/taskController');

// API endpoint constants for tasks
const CREATE_TASK = '/';
const GET_TASK = '/:taskId';
const UPDATE_TASK = '/:taskId';
const DELETE_TASK = '/:taskId';

// Create a new task for a specific project
router.post(CREATE_TASK, taskController.createTask);

// Get a specific task from a project
router.get(GET_TASK, taskController.getTask);

// Update a specific task in a project
router.put(UPDATE_TASK, taskController.updateTask);

// Delete a task from a project
router.delete(DELETE_TASK, taskController.deleteTask);

module.exports = router;