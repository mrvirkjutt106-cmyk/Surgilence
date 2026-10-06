import React from 'react';
import Logo from './Logo';
import {
  IconFacebook,
  IconInstagram,
  IconShieldCheck,
  IconMail,
  IconPhone,
  IconMapPin
} from './Icons';
import { COMPANY_INFO } from '../data/instruments';

export default function Footer({ onOpenQuote }) {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-main-grid">
          {/* Column 1: Brand Info */}
          <div className="footer-col brand-col">
            <Logo className="footer-logo mb-3" />
            <p className="footer-brand-desc">
              SURGILENCE (PVT) LTD is a certified manufacturer and exporter of premium handcrafted surgical and dental instruments.
              Manufactured exclusively from medical-grade German and French stainless steel.
            </p>

            <div className="footer-compliance-pills">
              <span className="footer-pill">ISO 13485:2016</span>
              <span className="footer-pill">CE MDR 2017/745</span>
              <span className="footer-pill">cGMP Compliant</span>
            </div>

            {/* Social Icons */}
            <div className="footer-social-row">
              <a
                href={COMPANY_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="SURGILENCE on Facebook"
              >
                <IconFacebook size={18} />
              </a>

              <a
                href={COMPANY_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="SURGILENCE on Instagram"
              >
                <IconInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Surgical Instruments Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Surgical Category</h4>
            <ul className="footer-links">
              <li><a href="#catalog">Metzenbaum &amp; Dissecting Scissors</a></li>
              <li><a href="#catalog">TC Needle Holders (Gold Rings)</a></li>
              <li><a href="#catalog">Crile &amp; Mosquito Hemostats</a></li>
              <li><a href="#catalog">Adson Micro Tissue Forceps</a></li>
              <li><a href="#catalog">Scalpel Handles No. 3 &amp; 4</a></li>
              <li><a href="#catalog">Senn-Miller Retractors</a></li>
              <li><a href="#catalog">Kerrison Bone Rongeurs</a></li>
            </ul>
          </div>

          {/* Column 3: Dental Instruments Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Dental Category</h4>
            <ul className="footer-links">
              <li><a href="#catalog">Molar Extraction Forceps (#18R/#18L)</a></li>
              <li><a href="#catalog">Universal Mandibular Forceps (#151)</a></li>
              <li><a href="#catalog">Coupland Bone Elevators</a></li>
              <li><a href="#catalog">Williams Periodontal Probes</a></li>
              <li><a href="#catalog">Gracey Subgingival Curettes</a></li>
              <li><a href="#catalog">Sickle Scalers (H6/H7)</a></li>
              <li><a href="#catalog">Rhodium Mouth Mirrors</a></li>
              <li><a href="#catalog">Mathieu Orthodontic Pliers</a></li>
            </ul>
          </div>

          {/* Column 4: Quality & Corporate Inquiries */}
          <div className="footer-col">
            <h4 className="footer-col-title">Corporate &amp; Inquiries</h4>
            <ul className="footer-links">
              <li><a href="#quality">ISO 13485:2016 Standards</a></li>
              <li><a href="#manufacturing">OEM Private Labeling</a></li>
              <li><a href="#quality">Passivation &amp; Metallurgy</a></li>
              <li><a href="#about">About Surgilence (Pvt) Ltd</a></li>
              <li><a href="#contact">Contact International Sales</a></li>
              <li>
                <button
                  onClick={onOpenQuote}
                  className="footer-rfq-link"
                >
                  Request Wholesale Quotation
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Banner */}
        <div className="footer-regulatory-strip">
          <div className="flex items-center gap-2 text-xs text-muted">
            <IconShieldCheck size={16} className="text-primary flex-shrink-0" />
            <span>
              <strong>Regulatory Statement:</strong> All instruments listed are manual medical devices classified under EU MDR 2017/745 Class I and Class IIa. Surgilence (Pvt) Ltd strictly manufactures manual cold-steel and Tungsten-Carbide instruments; our production does not encompass electronic or powered electro-surgical appliances.
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="text-xs text-muted">
            © {new Date().getFullYear()} <strong>SURGILENCE (PVT) LTD</strong>. All rights reserved.
          </div>
          <div className="text-xs text-muted">
            Designed for Healthcare Professionals, Surgeons &amp; Dental Practitioners Worldwide.
          </div>
        </div>
      </div>
    </footer>
  );
}
