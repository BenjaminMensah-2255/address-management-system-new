import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../assets/user_icon.png';
import email_icon from '../assets/email_icon.png';
import lock_icon from '../assets/lock_icon.png';
import { useNavigate } from 'react-router-dom';
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri';
import Homepage from '../../pages/Homepage';
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
        createAccount();
      } else {
        console.log("Passwords do not match.");
      }
    } else if (action === "Login") {
    
      // User clicked the Login button, navigate to the Address page
      loginUser();{
        
      }
     
    }
  };

  const createAccount = () => {
    // Regular expression to validate email format
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!name || !email || !password) {
      alert('Please fill in all fields.');
    } else if (!emailPattern.test(email)) {
      alert('Email address is not in the correct format.');
    } else {
      // Prepare the data to send
      const postData = {
        name: name,
        email: email,
        pwd: password
      };

      // Make an HTTP POST request to the PHP backend
      fetch('http://localhost:8000/api/auth/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          // Handle the response from the PHP backend as needed
          console.log(data);
          // Optionally, you can navigate to another page upon successful registration
          navigate('/');
        })
        .catch((error) => {
          // Handle errors, e.g., network issues or errors from the backend
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  };

  const loginUser = () => {
    // Regular expression to validate email format
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!email || !password) {
      alert('Please fill in all fields.');
    } else if (!emailPattern.test(email)) {
      alert('Email address is not in the correct format.');
    } else {
      // Prepare the data to send
      const postData = {
        email: email,
        pwd: password
      };

      // Make an HTTP POST request to the PHP backend
      fetch('http://localhost:8000/api/auth/signin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          // Handle the response from the PHP backend as needed
          console.log(data);
          // Optionally, you can navigate to another page upon successful registration
        })
        .catch((error) => {
          // Handle errors, e.g., network issues or errors from the backend
          console.error('There was a problem with the fetch operation:', error);
        });
    }

    // navigate('/Address');
  };
//  {createAccount?login:signup}
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
              <div className="input Box">
                <img src={user_icon} alt="" />
                <input
                  type="text"
                  id='box'
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="input Box">
              <img src={email_icon} alt="" />
              <input
                type="email"
                id='box'
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
              <div className="toggle-password" onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <RiEyeCloseFill /> : <RiEyeFill />}
              </div>
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
                <div className="toggle-password" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                  {confirmPasswordVisible ? <RiEyeCloseFill /> : <RiEyeFill />}
                </div>
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
