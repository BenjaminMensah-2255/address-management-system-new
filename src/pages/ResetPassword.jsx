import React, { useState } from 'react';
import './ResetPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="reset-password-container">
      <h1>Address Management System</h1>
      <p>Enter your email and your new password</p>

      <div className="form-group">
        <label htmlFor="email">Enter Your email:</label>
        <input type="email" id="email" placeholder="yourEmail@gmail.com" />
      </div>

      <div className="form-group">
        <label htmlFor="password">Choose new Password:</label>
        <input type="password" id="password" placeholder='**********' value={password} onChange={handlePasswordChange} />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" placeholder='**********'  value={confirmPassword} onChange={handleConfirmPasswordChange} />
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default ResetPassword;
