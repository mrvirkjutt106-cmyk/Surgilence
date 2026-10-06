import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import {
  IconFacebook,
  IconInstagram,
  IconShieldCheck,
  IconPhone,
  IconMail
} from './Icons';
import { COMPANY_INFO } from '../data/instruments';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-main-grid">
          {/* Column 1: Brand Info */}
          <div className="footer-col brand-col">
            <Logo className="footer-logo mb-3" />
            <p className="footer-brand-desc">
              SURGILENCE (PVT) LTD is a certified manufacturer and exporter of premium handcrafted surgical and dental instruments.
              Manufactured exclusively from medical-grade German and French stainless steel. Zero electrical medical appliances.
            </p>

            <div className="footer-compliance-pills">
              <span className="footer-pill">ISO 13485:2016</span>
              <span className="footer-pill">CE MDR 2017/745</span>
              <span className="footer-pill">cGMP Compliant</span>
            </div>

            {/* Social Icons with exact links */}
            <div className="footer-social-row">
              <a
                href="https://www.facebook.com/Surgilence01"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="SURGILENCE on Facebook (@Surgilence01)"
                title="Facebook: @Surgilence01"
              >
                <IconFacebook size={18} />
              </a>

              <a
                href="https://www.instagram.com/surgilence_/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="SURGILENCE on Instagram (@surgilence_)"
                title="Instagram: @surgilence_"
              >
                <IconInstagram size={18} />
              </a>

              <a
                href="https://wa.me/923091699666"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="SURGILENCE on WhatsApp (+92 309 1699666)"
                title="WhatsApp: +92 309 1699666"
              >
                <IconPhone size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Surgical Instruments Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Surgical Line</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=surgical">Metzenbaum Dissecting Scissors</Link></li>
              <li><Link to="/products?category=surgical">Mayo-Hegar TC Needle Drivers</Link></li>
              <li><Link to="/products?category=surgical">Crile &amp; Mosquito Hemostats</Link></li>
              <li><Link to="/products?category=surgical">Adson Delicate Tissue Forceps</Link></li>
              <li><Link to="/products?category=surgical">Scalpel Handles with Ruler</Link></li>
              <li><Link to="/products?category=surgical">Senn-Miller 3-Prong Retractors</Link></li>
              <li><Link to="/products?category=surgical">Kerrison Bone Rongeurs 45°</Link></li>
            </ul>
          </div>

          {/* Column 3: Dental Instruments Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Dental Line</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=dental">Molar Extraction Forceps #18R</Link></li>
              <li><Link to="/products?category=dental">Universal Extraction Forceps #151</Link></li>
              <li><Link to="/products?category=dental">Coupland Dental Bone Elevators</Link></li>
              <li><Link to="/products?category=dental">Williams Periodontal Probes</Link></li>
              <li><Link to="/products?category=dental">Gracey Subgingival Curettes Set</Link></li>
              <li><Link to="/products?category=dental">Sickle Scalers (H6/H7)</Link></li>
              <li><Link to="/products?category=dental">Rhodium Distortion-Free Mirrors</Link></li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation & Commercial Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Pages</h4>
            <ul className="footer-links">
              <li><Link to="/">Home Page</Link></li>
              <li><Link to="/products">All Instruments Catalog</Link></li>
              <li><Link to="/quote">Request Wholesale RFQ</Link></li>
              <li><Link to="/checkout">Commercial Checkout</Link></li>
              <li><Link to="/quality">Quality &amp; ISO 13485 Standards</Link></li>
              <li><Link to="/about">About Surgilence (Pvt) Ltd</Link></li>
              <li><Link to="/contact">Contact International Sales</Link></li>
            </ul>
          </div>
        </div>

        {/* Regulatory Statement Strip */}
        <div className="footer-regulatory-strip">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <IconShieldCheck size={16} className="text-teal-400 flex-shrink-0" />
            <span>
              <strong>Regulatory Statement:</strong> All instruments listed are manual medical devices classified under EU MDR 2017/745 Class I and Class IIa. Surgilence (Pvt) Ltd strictly manufactures manual cold-steel and Tungsten-Carbide instruments; our production does not encompass electronic or powered electro-surgical appliances.
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="text-xs text-slate-400">
            © {new Date().getFullYear()} <strong>SURGILENCE (PVT) LTD</strong>. All rights reserved.
          </div>
          <div className="text-xs text-slate-400">
            Export Desk: +92 309 1699666 | Sialkot, Pakistan | ISO 13485:2016 Certified
          </div>
        </div>
      </div>
    </footer>
  );
}
