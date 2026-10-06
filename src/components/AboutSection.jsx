import React from 'react';
import {
  IconShieldCheck,
  IconCheck,
  IconScissors,
  IconTooth,
  IconAward
} from './Icons';
import { COMPANY_INFO } from '../data/instruments';

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Story & Philosophy */}
          <div className="about-content">
            <div className="section-tag">
              <IconAward size={16} />
              <span>About SURGILENCE (PVT) LTD</span>
            </div>

            <h2 className="section-title">
              Crafting the Extensions <br />
              of a Surgeon's Hands
            </h2>

            <p className="about-lead">
              Founded as a registered Private Limited corporation, <strong className="text-white">SURGILENCE (PVT) LTD</strong>{' '}
              was established with a singular, unyielding focus: to produce the world’s finest non-electric surgical and dental hand instruments.
            </p>

            <p className="about-body">
              While modern medical facilities integrate numerous electronic and diagnostic devices, surgery itself remains an intensely tactile, mechanical craft. The weight of a scalpel handle, the flex of an elevator blade, and the precise closure of a needle driver dictate the speed and safety of an operation.
            </p>

            <div className="about-keypoints">
              <div className="about-point">
                <div className="point-icon">
                  <IconScissors size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="point-title">Specialized Surgical Line</h4>
                  <p className="point-desc">
                    Scalpels, Metzenbaum &amp; Mayo dissecting scissors, Crile &amp; Mosquito hemostats, Senn-Miller retractors, and TC needle holders crafted from German AISI 420/410 alloys.
                  </p>
                </div>
              </div>

              <div className="about-point">
                <div className="point-icon">
                  <IconTooth size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="point-title">Advanced Dental Line</h4>
                  <p className="point-desc">
                    Anatomical upper/lower extraction forceps, Coupland elevators, Gracey root curettes, Williams periodontal probes, and front-surface optical mirrors.
                  </p>
                </div>
              </div>

              <div className="about-point">
                <div className="point-icon">
                  <IconShieldCheck size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="point-title">Certified Metallurgical Purity</h4>
                  <p className="point-desc">
                    100% compliant with ISO 13485:2016 and CE MDR. Every production lot is passivated according to ASTM A967 standards with zero corrosion guarantee.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Corporate Highlights & Quality Seal Card */}
          <div className="about-corporate-card glass-panel">
            <div className="corporate-card-inner">
              <div className="corp-header">
                <span className="corp-badge">Corporate Profile</span>
                <h3 className="corp-company-name">{COMPANY_INFO.name}</h3>
                <p className="corp-tagline">{COMPANY_INFO.tagline}</p>
              </div>

              <div className="corp-meta-list">
                <div className="corp-meta-row">
                  <span className="corp-meta-label">Legal Structure</span>
                  <span className="corp-meta-val">Private Limited Company</span>
                </div>
                <div className="corp-meta-row">
                  <span className="corp-meta-label">Primary Specialization</span>
                  <span className="corp-meta-val">Manual Surgical &amp; Dental Tools</span>
                </div>
                <div className="corp-meta-row">
                  <span className="corp-meta-label">Electronic Devices</span>
                  <span className="corp-meta-val text-primary">None (Exclusively Steel Instruments)</span>
                </div>
                <div className="corp-meta-row">
                  <span className="corp-meta-label">Export Capability</span>
                  <span className="corp-meta-val">Worldwide Air &amp; Sea Cargo</span>
                </div>
                <div className="corp-meta-row">
                  <span className="corp-meta-label">Quality Certification</span>
                  <span className="corp-meta-val">ISO 13485:2016 / CE MDR 2017/745</span>
                </div>
                <div className="corp-meta-row">
                  <span className="corp-meta-label">Raw Material Origin</span>
                  <span className="corp-meta-val">German &amp; French Certified Billets</span>
                </div>
              </div>

              {/* Founder / Quality Guarantee Pledge */}
              <div className="corp-pledge-box">
                <div className="flex items-center gap-2 mb-2">
                  <IconShieldCheck size={18} className="text-primary" />
                  <span className="font-semibold text-white text-xs uppercase tracking-wider">Our Quality Guarantee</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  "If any instrument shows metallurgical flaw or corrosion within 3 years of clinical autoclave sterilization, SURGILENCE (PVT) LTD replaces it free of charge."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
