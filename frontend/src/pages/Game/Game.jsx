import React from 'react';
import { Link } from 'react-router-dom';
import './Game.css';

// Import your local images
import guruImage from '../../assets/images/guru.png';
import bumiImage from '../../assets/images/bumi.png';

function Game() {
  return (
    <div className="game-container">
      {/* Back arrow at the top, similar to CeritaRakyat */}
      <Link to="/home" className="back-arrow">←</Link>

      <h1 className="game-title">Pilihlah opsi</h1>
      <div className="game-options">
        <div className="option-wrapper">
          <Link to="#" className="game-card">
            <img src={guruImage} alt="Guru" />
          </Link>
          <div className="option-label">Guru</div>
        </div>
        <div className="option-wrapper">
          <Link to="/game-rules" className="game-card">
            <img src={bumiImage} alt="Jelajah Budaya" />
          </Link>
          <div className="option-label">Jelajah Budaya</div>
        </div>
      </div>
    </div>
  );
}

export default Game;