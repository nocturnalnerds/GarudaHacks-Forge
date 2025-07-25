import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './wotdscore.css';

function WotdScore() {
  const location = useLocation();
  const wordData = location.state?.wordData || {
    word: 'BUDAYA',
    definition: 'Hasil kegiatan dan penciptaan batin (akal budi) manusia seperti kepercayaan, kesenian, dan adat istiadat.',
    example: 'Tarian tradisional adalah bagian penting dari budaya Indonesia.',
    audioFile: 'budaya.mp3' // Placeholder for the audio file from the backend
  };

  const handlePlayAudio = () => {
    if (wordData.audioFile) {
      // This path would be the base URL for your backend audio files
      const audioUrl = `/path/to/backend/audio/${wordData.audioFile}`;
      console.log(`Playing audio from: ${audioUrl}`);
      // When the backend is ready, you can uncomment the lines below
      // const audio = new Audio(audioUrl);
      // audio.play().catch(e => console.error("Error playing audio:", e));
    }
  };

  return (
    <div className="wotd-score-container">
      <h1 className="wotd-score-title">Word of the Day</h1>

      <div className="revealed-answer-container">
        <p className="revealed-answer-label">Kata yang benar adalah:</p>
        <p className="revealed-answer-word">{wordData.word}</p>
        
        <div className="word-details-container">
          <div className="detail-item">
            <p className="detail-label"><strong>Definisi</strong></p>
            <p className="detail-content">{wordData.definition}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label"><strong>Contoh Penggunaan</strong></p>
            <p className="detail-content">"{wordData.example}"</p>
          </div>
          <div className="detail-item audio-item">
            <button onClick={handlePlayAudio} className="speaker-button" aria-label="Play audio">
              &#128266;
            </button>
            <span className="audio-prompt">click to play audio</span>
          </div>
        </div>
      </div>
      
      <h2 className="success-message"><strong>JAWABAN KAMU BENAR!</strong></h2>

      <Link to="/game">
        <button className="kembali-button">
          Kembali
        </button>
      </Link>
    </div>
  );
}

export default WotdScore;