import React from 'react';
import { Link } from 'react-router-dom';
import './GameRules.css';
import guruImage from '../../assets/images/guru.png';

function GameRules() {
  return (
    <div className="game-rules-container">
      <Link to="/game" className="back-arrow">←</Link>
      <h1 className="game-rules-title">Cara bermain</h1>
      <div className="rules-content">
        <ol>
          <li>Kerjakan semua quiz di setiap pulau untuk memenangkan permainan.</li>
          <li>Tekan gambar yang mengambang diatas setiap pulau dan jawab pertanyaan yang diberikan.</li>
          <li>Belajar bersama dengan guru digital dengan menekan tombol guru di atas kanan selama bermain.</li>
        </ol>
      </div>
      <Link to="/map" className="start-button">Mulai</Link>
      <div className="guru-icon">
        <img src={guruImage} alt="Guru" />
      </div>
    </div>
  );
}

export default GameRules;