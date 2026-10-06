import React from 'react';
import { Link } from 'react-router-dom';
import {
  IconScissors,
  IconTooth,
  IconShieldCheck,
  IconAward,
  IconFileText,
  IconGlobe,
  IconCheck
} from '../components/Icons';
import { INSTRUMENTS_DATA } from '../data/instruments';
import { useCart } from '../context/CartContext';

export default function HomePage() {
  const { addToCart } = useCart();

  // Top 8 bestselling items across surgical & dental
  const featuredItems = INSTRUMENTS_DATA.slice(0, 8);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero-section">
        <div className="container">
          <div className="hero-main-grid">
            <div className="hero-text-col">
              <div className="hero-trust-tag">
                <IconShieldCheck size={16} className="text-teal-600" />
                <span>ISO 13485:2016 Certified &amp; CE MDR Compliant</span>
              </div>

              <h1 className="hero-headline">
                Precision Surgical &amp; <br />
                <span className="hero-headline-gradient">Dental Instruments</span> <br />
                Direct From Manufacturer.
              </h1>

              <p className="hero-lead-text">
                <strong>SURGILENCE (PVT) LTD</strong> crafts high-performance manual instruments exclusively from genuine German stainless steel (AISI 420 / 410) and Tungsten Carbide. Supplying operating theaters, dental practices, and healthcare distributors worldwide with verified factory-direct USD pricing.
              </p>

              <div className="hero-cta-group">
                <Link to="/catalog" className="btn btn-primary">
                  <span>Explore Instruments Catalog</span>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>

                <Link to="/quote" className="btn btn-secondary">
                  <IconFileText size={17} />
                  <span>Request Wholesale RFQ</span>
                </Link>
              </div>

              {/* Verified Metrics Strip */}
              <div className="hero-metrics-grid">
                <div className="metric-pill-card">
                  <span className="metric-pill-val">40+</span>
                  <span className="metric-pill-lbl">Countries Exported</span>
                </div>
                <div className="metric-pill-card">
                  <span className="metric-pill-val">AISI 420</span>
                  <span className="metric-pill-lbl">German Steel Standard</span>
                </div>
                <div className="metric-pill-card">
                  <span className="metric-pill-val">134°C</span>
                  <span className="metric-pill-lbl">Steam Autoclavable</span>
                </div>
                <div className="metric-pill-card">
                  <span className="metric-pill-val">USD</span>
                  <span className="metric-pill-lbl">Factory Direct Pricing</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="hero-visual-frame">
              <img
                src="/images/hero-instruments.jpg"
                alt="Precision Surgical Instruments by Surgilence"
                className="hero-visual-img"
                loading="eager"
              />
              <div className="hero-floating-badge badge-top">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                <span>ASTM A967 Passivated</span>
              </div>
              <div className="hero-floating-badge badge-bottom">
                <IconAward size={15} className="text-amber-500" />
                <span>Tungsten Carbide Gold Line</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Category Showcase */}
      <section className="section-py bg-white">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">SPECIALIZED PORTFOLIO</span>
            <h2 className="section-title">Engineered by Clinical Department</h2>
            <p className="section-desc">
              Every instrument is cold-forged and precision-hand-finished to deliver exact tactile balance, cutting performance, and long-term corrosion resistance.
            </p>
          </div>

          <div className="categories-grid">
            {/* General Surgery */}
            <Link to="/catalog?category=surgical" className="category-card">
              <div>
                <div className="category-icon-bubble">
                  <IconScissors size={24} />
                </div>
                <h3 className="category-name">General Surgery</h3>
                <p className="category-desc">
                  Metzenbaum scissors, Crile hemostats, Adson tissue forceps, Senn retractors, and scalpel handles.
                </p>
              </div>
              <span className="category-cta-link">
                <span>View Surgical Line</span>
                <span>→</span>
              </span>
            </Link>

            {/* Dental Extraction */}
            <Link to="/catalog?category=dental" className="category-card">
              <div>
                <div className="category-icon-bubble">
                  <IconTooth size={24} />
                </div>
                <h3 className="category-name">Oral &amp; Extraction</h3>
                <p className="category-desc">
                  Anatomically contoured extraction forceps (#18R, #151), Coupland elevators, and bone rongeurs.
                </p>
              </div>
              <span className="category-cta-link">
                <span>View Extraction Tools</span>
                <span>→</span>
              </span>
            </Link>

            {/* Periodontics & Diagnostics */}
            <Link to="/catalog?category=dental" className="category-card">
              <div>
                <div className="category-icon-bubble">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <h3 className="category-name">Periodontics &amp; Diagnostics</h3>
                <p className="category-desc">
                  Sickle scalers (H6/H7), Williams millimeter probes, and rhodium front-surface mouth mirrors.
                </p>
              </div>
              <span className="category-cta-link">
                <span>View Diagnostic Line</span>
                <span>→</span>
              </span>
            </Link>

            {/* Tungsten Carbide Gold */}
            <Link to="/catalog?category=surgical" className="category-card">
              <div>
                <div className="category-icon-bubble" style={{ color: '#d97706', background: '#fffbeb', borderColor: '#fef3c7' }}>
                  <IconAward size={24} />
                </div>
                <h3 className="category-name">TC Gold Needle Drivers</h3>
                <p className="category-desc">
                  Mayo-Hegar and Mathieu pliers brazed with Tungsten Carbide jaws for non-slip needle grip.
                </p>
              </div>
              <span className="category-cta-link" style={{ color: '#b45309' }}>
                <span>View TC Gold Line</span>
                <span>→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Instruments Product Grid */}
      <section className="section-py bg-slate-50">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">POPULAR EXPORTS</span>
            <h2 className="section-title">Featured Manual Instruments</h2>
            <p className="section-desc">
              All items available in individual sample units or palletized wholesale container quantities with direct factory USD pricing.
            </p>
          </div>

          <div className="products-grid">
            {featuredItems.map((item) => {
              const isTC = item.steelGrade.toLowerCase().includes('tungsten carbide') || item.finish.includes('Gold');
              return (
                <div key={item.id} className="product-card">
                  {/* 1:1 Square Frame on Pure White Canvas */}
                  <Link to={`/product/${item.id}`} className="product-card-img-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-card-img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/item-metzenbaum-scissors.png';
                      }}
                    />
                    <div className="product-tag-overlay">
                      <span className={`product-badge ${isTC ? 'product-badge-tc' : item.category === 'surgical' ? 'product-badge-surgical' : 'product-badge-dental'}`}>
                        {isTC ? 'TC GOLD' : item.category}
                      </span>
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="product-card-body">
                    <span className="product-card-ref">{item.ref}</span>
                    <h3 className="product-card-title">
                      <Link to={`/product/${item.id}`} className="hover:text-teal-700">
                        {item.name}
                      </Link>
                    </h3>

                    <div className="product-specs-pills">
                      <span className="spec-pill">{item.length}</span>
                      <span className="spec-pill">{item.steelGrade.split(' ')[0]} {item.steelGrade.split(' ')[1] || ''}</span>
                    </div>

                    <div className="product-card-pricing">
                      <div className="price-main-wrap">
                        <span className="price-main-val">${item.priceUSD.toFixed(2)}</span>
                        <span className="price-bulk-tag">Bulk: ${item.bulkPriceUSD.toFixed(2)} / 10+ pcs</span>
                      </div>
                    </div>

                    <div className="product-card-actions">
                      <Link to={`/product/${item.id}`} className="btn btn-secondary btn-sm">
                        Details
                      </Link>
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="btn btn-primary btn-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/catalog" className="btn btn-primary">
              <span>View All Instruments ({INSTRUMENTS_DATA.length} Models)</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Visual Quality Assurance Pillars */}
      <section className="section-py bg-white">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">QUALITY GUARANTEE</span>
            <h2 className="section-title">The Surgilence Manufacturing Standard</h2>
            <p className="section-desc">
              Every instrument passes our multi-stage inspection for dimensional fidelity, Rockwell hardness, and chemical passivation before export.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-4">
                <IconShieldCheck size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">ISO 13485:2016 &amp; CE</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Full international regulatory compliance for hospital tenders and clinical deployment across the EU, US, and Middle East.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-4">
                <IconScissors size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Vacuum Hardened Steel</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Precision martensitic AISI 420 alloys treated to Rockwell HRC 52-54 for durable blade edges and lasting spring tension.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-4">
                <IconAward size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Custom Laser Etching</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Permanent 50-micron fiber-laser marking of clinic names, department inventory codes, or distributor branding.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-4">
                <IconGlobe size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Worldwide DHL Logistics</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Fast door-to-door express delivery for samples, plus scheduled air freight and sea containers for bulk tenders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Inquiry CTA Card */}
      <section className="section-py bg-slate-50">
        <div className="container">
          <div className="cta-banner-box">
            <div className="max-w-xl">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-2">
                HOSPITAL TENDERS &amp; DISTRIBUTORS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Need a Custom Proforma Invoice or Sample Kit?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Our export desk prepares comprehensive quotes with tier discounts, freight options, and delivery timelines within 2 hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <Link to="/quote" className="btn btn-primary w-full sm:w-auto">
                Build Wholesale RFQ
              </Link>
              <a
                href="https://wa.me/923091699666"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full sm:w-auto"
              >
                Instant WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
