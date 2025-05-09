import React, { useState } from 'react';
import './Login.css'; // Assuming you have a CSS file for styling
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

const Login = () => {

  const {setUser} = useContext(TaskContext)
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const Navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('User Logged In:', credentials);

  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:credentials.email,password:credentials.password}),
    });

    if (!response.ok) {
      // If the response was not ok, parse and throw the error message
      
      const errorData = await response.json();
      alert(errorData.message,"Login failed");
      throw new Error(errorData.message || "Failed to login");
    }

    const data = await response.json();
    console.log("Login success:", data);
    setUser(data.user); // Assuming the API returns user data
    // Optionally, save the token if returned by the API (e.g., in local storage)
    localStorage.setItem("token", data.token);
    Navigate('/'); // Redirect to home or dashboard

    // Redirect or update the UI as needed after successful login
  } catch (err) {
    console.error("Error logging in:", err);
    // Optionally, set error state here to display to the user
  }
};

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
         <p>Don't have Account<a href="/signup">Signup</a></p>
      </form>
     
    </div>
  );
};

export default Login;