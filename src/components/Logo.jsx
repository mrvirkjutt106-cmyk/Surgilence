import React, { useState } from 'react';

export default function Logo({ className = "h-11", showText = true }) {
  const [imgSrc, setImgSrc] = useState('/images/logo.png');
  const [isDefaultSvg, setIsDefaultSvg] = useState(false);

  const handleError = () => {
    if (!isDefaultSvg) {
      setImgSrc('/images/logo-default.svg');
      setIsDefaultSvg(true);
    }
  };

  return (
    <div className="brand-logo-container group select-none">
      <div className="brand-emblem-box">
        <img
          src={imgSrc}
          alt="SURGILENCE (PVT) LTD Logo Mark"
          onError={handleError}
          className={`brand-emblem-img ${className}`}
        />
      </div>

      {!isDefaultSvg && showText && (
        <div className="brand-text-block">
          <div className="brand-name-row">
            <span className="brand-name-title">SURGILENCE</span>
            <span className="brand-name-pvt">PVT LTD</span>
          </div>
          <span className="brand-name-sub">SURGICAL &amp; DENTAL INSTRUMENTS</span>
        </div>
      )}
    </div>
  );
}
