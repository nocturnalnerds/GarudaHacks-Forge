import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import guruImage from '../assets/images/guru.png';
import check from '../assets/images/check.png';

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
  const navigate = useNavigate();

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

        <img
          src={completed.sumatra ? check : piso}
          alt={completed.sumatra ? "Completed" : "Piso"}
          className={`icon piso-icon ${completed.sumatra ? 'completed-icon' : ''}`}
          style={completed.sumatra ? { width: '50px' } : {}}
          onClick={() => !completed.sumatra && handleClick('sumatra')}
        />
        <img
          src={completed.java ? check : candi}
          alt={completed.java ? "Completed" : "Candi"}
          className={`icon candi-icon ${completed.java ? 'completed-icon' : ''}`}
          style={completed.java ? { width: '50px' } : {}}
          onClick={() => !completed.java && handleClick('java')}
        />
        <img
          src={completed.kalimantan ? check : rotterdam}
          alt={completed.kalimantan ? "Completed" : "Rotterdam"}
          className={`icon rotterdam-icon ${completed.kalimantan ? 'completed-icon' : ''}`}
          style={completed.kalimantan ? { width: '50px' } : {}}
          onClick={() => !completed.kalimantan && handleClick('kalimantan')}
        />
        <img
          src={completed.sulawesi ? check : tugu}
          alt={completed.sulawesi ? "Completed" : "Tugu"}
          className={`icon tugu-icon ${completed.sulawesi ? 'completed-icon' : ''}`}
          style={completed.sulawesi ? { width: '50px' } : {}}
          onClick={() => !completed.sulawesi && handleClick('sulawesi')}
        />
        <img
          src={completed.papua ? check : honai}
          alt={completed.papua ? "Completed" : "Honai"}
          className={`icon honai-icon ${completed.papua ? 'completed-icon' : ''}`}
          style={completed.papua ? { width: '50px' } : {}}
          onClick={() => !completed.papua && handleClick('papua')}
        />
        <img
          src={completed.bali ? check : barong}
          alt={completed.bali ? "Completed" : "Barong"}
          className={`icon barong-icon ${completed.bali ? 'completed-icon' : ''}`}
          style={completed.bali ? { height: '50px' } : {}}
          onClick={() => !completed.bali && handleClick('bali')}
        />
        <img
          src={completed.madura ? check : batik}
          alt={completed.madura ? "Completed" : "Batik"}
          className={`icon batik-icon ${completed.madura ? 'completed-icon' : ''}`}
          style={completed.madura ? { width: '50px' } : {}}
          onClick={() => !completed.madura && handleClick('madura')}
        />
      </div>

      <QuestionPopup
        question={currentQuestion}
        isVisible={showPopup}
        onSubmit={handleSubmitAnswer}
        onClose={handleClosePopup}
      />
      <div className="guru-icon" onClick={() => navigate('/selector')}>
        <img src={guruImage} alt="Guru" />
      </div>
    </div>
  );
}

export default Map;