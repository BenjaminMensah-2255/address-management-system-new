import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={`navbar ${showMenu ? 'open' : ''}`}>
      <img src="" alt="" />
      
      <div className={`menu-icon ${showMenu ? 'active' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`nav-links ${showMenu ? 'visible' : ''}`}>
        <Link to="/Homepage" className="nav-link">Home</Link>
        <Link to="/aboutpage" className="nav-link">About</Link>
        <Link to="/contactpage" className="nav-link">Contact Us</Link>
        <Link to="/LoginSignup" className="nav-link">Login/Sign Up</Link>
        <Link to="/LoginSignup" className="nav-link">Log out</Link>
        <Link to="/Address" className="nav-link">Address</Link>
      </div>
    </div>
  );
}

export default Navbar;
