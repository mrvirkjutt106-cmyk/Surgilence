import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { IconSearch, IconFileText, IconPhone, IconX } from './Icons';

export default function Navbar({ onOpenQuote, quoteCount, onSearchFocus, activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Instruments Catalog", href: "#catalog" },
    { label: "Quality & ISO 13485", href: "#quality" },
    { label: "Manufacturing", href: "#manufacturing" },
    { label: "About Surgilence", href: "#about" },
    { label: "Contact & Inquiries", href: "#contact" }
  ];

  return (
    <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <a href="#" className="brand-link" aria-label="SURGILENCE (PVT) LTD Home">
            <Logo className="navbar-logo" />
          </a>

          {/* Desktop Nav */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Search shortcut, RFQ Basket, Contact */}
          <div className="navbar-actions">
            <button
              onClick={onSearchFocus}
              className="btn btn-secondary btn-sm nav-search-btn"
              title="Quick Search Instruments"
              aria-label="Search instruments"
            >
              <IconSearch size={16} />
              <span className="search-label-desktop">Search...</span>
            </button>

            {/* Request Quote Drawer Button */}
            <button
              onClick={onOpenQuote}
              className="btn btn-primary btn-sm quote-trigger-btn"
              aria-label={`View Request for Quote cart with ${quoteCount} items`}
            >
              <IconFileText size={17} />
              <span>Request Quote</span>
              {quoteCount > 0 && (
                <span className="quote-badge-counter">{quoteCount}</span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-secondary btn-icon mobile-menu-toggle"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <IconX size={20} /> : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown-menu">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-nav-link"
              >
                {link.label}
              </a>
            ))}
            <div className="mobile-menu-actions">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="btn btn-primary w-full"
              >
                <IconFileText size={18} />
                <span>Request for Quote ({quoteCount})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
