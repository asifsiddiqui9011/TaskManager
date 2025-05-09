import React, { useContext, useState } from 'react';
import './Navbar.css';
import { TaskContext } from '../../context/TaskContext';

const Navbar = () => {

  const{user,token} = useContext(TaskContext);
  const [menuOpen, setMenuOpen] = useState(false);
  console.log('User:', user);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">Task Manager</a>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="/" className="nav-links">Home</a>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-links">login</a>
          </li>
          <li className="nav-item">
            <a href="/signup" className="nav-links">signup</a>
          </li>
        </ul>
        <p>
          {token
          ? 
          <>
          <button onClick={localStorage.removeItem('token')}>Logout</button>
          </>
          
          : 
           <a href="/login" className="nav-links">login</a>
          }
        </p>
      </div>
    </nav>
  );
};

export default Navbar;