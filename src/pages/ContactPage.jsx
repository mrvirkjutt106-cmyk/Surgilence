import React, { useState } from 'react';
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconFacebook,
  IconInstagram,
  IconCheck,
  IconShieldCheck,
  IconExternalLink
} from '../components/Icons';
import { COMPANY_INFO } from '../data/instruments';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: 'Wholesale Catalog & Price List (USD)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        inquiryType: 'Wholesale Catalog & Price List (USD)',
        message: ''
      });
    }, 500);
  };

  return (
    <div className="contact-page">
      {/* Banner */}
      <section className="page-header-strip bg-slate-900 text-white">
        <div className="container">
          <div className="page-header-content">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-wider">
              INTERNATIONAL EXPORT RELATIONS
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-1 text-white">
              Contact Commercial Sales &amp; Export
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-2">
              Connect directly with our manufacturing headquarters in Sialkot, Pakistan. We support distributor inquiries, hospital tenders, and OEM private labeling globally.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Channels, WhatsApp & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Export Headquarters</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                SURGILENCE (PVT) LTD operates dedicated export facilities supplying distributors, surgery centers, and dental procurement groups worldwide.
              </p>

              <div className="space-y-4">
                <a
                  href={`https://wa.me/923091699666?text=${encodeURIComponent("Hello SURGILENCE (PVT) LTD, I have a commercial instrument inquiry.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-teal-200 bg-teal-50 hover:bg-teal-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0">
                    <IconPhone size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] text-teal-800 font-bold uppercase tracking-wider block">
                      Direct WhatsApp Desk
                    </span>
                    <span className="text-sm font-black text-teal-900">+92 309 1699666 (24/7)</span>
                  </div>
                </a>

                <a
                  href="mailto:inquiry@surgilence.com"
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-teal-500 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-teal-700 flex items-center justify-center flex-shrink-0">
                    <IconMail size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">
                      Commercial Email
                    </span>
                    <span className="text-sm font-semibold text-slate-900">inquiry@surgilence.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-teal-700 flex items-center justify-center flex-shrink-0">
                    <IconMapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">
                      Manufacturing Location
                    </span>
                    <span className="text-xs font-semibold text-slate-800">
                      Sialkot Surgical Industrial District, Pakistan
                    </span>
                  </div>
                </div>
              </div>

              {/* Official Social Links (Requirements 10 & 11) */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                  Official Social Channels
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Instagram Button */}
                  <a
                    href="https://www.instagram.com/surgilence_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg border border-pink-200 bg-pink-50 hover:bg-pink-100 transition-colors text-pink-900"
                  >
                    <div className="flex items-center gap-2">
                      <IconInstagram size={20} className="text-pink-600" />
                      <div>
                        <span className="text-xs font-bold block">Instagram</span>
                        <span className="text-[11px] text-pink-700">@surgilence_</span>
                      </div>
                    </div>
                    <IconExternalLink size={14} className="opacity-60" />
                  </a>

                  {/* Facebook Button */}
                  <a
                    href="https://www.facebook.com/Surgilence01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors text-blue-900"
                  >
                    <div className="flex items-center gap-2">
                      <IconFacebook size={20} className="text-blue-600" />
                      <div>
                        <span className="text-xs font-bold block">Facebook</span>
                        <span className="text-[11px] text-blue-700">@Surgilence01</span>
                      </div>
                    </div>
                    <IconExternalLink size={14} className="opacity-60" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Send a Commercial Message</h3>
              <p className="text-xs text-slate-500 mb-6">
                Receive our comprehensive wholesale export catalog and USD pricing sheet within 12 hours.
              </p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <IconCheck size={28} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Message Dispatched!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you. Our medical export desk has received your inquiry and will contact you via email/phone shortly.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-secondary btn-sm">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. / Mr. / Ms."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Healthcare Facility / Business *</label>
                      <input
                        type="text"
                        required
                        placeholder="Hospital / Dental Practice"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Business Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="procurement@hospital.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone or WhatsApp *</label>
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
                    <label className="form-label">Inquiry Purpose</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="form-select"
                    >
                      <option>Wholesale Catalog &amp; Price List (USD)</option>
                      <option>Surgical Instruments Custom Batch Order</option>
                      <option>Dental Clinical Extraction &amp; Scaling Set</option>
                      <option>OEM &amp; Private Label Branding Partnership</option>
                      <option>Hospital Tender Quotation</option>
                      <option>Sample Unit Evaluation Request</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Detailed Requirements *</label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Specify instrument models (e.g. Metzenbaum scissors, extraction forceps, needle holders), target quantities, and delivery timeframe..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-full py-3">
                    <span>Send Message to Export Desk</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                    <IconShieldCheck size={15} className="text-teal-600 flex-shrink-0" />
                    <span>All inquiries handled per ISO 13485 privacy and NDA protocols.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
