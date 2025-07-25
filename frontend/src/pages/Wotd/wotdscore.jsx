import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './wotdscore.css'; // We'll create this CSS file next

function WotdScore() {
  const location = useLocation();
  // Retrieve the correct word passed from the game page
  const word = location.state?.word || 'KATA'; // Fallback in case state is not passed

  return (
    <div className="wotd-score-container">
      <h1 className="wotd-score-title">Word of the Day</h1>

      <div className="revealed-answer-container">
        <p className="revealed-answer-label">Kata yang benar adalah:</p>
        <p className="revealed-answer-word">{word}</p>
      </div>
      
      <h2 className="success-message">JAWABAN KAMU BENAR!</h2>

      <Link to="/game">
        <button className="kembali-button">
          Kembali
        </button>
      </Link>
    </div>
  );
}

export default WotdScore;
