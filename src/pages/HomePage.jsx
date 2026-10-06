import React from 'react';
import { Link } from 'react-router-dom';
import {
  IconScissors,
  IconTooth,
  IconShieldCheck,
  IconAward,
  IconCheck,
  IconFileText,
  IconGlobe,
  IconPhone
} from '../components/Icons';
import { INSTRUMENTS_DATA, COMPANY_INFO } from '../data/instruments';
import { useCart } from '../context/CartContext';

export default function HomePage() {
  const { addToCart, addToQuote } = useCart();

  // Featured 4 surgical + 4 dental items
  const featuredSurgical = INSTRUMENTS_DATA.filter((i) => i.category === 'surgical').slice(0, 4);
  const featuredDental = INSTRUMENTS_DATA.filter((i) => i.category === 'dental').slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero-section">
        <div className="container">
          <div className="home-hero-grid">
            <div className="hero-text-col">
              <div className="hero-trust-tag">
                <IconShieldCheck size={16} className="text-primary" />
                <span>ISO 13485:2016 Certified &amp; CE MDR Compliant</span>
              </div>

              <h1 className="hero-main-title">
                Precision Surgical &amp; <br />
                <span className="text-primary-gradient">Dental Instruments</span> <br />
                Direct From Manufacturer.
              </h1>

              <p className="hero-lead-text">
                <strong className="text-slate-900">SURGILENCE (PVT) LTD</strong> crafts high-performance manual instruments exclusively from genuine German &amp; French stainless steel (AISI 420 / 410) and Tungsten Carbide. Serving surgeons, dental clinicians, and international distributors with verified factory-direct USD pricing.
              </p>

              <div className="hero-cta-group">
                <Link to="/products" className="btn btn-primary">
                  <span>Explore Instruments Catalog</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>

                <Link to="/quote" className="btn btn-secondary">
                  <IconFileText size={18} />
                  <span>Request Wholesale RFQ</span>
                </Link>
              </div>

              {/* Verified Metrics Strip */}
              <div className="hero-metrics-strip">
                <div className="metric-box">
                  <span className="metric-num">100%</span>
                  <span className="metric-text">Manual Instruments (No Electronic Appliances)</span>
                </div>
                <div className="metric-sep"></div>
                <div className="metric-box">
                  <span className="metric-num">AISI 420</span>
                  <span className="metric-text">German Stainless Steel Standard</span>
                </div>
                <div className="metric-sep"></div>
                <div className="metric-box">
                  <span className="metric-num">134°C</span>
                  <span className="metric-text">Autoclave Passivation Proof</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="hero-visual-col">
              <div className="hero-card-frame">
                <img
                  src="/images/hero-instruments.jpg"
                  alt="Precision Surgical Instruments by SURGILENCE (PVT) LTD"
                  className="hero-card-img"
                  loading="eager"
                />
                <div className="hero-badge-overlay top-badge">
                  <span className="live-dot"></span>
                  <span className="text-xs font-bold text-slate-800">ASTM A967 Passivated</span>
                </div>
                <div className="hero-badge-overlay bottom-badge">
                  <IconAward size={16} className="text-amber-500" />
                  <span className="text-xs font-bold text-slate-800">Tungsten Carbide Gold Line</span>
                </div>
              </div>

              {/* Department Split Navigation */}
              <div className="dept-quick-nav">
                <Link to="/products?category=surgical" className="dept-card">
                  <div className="dept-icon-box">
                    <IconScissors size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="dept-name">Surgical Specialty</h4>
                    <p className="dept-detail">Metzenbaum, Scissors, Needle Holders, Retractors</p>
                  </div>
                </Link>

                <Link to="/products?category=dental" className="dept-card">
                  <div className="dept-icon-box">
                    <IconTooth size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="dept-name">Dental Specialty</h4>
                    <p className="dept-detail">Extraction Forceps, Elevators, Scalers, Mirrors</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Surgical Instruments Section */}
      <section className="featured-section bg-slate-50">
        <div className="container">
          <div className="section-title-wrap">
            <div className="section-sub-tag">
              <IconScissors size={15} />
              <span>General &amp; Specialized Surgery</span>
            </div>
            <h2 className="section-main-heading">Featured Surgical Hand Instruments</h2>
            <p className="section-sub-desc">
              Every instrument is individually heat-treated, passivated, and micro-honed for effortless tissue handling.
            </p>
          </div>

          <div className="product-cards-grid">
            {featuredSurgical.map((item) => (
              <ProductCardItem
                key={item.id}
                item={item}
                onAddToCart={addToCart}
                onAddToQuote={addToQuote}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/products?category=surgical" className="btn btn-secondary">
              <span>View All Surgical Instruments ({INSTRUMENTS_DATA.filter(i => i.category === 'surgical').length})</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Dental Instruments Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-title-wrap">
            <div className="section-sub-tag">
              <IconTooth size={15} />
              <span>Exodontia &amp; Periodontics</span>
            </div>
            <h2 className="section-main-heading">Featured Dental Clinical Instruments</h2>
            <p className="section-sub-desc">
              Anatomical extraction forceps, delicate luxators, and subgingival scalers engineered for superior dental tactile ergonomics.
            </p>
          </div>

          <div className="product-cards-grid">
            {featuredDental.map((item) => (
              <ProductCardItem
                key={item.id}
                item={item}
                onAddToCart={addToCart}
                onAddToQuote={addToQuote}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/products?category=dental" className="btn btn-secondary">
              <span>View All Dental Instruments ({INSTRUMENTS_DATA.filter(i => i.category === 'dental').length})</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Metallurgical Quality Showcase Banner */}
      <section className="quality-highlight-banner bg-slate-900 text-white">
        <div className="container">
          <div className="quality-banner-grid">
            <div>
              <span className="quality-pill-gold">ISO 13485:2016 QUALITY SYSTEMS</span>
              <h2 className="text-3xl font-bold mt-3 mb-4 text-white">
                Zero Compromise On Cold-Steel Metallurgy
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Unlike mass-market medical electronics, manual surgery is an art of physical touch. We forge our instruments strictly from certified German AISI 420 and 410 stainless steel, vacuum heat-treat to exact Rockwell thresholds, and subject each lot to a 2-hour autoclave boil test.
              </p>
              <div className="quality-checks-list">
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <IconCheck size={16} className="text-teal-400" />
                  <span>ASTM A967 Chemical Acid Passivation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <IconCheck size={16} className="text-teal-400" />
                  <span>Tungsten Carbide Gold-Brazed Jaws (HRC 68-70)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <IconCheck size={16} className="text-teal-400" />
                  <span>Custom Fiber-Laser Hospital Branding</span>
                </div>
              </div>
            </div>

            <div className="quality-stat-cards-cluster">
              <div className="quality-stat-box">
                <span className="stat-big-val">850K+</span>
                <span className="stat-sub-text">Instruments Exported Annually</span>
              </div>
              <div className="quality-stat-box">
                <span className="stat-big-val">48+</span>
                <span className="stat-sub-text">Countries Supplied</span>
              </div>
              <div className="quality-stat-box">
                <span className="stat-big-val">100%</span>
                <span className="stat-sub-text">Autoclave Guaranteed</span>
              </div>
              <div className="quality-stat-box">
                <span className="stat-big-val">0%</span>
                <span className="stat-sub-text">Electrical Appliances (Pure Steel)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wholesale RFQ CTA Section */}
      <section className="rfq-cta-section">
        <div className="container">
          <div className="rfq-banner-card">
            <div className="rfq-banner-content">
              <span className="text-xs uppercase font-bold tracking-wider text-teal-600">DIRECT FACTORY PROCUREMENT</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-2">
                Need an Itemized Proforma Invoice or Hospital Tender Quote?
              </h3>
              <p className="text-slate-600 text-sm max-w-2xl">
                Submit your Bill of Materials or choose instruments from our catalog. Our export sales department delivers official quotation sheets with estimated air freight lead times within 12 hours.
              </p>
            </div>
            <div className="rfq-banner-actions">
              <Link to="/quote" className="btn btn-primary">
                <IconFileText size={18} />
                <span>Create Wholesale RFQ</span>
              </Link>
              <a
                href={`https://wa.me/923091699666?text=${encodeURIComponent("Hello SURGILENCE (PVT) LTD, I am requesting wholesale pricing for surgical & dental instruments.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <IconPhone size={18} />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Sub-component for rendering product cards
function ProductCardItem({ item, onAddToCart, onAddToQuote }) {
  const isTC = item.steelGrade.toLowerCase().includes('tungsten carbide') || item.finish.includes('Gold');

  return (
    <article className="product-item-card">
      {/* Top Bar with SKU & Category */}
      <div className="product-item-top">
        <span className="item-sku-badge">{item.ref}</span>
        <span className={`item-cat-badge ${item.category === 'surgical' ? 'cat-surgical' : 'cat-dental'}`}>
          {item.category === 'surgical' ? 'Surgical' : 'Dental'}
        </span>
      </div>

      {/* Product Image Stage (Dedicated unique image per item!) */}
      <Link to={`/product/${item.id}`} className="product-image-container">
        <img
          src={item.image}
          alt={item.name}
          className="product-main-photo"
          loading="lazy"
        />
        {isTC && (
          <span className="gold-ribbon-tag">
            <IconAward size={13} />
            <span>TC Gold</span>
          </span>
        )}
      </Link>

      {/* Product Content Details */}
      <div className="product-content-wrap">
        <span className="product-subcat-label">{item.subcategory}</span>
        <h3 className="product-item-heading">
          <Link to={`/product/${item.id}`}>{item.name}</Link>
        </h3>
        <p className="product-specialty-txt">{item.specialty}</p>

        {/* Pricing Block in USD */}
        <div className="product-price-block">
          <div className="price-primary-row">
            <span className="price-usd-val">${item.priceUSD.toFixed(2)}</span>
            <span className="price-unit">USD / unit</span>
          </div>
          <div className="price-bulk-tag">
            Bulk (10+): <strong>${item.bulkPriceUSD.toFixed(2)} USD</strong>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="product-card-btn-row">
          <Link to={`/product/${item.id}`} className="btn btn-secondary btn-sm flex-1">
            <span>View Details</span>
          </Link>

          <button
            onClick={() => onAddToCart(item, 1)}
            className="btn btn-primary btn-sm flex-1"
            title="Add to checkout order cart"
          >
            <span>+ Cart</span>
          </button>

          <button
            onClick={() => onAddToQuote(item, 1)}
            className="btn btn-secondary btn-sm"
            title="Add to wholesale RFQ quote"
          >
            <IconFileText size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
