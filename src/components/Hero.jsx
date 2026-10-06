import React from 'react';
import { IconShieldCheck, IconScissors, IconTooth, IconFileText, IconDownload, IconAward } from './Icons';

export default function Hero({ onOpenQuote, onExploreCatalog }) {
  return (
    <section className="hero-section">
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>

      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Headline & Value Prop */}
          <div className="hero-content">
            <div className="hero-badge">
              <IconShieldCheck size={16} className="text-primary" />
              <span>ISO 13485:2016 &amp; CE MDR 2017/745 Certified</span>
            </div>

            <h1 className="hero-title">
              Surgical &amp; Dental <br />
              <span className="text-gradient">Precision Instruments</span> <br />
              Engineered to Excel.
            </h1>

            <p className="hero-description">
              <strong style={{ color: '#fff' }}>SURGILENCE (PVT) LTD</strong> manufactures premium, hand-finished
              surgical and dental hand instruments crafted exclusively from medical-grade German &amp; French stainless steel.
              Built for tactile control, edge retention, and lifetime autoclave endurance.
            </p>

            {/* Hero CTAs */}
            <div className="hero-actions">
              <button onClick={onExploreCatalog} className="btn btn-primary">
                <span>Explore Instruments</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <button onClick={onOpenQuote} className="btn btn-secondary">
                <IconFileText size={18} />
                <span>Request Wholesale RFQ</span>
              </button>
            </div>

            {/* Verified Medical Specs Counter */}
            <div className="hero-metrics">
              <div className="metric-item">
                <span className="metric-value">AISI 420</span>
                <span className="metric-label">German Martensitic Steel</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-item">
                <span className="metric-value">134°C</span>
                <span className="metric-label">Steam Autoclave Proven</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-item">
                <span className="metric-value">TC Gold</span>
                <span className="metric-label">Tungsten Carbide Inserts</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-item">
                <span className="metric-value">0%</span>
                <span className="metric-label">Electronic Devices (100% Hand Tools)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Real Product Showcase */}
          <div className="hero-visual-wrapper">
            <div className="hero-visual-card">
              <img
                src="/images/hero-instruments.jpg"
                alt="Surgical instruments tray by SURGILENCE (PVT) LTD"
                className="hero-image"
                loading="eager"
              />
              <div className="hero-image-overlay"></div>

              {/* Floating Quality Tag */}
              <div className="floating-badge top-right">
                <div className="flex items-center gap-2">
                  <div className="status-dot"></div>
                  <span className="font-semibold text-xs tracking-wide">PASSIVATION TESTED</span>
                </div>
                <div className="text-muted text-xs mt-1">ASTM A967 Boil Proof</div>
              </div>

              {/* Floating Spec Tag Bottom Left */}
              <div className="floating-badge bottom-left">
                <div className="flex items-center gap-2">
                  <IconAward size={16} className="text-gold" />
                  <span className="font-semibold text-xs text-white">Tungsten Carbide Option</span>
                </div>
                <div className="text-muted text-xs mt-1">Hardness HRC 68-70 Jaws</div>
              </div>
            </div>

            {/* Quick department pills under hero */}
            <div className="hero-dept-pills">
              <div className="dept-pill" onClick={onExploreCatalog}>
                <IconScissors size={18} className="text-primary" />
                <div>
                  <div className="dept-pill-title">Surgical Category</div>
                  <div className="dept-pill-sub">Metzenbaum, Scissors, Needle Holders, Retractors</div>
                </div>
              </div>

              <div className="dept-pill" onClick={onExploreCatalog}>
                <IconTooth size={18} className="text-primary" />
                <div>
                  <div className="dept-pill-title">Dental Category</div>
                  <div className="dept-pill-sub">Extraction Forceps, Elevators, Scalers, Probes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
