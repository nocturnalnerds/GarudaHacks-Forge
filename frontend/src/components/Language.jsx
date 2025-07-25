import React from 'react';
import { Link } from 'react-router-dom';
import './Language.css';
import guruImage from '../assets/images/guru.png';

function Language() {
  return (
    <div className="language-container">
      <Link to="/game-rules" className="back-arrow">&#x2190;</Link>
      <div className="guru-icon">
        <img src={guruImage} alt="Guru" />
      </div>
    </div>
  );
}

export default Language;