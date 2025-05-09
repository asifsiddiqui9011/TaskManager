// models/User.js
// models/User.js
const mongoose = require('mongoose');

function arrayLimit(val) {
  return val.length <= 4;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  country: { type: String },
  projects: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
      }
    ],
    validate: [arrayLimit, 'A user can have at most 4 projects.']
  }
});

module.exports = mongoose.model('User', UserSchema);