import React, { useState } from 'react';
import { IconX } from './Icons';
import { COMPANY_INFO } from '../data/instruments';

export default function WhatsAppToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/923091699666?text=${encodeURIComponent(
    "Hello SURGILENCE (PVT) LTD, I would like to inquire regarding your surgical and dental instruments."
  )}`;

  return (
    <div className="whatsapp-toggle-wrap">
      {/* Floating Card */}
      {isOpen && (
        <div className="whatsapp-flyout">
          <div className="whatsapp-flyout-head">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
              <span className="font-bold text-xs tracking-wide">Export Desk Online</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white opacity-80 hover:opacity-100 transition-opacity p-1"
              aria-label="Close WhatsApp card"
            >
              <IconX size={15} />
            </button>
          </div>
          <div className="whatsapp-flyout-body">
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Connect directly with our international medical export team for immediate proforma invoices, custom laser branding, or sample kits.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs justify-center"
            >
              <span>Chat on WhatsApp (+92 309 1699666)</span>
            </a>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="whatsapp-trigger-btn"
        aria-label="WhatsApp Support"
        title="Chat with SURGILENCE on WhatsApp"
      >
        <span className="whatsapp-pulse-ring"></span>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.204 8.204 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.216 8.216 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.06-.1-.23-.17-.48-.29z"/>
        </svg>
      </button>
    </div>
  );
}
