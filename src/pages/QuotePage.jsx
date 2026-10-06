import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { INSTRUMENTS_DATA, COMPANY_INFO } from '../data/instruments';
import {
  IconFileText,
  IconCheck,
  IconPhone,
  IconTrash,
  IconDownload
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
  const [submitted, setSubmitted] = useState(false);
  const [generatedRfqId, setGeneratedRfqId] = useState('');

  const handleAddSampleItems = () => {
    INSTRUMENTS_DATA.slice(0, 3).forEach((item) => {
      addToQuote(item, 10, 'Standard Clinic Laser Mark');
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quoteItems.length === 0) return;
    const rfqId = `RFQ-SL-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedRfqId(rfqId);
    setSubmitted(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const generateWhatsAppRfq = () => {
    const lines = quoteItems.map(
      (item, idx) => `${idx + 1}. ${item.name} (${item.ref}) x ${item.quantity} units`
    );
    const text = `*OFFICIAL WHOLESALE RFQ - SURGILENCE (PVT) LTD*%0AInstitution: ${institutionName || 'Clinic/Hospital'}%0AContact: ${contactName}%0ACountry: ${country}%0A%0A*Requested Instruments:*%0A${lines.join('%0A')}%0A%0ATender Notes: ${tenderNotes || 'Standard packaging'}`;
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
              Quotation Request Transmitted
            </h2>
            <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{contactName}</strong> ({institutionName}). Our international export desk has received your Bill of Materials and is formulating proforma documentation.
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
                onClick={handlePrint}
                className="btn btn-secondary w-full sm:w-auto"
              >
                <IconDownload size={16} />
                <span>Print Official RFQ Sheet</span>
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
                    onClick={clearQuote}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {quoteItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                    <IconFileText size={24} />
                  </div>
                  <h3 className="font-bold text-slate-700 text-base mb-1">Your RFQ list is currently empty</h3>
                  <p className="text-xs text-slate-500 mb-5 max-w-sm mx-auto">
                    Browse our catalog to select surgical or dental tools, or click below to populate a standard sample bundle.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleAddSampleItems}
                      className="btn btn-secondary btn-sm"
                    >
                      Add Top 3 Hospital Instruments
                    </button>
                    <Link to="/catalog" className="btn btn-primary btn-sm">
                      Browse Catalog
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {quoteItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200"
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
                          Tier Ref: ${item.bulkPriceUSD.toFixed(2)} USD (Wholesale)
                        </span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuoteQty(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 p-1 text-xs text-center border border-slate-300 rounded font-bold bg-white"
                        />
                        <button
                          onClick={() => removeFromQuote(item.id)}
                          className="text-slate-400 hover:text-red-600 p-1"
                          aria-label="Remove item"
                        >
                          <IconTrash size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right 5 Cols: Commercial Buyer Information */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Commercial Buyer Credentials</h2>
              <p className="text-xs text-slate-500 mb-6">
                Please enter your organization details to generate the official proforma RFQ sheet.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="e.g. Frankfurt FRA / New York JFK"
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
                  className="btn btn-primary w-full justify-center mt-2 disabled:opacity-50"
                >
                  <IconFileText size={16} />
                  <span>Generate Formal Quotation Sheet</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
