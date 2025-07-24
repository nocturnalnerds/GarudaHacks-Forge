import React, { useState } from 'react';
import './Map.css';

import background from '../assets/images/background.png';
import mapImage from '../assets/images/map.png';
import piso from '../assets/images/piso.png';
import candi from '../assets/images/candi.png';

function Map() {
  const [completed, setCompleted] = useState({
    sumatra: false,
    java: false
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
      </div>
    </div>
  );
}

export default Map;
