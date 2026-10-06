import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { IconFileText, IconPhone, IconX } from './Icons';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount, quoteCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Catalog", path: "/catalog" },
    { label: "Quality & ISO", path: "/quality" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
      {/* Main Navbar */}
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo - Integrated seamlessly without box */}
          <Link to="/" className="brand-link" aria-label="Surgilence Home">
            <Logo />
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
              className={`btn btn-secondary btn-sm ${location.pathname === '/quote' ? 'active' : ''}`}
              title="Request for Quotation"
            >
              <IconFileText size={16} />
              <span className="hidden sm:inline">RFQ Quote</span>
              {quoteCount > 0 && (
                <span className="quote-badge-counter">{quoteCount}</span>
              )}
            </Link>

            {/* Checkout / Order Cart Button */}
            <Link
              to="/checkout"
              className="btn btn-primary btn-sm"
              title="Proceed to Checkout"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="hidden sm:inline">Checkout</span>
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

        {/* Mobile Dropdown Drawer */}
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
                <span className="flex items-center gap-2">
                  <IconFileText size={16} />
                  <span>Request for Quote</span>
                </span>
                {quoteCount > 0 && <span className="quote-badge-counter">{quoteCount}</span>}
              </Link>

              <Link
                to="/checkout"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary w-full justify-between"
              >
                <span>Checkout</span>
                {cartCount > 0 && <span className="cart-badge-counter">{cartCount}</span>}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
