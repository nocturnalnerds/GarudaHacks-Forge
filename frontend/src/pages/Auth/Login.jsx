import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Future backend integration point:
    // - Collect form data (email, password)
    // - Send POST request to your Node.js/Express backend endpoint (e.g., /api/login)
    // - Handle response (success/error, store token if using JWT)
    console.log('Logging in user...');
    // Example of future backend call:
    /*
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value
        })
      });
      if (response.ok) {
        // Store token or session data
        navigate('/home');
      } else {
        // Handle error (show error message to user)
      }
    } catch (error) {
      // Handle network error
    }
    */
    
    // For now, navigate to home page
    navigate('/home');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h1 className="auth-title">Welcome Back</h1>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="you@example.com" 
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="••••••••" 
            required 
          />
        </div>
        <button type="submit" className="auth-button">Login</button>
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;