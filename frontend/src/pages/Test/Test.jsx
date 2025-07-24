import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Test.css';

function Test() {
  const [difficulty, setDifficulty] = useState('');
  const [language, setLanguage] = useState('');

  return (
    <div className="test-container">
      <h1 className="test-title">Test</h1>
      <div className="test-options">
        <div className="test-wrapper">
          <div className="test-card">
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="">Pilih Kesulitan</option>
              <option value="mudah">Mudah</option>
              <option value="sedang">Sedang</option>
              <option value="sulit">Sulit</option>
            </select>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="">Pilih Bahasa</option>
              <option value="jawa">Jawa</option>
              <option value="bali">Bali</option>
              <option value="sunda">Sunda</option>
            </select>
            <p className="info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        <div className="test-wrapper">
          <Link to="/exam" className="test-card">
            <button className="test-button" disabled={!difficulty || !language}>Mulai</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Test;