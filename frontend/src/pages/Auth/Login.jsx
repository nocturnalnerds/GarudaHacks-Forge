import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  // Added loading state for better UX during API calls
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true); // Set loading to true when submission starts

    try {
      const apiUrl = import.meta.env.VITE_BE_API;
      // Note: For production, ensure VITE_BE_API is set in your environment
      if (!apiUrl) {
        throw new Error("API URL is not configured. Please check your .env file.");
      }
      
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      
      const { token } = response.data;
      // For improved security, consider using httpOnly cookies managed by the backend
      // instead of localStorage, which is vulnerable to XSS attacks.
      localStorage.setItem('token', token);

      navigate('/home');
    } catch (error) {
      if (error.response?.data?.message) {
        // Use the specific error message from the server
        setErrorMsg(error.response.data.message);
      } else {
        // Provide a generic fallback for network issues or other errors
        setErrorMsg('Login failed. Please check your network or credentials.');
      }
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  const handleGuestLogin = () => {
    // This approach is simple for client-side guest identification.
    // Ensure protected routes or API calls can handle this 'guest' value gracefully.
    localStorage.setItem('token', 'guest');
    localStorage.setItem('userType', 'guest');
    navigate('/home');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h1 className="auth-title">Welcome Back</h1>

        {/* Improved accessibility with role="alert" for screen readers */}
        {errorMsg && (
          <div className="auth-error" role="alert">
            {errorMsg}
          </div>
        )}

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            // Added aria-invalid for better accessibility on error
            aria-invalid={!!errorMsg}
            disabled={loading} // Disable input during submission
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
            aria-invalid={!!errorMsg}
            disabled={loading} // Disable input during submission
          />
        </div>

        {/* Disable button during loading to prevent multiple submissions */}
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <button 
          type="button" 
          className="guest-button" 
          onClick={handleGuestLogin}
          disabled={loading}
        >
          Continue as Guest
        </button>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;