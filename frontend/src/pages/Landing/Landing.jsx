import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">Are you ready to begin?
      </h1>
      <button className="landing-button" onClick={goToRegister}>
        Start Adventure
      </button>
    </div>
  );
}

export default Landing;
