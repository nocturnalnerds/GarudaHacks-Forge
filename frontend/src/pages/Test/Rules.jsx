import React from 'react';
import { Link } from 'react-router-dom';
import './Rules.css';

function Rules() {
  return (
    <div className="rules-container">
      <h1 className="rules-title">Peraturan</h1>
      <div className="rules-options">
        <div className="rules-wrapper">
          <div className="rules-card">
            <p>1. Tidak ada perangkat elektronik lain yang digunakan.</p>
          </div>
          <div className="rules-card">
            <p>2. Lingkungan ujian bersih.</p>
          </div>
          <div className="rules-card">
            <p>3. Kerjakan ulang secara mandiri.</p>
          </div>
          <div className="rules-card">
            <p>4. Tidak ada komunikasi.</p>
          </div>
          <div className="rules-card">
            <p>5. Lingkungan yang terang, tampilan webcam yang jelas.</p>
          </div>
          <div className="rules-card">
            <p>6. Tetap di depan kamera.</p>
          </div>
          <div className="rules-card">
            <p>7. Hanya satu layar.</p>
          </div>
          <div className="rules-card">
            <p>8. Tidak ada browser lain atau perangkat lunak yang tidak sah.</p>
          </div>
        </div>
        <div className="rules-wrapper">
          <Link to="/test" className="rules-card">
            <button className="rules-button">Lanjut</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Rules;