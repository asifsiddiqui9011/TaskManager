// // app.js
// const express = require('express');
// const mongoose = require('mongoose');
// const authRoutes = require('./routes/authRoutes');

// const app = express();

// // Connect to MongoDB (adjust the connection string as needed)
// mongoose.connect('mongodb://localhost:27017/yourdbname', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Mount the authentication routes under an API namespace
// app.use('/api/user', authRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// app.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
 const authRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();

// Connect to MongoDB (adjust the URI as needed)
const MongoDB_URI = process.env.MONGO_URI; // Replace with your MongoDB URI
mongoose.connect(MongoDB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// (Optional) Middleware for authentication should come here to set req.user
 app.use('/api', authRoutes);
// Mount project routes
app.use('/api/project', projectRoutes);
// Mount task routes under the project route; note that :projectId will be available to taskRoutes
app.use('/api/project/:projectId/task', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));