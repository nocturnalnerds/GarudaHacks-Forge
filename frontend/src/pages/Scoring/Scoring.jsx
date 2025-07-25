import React from 'react';
import { Link } from 'react-router-dom';
import './Scoring.css';

function Scoring() {
  return (
    <div className="scoring-container">
      <h1 className="scoring-title">Hasil</h1>
      <div className="scoring-card">
        <h2 className="scoring-result">LULUS!</h2>
        <p className="scoring-score">70/100</p>
        <p className="scoring-message">Kerja bagus! Tingkatkan terus ya!</p>
        <Link to="/" className="scoring-button">Kembali</Link>
      </div>
    </div>
  );
}

export default Scoring;