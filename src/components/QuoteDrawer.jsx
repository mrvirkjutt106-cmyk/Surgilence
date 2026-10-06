import React, { useState } from 'react';
import {
  IconX,
  IconTrash,
  IconFileText,
  IconCheck,
  IconPhone,
  IconMail,
  IconShieldCheck,
  IconDownload
} from './Icons';
import { COMPANY_INFO } from '../data/instruments';

export default function QuoteDrawer({ isOpen, onClose, quoteItems, onUpdateQuantity, onRemoveItem, onClearQuote }) {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    country: '',
    email: '',
    phone: '',
    targetDelivery: 'Standard Air Express (5-8 days)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [rfqNumber, setRfqNumber] = useState('');

  if (!isOpen) return null;

  const totalUnits = quoteItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quoteItems.length === 0) return;

    // Generate unique RFQ identifier
    const generatedId = `RFQ-SL-${Math.floor(100000 + Math.random() * 900000)}`;
    setRfqNumber(generatedId);
    setSubmitted(true);
  };

  const handlePrintOrDownload = () => {
    window.print();
  };

  // Build WhatsApp inquiry message
  const buildWhatsAppLink = () => {
    const itemsSummary = quoteItems
      .map((item) => `• ${item.ref}: ${item.name} (Qty: ${item.quantity})`)
      .join('%0A');
    const message = `Hello SURGILENCE (PVT) LTD,%0AI would like to request an official wholesale quotation for the following instruments:%0A%0A${itemsSummary}%0A%0AOrganization: ${encodeURIComponent(formData.organization || 'Medical Practice')}%0ACountry: ${encodeURIComponent(formData.country || 'International')}%0APlease provide pricing and lead time.`;
    return `https://wa.me/923091699666?text=${message}`;
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="drawer-panel glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="flex items-center gap-2">
            <div className="drawer-header-icon">
              <IconFileText size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="drawer-title">Request for Quotation (RFQ)</h3>
              <p className="drawer-sub">
                {quoteItems.length} instrument model(s) • {totalUnits} total unit(s)
              </p>
            </div>
          </div>
          <button onClick={onClose} className="drawer-close-btn" aria-label="Close RFQ drawer">
            <IconX size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {submitted ? (
            /* Submission Success State */
            <div className="rfq-success-container">
              <div className="success-icon-badge">
                <IconCheck size={36} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Quote Request Generated!</h3>
              <div className="rfq-id-box">
                <span className="text-xs text-muted block mb-1">OFFICIAL REFERENCE NUMBER</span>
                <span className="rfq-id-code">{rfqNumber}</span>
              </div>

              <p className="text-sm text-muted mb-6 leading-relaxed">
                Thank you, <strong className="text-white">{formData.name || 'Doctor'}</strong>. Your commercial wholesale inquiry for{' '}
                <strong className="text-white">{formData.organization || 'SURGILENCE'}</strong> has been registered.
                Our international export desk will review your bill of materials and deliver an itemized proforma invoice within 12 business hours.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full"
                >
                  <IconPhone size={18} />
                  <span>Send Directly via WhatsApp</span>
                </a>

                <button
                  onClick={handlePrintOrDownload}
                  className="btn btn-secondary w-full"
                >
                  <IconDownload size={18} />
                  <span>Print / Save RFQ Sheet</span>
                </button>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClearQuote();
                    onClose();
                  }}
                  className="btn btn-secondary btn-sm mt-3"
                >
                  Start New Inquiry
                </button>
              </div>
            </div>
          ) : quoteItems.length === 0 ? (
            /* Empty Drawer State */
            <div className="drawer-empty-state">
              <div className="empty-cart-icon">
                <IconFileText size={42} className="text-dim" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Your Quote Basket is Empty</h4>
              <p className="text-sm text-muted mb-6">
                Browse our Dental and Surgical instruments catalog and add items to generate a customized wholesale quote.
              </p>
              <button onClick={onClose} className="btn btn-primary btn-sm">
                Return to Catalog
              </button>
            </div>
          ) : (
            /* Itemized List & Customer Form */
            <div className="drawer-flow">
              {/* Selected Instruments List */}
              <div className="drawer-items-list">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase font-semibold text-muted tracking-wider">
                    Selected Instruments ({quoteItems.length})
                  </span>
                  <button
                    onClick={onClearQuote}
                    className="text-xs text-dim hover:text-red-400 transition-colors flex items-center gap-1"
                  >
                    <IconTrash size={13} />
                    <span>Clear all</span>
                  </button>
                </div>

                {quoteItems.map((item) => (
                  <div key={item.id} className="quote-item-card">
                    <img src={item.image} alt={item.name} className="quote-item-thumb" />

                    <div className="quote-item-info">
                      <div className="flex items-center justify-between">
                        <span className="quote-item-sku">{item.ref}</span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="quote-item-remove"
                          title="Remove item"
                        >
                          <IconTrash size={14} />
                        </button>
                      </div>

                      <div className="quote-item-name">{item.name}</div>
                      <div className="quote-item-steel">{item.steelGrade.split(' ')[1] || item.steelGrade}</div>

                      {item.laserNote && (
                        <div className="quote-item-laser-tag">
                          Laser: "{item.laserNote}"
                        </div>
                      )}

                      <div className="quote-item-qty-row">
                        <span className="text-xs text-muted">Quantity:</span>
                        <div className="qty-mini-controls">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="qty-mini-btn"
                          >
                            -
                          </button>
                          <span className="qty-mini-val">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="qty-mini-btn"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inquiry & Delivery Form */}
              <form onSubmit={handleSubmit} className="rfq-form">
                <h4 className="rfq-form-title">Procurement Information</h4>

                <div className="form-group">
                  <label className="form-label">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. / Prof. / Purchasing Manager"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="form-label">Hospital / Clinic / Company *</label>
                    <input
                      type="text"
                      required
                      placeholder="Medical Organization"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group flex-1">
                    <label className="form-label">Destination Country *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. United Kingdom, USA, UAE"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="form-label">Official Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@hospital.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group flex-1">
                    <label className="form-label">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Special Requirements / Customization</label>
                  <textarea
                    rows="2"
                    placeholder="e.g. Custom laser packaging, CE declaration certificate needed, tender submission deadline..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="form-textarea"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <button type="submit" className="btn btn-primary w-full mt-4">
                  <IconFileText size={18} />
                  <span>Generate Official RFQ Inquiry ({totalUnits} Units)</span>
                </button>

                <p className="rfq-disclaimer">
                  <IconShieldCheck size={14} className="text-primary flex-shrink-0" />
                  <span>
                    Your inquiry is protected by international NDA standards. SURGILENCE (PVT) LTD does not share client contact information.
                  </span>
                </p>
              </form>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
