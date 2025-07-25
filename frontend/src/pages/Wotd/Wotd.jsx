import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Wotd.css';

// --- Multilingual Data ---
const wotdDataByLang = {
  indonesia: {
    word: 'BUDAYA',
    definition: 'Hasil kegiatan dan penciptaan batin (akal budi) manusia seperti kepercayaan, kesenian, dan adat istiadat.',
    hints: [
      'Diwariskan dari generasi ke generasi.',
      'Mencakup bahasa, tarian, dan makanan khas.',
      'Setiap daerah di Indonesia memilikinya.'
    ]
  },
  jawa: {
    word: 'BUDOYO',
    definition: 'Asil kegiatan lan panciptan batin (akal budi) manungsa kayata kapitayan, kesenian, lan adat istiadat.',
    hints: [
      'Diwarisake saka generasi menyang generasi.',
      'Kalebu basa, tarian, lan panganan khas.',
      'Saben dhaerah ing Indonesia duwe.',
    ]
  },
  sunda: {
    word: 'BUDAYA',
    definition: 'Hasil kagiatan sarta ciptaan batin (akal budi) manusa saperti kapercayaan, kasenian, jeung adat istiadat.',
    hints: [
      'Diwariskeun ti generasi ka generasi.',
      'Ngalimpudan basa, tarian, jeung kadaharan has.',
      'Unggal wewengkon di Indonésia mibanda éta.',
    ]
  },
  bali: {
    word: 'BUDAYA',
    definition: 'Pikolih saking utsaha lan panawang manah (akal budi) manusa sakadi kapracayan, kasenian, miwah adat istiadat.',
    hints: [
      'Diwariskan saking generasi ka generasi.',
      'Nyangkep basa, igel-igelan, miwah ajengan khas.',
      'Sami genah ring Indonesia madue.',
    ]
  }
};

const languages = [
    { code: 'indonesia', name: 'Indonesia' },
    { code: 'jawa', name: 'Jawa' },
    { code: 'sunda', name: 'Sunda' },
    { code: 'bali', name: 'Bali' },
];

function Wotd() {
  // --- Hooks ---
  const navigate = useNavigate();

  // --- State Management ---
  const [selectedLang, setSelectedLang] = useState('indonesia');
  const [wordData, setWordData] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // --- Data and Language Synchronization ---
  useEffect(() => {
    setIsLoading(true);
    const newWordData = wotdDataByLang[selectedLang];
    
    // Simulate fetching delay
    setTimeout(() => {
      setWordData(newWordData);
      setUserInput(''); // Reset input when language changes
      setIsLoading(false);
    }, 500); // A short delay for transition
  }, [selectedLang]); // Re-run this effect when selectedLang changes

  // --- Event Handlers ---
  const handleInputChange = (event) => {
    setUserInput(event.target.value.toUpperCase());
  };

  const handleLanguageChange = (event) => {
    setSelectedLang(event.target.value);
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
      
      <div className="top-right-controls">
        <button className="speaker-button" aria-label="Play audio">
          &#128266;
        </button>
        <div className="language-selector">
          <select value={selectedLang} onChange={handleLanguageChange}>
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
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