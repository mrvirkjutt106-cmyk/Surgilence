import React from 'react';
import {
  IconShieldCheck,
  IconAward,
  IconCheck,
  IconFileText
} from './Icons';
import { COMPANY_INFO } from '../data/instruments';

export default function QualitySection() {
  const qualitySteps = [
    {
      num: "01",
      title: "Raw Alloy Spectrometry",
      desc: "Every billet of German & French stainless steel is analyzed via optical emission spectrometry to verify exact carbon, chromium, and molybdenum percentages before forging."
    },
    {
      num: "02",
      title: "Controlled Vacuum Heat Treatment",
      desc: "Computerized vacuum furnaces treat instruments to exact Rockwell hardness thresholds (HRC 50-54 for cutting edges, HRC 68-70 for Tungsten Carbide inserts) eliminating brittleness."
    },
    {
      num: "03",
      title: "ASTM A967 Chemical Passivation",
      desc: "Instruments undergo multi-stage nitric/citric acid baths that dissolve free surface iron and generate an impenetrable chromium oxide passive layer, preventing rust in autoclaves."
    },
    {
      num: "04",
      title: "Boil & Copper Sulfate Testing",
      desc: "Random sample lots undergo a 2-hour boiling water test and copper sulfate surface reaction test to guarantee zero pitting or discoloration under hospital sterilization cycles."
    }
  ];

  return (
    <section id="quality" className="quality-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <IconShieldCheck size={16} />
            <span>Surgical Metallurgy &amp; Compliance</span>
          </div>
          <h2 className="section-title">Zero Compromise on Medical Grade Steel</h2>
          <p className="section-desc">
            Surgical outcomes depend on the physical reliability of the instrument in the surgeon's hand.
            SURGILENCE (PVT) LTD follows rigorous ISO 13485:2016 quality systems and European CE MDR regulations.
          </p>
        </div>

        {/* Quality Split Hero */}
        <div className="quality-split-grid">
          {/* Left: Manufacturing Inspection Visual */}
          <div className="quality-visual-card glass-panel">
            <img
              src="/images/manufacturing.jpg"
              alt="Medical instrument passivation and inspection at SURGILENCE (PVT) LTD facility"
              className="quality-image"
            />
            <div className="quality-image-overlay"></div>

            <div className="quality-visual-badge">
              <IconAward size={20} className="text-primary" />
              <div>
                <div className="font-bold text-white text-sm">ISO 13485:2016 Cleanroom</div>
                <div className="text-xs text-muted">100% Optical Loupe Inspection</div>
              </div>
            </div>
          </div>

          {/* Right: Key Metallurgical Commitments */}
          <div className="quality-commitments">
            <h3 className="text-2xl font-bold text-white mb-4">
              Engineered Exclusively for Pure Mechanical Surgery
            </h3>
            <p className="text-muted mb-6 leading-relaxed">
              We specialize strictly in <strong className="text-white">manual dental &amp; surgical instruments</strong>.
              By focusing entirely on cold steel metallurgy, precision machining, and hand-honing, we achieve tactile feedback
              and balance that mass-market electronic equipment cannot replicate.
            </p>

            {/* Certifications List */}
            <div className="certifications-grid">
              {COMPANY_INFO.certifications.map((cert, index) => (
                <div key={index} className="cert-card glass-panel">
                  <div className="flex items-center gap-2 mb-2">
                    <IconCheck size={16} className="text-primary" />
                    <h4 className="font-bold text-white text-sm">{cert.code}</h4>
                  </div>
                  <div className="text-xs font-semibold text-primary mb-1">{cert.title}</div>
                  <p className="text-xs text-muted leading-relaxed">{cert.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4-Stage Quality Process Roadmap */}
        <div className="quality-steps-wrapper">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white">4-Stage Quality Assurance Verification</h3>
            <p className="text-sm text-muted">From raw German billet to sterile operating room delivery</p>
          </div>

          <div className="steps-grid">
            {qualitySteps.map((step) => (
              <div key={step.num} className="step-card glass-panel">
                <span className="step-number">{step.num}</span>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
