import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { IconShieldCheck, IconPhone, IconGlobe } from './Icons';
import { COMPANY_INFO } from '../data/instruments';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main-grid">
          {/* Brand & Mission */}
          <div className="footer-brand-col">
            <Link to="/" className="brand-link mb-4">
              <Logo />
            </Link>
            <p className="text-sm text-slate-500 max-w-sm mt-3 leading-relaxed">
              Global manufacturer and exporter of precision medical-grade stainless steel surgical and dental hand instruments. Engineered with authentic German alloys and certified to ISO 13485:2016 standards.
            </p>

            {/* Social Icons */}
            <div className="footer-social-row">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/surgilence_/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Instagram surgilence_"
                title="Instagram: @surgilence_"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/Surgilence01"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Facebook Surgilence01"
                title="Facebook: @Surgilence01"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/923091699666"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon text-emerald-600"
                aria-label="WhatsApp +92 309 1699666"
                title="WhatsApp: +92 309 1699666"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.204 8.204 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.216 8.216 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.06-.1-.23-.17-.48-.29z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="footer-col-title">Instrument Ranges</h4>
            <ul className="footer-links-list">
              <li><Link to="/catalog?category=surgical" className="footer-link">General Surgical Forceps</Link></li>
              <li><Link to="/catalog?category=surgical" className="footer-link">Metzenbaum &amp; Scissors</Link></li>
              <li><Link to="/catalog?category=surgical" className="footer-link">Tungsten Carbide Needle Drivers</Link></li>
              <li><Link to="/catalog?category=dental" className="footer-link">Dental Extraction Forceps</Link></li>
              <li><Link to="/catalog?category=dental" className="footer-link">Periodontal Scalers &amp; Curettes</Link></li>
              <li><Link to="/catalog?category=dental" className="footer-link">Orthodontic Mathieu Pliers</Link></li>
            </ul>
          </div>

          {/* Commercial & Compliance */}
          <div>
            <h4 className="footer-col-title">Procurement &amp; ISO</h4>
            <ul className="footer-links-list">
              <li><Link to="/quote" className="footer-link">Request Wholesale RFQ</Link></li>
              <li><Link to="/checkout" className="footer-link">Direct Sample Checkout</Link></li>
              <li><Link to="/quality" className="footer-link">ISO 13485:2016 Certified</Link></li>
              <li><Link to="/quality" className="footer-link">CE MDR Compliance</Link></li>
              <li><Link to="/about" className="footer-link">Manufacturing Heritage</Link></li>
              <li><Link to="/contact" className="footer-link">Global Export Desk</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="footer-col-title">Export Headquarters</h4>
            <div className="space-y-3 text-sm text-slate-500">
              <p>
                <strong className="text-slate-800 block">SURGILENCE (PVT) LTD</strong>
                Sialkot 51310, Punjab, Pakistan
              </p>
              <p>
                <strong className="text-slate-800 block">Direct WhatsApp Desk:</strong>
                <a href="https://wa.me/923091699666" target="_blank" rel="noopener noreferrer" className="text-teal-700 font-semibold hover:underline">
                  +92 309 1699666
                </a>
              </p>
              <p>
                <strong className="text-slate-800 block">International Sales:</strong>
                <a href={`mailto:${COMPANY_INFO.salesEmail}`} className="text-teal-700 hover:underline">
                  {COMPANY_INFO.salesEmail}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-strip">
          <p>© {new Date().getFullYear()} SURGILENCE (PVT) LTD. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Direct USD Factory Pricing</span>
            <span>•</span>
            <span>Worldwide DHL / Air Freight</span>
            <span>•</span>
            <span className="text-teal-700 font-semibold">ISO 13485:2016</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
