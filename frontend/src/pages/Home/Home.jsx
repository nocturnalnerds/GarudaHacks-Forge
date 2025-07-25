import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Import your local images
import bookImage from '../../assets/images/book.png';
import gameImage from '../../assets/images/x.png';
// Import the new test image
import testImage from '../../assets/images/test.png';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Pilih Kegiatan</h1>
      <div className="options-container">
        {/* Option 1: Read Stories */}
        <div className="option-wrapper">
          <Link to="/cerita-rakyat" className="option-card">
            <img src={bookImage} alt="Cerita Rakyat" />
          </Link>
          <div className="option-label">Cerita Rakyat</div>
        </div>

        {/* Option 2: Play Games */}
        <div className="option-wrapper">
          <Link to="/game" className="option-card">
            <img src={gameImage} alt="Games" />
          </Link>
          <div className="option-label">Games</div>
        </div>

        {/* Option 3: Test - The new option is added here */}
        <div className="option-wrapper">
          <Link to="/rules" className="option-card">
            <img src={testImage} alt="Test" />
          </Link>
          <div className="option-label">Test</div>
        </div>
      </div>
    </div>
  );
}

export default Home;