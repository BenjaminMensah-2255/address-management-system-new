import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../assets/user_icon.png';
import email_icon from '../assets/email_icon.png';
import lock_icon from '../assets/lock_icon.png';

const SignupLogin = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    } else {
      console.log("Login");
      console.log("Email:", email);
      console.log("Password:", password);
    }
  };

  return (
<div> 
    {/* <h1 className="vhim">Address Management System</h1>  */}
    <div className='container page-content'>
        
      <div className="header">
      

        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="form-container"> {/* Wrap your form content in this container */}
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
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {action === "Sign Up" && (
            <div className="input Box">
              <img src={lock_icon} alt="" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          {action === "Login" && (
            <div className="forgot-password">
              Forgot your password? <span><a href="VerifyEmail">click here</a></span>
            </div>
          )}
          <div className="submit-container">
            <button type="submit" className="submit">
              {action === "Sign Up" ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>
      </div> {/* Close the form-container div */}
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
