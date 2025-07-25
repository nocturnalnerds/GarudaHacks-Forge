import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Scoring.css';

function Scoring() {
  const location = useLocation();
  const result = location.state?.result;

  return (
    <div className="scoring-container">
      <h1 className="scoring-title">Hasil</h1>
      <div className="scoring-card">
        <h2 className="scoring-result">
          {result?.score >= 65 ? 'LULUS!' : 'TIDAK LULUS'}
        </h2>
        <p className="scoring-score">{result?.score}/100</p>
        {result?.rating && (
          <p className="scoring-rating">Rating: {result.rating}</p>
        )}
        <p className="scoring-message">{result?.message ?? 'Kerja bagus! Tingkatkan terus ya!'}</p>
        <Link to="/" className="scoring-button">Kembali</Link>
      </div>
    </div>
  );
}

export default Scoring;