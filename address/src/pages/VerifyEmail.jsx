import React, { useState } from 'react';
import './VerifyEmail.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmission = () => {
    // Use the email value or perform any other actions
    console.log('Email submitted:', email);

    // Navigate to another page (e.g., '/anotherpage')
    navigate('/resetpassword'); // Use navigate instead of history.push
  };

  return (
    <div>
      <h1 className="head1">Address Management System</h1>
      <label className="label1">Please Enter Your Email</label>
      <input
        type="email"
        placeholder="yourEmail@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="email1"
      />
      <br /><br />
      <button type="submit" onClick={handleSubmission}>
        Submit
      </button>
    </div>
  );
};

export default VerifyEmail;
