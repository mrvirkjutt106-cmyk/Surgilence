import React, { useState } from 'react';

export default function Logo({ className = "", showText = true, size = "md" }) {
  const [imgSrc, setImgSrc] = useState('/images/logo.png');

  const handleError = () => {
    setImgSrc('/Company Logo.png');
  };

  return (
    <div className={`brand-logo-container select-none ${size === 'lg' ? 'logo-lg' : ''}`}>
      <img
        src={imgSrc}
        alt="Surgilence"
        onError={handleError}
        className="brand-logo-img"
      />

      {showText && (
        <div className="brand-text-block">
          <div className="brand-name-row">
            <span className="brand-name-title">SURGILENCE</span>
            <span className="brand-name-pvt">PVT LTD</span>
          </div>
          <span className="brand-name-sub">Precision Medical Instruments</span>
        </div>
      )}
    </div>
  );
}
