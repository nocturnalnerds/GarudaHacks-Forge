import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Future backend integration point:
    // - Collect form data (name, email, password)
    // - Send POST request to your Node.js/Express backend endpoint (e.g., /api/register)
    // - Handle response (success/error)
    console.log('Registering user...');
    // Example of future backend call:
    /*
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          password: e.target.password.value
        })
      });
      if (response.ok) {
        navigate('/login');
      } else {
        // Handle error (show error message to user)
      }
    } catch (error) {
      // Handle network error
    }
    */
    
    // For now, navigate to login page after registration
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="auth-title">Create Account</h1>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            placeholder="Your Name" 
            required 
          />
        </div>
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
        <button type="submit" className="auth-button">Sign Up</button>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;