import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { INSTRUMENTS_DATA } from '../data/instruments';
import {
  IconCheck,
  IconShieldCheck,
  IconAward,
  IconFileText,
  IconPhone,
  IconDownload,
  IconScissors,
  IconTooth
} from '../components/Icons';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToQuote } = useCart();

  const product = INSTRUMENTS_DATA.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(5);
  const [laserNote, setLaserNote] = useState('');
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'applications', 'autoclave'

  if (!product) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Instrument Not Found</h2>
        <p className="text-slate-500 mb-6">The requested instrument model could not be found in our current catalog.</p>
        <Link to="/products" className="btn btn-primary">
          Back to Instruments Catalog
        </Link>
      </div>
    );
  }

  const isTC = product.steelGrade.toLowerCase().includes('tungsten carbide') || product.finish.includes('Gold');
  const unitPrice = quantity >= 10 ? product.bulkPriceUSD : product.priceUSD;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleAddToQuote = () => {
    addToQuote(product, quantity, laserNote);
  };

  const relatedItems = INSTRUMENTS_DATA.filter(
    (item) => item.category === product.category && item.id !== product.id
  ).slice(0, 4);

  const whatsappMessage = `Hello SURGILENCE (PVT) LTD,%0AI am inquiring about the ${encodeURIComponent(product.name)} (Ref: ${product.ref}).%0AQty needed: ${quantity} units.%0APlease provide stock availability and proforma pricing.`;

  return (
    <div className="product-detail-page">
      {/* Breadcrumbs */}
      <div className="breadcrumb-strip bg-slate-100 border-b border-slate-200 py-3">
        <div className="container">
          <nav className="breadcrumb-nav text-xs text-slate-500 flex items-center gap-2">
            <Link to="/" className="hover:text-teal-600">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-teal-600">Catalog</Link>
            <span>/</span>
            <Link to={`/products?category=${product.category}`} className="capitalize hover:text-teal-600">
              {product.category}
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-800 truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container py-10 sm:py-14">
        <div className="product-layout-grid">
          {/* Left Column: Individual Product Photo & Certifications */}
          <div className="product-visual-column">
            <div className="product-main-stage">
              <img
                src={product.image}
                alt={product.name}
                className="product-hero-image"
              />
              {isTC && (
                <div className="detail-tc-ribbon">
                  <IconAward size={15} />
                  <span>Tungsten Carbide Gold Line</span>
                </div>
              )}
            </div>

            {/* Quality Standard Badges */}
            <div className="product-cert-badges-grid">
              <div className="p-cert-card">
                <IconShieldCheck size={18} className="text-teal-600" />
                <div>
                  <div className="text-xs font-bold text-slate-800">ISO 13485:2016</div>
                  <div className="text-[11px] text-slate-500">Medical Quality Certified</div>
                </div>
              </div>

              <div className="p-cert-card">
                <span className="text-xs font-bold text-blue-600">CE MDR</span>
                <div>
                  <div className="text-xs font-bold text-slate-800">Class I Approved</div>
                  <div className="text-[11px] text-slate-500">EU 2017/745 Directive</div>
                </div>
              </div>

              <div className="p-cert-card">
                <span className="text-xs font-bold text-amber-600">134°C</span>
                <div>
                  <div className="text-xs font-bold text-slate-800">Steam Autoclave</div>
                  <div className="text-[11px] text-slate-500">ASTM A967 Boil Proof</div>
                </div>
              </div>
            </div>

            {/* OEM Laser Customization Callout */}
            <div className="oem-detail-box">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                OEM Private Labeling &amp; Laser Engraving
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                We provide custom 50-micron high-contrast fiber-laser marking for your hospital asset inventory, dental practice branding, or distributor trade mark.
              </p>
            </div>
          </div>

          {/* Right Column: Instrument Details, Pricing & Order Box */}
          <div className="product-info-column">
            <div className="flex items-center gap-2 mb-2">
              <span className="sku-tag-lg">{product.ref}</span>
              <span className={`badge ${product.category === 'surgical' ? 'badge-surgical' : 'badge-dental'}`}>
                {product.category === 'surgical' ? 'Surgical Instrument' : 'Dental Instrument'}
              </span>
              <span className="badge badge-steel">{product.subcategory}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              {product.name}
            </h1>
            <p className="text-sm font-semibold text-teal-700 mb-4">{product.specialty}</p>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Pricing Matrix Card */}
            <div className="price-matrix-card">
              <div className="price-header-row">
                <div>
                  <span className="text-xs text-slate-500 block">Unit Price (1 - 9 pcs)</span>
                  <span className="text-2xl font-extrabold text-slate-900">
                    ${product.priceUSD.toFixed(2)} <span className="text-xs font-normal text-slate-500">USD</span>
                  </span>
                </div>
                <div className="wholesale-tier-box">
                  <span className="text-xs font-bold text-teal-700 block">Wholesale Rate (10+ pcs)</span>
                  <span className="text-xl font-bold text-teal-800">
                    ${product.bulkPriceUSD.toFixed(2)} <span className="text-xs font-normal text-teal-700">USD / unit</span>
                  </span>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="qty-selection-row">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Order / Quotation Quantity:
                  </label>
                  <div className="qty-stepper-control">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="stepper-btn"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="stepper-input"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="stepper-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Total Estimate</span>
                  <span className="text-xl font-black text-slate-900">
                    ${totalPrice.toFixed(2)} <span className="text-xs font-normal text-slate-500">USD</span>
                  </span>
                  {quantity >= 10 && (
                    <span className="text-[11px] font-bold text-teal-600 block">
                      Wholesale Bulk Tier Applied
                    </span>
                  )}
                </div>
              </div>

              {/* Custom Laser Etching Field */}
              <div className="laser-note-input-wrap">
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Optional Custom Laser Etching (Hospital Dept, Doctor Name):
                </label>
                <input
                  type="text"
                  placeholder="e.g. 'St. Jude General OR' or 'Dr. Harris Clinic'"
                  value={laserNote}
                  onChange={(e) => setLaserNote(e.target.value)}
                  className="laser-text-input"
                />
              </div>

              {/* Action Buttons Row */}
              <div className="detail-cta-row">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary flex-1"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <span>Add {quantity} to Cart (${totalPrice.toFixed(2)})</span>
                </button>

                <button
                  onClick={handleAddToQuote}
                  className="btn btn-secondary flex-1"
                >
                  <IconFileText size={18} />
                  <span>Add to Wholesale RFQ</span>
                </button>
              </div>

              {/* Quick WhatsApp Inquiry */}
              <a
                href={`https://wa.me/923091699666?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="direct-wa-inquiry-btn"
              >
                <IconPhone size={15} />
                <span>Inquire About {product.ref} on WhatsApp (+92 309 1699666)</span>
              </a>
            </div>

            {/* Information Tabs (Specs, Features, Autoclave) */}
            <div className="product-tabs-wrapper mt-8">
              <div className="product-tab-buttons">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`tab-btn-pill ${activeTab === 'specs' ? 'active' : ''}`}
                >
                  Technical Specifications
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`tab-btn-pill ${activeTab === 'features' ? 'active' : ''}`}
                >
                  Engineering Highlights
                </button>
                <button
                  onClick={() => setActiveTab('autoclave')}
                  className={`tab-btn-pill ${activeTab === 'autoclave' ? 'active' : ''}`}
                >
                  Autoclave Care
                </button>
              </div>

              <div className="tab-panel-box">
                {activeTab === 'specs' && (
                  <table className="specs-table-full">
                    <tbody>
                      <tr>
                        <th>Steel Metallurgy</th>
                        <td>{product.steelGrade}</td>
                      </tr>
                      <tr>
                        <th>Surface Finish</th>
                        <td>{product.finish}</td>
                      </tr>
                      <tr>
                        <th>Length / Sizing</th>
                        <td>{product.length}</td>
                      </tr>
                      <tr>
                        <th>Tip Profile</th>
                        <td>{product.tipType}</td>
                      </tr>
                      <tr>
                        <th>Rockwell Hardness</th>
                        <td>{product.hardness}</td>
                      </tr>
                      <tr>
                        <th>Sterilization Cycle</th>
                        <td>{product.sterilization}</td>
                      </tr>
                      <tr>
                        <th>Regulatory Classification</th>
                        <td>{product.ceClass}</td>
                      </tr>
                      <tr>
                        <th>Compliance Standards</th>
                        <td>{product.isoCompliant}</td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {activeTab === 'features' && (
                  <ul className="features-checklist">
                    {product.features.map((feat, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                        <IconCheck size={16} className="text-teal-600 mt-1 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'autoclave' && (
                  <div className="autoclave-guide-text text-sm text-slate-700 space-y-3 leading-relaxed">
                    <p>
                      <strong>1. Ultrasonic Pre-Cleaning:</strong> Immerse in pH-neutral enzymatic solution for 10-15 minutes immediately following surgical use to dislodge coagulated proteins.
                    </p>
                    <p>
                      <strong>2. Passivation Integrity:</strong> Rinse thoroughly in demineralized water. Do not expose instruments to bleach, chlorine, or harsh iodophor compounds.
                    </p>
                    <p>
                      <strong>3. Steam Autoclave:</strong> Autoclavable at 134°C (273°F) for 5 to 18 minutes depending on packaging method (wrapped vs cassette).
                    </p>
                    <p>
                      <strong>4. Lubrication:</strong> Lubricate all scissor box joints and forceps hinges with medical-grade water-soluble instrument lubricant prior to sterilization.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Instruments Section */}
        {relatedItems.length > 0 && (
          <div className="related-instruments-section mt-16 pt-10 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Complementary {product.category === 'surgical' ? 'Surgical' : 'Dental'} Instruments
            </h3>
            <div className="product-cards-grid">
              {relatedItems.map((rel) => (
                <article key={rel.id} className="product-item-card">
                  <div className="product-item-top">
                    <span className="item-sku-badge">{rel.ref}</span>
                  </div>
                  <Link to={`/product/${rel.id}`} className="product-image-container">
                    <img src={rel.image} alt={rel.name} className="product-main-photo" loading="lazy" />
                  </Link>
                  <div className="product-content-wrap">
                    <h4 className="product-item-heading">
                      <Link to={`/product/${rel.id}`}>{rel.name}</Link>
                    </h4>
                    <div className="product-price-block">
                      <span className="price-usd-val">${rel.priceUSD.toFixed(2)}</span>
                      <span className="price-unit">USD</span>
                    </div>
                    <Link to={`/product/${rel.id}`} className="btn btn-secondary btn-sm w-full mt-2">
                      View Specs
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
