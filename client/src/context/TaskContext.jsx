import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  //function to get user projects
  const getUserProjects = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/project", {
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
  const [tasks, setTasks] = useState([
    {
        id: 1,
        title: "Design Homepage",
        description: "Create the layout for the homepage",
        status: "In Progress",
        dateCreated: "2025-05-09 10:30 AM",
        dateCompleted: ""
      },
      {
        id: 2,
        title: "Fix Bug #411",
        description: "Resolve the issue with the login modal",
        status: "Pending",
        dateCreated: "2025-05-08 02:15 PM",
        dateCompleted: ""
      },
      {
        id: 3,
        title: "Deploy Release",
        description: "Deploy version 2.0 to production",
        status: "Completed",
        dateCreated: "2025-05-07 09:00 AM",
        dateCompleted: "2025-05-09 05:00 PM"
      }
  ]);

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
    <TaskContext.Provider value={{getUserProjects,user,token,setUser, tasks, addTask, updateTask, deleteTask,projects,setProjects}}>
      {children}
    </TaskContext.Provider>
  );
};