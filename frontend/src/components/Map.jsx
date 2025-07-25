import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Map.css';

import background from '../assets/images/background.png';
import mapImage from '../assets/images/map.png';
import piso from '../assets/images/piso.png';
import candi from '../assets/images/candi.png';
import rotterdam from '../assets/images/rotterdam.png';
import tugu from '../assets/images/tugu.png';
import honai from '../assets/images/honai.png';
import barong from '../assets/images/barong.png';
import batik from '../assets/images/batik.png';

// Question popup component
function QuestionPopup({ question, isVisible, onSubmit, onClose }) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer);
      setAnswer('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="question-box">
          <p className="question-text">{question}</p>

          <input
            type="text"
            className="answer-input"
            placeholder="Jawaban..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
          />

          <button className="submit-button" onClick={handleSubmit}>
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}

function Map() {
  const [completed, setCompleted] = useState({
    sumatra: false,
    java: false,
    kalimantan: false,
    sulawesi: false,
    papua: false,
    bali: false,
    madura: false
  });

  const [currentQuestion, setCurrentQuestion] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [currentIsland, setCurrentIsland] = useState('');

  const questions = {
    sumatra: "Bagaimana prosesi 'siraman' dilakukan dalam pernikahan adat Sumatra?",
    java: "Apa makna filosofis dari upacara Mitoni dalam budaya Jawa?",
    kalimantan: "Sebutkan ritual adat yang dilakukan sebelum membangun rumah Betang di Kalimantan!",
    sulawesi: "Apa nama tarian tradisional yang menggambarkan kehidupan nelayan di Sulawesi?",
    papua: "Jelaskan makna simbolis dari Honai dalam kehidupan masyarakat Papua!",
    bali: "Apa fungsi upacara Melasti dalam kalender keagamaan Bali?",
    madura: "Sebutkan motif batik khas Madura dan maknanya dalam budaya lokal!"
  };

  const handleClick = (island) => {
    setCurrentIsland(island);
    setCurrentQuestion(questions[island]);
    setShowPopup(true);
  };

  const handleSubmitAnswer = (answer) => {
    console.log(`Answer for ${currentIsland}: ${answer}`);
    setCompleted((prev) => ({ ...prev, [currentIsland]: true }));
    setShowPopup(false);
    setCurrentQuestion('');
    setCurrentIsland('');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setCurrentQuestion('');
    setCurrentIsland('');
  };

  return (
    <div className="full-wrapper" style={{ backgroundImage: `url(${background})` }}>
      <Link to="/game" className="back-arrow">← Back</Link>
      <div className="map-inner-wrapper">
        <img src={mapImage} alt="Map" className="responsive-map" />

        {!completed.sumatra && (
          <img
            src={piso}
            alt="Piso"
            className="icon piso-icon"
            onClick={() => handleClick('sumatra')}
          />
        )}
        {!completed.java && (
          <img
            src={candi}
            alt="Candi"
            className="icon candi-icon"
            onClick={() => handleClick('java')}
          />
        )}
        {!completed.kalimantan && (
          <img
            src={rotterdam}
            alt="Rotterdam"
            className="icon rotterdam-icon"
            onClick={() => handleClick('kalimantan')}
          />
        )}
        {!completed.sulawesi && (
          <img
            src={tugu}
            alt="Tugu"
            className="icon tugu-icon"
            onClick={() => handleClick('sulawesi')}
          />
        )}
        {!completed.papua && (
          <img
            src={honai}
            alt="Honai"
            className="icon honai-icon"
            onClick={() => handleClick('papua')}
          />
        )}
        {!completed.bali && (
          <img
            src={barong}
            alt="Barong"
            className="icon barong-icon"
            onClick={() => handleClick('bali')}
          />
        )}
        {!completed.madura && (
          <img
            src={batik}
            alt="Batik"
            className="icon batik-icon"
            onClick={() => handleClick('madura')}
          />
        )}
      </div>

      <QuestionPopup
        question={currentQuestion}
        isVisible={showPopup}
        onSubmit={handleSubmitAnswer}
        onClose={handleClosePopup}
      />
    </div>
  );
}

export default Map;
