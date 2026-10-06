import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { IconSearch, IconFileText, IconPhone, IconX } from './Icons';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount, quoteCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Instruments Catalog", path: "/products" },
    { label: "Quality & ISO 13485", path: "/quality" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
      {/* Top Notification Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="container">
          <div className="announcement-content">
            <span className="announcement-badge">B2B EXPORT</span>
            <span className="announcement-text">
              Direct Manufacturer Pricing in USD • ISO 13485:2016 &amp; CE Certified • Free Sample Kits for Hospital Tenders
            </span>
            <a
              href="https://wa.me/923091699666"
              target="_blank"
              rel="noopener noreferrer"
              className="top-wa-link"
            >
              <IconPhone size={13} />
              <span>WhatsApp: +92 309 1699666</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <Link to="/" className="brand-link" aria-label="SURGILENCE (PVT) LTD Home">
            <Logo className="navbar-logo" />
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions: Request Quote, Cart / Checkout, Mobile Toggle */}
          <div className="navbar-actions">
            {/* Request a Quote Page Button */}
            <Link
              to="/quote"
              className={`btn btn-secondary btn-sm nav-quote-btn ${location.pathname === '/quote' ? 'active' : ''}`}
              title="Request for Quotation Page"
            >
              <IconFileText size={16} />
              <span className="nav-btn-text">RFQ Quote</span>
              {quoteCount > 0 && (
                <span className="quote-badge-counter">{quoteCount}</span>
              )}
            </Link>

            {/* Checkout / Order Cart Button */}
            <Link
              to="/checkout"
              className="btn btn-primary btn-sm nav-cart-btn"
              title="Proceed to Checkout"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="nav-btn-text">Checkout</span>
              {cartCount > 0 && (
                <span className="cart-badge-counter">{cartCount}</span>
              )}
            </Link>

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
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mobile-menu-actions">
              <Link
                to="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary w-full justify-between"
              >
                <div className="flex items-center gap-2">
                  <IconFileText size={17} />
                  <span>Request for Quote</span>
                </div>
                <span className="quote-badge-counter">{quoteCount}</span>
              </Link>

              <Link
                to="/checkout"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary w-full justify-between"
              >
                <div className="flex items-center gap-2">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <span>Checkout / Order</span>
                </div>
                <span className="cart-badge-counter">{cartCount}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
