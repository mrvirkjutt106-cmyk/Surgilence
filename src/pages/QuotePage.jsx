import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IconFileText,
  IconCheck,
  IconTrash,
  IconPhone,
  IconDownload,
  IconShieldCheck,
  IconPlus
} from '../components/Icons';
import { useCart } from '../context/CartContext';
import { COMPANY_INFO } from '../data/instruments';

export default function QuotePage() {
  const { quoteItems, updateQuoteQuantity, removeFromQuote, clearQuote } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    designation: 'Purchasing Manager / Surgeon',
    country: '',
    destinationPort: '',
    email: '',
    phone: '',
    urgency: 'Standard Air Express (5-8 days)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [rfqNumber, setRfqNumber] = useState('');

  const totalUnits = quoteItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quoteItems.length === 0) return;

    const generatedId = `RFQ-SL-${Math.floor(100000 + Math.random() * 900000)}`;
    setRfqNumber(generatedId);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const buildWhatsAppLink = () => {
    const itemsSummary = quoteItems
      .map((item) => `• [${item.ref}] ${item.name} x ${item.quantity} pcs`)
      .join('%0A');

    const msg = `Hello SURGILENCE (PVT) LTD,%0AI am requesting an official wholesale proforma quotation:%0A%0A${itemsSummary}%0A%0AOrganization: ${encodeURIComponent(formData.organization || 'Medical Group')}%0AContact: ${encodeURIComponent(formData.name || 'Purchasing Desk')}%0ACountry: ${encodeURIComponent(formData.country || 'International')}%0APort/Airport: ${encodeURIComponent(formData.destinationPort || 'Direct Delivery')}%0APlease provide CIF/FOB pricing and lead times.`;
    return `https://wa.me/923091699666?text=${msg}`;
  };

  return (
    <div className="quote-page">
      {/* Header Banner */}
      <section className="page-header-strip bg-slate-900 text-white">
        <div className="container">
          <div className="page-header-content">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-wider">
              B2B COMMERCIAL SERVICES
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-1 text-white">
              Request for Wholesale Quotation (RFQ)
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-2">
              Generate an official proforma quotation for hospital tenders, clinical batch orders, or international distributorships. Direct manufacturer rates in USD.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-10 sm:py-14">
        {submitted ? (
          /* Submission Confirmation Card */
          <div className="quote-success-panel max-w-3xl mx-auto">
            <div className="success-badge-icon">
              <IconCheck size={40} className="text-teal-600" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
              Official Quotation Request Registered
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              Thank you, <strong>{formData.name || 'Doctor'}</strong>. Your commercial wholesale RFQ has been logged into our export scheduling system.
            </p>

            <div className="rfq-meta-card">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
                <span className="text-xs uppercase font-bold text-slate-500">Official Reference ID</span>
                <span className="text-lg font-mono font-black text-teal-700">{rfqNumber}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                <div>
                  <strong>Organization:</strong> {formData.organization}
                </div>
                <div>
                  <strong>Destination:</strong> {formData.country} ({formData.destinationPort || 'Air Express'})
                </div>
                <div>
                  <strong>Total Models:</strong> {quoteItems.length} Instruments
                </div>
                <div>
                  <strong>Total Quantity:</strong> {totalUnits} Units
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <IconPhone size={18} />
                <span>Send to Export Desk on WhatsApp</span>
              </a>

              <button onClick={handlePrint} className="btn btn-secondary">
                <IconDownload size={18} />
                <span>Print / Save Quotation Sheet</span>
              </button>

              <button
                onClick={() => {
                  setSubmitted(false);
                  clearQuote();
                }}
                className="btn btn-secondary"
              >
                Start New Request
              </button>
            </div>
          </div>
        ) : quoteItems.length === 0 ? (
          /* Empty Quote State */
          <div className="quote-empty-box max-w-xl mx-auto text-center py-16">
            <div className="empty-cart-icon mx-auto mb-4">
              <IconFileText size={48} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Your Quotation Basket is Empty</h3>
            <p className="text-sm text-slate-600 mb-6">
              Select Dental and Surgical instruments from our catalog and click "+ Quote" to compile your official B2B wholesale quotation list.
            </p>
            <Link to="/products" className="btn btn-primary">
              Browse Instruments Catalog
            </Link>
          </div>
        ) : (
          /* Active Quote Form & Itemized Review */
          <div className="quote-main-grid">
            {/* Left: Itemized Bill of Materials */}
            <div className="quote-items-col">
              <div className="quote-items-header flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Selected Instruments ({quoteItems.length} models, {totalUnits} total units)
                </h3>
                <button
                  onClick={clearQuote}
                  className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-semibold"
                >
                  <IconTrash size={14} />
                  <span>Clear List</span>
                </button>
              </div>

              <div className="quote-items-stack space-y-3">
                {quoteItems.map((item) => (
                  <div key={item.id} className="quote-instrument-row">
                    <img src={item.image} alt={item.name} className="quote-row-thumb" />

                    <div className="quote-row-info flex-1">
                      <div className="flex items-center justify-between">
                        <span className="sku-tag">{item.ref}</span>
                        <button
                          onClick={() => removeFromQuote(item.id)}
                          className="text-slate-400 hover:text-red-600"
                          title="Remove item"
                        >
                          <IconTrash size={15} />
                        </button>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 mt-1">
                        <Link to={`/product/${item.id}`} className="hover:text-teal-600">
                          {item.name}
                        </Link>
                      </h4>
                      <p className="text-xs text-slate-500">{item.steelGrade}</p>

                      {item.laserNote && (
                        <div className="text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded mt-1 inline-block">
                          Laser: "{item.laserNote}"
                        </div>
                      )}

                      <div className="quote-row-bottom flex items-center justify-between mt-2">
                        <div className="text-xs text-slate-600">
                          Unit Rate: <strong>${item.bulkPriceUSD.toFixed(2)} USD</strong> (Wholesale)
                        </div>

                        <div className="qty-mini-controls">
                          <button
                            onClick={() => updateQuoteQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="qty-mini-btn"
                          >
                            -
                          </button>
                          <span className="qty-mini-val">{item.quantity}</span>
                          <button
                            onClick={() => updateQuoteQuantity(item.id, item.quantity + 1)}
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

              <div className="mt-4">
                <Link to="/products" className="btn btn-secondary btn-sm flex items-center gap-2">
                  <IconPlus size={15} />
                  <span>Add More Instruments from Catalog</span>
                </Link>
              </div>
            </div>

            {/* Right: Commercial Procurement Form */}
            <div className="quote-form-col">
              <div className="quote-form-card">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Commercial Information</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Provide your facility and shipping destination to receive an itemized CIF or FOB proforma quotation.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Contact Person Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. / Director / Procurement Lead"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Hospital / Clinic / Company *</label>
                      <input
                        type="text"
                        required
                        placeholder="Organization Name"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Professional Role</label>
                      <input
                        type="text"
                        placeholder="e.g. Chief Surgeon, Distributor"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Destination Country *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. United Kingdom, USA, Germany"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Port of Delivery / City</label>
                      <input
                        type="text"
                        placeholder="e.g. London Heathrow, New York JFK"
                        value={formData.destinationPort}
                        onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Official Business Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="purchasing@hospital.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">WhatsApp or Phone *</label>
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
                    <label className="form-label">Preferred Logistics Speed</label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      className="form-select"
                    >
                      <option>Standard Air Express (DHL/FedEx, 5-8 business days)</option>
                      <option>Consolidated Air Cargo (8-12 business days)</option>
                      <option>Ocean Sea Cargo (For pallets &gt; 500 kg)</option>
                      <option>Urgent Hospital Evaluation Samples (3-5 days)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Special Packaging / Custom Laser Marking Instructions</label>
                    <textarea
                      rows="3"
                      placeholder="Specify custom laser engraving, sterile pouch requirements, or CE certificate requests..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-full py-3">
                    <IconFileText size={18} />
                    <span>Generate Official Wholesale RFQ Sheet ({totalUnits} Units)</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                    <IconShieldCheck size={15} className="text-teal-600 flex-shrink-0" />
                    <span>Your quotation data is handled in strict confidentiality per ISO 13485 protocols.</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
