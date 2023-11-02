import React from 'react';
import './App.css';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ContactPage from './pages/contactpage'; 
import AboutPage from './pages/AboutPage';
import Address from './pages/Address';
import Footer from './pages/Footer';
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} /> {/* Set this as the default route */}
          <Route path="/aboutpage" element={<AboutPage />} />
          <Route path="/contactpage" element={<ContactPage />} />
          <Route path="/LoginSignup" element={<LoginSignup />} />
          <Route path="/Address" element={<Address />} />
          <Route path="/VerifyEmail" element={<VerifyEmail />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
