import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Wotd.css';
import axios from 'axios';
function Wotd() {
  const navigate = useNavigate();

  const [wordData, setWordData] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWordOfTheDay = async () => {
      setIsLoading(true);
      const apiUrl = import.meta.env.VITE_BE_API;
      try {
        const response = await axios.get(`${apiUrl}/wotd/${lang}`);
        setWordData(response.data);
      } catch (error) {
        console.error('Failed to fetch word of the day:', error);
      } finally {
        setIsLoading(false);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fetchWordOfTheDay();
  }, []);

  const handleInputChange = (event) => {
    setUserInput(event.target.value.toUpperCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userInput || !wordData) return;
    if (userInput === wordData.word) {

      navigate('/wotdscore', { state: { word: wordData.word } });
    } else {
      alert('Jawaban masih salah, silakan coba lagi!');
    }
  };

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
