import React from 'react';
import './Footer.css'
const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-content">
        <p className='address'>&copy; 2023  Address Management System</p>
        <ul className="social-links">
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">LinkedIn</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
