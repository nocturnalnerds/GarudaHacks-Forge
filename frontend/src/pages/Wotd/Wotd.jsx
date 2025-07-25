import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Wotd.css';

function Wotd() {
  // --- Hooks ---
  const navigate = useNavigate(); // Initialize the navigate function

  // --- State Management ---
  const [wordData, setWordData] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchWordOfTheDay = async () => {
      setIsLoading(true);
      const mockData = {
        word: 'BUDAYA',
        definition: 'Hasil kegiatan dan penciptaan batin (akal budi) manusia seperti kepercayaan, kesenian, dan adat istiadat.',
        hints: [
          'Diwariskan dari generasi ke generasi.',
          'Mencakup bahasa, tarian, dan makanan khas.',
          'Setiap daerah di Indonesia memilikinya.'
        ]
      };
      setTimeout(() => {
        setWordData(mockData);
        setIsLoading(false);
      }, 1000);
    };

    fetchWordOfTheDay();
  }, []);

  // --- Event Handlers ---
  const handleInputChange = (event) => {
    setUserInput(event.target.value.toUpperCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userInput || !wordData) return;

    // Check if the answer is correct
    if (userInput === wordData.word) {
      // On correct answer, navigate to score page and pass the word
      navigate('/wotdscore', { state: { word: wordData.word } });
    } else {
      // On incorrect answer, show an error and let user try again
      alert('Jawaban masih salah, silakan coba lagi!');
    }
    // Don't clear input on wrong answer so user can edit
  };

  // --- Render Logic ---
  const renderWordPlaceholders = () => {
    if (!wordData) return null;
    return wordData.word.split('').map((_, index) => (
      <span key={index} className="word-placeholder">_</span>
    ));
  };

  return (
    <div className="wotd-container">
      <Link to="/game" className="back-arrow-wotd">←</Link>
      
      <h1 className="wotd-title">Word of the Day</h1>

      {isLoading ? (
        <div className="loading-text">Memuat kata hari ini...</div>
      ) : (
        <>
          <div className="wotd-hint-box">
            <p className="wotd-definition">{wordData?.definition}</p>
            <ul className="wotd-hints">
              {wordData?.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </div>

          <div className="wotd-word-display">
            {renderWordPlaceholders()}
          </div>

          <form className="wotd-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="wotd-input"
              placeholder="Jawaban..."
              value={userInput}
              onChange={handleInputChange}
              maxLength={wordData?.word.length}
            />
            <button type="submit" className="wotd-submit-button">
              Kirim
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Wotd;
