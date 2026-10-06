import React, { useState } from 'react';
import {
  IconPhone,
  IconCheck
} from '../components/Icons';
import { COMPANY_INFO } from '../data/instruments';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    subject: 'Wholesale Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page bg-white">
      {/* Light Header Strip */}
      <section className="bg-slate-50 border-b border-slate-200 py-12 sm:py-16">
        <div className="container">
          <div className="max-w-3xl">
            <span className="section-tag">COMMERCIAL INQUIRIES</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              Contact SURGILENCE (PVT) LTD
            </h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Connect directly with our international export department for hospital tender specifications, custom proforma invoices, or distributor agreements.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Communication Channels & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Export Headquarters</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Manufacturing and export operations located in Sialkot, Pakistan with rapid DHL dispatch worldwide.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-3">
              {/* WhatsApp */}
              <a
                href={COMPANY_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <IconPhone size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">DIRECT WHATSAPP DESK</div>
                  <div className="text-sm font-bold text-emerald-950">+92 309 1699666</div>
                  <div className="text-[11px] text-emerald-700">Immediate response to tender inquiries</div>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={COMPANY_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">OFFICIAL INSTAGRAM</div>
                  <div className="text-sm font-bold text-slate-900">@surgilence_</div>
                  <div className="text-[11px] text-slate-500">New instrument releases &amp; workshop clips</div>
                </div>
              </a>

              {/* Facebook */}
              <a
                href={COMPANY_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">OFFICIAL FACEBOOK</div>
                  <div className="text-sm font-bold text-slate-900">Surgilence01</div>
                  <div className="text-[11px] text-slate-500">Corporate announcements &amp; trade updates</div>
                </div>
              </a>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1">
              <div><strong>Sales Email:</strong> {COMPANY_INFO.salesEmail}</div>
              <div><strong>Support Email:</strong> {COMPANY_INFO.supportEmail}</div>
              <div><strong>Business Hours:</strong> Monday – Saturday (8:00 AM – 8:00 PM PKT / UTC+5)</div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Direct Message Form</h2>
            <p className="text-xs text-slate-500 mb-6">
              Send your inquiry directly to our sales administration. We respond within 2-4 hours.
            </p>

            {submitted ? (
              <div className="text-center py-10 bg-teal-50 border border-teal-200 rounded-xl p-6">
                <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <IconCheck size={24} />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Message Transmitted</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto mb-4">
                  Thank you for contacting SURGILENCE (PVT) LTD. Our export desk has received your message and will reply shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. / Buyer Name"
                      className="form-input text-xs"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@hospital.com"
                      className="form-input text-xs"
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Clinic / Hospital / Company *</label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Organization Name"
                      className="form-input text-xs"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="form-input text-xs"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Inquiry Nature</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-select text-xs"
                  >
                    <option value="Wholesale Inquiry">Wholesale Export Pricing &amp; RFQ</option>
                    <option value="Sample Request">Sample Testing Kit Request</option>
                    <option value="Custom OEM">Custom Laser Marking &amp; Private Label OEM</option>
                    <option value="Distributor">Exclusive Regional Distributorship</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Instrument Requirements *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify target instruments, quantities, destination port, or questions..."
                    className="form-textarea text-xs"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full justify-center">
                  <span>Send Direct Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
