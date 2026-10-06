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
} from './Icons';
import { COMPANY_INFO } from '../data/instruments';

export default function ContactSection({ fbUrl = COMPANY_INFO.social.facebook, igUrl = COMPANY_INFO.social.instagram }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: 'Wholesale Catalog & Price List',
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
        inquiryType: 'Wholesale Catalog & Price List',
        message: ''
      });
    }, 500);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <IconMail size={16} />
            <span>Direct Commercial Inquiries</span>
          </div>
          <h2 className="section-title">Connect with Our Export Desk</h2>
          <p className="section-desc">
            Whether you require a comprehensive distributor price list, OEM private labeling consultations,
            or hospital trial sets, our team is ready to assist.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Contacts & Social Links */}
          <div className="contact-info-card glass-panel">
            <h3 className="contact-card-title">Commercial Headquarters</h3>
            <p className="text-muted text-sm mb-6 leading-relaxed">
              SURGILENCE (PVT) LTD operates dedicated export facilities supplying distributors, surgery centers,
              and dental procurement groups worldwide.
            </p>

            {/* Quick Contact Rows */}
            <div className="contact-channels">
              <a href="mailto:inquiry@surgilence.com" className="contact-channel-item">
                <div className="channel-icon">
                  <IconMail size={18} className="text-primary" />
                </div>
                <div>
                  <span className="channel-label">Email Inquiries</span>
                  <span className="channel-val">inquiry@surgilence.com</span>
                </div>
              </a>

              <a href="https://wa.me/923091699666" target="_blank" rel="noopener noreferrer" className="contact-channel-item">
                <div className="channel-icon">
                  <IconPhone size={18} className="text-primary" />
                </div>
                <div>
                  <span className="channel-label">Direct WhatsApp Desk</span>
                  <span className="channel-val">+92 309 1699666 (24/7 Response)</span>
                </div>
              </a>

              <div className="contact-channel-item">
                <div className="channel-icon">
                  <IconMapPin size={18} className="text-primary" />
                </div>
                <div>
                  <span className="channel-label">Manufacturing &amp; Export Zone</span>
                  <span className="channel-val">Sialkot Surgical Industrial District, Pakistan</span>
                </div>
              </div>
            </div>

            {/* Social Media Links Section (Facebook & Instagram) */}
            <div className="social-links-block">
              <h4 className="social-block-title">Follow Us &amp; View Catalog Updates</h4>
              <p className="text-xs text-muted mb-4">
                Connect with us on official social channels for live demonstration videos, new instrument rollouts, and trade show schedules:
              </p>

              <div className="social-buttons-grid">
                {/* Facebook Button */}
                <a
                  href={fbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn social-facebook"
                  aria-label="Visit SURGILENCE on Facebook"
                >
                  <IconFacebook size={18} />
                  <div>
                    <span className="social-platform-name">Facebook</span>
                    <span className="social-platform-handle">@surgilence</span>
                  </div>
                  <IconExternalLink size={14} className="social-link-icon" />
                </a>

                {/* Instagram Button */}
                <a
                  href={igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn social-instagram"
                  aria-label="Visit SURGILENCE on Instagram"
                >
                  <IconInstagram size={18} />
                  <div>
                    <span className="social-platform-name">Instagram</span>
                    <span className="social-platform-handle">@surgilence</span>
                  </div>
                  <IconExternalLink size={14} className="social-link-icon" />
                </a>
              </div>
            </div>

            {/* Compliance Note */}
            <div className="contact-trust-note">
              <IconShieldCheck size={16} className="text-primary flex-shrink-0" />
              <span className="text-xs text-muted">
                Official Registered Private Limited Entity. All exports shipped with commercial proforma invoice, packing list, and CE documentation.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Message Form */}
          <div className="contact-form-card glass-panel">
            {submitted ? (
              <div className="form-success-box text-center py-12">
                <div className="success-icon-badge mx-auto mb-4">
                  <IconCheck size={36} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Dispatched!</h3>
                <p className="text-sm text-muted max-w-md mx-auto mb-6">
                  Thank you for reaching out to SURGILENCE (PVT) LTD. Our medical export manager has received your inquiry
                  and will contact you via email/phone with requested catalogs and specifications within 12 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-main-form">
                <h3 className="contact-form-title">Send a Direct Message</h3>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="form-label">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group flex-1">
                    <label className="form-label">Medical Facility / Business *</label>
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

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="form-label">Business Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@hospital.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group flex-1">
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
                    <option>Wholesale Catalog &amp; Price List</option>
                    <option>Surgical Instruments Custom Order</option>
                    <option>Dental Instruments Clinic Batch</option>
                    <option>OEM &amp; Private Label Partnership</option>
                    <option>Hospital Tender Quotation</option>
                    <option>Sample Unit Evaluation Request</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Detailed Requirements *</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Specify instruments of interest (e.g. Metzenbaum scissors, extraction forceps, needle holders), estimated quantities, and delivery timeframe..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  <span>Send Message to Export Desk</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
