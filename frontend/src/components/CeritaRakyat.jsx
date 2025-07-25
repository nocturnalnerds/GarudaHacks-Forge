import React from 'react';
import { Link } from 'react-router-dom';
import './CeritaRakyat.css';

// Import the story images
import malinImage from '../assets/images/malin.png';
import roroImage from '../assets/images/roro.png';
import empatImage from '../assets/images/empat.png';

function CeritaRakyat() {
  return (
    <div className="cerita-container">
      <Link to="/home" className="back-arrow">&#x2190;</Link>

      <div className="top-content">
        <h1 className="cerita-title">Pilih Cerita Rakyat</h1>
        <p className="cerita-description">
          Simaklah bacaan cerita rakyat menggunakan bahasa aslinya. Dengarkan juga cara mengucapkannya dengan menekan icon suara.
        </p>
      </div>

      <div className="bottom-content">
        <div className="story-carousel">
          {/*--[START] MODIFICATION: Wrapped the Malin Kundang card with a Link --*/}
          <Link to="/malinkundang" className="story-card-link">
            <div className="story-card">
              <img src={malinImage} alt="Cerita Malin Kundang" />
            </div>
          </Link>
          {/*--[END] MODIFICATION --*/}

          <div className="story-card">
            <img src={roroImage} alt="Cerita Roro Jonggrang" />
          </div>
          <div className="story-card">
            <img src={empatImage} alt="Another story" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CeritaRakyat;