import React from 'react';
import {
  IconGlobe,
  IconCheck,
  IconAward,
  IconSparkles,
  IconPhone
} from './Icons';
import { COMPANY_INFO } from '../data/instruments';

export default function ManufacturingSection({ onOpenQuote }) {
  return (
    <section id="manufacturing" className="manufacturing-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <IconGlobe size={16} />
            <span>International Export &amp; OEM Facilities</span>
          </div>
          <h2 className="section-title">Worldwide Manufacturing &amp; Private Labeling</h2>
          <p className="section-desc">
            Equipping clinics and tier-1 hospital networks across the globe. We provide turnkey OEM manufacturing,
            custom laser branding, and bespoke instrument modifications.
          </p>
        </div>

        {/* Global Stats Grid */}
        <div className="stats-grid">
          {COMPANY_INFO.manufacturingStats.map((stat, i) => (
            <div key={i} className="stat-card glass-panel">
              <span className="stat-number">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Manufacturing Capabilities 3-Column Grid */}
        <div className="capabilities-grid">
          <div className="cap-card glass-panel">
            <div className="cap-icon-box">
              <IconAward size={22} className="text-primary" />
            </div>
            <h3 className="cap-title">OEM &amp; Private Label Branding</h3>
            <p className="cap-text">
              We apply high-contrast fiber-laser marking for your private medical brand, hospital inventory tracking QR codes,
              lot numbers, and custom dimensional graduation scales.
            </p>
            <ul className="cap-list">
              <li>• Precision 50-micron laser etching</li>
              <li>• Custom sterilized pouch packaging</li>
              <li>• CE Declaration of Conformity included</li>
            </ul>
          </div>

          <div className="cap-card glass-panel">
            <div className="cap-icon-box">
              <IconSparkles size={22} className="text-primary" />
            </div>
            <h3 className="cap-title">Tungsten Carbide Brazing</h3>
            <p className="cap-text">
              For high-wear needle holders and extraction tools, our specialists silver-braze vacuum-treated Tungsten Carbide
              plates onto AISI 410 bodies, followed by distinctive gold-plated ring dipping.
            </p>
            <ul className="cap-list">
              <li>• Extreme Rockwell hardness (HRC 68-70)</li>
              <li>• 0.4mm micro-pyramid jaw serration</li>
              <li>• Zero jaw detachment lifetime warranty</li>
            </ul>
          </div>

          <div className="cap-card glass-panel">
            <div className="cap-icon-box">
              <IconGlobe size={22} className="text-primary" />
            </div>
            <h3 className="cap-title">Expedited Global Logistics</h3>
            <p className="cap-text">
              Direct door-to-door international logistics with DHL Medical Express, FedEx Priority, and air cargo consolidations.
              Full export documentation (Certificate of Origin, Bill of Lading, MTR).
            </p>
            <ul className="cap-list">
              <li>• Sample kits delivered in 4-6 business days</li>
              <li>• Commercial pallets with moisture-barrier packaging</li>
              <li>• Pre-cleared customs documentation</li>
            </ul>
          </div>
        </div>

        {/* Banner Callout for Hospital Tenders */}
        <div className="tender-callout-banner glass-panel">
          <div className="tender-content">
            <h3 className="text-xl font-bold text-white mb-2">
              Preparing a Hospital Tender or Dental Clinic Order?
            </h3>
            <p className="text-muted text-sm max-w-xl">
              Request a physical sample set for your surgical review committee. We ship pre-production evaluation units
              accompanied by metallurgical test certificates.
            </p>
          </div>
          <button onClick={onOpenQuote} className="btn btn-primary">
            <span>Request Evaluation Samples</span>
          </button>
        </div>
      </div>
    </section>
  );
}
