import React from 'react';
import Footer from './Footer';
import './Homepage.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom'; 

const Homepage = () => {
  const navigate = useNavigate();
  const handleSubmission = () => {
    // Use the email value or perform any other actions
    // console.log('Email submitted:', email);

    // Navigate to another page (e.g., '/anotherpage')
    navigate('/LoginSignup'); // Use navigate instead of history.push
  };
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="welcome-title">Welcome to the Address Management System</h1>
        
        <p className="pen">Organize and manage your addresses with ease. Start managing your addresses today</p>
        <p className="book"> Click the button below to access your address book.</p> <br/><br/>
        <button className="home-button" onClick={handleSubmission} style={{ animation: 'buttonAppear 1s ease forwards' }}>
        Get Started
        </button>

      </header>

      <main className="home-main">
      <i className="flat-icon"></i>

        {/* Your main content here */}
      </main>
      
      <Footer />
    </div>
  );
};

export default Homepage;
