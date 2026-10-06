import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { INSTRUMENTS_DATA } from '../data/instruments';
import {
  IconCheck,
  IconShieldCheck,
  IconAward,
  IconFileText,
  IconPhone,
  IconShoppingCart,
  IconSparkles
} from '../components/Icons';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, addToQuote } = useCart();

  const product = INSTRUMENTS_DATA.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(1);
  const [laserNote, setLaserNote] = useState('');
  const [activeTab, setActiveTab] = useState('features'); // 'features', 'autoclave', 'compliance', 'oem'
  const [addedNotice, setAddedNotice] = useState(null);

  if (!product) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Instrument Not Found</h2>
        <p className="text-slate-500 mb-6">The requested instrument model could not be found in our current catalog.</p>
        <Link to="/catalog" className="btn btn-primary">
          Back to Instruments Catalog
        </Link>
      </div>
    );
  }

  const isTC = product.steelGrade?.toLowerCase().includes('tungsten carbide') || product.finish?.includes('Gold');
  const unitPrice = quantity >= 10 ? product.bulkPriceUSD : product.priceUSD;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedNotice('Added to Order Cart');
    setTimeout(() => setAddedNotice(null), 2500);
  };

  const handleAddToQuote = () => {
    addToQuote(product, quantity, laserNote);
    setAddedNotice('Added to Institutional RFQ');
    setTimeout(() => setAddedNotice(null), 2500);
  };

  const relatedItems = INSTRUMENTS_DATA.filter(
    (item) => item.category === product.category && item.id !== product.id
  ).slice(0, 4);

  const whatsappMessage = `Hello SURGILENCE (PVT) LTD,%0AI am inquiring about the ${encodeURIComponent(product.name)} (Ref: ${product.ref}).%0AQty needed: ${quantity} units.%0APlease provide proforma invoice and export delivery schedule.`;

  return (
    <div className="product-detail-page bg-white">
      {/* Light Professional Breadcrumbs */}
      <div className="detail-breadcrumbs-strip">
        <div className="container">
          <nav className="detail-breadcrumbs-nav" aria-label="Breadcrumb">
            <Link to="/" className="detail-breadcrumb-link">Home</Link>
            <span className="detail-breadcrumb-sep">/</span>
            <Link to="/catalog" className="detail-breadcrumb-link">Catalog</Link>
            <span className="detail-breadcrumb-sep">/</span>
            <Link to={`/catalog?category=${product.category}`} className="detail-breadcrumb-link capitalize">
              {product.category}
            </Link>
            <span className="detail-breadcrumb-sep">/</span>
            <span className="detail-breadcrumb-current" title={product.name}>{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container py-8 sm:py-12">
        <div className="product-detail-layout">
          {/* Left Column: Visual Product Staging */}
          <div className="product-gallery-column">
            <div className="product-stage-frame">
              <img
                src={product.image}
                alt={product.name}
                className="product-stage-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/item-metzenbaum-scissors.png';
                }}
              />
              {isTC && (
                <div className="stage-badge-tc">
                  <IconAward size={14} />
                  <span>Tungsten Carbide Gold Line</span>
                </div>
              )}
            </div>

            {/* Quality Ribbons */}
            <div className="stage-trust-ribbon">
              <div className="stage-trust-item">
                <span className="stage-trust-label">ISO 13485:2016</span>
                <span className="stage-trust-sub">Medical Certified</span>
              </div>
              <div className="stage-trust-item">
                <span className="stage-trust-label">German AISI Steel</span>
                <span className="stage-trust-sub">Corrosion Immune</span>
              </div>
              <div className="stage-trust-item">
                <span className="stage-trust-label">Fiber Laser Etched</span>
                <span className="stage-trust-sub">Traceable Batches</span>
              </div>
            </div>
          </div>

          {/* Right Column: Instrument Details & Ordering Controls */}
          <div className="product-info-panel">
            <div className="detail-meta-row">
              <span className="detail-sku-badge">{product.ref}</span>
              <span className="detail-category-badge">{product.subcategory || product.category}</span>
              <span className="detail-stock-badge">
                <span className="detail-stock-dot"></span>
                <span>In Stock • Ready for Export</span>
              </span>
            </div>

            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-description">
              {product.description}
            </p>

            {/* B2B Price & Tiered Banner */}
            <div className="detail-price-banner">
              <div>
                <span className="detail-price-label">DIRECT FACTORY PRICE (USD)</span>
                <span className="detail-price-big">${product.priceUSD.toFixed(2)}</span>
              </div>
              <div className="detail-wholesale-box">
                <span className="detail-wholesale-label">WHOLESALE TIER (10+ UNITS)</span>
                <span className="detail-wholesale-rate">${product.bulkPriceUSD.toFixed(2)} USD / pc</span>
              </div>
            </div>

            {/* High-Precision Specifications Table */}
            <table className="specs-table">
              <tbody>
                <tr>
                  <th>Alloy Grade</th>
                  <td>{product.steelGrade}</td>
                </tr>
                <tr>
                  <th>Length / Size</th>
                  <td>{product.length}</td>
                </tr>
                <tr>
                  <th>Working End / Tip</th>
                  <td>{product.tipType}</td>
                </tr>
                <tr>
                  <th>Hardness Standard</th>
                  <td>{product.hardness}</td>
                </tr>
                <tr>
                  <th>Surface Finish</th>
                  <td>{product.finish}</td>
                </tr>
                <tr>
                  <th>Sterilization Cycle</th>
                  <td>{product.sterilization}</td>
                </tr>
                <tr>
                  <th>Quality Compliance</th>
                  <td>{product.isoCompliant || 'ISO 13485:2016 & ASTM F899'}</td>
                </tr>
              </tbody>
            </table>

            {/* Custom Laser Engraving Card */}
            <div className="laser-engrave-card">
              <div className="laser-engrave-header">
                <span className="laser-engrave-title">Custom Laser Engraving &amp; UDI Marking:</span>
                <span className="laser-engrave-badge">Included Free</span>
              </div>
              <input
                type="text"
                value={laserNote}
                onChange={(e) => setLaserNote(e.target.value)}
                placeholder="Hospital/Clinic name or OR set code (e.g. MAYO CLINIC OR-04)"
                className="laser-engrave-input"
              />
              <span className="laser-engrave-help">
                50-micron permanent fiber laser etching applied during cleanroom passivation.
              </span>
            </div>

            {/* Action Buttons & Quantity Stepper */}
            <div className="detail-actions-card">
              <div className="detail-buttons-row">
                <div className="qty-stepper">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="qty-btn"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="qty-input"
                    aria-label="Instrument quantity"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="qty-btn"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary btn-add-cart"
                >
                  <IconShoppingCart size={18} />
                  <span>Add to Cart (${totalPrice.toFixed(2)})</span>
                </button>

                <button
                  onClick={handleAddToQuote}
                  className="btn btn-secondary btn-add-quote"
                >
                  <IconFileText size={18} />
                  <span>Add to RFQ</span>
                </button>
              </div>

              {/* Direct WhatsApp Specialist Order */}
              <a
                href={`https://wa.me/923091699666?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-whatsapp-banner"
              >
                <IconPhone size={16} />
                <span>Inquire directly on WhatsApp (+92 309 1699666)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="detail-tabs-section">
          <div className="detail-tabs-nav" role="tablist">
            <button
              onClick={() => setActiveTab('features')}
              className={`detail-tab-btn ${activeTab === 'features' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'features'}
            >
              <IconAward size={16} />
              <span>Clinical Features &amp; Applications</span>
            </button>
            <button
              onClick={() => setActiveTab('autoclave')}
              className={`detail-tab-btn ${activeTab === 'autoclave' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'autoclave'}
            >
              <IconShieldCheck size={16} />
              <span>Autoclave &amp; Sterilization Guidelines</span>
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`detail-tab-btn ${activeTab === 'compliance' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'compliance'}
            >
              <IconCheck size={16} />
              <span>Quality Assurance &amp; Standards</span>
            </button>
            <button
              onClick={() => setActiveTab('oem')}
              className={`detail-tab-btn ${activeTab === 'oem' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'oem'}
            >
              <IconSparkles size={16} />
              <span>OEM &amp; Institutional Supply</span>
            </button>
          </div>

          <div className="detail-tab-panel">
            {activeTab === 'features' && (
              <div className="tab-content-block">
                <h3 className="tab-section-heading">Key Engineering &amp; Clinical Features:</h3>
                <ul className="feature-checklist">
                  {product.features?.map((f, i) => (
                    <li key={i} className="feature-check-item">
                      <span className="feature-check-icon">
                        <IconCheck size={13} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="tab-section-heading">Recommended Surgical Procedures:</h3>
                <div className="procedure-pill-row">
                  {product.applications?.map((app, i) => (
                    <span key={i} className="procedure-tag">{app}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'autoclave' && (
              <div className="tab-content-block">
                <h3 className="tab-section-heading">Hospital Central Sterile Processing Protocol:</h3>
                <div className="protocol-grid">
                  <div className="protocol-card">
                    <span className="protocol-step-num">1</span>
                    <h4 className="protocol-card-title">Enzymatic Pre-Clean</h4>
                    <p className="protocol-card-desc">
                      Rinse immediately after use with a neutral pH enzymatic detergent (pH 7.0–8.5). Ensure box joints, serrations, and hinges remain free of bio-burden.
                    </p>
                  </div>
                  <div className="protocol-card">
                    <span className="protocol-step-num">2</span>
                    <h4 className="protocol-card-title">Ultrasonic Decontamination</h4>
                    <p className="protocol-card-desc">
                      Submerge open instruments in ultrasonic bath for 10–15 minutes. Apply water-soluble surgical instrument milk lubricant to all moving pivots before packaging.
                    </p>
                  </div>
                  <div className="protocol-card">
                    <span className="protocol-step-num">3</span>
                    <h4 className="protocol-card-title">Steam Autoclave</h4>
                    <p className="protocol-card-desc">
                      Standard prevacuum steam sterilization cycle: <strong>134°C (273°F) for 4 minutes</strong> holding time, or gravity displacement at 121°C (250°F) for 30 minutes.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'compliance' && (
              <div className="tab-content-block">
                <h3 className="tab-section-heading">International Regulatory Compliance &amp; Metallurgical Standards:</h3>
                <div className="compliance-grid">
                  <div className="compliance-card">
                    <div className="compliance-icon">
                      <IconShieldCheck size={20} />
                    </div>
                    <div className="compliance-body">
                      <h4 className="compliance-title">ISO 13485:2016 Certified</h4>
                      <p className="compliance-text">
                        Manufactured in facilities conforming to medical devices quality management system standard ISO 13485:2016.
                      </p>
                    </div>
                  </div>
                  <div className="compliance-card">
                    <div className="compliance-icon">
                      <IconCheck size={20} />
                    </div>
                    <div className="compliance-body">
                      <h4 className="compliance-title">EU MDR 2017/745 Class I</h4>
                      <p className="compliance-text">
                        Conforms to European Medical Device Regulations with complete technical documentation and Declaration of Conformity.
                      </p>
                    </div>
                  </div>
                  <div className="compliance-card">
                    <div className="compliance-icon">
                      <IconAward size={20} />
                    </div>
                    <div className="compliance-body">
                      <h4 className="compliance-title">ASTM F899 Surgical Steel</h4>
                      <p className="compliance-text">
                        High-grade martensitic and austenitic stainless steel alloys per ASTM F899 standard with 100% passivation against pitting.
                      </p>
                    </div>
                  </div>
                  <div className="compliance-card">
                    <div className="compliance-icon">
                      <IconSparkles size={20} />
                    </div>
                    <div className="compliance-body">
                      <h4 className="compliance-title">Boil &amp; Corrosion Tested</h4>
                      <p className="compliance-text">
                        Every production batch undergoes copper sulfate and boil test per ISO 7153-1 to ensure absolute rust immunity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'oem' && (
              <div className="tab-content-block">
                <h3 className="tab-section-heading">B2B Private Label &amp; Institutional Supply Capabilities:</h3>
                <ul className="feature-checklist">
                  <li className="feature-check-item">
                    <span className="feature-check-icon">
                      <IconCheck size={13} />
                    </span>
                    <span><strong>Private Label Branding:</strong> We offer custom laser branding, hospital network catalog codes, and GS1-compliant DataMatrix UDI markings directly on the steel.</span>
                  </li>
                  <li className="feature-check-item">
                    <span className="feature-check-icon">
                      <IconCheck size={13} />
                    </span>
                    <span><strong>Sterile Barrier Packaging:</strong> Options for medical pouch packaging, rigid blister packs, or hospital set sterilization cassettes.</span>
                  </li>
                  <li className="feature-check-item">
                    <span className="feature-check-icon">
                      <IconCheck size={13} />
                    </span>
                    <span><strong>Direct Air Freight Dispatch:</strong> Expedited export documentation, Certificate of Origin, and worldwide DHL / FedEx / Air Cargo dispatch from Sialkot, Pakistan.</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Complementary Instruments Grid */}
        {relatedItems.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Complementary Instruments in this Specialty
            </h3>
            <div className="products-grid">
              {relatedItems.map((rel) => (
                <div key={rel.id} className="product-card">
                  <Link to={`/product/${rel.id}`} className="product-card-img-wrap">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="product-card-img"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/item-metzenbaum-scissors.png';
                      }}
                    />
                  </Link>
                  <div className="product-card-body">
                    <span className="product-card-ref">{rel.ref}</span>
                    <h4 className="product-card-title">
                      <Link to={`/product/${rel.id}`}>{rel.name}</Link>
                    </h4>
                    <div className="product-card-pricing">
                      <div className="price-main-wrap">
                        <span className="price-main-val">${rel.priceUSD.toFixed(2)}</span>
                        <span className="price-bulk-tag">Bulk: ${rel.bulkPriceUSD.toFixed(2)} USD</span>
                      </div>
                    </div>
                    <div className="product-card-actions">
                      <Link to={`/product/${rel.id}`} className="btn btn-secondary btn-sm justify-center">
                        View
                      </Link>
                      <button
                        onClick={() => {
                          addToCart(rel, 1);
                          setAddedNotice(`Added ${rel.ref} to Cart`);
                          setTimeout(() => setAddedNotice(null), 2500);
                        }}
                        className="btn btn-primary btn-sm justify-center"
                      >
                        + Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Added Notice Toast */}
      {addedNotice && (
        <div className="light-toast-notification">
          <span className="toast-icon">
            <IconCheck size={16} />
          </span>
          <span>{addedNotice}</span>
        </div>
      )}
    </div>
  );
}
