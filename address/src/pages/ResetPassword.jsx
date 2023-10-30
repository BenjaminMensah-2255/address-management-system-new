import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './ResetPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="reset-password-container">
      <h1>Address Management System</h1>
      <p>Enter Your new password</p>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="**********"
            value={password}
            onChange={handlePasswordChange}
          />
          <span className="password-toggle" onClick={toggleShowPassword}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            placeholder="**********"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <span className="password-toggle" onClick={toggleShowPassword}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default ResetPassword;
