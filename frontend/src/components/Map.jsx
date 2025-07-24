import React, { useState } from 'react';
import './Map.css';

import background from '../assets/images/background.png';
import mapImage from '../assets/images/map.png';
import piso from '../assets/images/piso.png';
import candi from '../assets/images/candi.png';
import rotterdam from '../assets/images/rotterdam.png';
import tugu from '../assets/images/tugu.png';
import honai from '../assets/images/honai.png';


function Map() {
  const [completed, setCompleted] = useState({
    sumatra: false,
    java: false,
    kalimantan: false,  
    sulawesi: false,
    papua: false
  });

  const handleClick = (island) => {
    setCompleted((prev) => ({ ...prev, [island]: true }));
  };

  return (
    <div className="full-wrapper" style={{ backgroundImage: `url(${background})` }}>
      <div className="map-inner-wrapper">
        <img src={mapImage} alt="Map" className="responsive-map" />

        {/* Icons */}
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
      </div>
    </div>
  );
}

export default Map;
