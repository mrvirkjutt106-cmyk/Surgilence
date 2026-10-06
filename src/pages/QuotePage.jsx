import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { INSTRUMENTS_DATA, COMPANY_INFO } from '../data/instruments';
import Logo from '../components/Logo';
import {
  IconFileText,
  IconCheck,
  IconPhone,
  IconTrash,
  IconDownload,
  IconShieldCheck,
  IconX,
  IconAward,
  IconGlobe
} from '../components/Icons';

export default function QuotePage() {
  const { quoteItems, updateQuoteQty, removeFromQuote, clearQuote, addToQuote } = useCart();

  const [institutionName, setInstitutionName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [targetPort, setTargetPort] = useState('');
  const [tenderNotes, setTenderNotes] = useState('');

  // RFQ Preview & Submission states
  const [showPreview, setShowPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [generatedRfqId, setGeneratedRfqId] = useState('');

  const quoteSubtotal = quoteItems.reduce((acc, item) => {
    const price = item.quantity >= 10 ? item.bulkPriceUSD : item.priceUSD;
    return acc + price * item.quantity;
  }, 0);

  const handleAddSampleItems = () => {
    INSTRUMENTS_DATA.slice(0, 3).forEach((item) => {
      addToQuote(item, 10, 'Standard Clinic Laser Mark');
    });
  };

  const handleOpenPreview = (e) => {
    e.preventDefault();
    if (quoteItems.length === 0) return;
    if (!institutionName || !contactName || !email || !phone || !country) {
      alert('Please fill in all required buyer credential fields before previewing.');
      return;
    }
    const tempId = `RFQ-SL-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedRfqId(tempId);
    setShowPreview(true);
  };

  const handleConfirmSubmit = () => {
    setShowPreview(false);
    setSubmitted(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const generateWhatsAppRfq = () => {
    const lines = quoteItems.map(
      (item, idx) => `${idx + 1}. ${item.name} (${item.ref}) x ${item.quantity} units (Est. $${(item.quantity >= 10 ? item.bulkPriceUSD : item.priceUSD).toFixed(2)} ea)`
    );
    const text = `*OFFICIAL WHOLESALE RFQ - SURGILENCE (PVT) LTD*%0ARef ID: ${generatedRfqId}%0AInstitution: ${institutionName}%0AContact: ${contactName}%0AEmail: ${email}%0APhone: ${phone}%0ACountry: ${country}%0ADelivery Port: ${targetPort || 'Standard Commercial Port'}%0A%0A*Requested Instruments:*%0A${lines.join('%0A')}%0A%0ATotal Est. Value: $${quoteSubtotal.toFixed(2)} USD%0ATender Notes: ${tenderNotes || 'Standard surgical packaging'}`;
    return `https://wa.me/923091699666?text=${text}`;
  };

  return (
    <div className="quote-page bg-slate-50 min-h-screen">
      {/* Light Header Strip */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-12">
        <div className="container">
          <div className="max-w-3xl">
            <span className="section-tag">COMMERCIAL PROCURING</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
              Request for Wholesale Quotation (RFQ)
            </h1>
            <p className="text-slate-500 text-sm sm:text-base">
              Build your custom bill of materials for hospital procurement or international distribution. We provide official proforma invoices in USD with volume discounts.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-10 sm:py-14">
        {submitted ? (
          <div className="bg-white border border-teal-200 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 bg-teal-50 border border-teal-200 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-5">
              <IconCheck size={32} />
            </div>
            <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              {generatedRfqId}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-4 mb-2">
              Quotation Request Confirmed &amp; Queued
            </h2>
            <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{contactName}</strong> ({institutionName}). Our international export desk has received your Bill of Materials and is formulating the official proforma documentation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={generateWhatsAppRfq()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full sm:w-auto"
              >
                <IconPhone size={16} />
                <span>Transmit to WhatsApp Desk</span>
              </a>
              <button
                type="button"
                onClick={handlePrint}
                className="btn btn-secondary w-full sm:w-auto"
              >
                <IconDownload size={16} />
                <span>Print Official RFQ Sheet</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  clearQuote();
                  setSubmitted(false);
                }}
                className="btn btn-secondary w-full sm:w-auto"
              >
                Start New RFQ
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Bill of Materials */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Requested Bill of Materials</h2>
                  <span className="text-xs text-slate-500">
                    {quoteItems.length} instrument model{quoteItems.length === 1 ? '' : 's'} selected
                  </span>
                </div>
                {quoteItems.length > 0 && (
                  <button
                    type="button"
                    onClick={clearQuote}
                    className="cart-item-remove-btn"
                  >
                    <IconTrash size={14} />
                    <span>Clear All Items</span>
                  </button>
                )}
              </div>

              {quoteItems.length === 0 ? (
                <div className="quote-empty-card">
                  <div className="cart-empty-icon">
                    <IconFileText size={32} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-1">Your RFQ Basket is Currently Empty</h3>
                  <p className="text-xs text-slate-500 mb-5 max-w-sm mx-auto">
                    Browse our catalog to select surgical or dental tools, or click below to populate a standard hospital sample bundle.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleAddSampleItems}
                      className="btn btn-secondary btn-sm"
                    >
                      Add Top 3 Hospital Instruments
                    </button>
                    <Link to="/catalog" className="btn btn-primary btn-sm">
                      Browse Instruments Catalog
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {quoteItems.map((item) => {
                    const price = item.quantity >= 10 ? item.bulkPriceUSD : item.priceUSD;
                    const lineTotal = price * item.quantity;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-3.5 bg-slate-50 rounded-lg border border-slate-200"
                      >
                        <div className="w-14 h-14 bg-white border border-slate-200 rounded-md p-1 shrink-0 flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = '/images/item-mayo-hegar-tc.png';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-mono text-teal-700 font-bold block">{item.ref}</span>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                          <span className="text-[11px] text-slate-500 block">
                            Tier Ref: ${price.toFixed(2)} USD {item.quantity >= 10 ? '(Bulk Tier)' : '(Standard)'}
                          </span>
                          {item.laserNote && (
                            <span className="text-[11px] text-teal-800 font-medium block mt-0.5">
                              Marking: "{item.laserNote}"
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right mr-1">
                            <span className="text-xs font-bold text-slate-900 block">
                              ${lineTotal.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              Qty: {item.quantity}
                            </span>
                          </div>
                          <div className="flex items-center border border-slate-300 rounded overflow-hidden bg-white">
                            <button
                              type="button"
                              onClick={() => updateQuoteQty(item.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-1 text-slate-600 hover:bg-slate-100 font-bold text-xs"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuoteQty(item.id, parseInt(e.target.value) || 1)}
                              className="w-10 text-center text-xs font-bold border-none outline-none py-1"
                            />
                            <button
                              type="button"
                              onClick={() => updateQuoteQty(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-slate-600 hover:bg-slate-100 font-bold text-xs"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromQuote(item.id)}
                            className="icon-action-btn"
                            aria-label="Remove item"
                            title="Remove from RFQ"
                          >
                            <IconTrash size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-600">Estimated Materials Value:</span>
                    <span className="font-extrabold text-teal-800 text-base">
                      ${quoteSubtotal.toFixed(2)} USD
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right 5 Cols: Commercial Buyer Information */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Commercial Buyer Credentials</h2>
              <p className="text-xs text-slate-500 mb-6">
                Please enter your organization details to preview and generate the official proforma RFQ sheet.
              </p>

              <form onSubmit={handleOpenPreview} className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Hospital / Clinic / Company Name *</label>
                  <input
                    type="text"
                    required
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="e.g. St. Michael General Hospital"
                    className="form-input text-xs"
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Contact Person *</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Dr. John Smith"
                      className="form-input text-xs"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="procurement@hospital.org"
                      className="form-input text-xs"
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="form-input text-xs"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Destination Country *</label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Country"
                      className="form-input text-xs"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Target Delivery Port / Airport</label>
                  <input
                    type="text"
                    value={targetPort}
                    onChange={(e) => setTargetPort(e.target.value)}
                    placeholder="e.g. Frankfurt FRA / New York JFK / Dubai"
                    className="form-input text-xs"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tender Notes &amp; Packaging Requirements</label>
                  <textarea
                    rows={3}
                    value={tenderNotes}
                    onChange={(e) => setTenderNotes(e.target.value)}
                    placeholder="Custom laser marking, pouch specifications, or regulatory documents..."
                    className="form-textarea text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={quoteItems.length === 0}
                  className="btn btn-primary w-full justify-center mt-3 py-3 font-bold"
                >
                  <IconFileText size={18} />
                  <span>Preview Official RFQ Document</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================================
          OFFICIAL RFQ PREVIEW MODAL (PREVIEW BEFORE SUBMITTING)
          ===================================================================== */}
      {showPreview && (
        <div className="rfq-preview-backdrop">
          <div className="rfq-preview-sheet">
            {/* Modal Top Bar */}
            <div className="rfq-preview-header-bar">
              <div className="rfq-preview-title">
                <IconFileText size={20} className="text-teal-400" />
                <span>Institutional RFQ Document Preview</span>
                <span className="rfq-preview-badge-status">Proforma Draft</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="rfq-preview-close-btn"
                aria-label="Close Preview"
              >
                <IconX size={20} />
              </button>
            </div>

            {/* Document Body (Formal Surgilence Proforma Sheet) */}
            <div className="rfq-preview-content">
              <div className="rfq-doc-paper" id="rfq-printable-document">
                {/* Official Letterhead */}
                <div className="rfq-doc-header-row">
                  <div>
                    <h2 className="rfq-doc-brand-title">SURGILENCE (PVT) LTD</h2>
                    <p className="rfq-doc-brand-sub">
                      PRECISION MEDICAL &amp; DENTAL SURGICAL INSTRUMENTS
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Manufacturer &amp; Exporter • Small Industrial Estate, Sialkot 51310, Pakistan
                    </p>
                    <p className="text-xs text-slate-500">
                      ISO 13485:2016 Certified • CE MDR 2017/745 Class I
                    </p>
                  </div>
                  <div className="rfq-doc-ref-box">
                    <span className="rfq-doc-meta-badge">{generatedRfqId}</span>
                    <div className="rfq-doc-meta-date">Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                    <div className="rfq-doc-meta-date">Validity: 30 Days from issue</div>
                    <div className="rfq-doc-meta-date text-teal-700 font-bold mt-1">Currency: USD ($)</div>
                  </div>
                </div>

                {/* Parties Details Grid */}
                <div className="rfq-doc-parties-grid">
                  <div className="rfq-party-box">
                    <h4>Consignee / Requesting Buyer:</h4>
                    <p className="font-bold">{institutionName}</p>
                    <p>Attn: {contactName}</p>
                    <p>Email: {email}</p>
                    <p>Phone/WhatsApp: {phone}</p>
                  </div>
                  <div className="rfq-party-box">
                    <h4>Destination &amp; Commercial Terms:</h4>
                    <p><strong>Destination Country:</strong> {country}</p>
                    <p><strong>Designated Port / Airport:</strong> {targetPort || 'Standard Commercial Hub'}</p>
                    <p><strong>Trade Incoterm:</strong> FOB Sialkot / CIF on request</p>
                    <p><strong>Payment Terms:</strong> T/T Wire or Irrevocable L/C</p>
                  </div>
                </div>

                {/* Bill of Materials Table */}
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Itemized Bill of Instruments:
                </h4>
                <div className="rfq-table-responsive">
                  <table className="rfq-preview-table">
                    <thead>
                      <tr>
                        <th style={{ width: '8%' }}>Item #</th>
                        <th style={{ width: '16%' }}>Model Ref</th>
                        <th style={{ width: '38%' }}>Instrument Name &amp; Spec</th>
                        <th style={{ width: '12%' }} className="text-center">Qty</th>
                        <th style={{ width: '13%' }} className="text-right">Unit Price</th>
                        <th style={{ width: '13%' }} className="text-right">Ext. Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quoteItems.map((item, index) => {
                        const price = item.quantity >= 10 ? item.bulkPriceUSD : item.priceUSD;
                        const lineTotal = price * item.quantity;
                        return (
                          <tr key={item.id}>
                            <td className="font-mono text-slate-400">{index + 1}</td>
                            <td className="font-mono font-bold text-teal-700">{item.ref}</td>
                            <td>
                              <div className="font-bold text-slate-900">{item.name}</div>
                              <div className="text-[11px] text-slate-500">
                                {item.steelGrade} • {item.finish}
                              </div>
                              {item.laserNote && (
                                <div className="text-[11px] text-teal-800 font-semibold mt-0.5">
                                  Laser Etching: "{item.laserNote}"
                                </div>
                              )}
                            </td>
                            <td className="text-center font-bold text-slate-800">{item.quantity} pcs</td>
                            <td className="text-right font-mono">${price.toFixed(2)}</td>
                            <td className="text-right font-mono font-bold text-slate-900">${lineTotal.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td colSpan={4} className="border-none"></td>
                        <td className="text-right font-bold text-slate-800 pt-3">
                          Total (USD):
                        </td>
                        <td className="text-right font-mono font-extrabold text-teal-900 text-base pt-3">
                          ${quoteSubtotal.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Tender & Quality Notes */}
                {tenderNotes && (
                  <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded text-xs">
                    <span className="font-bold text-slate-800 block mb-0.5">Buyer Packaging / Tender Notes:</span>
                    <p className="text-slate-600">{tenderNotes}</p>
                  </div>
                )}

                {/* Manufacturing Warranty Statement */}
                <div className="rfq-doc-terms-box">
                  <p className="font-bold text-slate-800 mb-1">Manufacturer Quality Warranty &amp; Compliance Statement:</p>
                  <p>
                    All surgical and dental instruments quoted herein are manufactured from certified medical grade stainless steel (ASTM F899) with 100% passivation per ASTM A967 and pass boil/copper sulfate testing per ISO 7153-1. Each unit carries a 5-year replacement warranty against manufacturing defects and pitting corrosion.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="rfq-preview-actions-bar">
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="btn btn-secondary justify-center"
              >
                ← Back to Edit Details
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn btn-secondary justify-center"
                >
                  <IconDownload size={16} />
                  <span>Print / Save PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handleConfirmSubmit}
                  className="btn btn-primary justify-center font-bold px-6"
                >
                  <IconCheck size={16} />
                  <span>Confirm &amp; Submit RFQ to Export Desk</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
