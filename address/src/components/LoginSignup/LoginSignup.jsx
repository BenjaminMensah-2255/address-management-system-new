import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../assets/user_icon.png';
import email_icon from '../assets/email_icon.png';
import lock_icon from '../assets/lock_icon.png';
import { useNavigate } from 'react-router-dom';
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri';

const SignupLogin = () => {
  const navigate = useNavigate(); 
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);


  const toggleAction = () => {
    setAction(action === "Sign Up" ? "Login" : "Sign Up");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (action === "Sign Up") {
      if (password === confirmPassword) {
        console.log("Sign Up");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Confirm Password:", confirmPassword);
      } else {
        console.log("Passwords do not match.");
      }
    } else if (action === "Login") {
      console.log("Login");
      console.log("Email:", email);
      console.log("Password:", password);
      // User clicked the Login button, navigate to the Address page
      navigate('/Address');
    }
  };

  return (
    <div> 
      <div className='container page-content'>
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="form-container"> 
          <form onSubmit={handleFormSubmit}>
            {action === "Sign Up" && (
              <div className="input Box" >
                <img src={user_icon} alt="" />
                <input
                  type="text" id='box'
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="input Box">
              <img src={email_icon} alt="" />
              <input
                type="email" id='box'
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input Box">
            <img src={lock_icon} alt="" />
            <input
             type={passwordVisible ? 'text' : 'password'}
             placeholder="Password"
              value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          <button
          className="toggle-password"
          onClick={() => setPasswordVisible(!passwordVisible)}
          >
          {passwordVisible ? <RiEyeCloseFill /> : <RiEyeFill />}
          </button>
          </div>
            {action === "Sign Up" && (
              <div className="input Box">
              <img src={lock_icon} alt="" />
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="toggle-password"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                {confirmPasswordVisible ? <RiEyeCloseFill /> : <RiEyeFill />}
              </button>
            </div>
            )}
            {action === "Login" && (
              <div className="forgot-password">
                Forgot your password? <span><a href="VerifyEmail" className='click-here'>click here</a></span>
              </div>
            )}
            <div className="submit-container">
              <button type="submit" className="submit">
                {action === "Sign Up" ? "Sign Up" : "Login"}
              </button>
            </div>
          </form>
        </div> 
        <div className="toggle-action" onClick={toggleAction}>
          {action === "Sign Up"
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </div>
      </div>
    </div>   
  );
}

export default SignupLogin;
