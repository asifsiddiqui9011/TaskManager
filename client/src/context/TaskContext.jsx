import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  
  const url = 'https://taskmanager-053o.onrender.com/api'
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  //function to get user projects
  const getUserProjects = async () => {
    try {
      const response = await fetch(`${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data.projects);
      console.log("User Projects:", data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      // Decode the token to get user information
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUser(decodedToken.user);
    }else{
       navigate('/login');
    }
  }, [token]);
  
  useEffect(()=>{
    if(token){
      // Fetch user projects when the token is available
      getUserProjects();
    }
  },[token])
  

  // Function to add a new task
  const addTask = (newTask) => {
    setTasks([...tasks, { id: Date.now(), ...newTask }]);
  };

  // Function to update a task
  const updateTask = (taskId, updatedData) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, ...updatedData } : task))
    );
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{url,getUserProjects,user,token,setUser, tasks, addTask, updateTask, deleteTask,projects,setProjects}}>
      {children}
    </TaskContext.Provider>
  );
};