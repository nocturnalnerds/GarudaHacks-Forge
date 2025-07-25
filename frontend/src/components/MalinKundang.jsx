import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './MalinKundang.css';

// --- Placeholder Data ---
const storyData = {
  jawa: [
    { image: 'placeholder-1.png', text: 'Ing sawijining desa, ana bocah lanang jenenge Malin Kundang.', audio: 'jawa-1.mp3' },
    { image: 'placeholder-2.png', text: 'Malin pamit marang ibune arep merantau.', audio: 'jawa-2.mp3' },
    { image: 'placeholder-3.png', text: 'Sawise sukses, Malin bali numpak kapal gedhe.', audio: 'jawa-3.mp3' },
    { image: 'placeholder-4.png', text: 'Ibune seneng banget, nanging Malin ora ngakoni ibune.', audio: 'jawa-4.mp3' },
    { image: 'placeholder-5.png', text: 'Ibune lara ati lan ngutuk Malin dadi watu.', audio: 'jawa-5.mp3' }
  ],
  sunda: [
    { image: 'placeholder-1.png', text: 'Di hiji desa, aya budak lalaki ngaranna Malin Kundang.', audio: 'sunda-1.mp3' },
    { image: 'placeholder-2.png', text: 'Malin amitan ka indungna rék ngumbara.', audio: 'sunda-2.mp3' },
    { image: 'placeholder-3.png', text: 'Saatos suksés, Malin uih deui naék kapal anu ageung.', audio: 'sunda-3.mp3' },
    { image: 'placeholder-4.png', text: 'Indungna bungah pisan, tapi Malin teu ngaku ka indungna.', audio: 'sunda-4.mp3' },
    { image: 'placeholder-5.png', text: 'Indungna nyeri haté teras nyumpahan Malin janten batu.', audio: 'sunda-5.mp3' }
  ],
  bali: [
    { image: 'placeholder-1.png', text: 'Ring desa anu asri, wenten anak muani mapesengan Malin Kundang.', audio: 'bali-1.mp3' },
    { image: 'placeholder-2.png', text: 'Malin mapamit ring ibunnyane jagi lunga merantau.', audio: 'bali-2.mp3' },
    { image: 'placeholder-3.png', text: 'Sasampun sukses, Malin mawali nggenin kapal gede.', audio: 'bali-3.mp3' },
    { image: 'placeholder-4.png', text: 'Ibunnyane seneng pisan, nanging Malin nenten ngakuin ibunnyane.', audio: 'bali-4.mp3' },
    { image: 'placeholder-5.png', text: 'Ibunnyane sebet pisan raris nastu Malin dados batu.', audio: 'bali-5.mp3' }
  ],
};

const languages = [
  { code: 'jawa', name: 'Jawa' },
  { code: 'sunda', name: 'Sunda' },
  { code: 'bali', name: 'Bali' },
];
// --- End of Placeholder Data ---


function MalinKundang() {
  const [currentPane, setCurrentPane] = useState(0);
  const [selectedLang, setSelectedLang] = useState('jawa');
  const [storyContent, setStoryContent] = useState(storyData[selectedLang]);

  const handleNext = useCallback(() => {
    setCurrentPane(prevPane => (prevPane + 1) % storyContent.length);
  }, [storyContent.length]);

  const handlePrev = () => {
    setCurrentPane(prevPane => (prevPane - 1 + storyContent.length) % storyContent.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 10000); 

    return () => clearInterval(timer);
  }, [handleNext]);

  useEffect(() => {
    setStoryContent(storyData[selectedLang]);
    setCurrentPane(0);
  }, [selectedLang]);

  const handleLanguageChange = (event) => {
    setSelectedLang(event.target.value);
  };
  
  const handlePlayAudio = () => {
    const audioFile = storyContent[currentPane].audio;
    const audioUrl = `/path/to/backend/audio/${audioFile}`;
    console.log(`Playing audio from: ${audioUrl}`);
    // const audio = new Audio(audioUrl);
    // audio.play();
  };

  return (
    <div className="storyboard-container">
      <Link to="/cerita-rakyat" className="back-arrow-story">&#x2190;</Link>
      
      <div className="top-right-controls">
        <button onClick={handlePlayAudio} className="speaker-button" aria-label="Play audio">
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
      
      <div className="storyboard-main">
        <div className="storyboard-interactive-image">
          <button onClick={handlePrev} className="btn-arrow btn-arrow-left" aria-label="Previous scene"></button>
          <div className="storyboard-image-container">
            <img 
              key={storyContent[currentPane].image}
              src={`/path/to/backend/images/${storyContent[currentPane].image}`} 
              alt="Storyboard scene" 
              className="storyboard-image"
            />
          </div>
          <button onClick={handleNext} className="btn-arrow btn-arrow-right" aria-label="Next scene"></button>
        </div>
        <div className="storyboard-subtitle-container">
          <p className="storyboard-subtitle">
            {storyContent[currentPane].text}
          </p>
        </div>
      </div>
      
    </div>
  );
}

export default MalinKundang;