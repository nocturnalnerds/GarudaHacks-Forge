import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Wotd.css';
import axios from 'axios';

function Wotd() {
  const navigate = useNavigate();


  const languages = [
    { code: 'indonesia', name: 'Indonesia' },
    { code: 'jawa', name: 'Jawa' },
    { code: 'sunda', name: 'Sunda' },
    { code: 'bali', name: 'Bali' },
  ];

  const [selectedLang, setSelectedLang] = useState('indonesia');
  const [wordData, setWordData] = useState(null);
  const [wordDescription, setWordDescription] = useState('');
  const [wordTranslation, setWordTranslation] = useState('');
  const [wordExample, setWordExample] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);


    
  useEffect(() => {
    const fetchWordOfTheDay = async () => {
      setIsLoading(true);
      const apiUrl = import.meta.env.VITE_BE_API;
      try {
        const response = await axios.post(`${apiUrl}/wotd/${selectedLang}`);
        console.log(response);
          setWordData(response.data.wotd);
          setWordDescription(response.data.definisi)
          setWordTranslation(response.data.translation)
          setWordExample(response.data.example)
      } catch (error) {
        console.error('Failed to fetch word of the day:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWordOfTheDay();
  }, [selectedLang]); // Re-fetch when language changes

  const handleInputChange = (e) => {
    setUserInput(e.target.value.toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput || !wordData) return;
    if (wordData && wordData.word && userInput === wordData.word.toUpperCase()) {
      navigate('/wotdscore', { state: { word: wordData.word } });
    } else {
      console.log(wordData)
      alert('Jawaban masih salah, silakan coba lagi!');
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLang(e.target.value);
  };

  const renderWordPlaceholders = () => {
    if (!wordData?.word) return null;
    return wordData.word.split('').map((_, i) => (
      <span key={i} className="word-placeholder">_</span>
    ));
  };

  return (
    <div className="wotd-container">
      <Link to="/game" className="back-arrow-wotd">←</Link>

      <div className="top-right-controls">
        <button className="speaker-button" aria-label="Play audio">
          🔊
        </button>

        <div className="language-selector">
          <select value={selectedLang} onChange={handleLanguageChange}>
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h1 className="wotd-title">Word of the Day</h1>

      {isLoading ? (
        <div className="loading-text">Memuat kata hari ini...</div>
      ) : (
        <>
          <div className="wotd-hint-box">
            <p className="wotd-definition">{wordDescription}</p>
            <ul className="wotd-hints">
              {wordExample}
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
              maxLength={100}
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