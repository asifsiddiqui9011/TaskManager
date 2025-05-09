// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['Pending', 'InProgress', 'Completed'],
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task, TaskSchema };