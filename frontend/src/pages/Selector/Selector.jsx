import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Selector.css';
import jawaImage from '../../assets/images/jawa.png';
import baliImage from '../../assets/images/bali.png';
import makassarImage from '../../assets/images/makassar.png';
import sundaImage from '../../assets/images/sunda.png';

// Move languages outside the component to avoid re-creation on every render
const languages = [
  { id: 0, name: 'Jawa', image: jawaImage },
  { id: 1, name: 'Sunda', image: sundaImage },
  { id: 2, name: 'Bali', image: baliImage },
  { id: 3, name: 'Makassar', image: makassarImage },
];

function Selector() {
  const [currentIndex, setCurrentIndex] = useState(1); // Center image is main (index 1)
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % languages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + languages.length) % languages.length);
  };

  // Calculate indices for the slider (looping) with 3 visible images
  const prevIndex = (currentIndex - 1 + languages.length) % languages.length;
  const nextIndex = (currentIndex + 1) % languages.length;

  // Handle search and suggestions
  useEffect(() => {
    if (searchQuery) {
      const filteredSuggestions = languages
        .filter(lang => lang.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(lang => lang.name);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelect = () => {
    const selectedLanguage = languages[currentIndex].name;
    // Future integration with backend: pass selectedLanguage to next page
  };

  return (
    <div className="selector-container">
      <Link to="/game" className="back-arrow">←</Link>

      <h1 className="selector-title">Pilih Bahasa</h1>

      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Cari bahasa (mis. Jawa, Sunda, Bali)"
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        {suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => {
                  setSearchQuery(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="slider-container">
        <button onClick={handlePrev} className="btn-arrow btn-arrow-left" aria-label="Previous language"></button>
        <div className="slider">
          <div className="slider-item side-item">
            <img src={languages[prevIndex].image} alt={languages[prevIndex].name} />
          </div>
          <div className="slider-item main-item">
            <img src={languages[currentIndex].image} alt={languages[currentIndex].name} />
          </div>
          <div className="slider-item side-item">
            <img src={languages[nextIndex].image} alt={languages[nextIndex].name} />
          </div>
        </div>
        <button onClick={handleNext} className="btn-arrow btn-arrow-right" aria-label="Next language"></button>
      </div>

      <button className="pilih-button" onClick={handleSelect}>Pilih</button>
    </div>
  );
}

export default Selector;