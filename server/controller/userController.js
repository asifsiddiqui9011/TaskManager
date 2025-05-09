// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust path as necessary

// It's a good idea to set your JWT secret via environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'Task_Manager_Secret';

// Signup controller
exports.signup = async (req, res) => {
  try {
    const { email, password, name, country } = req.body;

    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password, and name are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      country
    });
    await newUser.save();

    // Generate a token (expires in 1 hour)
    const token = jwt.sign({ id: newUser._id,user:newUser.name }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully', token, user: newUser.name });
  } catch (err) {
    console.error('Error during signup:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // consele.log(req.body,"body")

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Locate the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Validate the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate a token (expires in 1 hour)
    const token = jwt.sign({ id: user._id,user:user.name }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'User logged in successfully', token,user:user.name });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};