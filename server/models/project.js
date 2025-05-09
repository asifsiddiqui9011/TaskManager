
// models/Project.js
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

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tasks: [TaskSchema], // Keeping the task "id" in the project as a subdocument.
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);