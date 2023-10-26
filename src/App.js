import './App.css';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ContactPage from './pages/contactpage'; 
import AboutPage from './pages/AboutPage';
import Address from './pages/Address';
 import  Footer from './pages/Footer';
 import VerifyEmail from './pages/VerifyEmail';
 import ResetPassword from './pages/ResetPassword';
 //import Login from './components/Login'
// import {signup} from './components/signup'


function App() {
  return (
    <div>
      {/* */}
{/* <Login/> */}
      <Router>
      <Navbar /> 
      

      {/* <LoginSignup /> */}

   
        <Routes>
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/aboutpage" element={<AboutPage />} />
          <Route path="/contactpage" element={<ContactPage />} />
          <Route path="/LoginSignup" element={<LoginSignup />} />
          <Route path="/Address" element={<Address />} />
          <Route path="/VerifyEmail" element={<VerifyEmail />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />

 
        </Routes>
      </Router>


       {/* <Footer/>  */}
    </div>
  );
}

export default App;