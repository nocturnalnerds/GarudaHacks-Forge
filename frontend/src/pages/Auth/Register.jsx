import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(''); // State for success message
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    // Basic client-side validation
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_BE_API;
      if (!apiUrl) {
        throw new Error("API URL is not configured. Please check your .env file.");
      }

      const response = await axios.post(`${apiUrl}/register`, { email, name, password });

      // Display success message from the server
      setSuccessMsg(response.data.message || 'Registration successful! Redirecting to login...');

      // Redirect to login page after a short delay to allow user to see the message
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        // Updated generic error message for clarity
        setErrorMsg('Registration failed. Please check your details and try again.');
      }
    } finally {
      // Ensure loading is set to false regardless of outcome
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    // This functionality remains the same
    localStorage.setItem('token', 'guest');
    localStorage.setItem('userType', 'guest');
    navigate('/home');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="auth-title">Create Account</h1>

        {/* Display error message */}
        {errorMsg && (
          <div className="auth-error" role="alert">
            {errorMsg}
          </div>
        )}

        {/* Display success message */}
        {successMsg && (
          <div className="auth-success" role="status">
            {successMsg}
          </div>
        )}

        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
            disabled={loading} // Disable during submission
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
            aria-invalid={!!errorMsg} // Accessibility for errors
            disabled={loading}
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
            disabled={loading}
          />
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
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
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
