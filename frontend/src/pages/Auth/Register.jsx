import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';


function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const apiUrl = import.meta.env.VITE_BE_API;
      const response = await axios.post(`${apiUrl}/register`, { email, name, password });
      console.log(response);
      setErrorMsg(response.data.message)
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Login Gagal. Tolong cek kembali data Anda.');
      }
    }
  };

  const handleGuestLogin = () => {
    // Set a guest token or flag to identify guest users
    localStorage.setItem('token', 'guest');
    localStorage.setItem('userType', 'guest');
    navigate('/home');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="auth-title">Create Account</h1>
        
        {errorMsg && <div className="auth-error">{errorMsg}</div>}
        
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name" 
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" 
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            required 
          />
        </div>
        <button type="submit" className="auth-button">Sign Up</button>
        
        <button type="button" className="guest-button" onClick={handleGuestLogin}>
          Continue as Guest
        </button>
        
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;