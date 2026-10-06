import React, { useState } from 'react';
import {
  IconX,
  IconCheck,
  IconShieldCheck,
  IconAward,
  IconPlus,
  IconFileText
} from './Icons';

export default function ProductModal({ product, onClose, onAddToQuote, isInQuote }) {
  const [quantity, setQuantity] = useState(1);
  const [customLaserNote, setCustomLaserNote] = useState('');
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToQuote(product, quantity, customLaserNote);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const isTC = product.steelGrade.toLowerCase().includes('tungsten carbide') || product.finish.includes('Gold');

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close specification sheet"
        >
          <IconX size={20} />
        </button>

        <div className="modal-content-grid">
          {/* Left Column: Product Imagery & Cert Badges */}
          <div className="modal-visual-column">
            <div className="modal-img-container">
              <img
                src={product.image}
                alt={product.name}
                className="modal-product-img"
              />
              {isTC && (
                <div className="modal-tc-ribbon">
                  <IconAward size={15} />
                  <span>Tungsten Carbide Reinforced</span>
                </div>
              )}
            </div>

            {/* Quality Standard Badges */}
            <div className="modal-cert-pills">
              <div className="cert-pill">
                <IconShieldCheck size={16} className="text-primary" />
                <span>ISO 13485:2016</span>
              </div>
              <div className="cert-pill">
                <span className="font-bold text-xs">CE</span>
                <span>MDR 2017/745</span>
              </div>
              <div className="cert-pill">
                <span className="font-bold text-xs">134°C</span>
                <span>Autoclave Safe</span>
              </div>
            </div>

            {/* Private Label Notice */}
            <div className="modal-oem-callout">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider">OEM &amp; Private Labeling</div>
              <p className="text-xs text-muted mt-1">
                Custom fiber-laser etching with your hospital, clinic or brand logo available on wholesale orders.
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Clinical Specifications */}
          <div className="modal-details-column">
            <div className="modal-header-meta">
              <span className="sku-tag-lg">{product.ref}</span>
              <span className={`badge ${product.category === 'surgical' ? 'badge-surgical' : 'badge-dental'}`}>
                {product.category === 'surgical' ? 'Surgical Instrument' : 'Dental Instrument'}
              </span>
              <span className="badge badge-steel">{product.subcategory}</span>
            </div>

            <h2 className="modal-product-title">{product.name}</h2>
            <p className="modal-specialty-sub">{product.specialty}</p>

            <p className="modal-description">{product.description}</p>

            {/* Technical Specifications Table */}
            <div className="modal-spec-table-wrap">
              <h4 className="spec-table-heading">Technical Specifications</h4>
              <table className="modal-spec-table">
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
                    <th>Overall Length / Sizes</th>
                    <td>{product.length}</td>
                  </tr>
                  <tr>
                    <th>Tip Configuration</th>
                    <td>{product.tipType}</td>
                  </tr>
                  <tr>
                    <th>Rockwell Hardness</th>
                    <td>{product.hardness}</td>
                  </tr>
                  <tr>
                    <th>Sterilization Standard</th>
                    <td>{product.sterilization}</td>
                  </tr>
                  <tr>
                    <th>Regulatory Classification</th>
                    <td>{product.ceClass}</td>
                  </tr>
                  <tr>
                    <th>Standards Compliance</th>
                    <td>{product.isoCompliant}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Key Clinical Features */}
            <div className="modal-features-list">
              <h4 className="spec-table-heading">Engineering Highlights</h4>
              <ul>
                {product.features.map((feat, idx) => (
                  <li key={idx}>
                    <IconCheck size={15} className="text-primary mt-1 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RFQ Order Configurator Box */}
            <div className="modal-order-box glass-panel">
              <div className="quantity-row">
                <div className="quantity-selector-label">
                  <span className="font-semibold text-sm text-white">Inquiry Quantity:</span>
                  <span className="text-xs text-muted">Minimum Wholesale MOQ: 5 units</span>
                </div>

                <div className="quantity-controls">
                  <button
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
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="qty-btn"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Optional Laser Etching Input */}
              <div className="laser-etch-field">
                <label className="text-xs text-muted block mb-1">
                  Optional Custom Laser Etching / Reference Marking:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hospital Dept ID, Custom Clinic Branding..."
                  value={customLaserNote}
                  onChange={(e) => setCustomLaserNote(e.target.value)}
                  className="laser-etch-input"
                />
              </div>

              {/* Add to RFQ Trigger */}
              <div className="modal-action-row">
                <button
                  onClick={handleAdd}
                  className="btn btn-primary w-full"
                >
                  {addedNotice ? (
                    <>
                      <IconCheck size={18} />
                      <span>Added {quantity} unit(s) to RFQ Basket!</span>
                    </>
                  ) : (
                    <>
                      <IconFileText size={18} />
                      <span>Add {quantity} to Request for Quote</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
