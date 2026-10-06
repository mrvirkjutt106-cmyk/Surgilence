import React, { useState, useRef, useEffect } from 'react';
import { IconX, IconSparkles, IconCheck, IconPhone } from './Icons';
import { INSTRUMENTS_DATA, COMPANY_INFO } from '../data/instruments';

export default function SurgilenceAIAgent({ onOpenQuote, onNavigateToProduct }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello, Doctor / Purchasing Manager! I am **Surgilence AI**, your dedicated surgical & dental instrument specialist. How can I assist you with instrument specifications, USD pricing, or wholesale quotations today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    "What are your instrument prices in USD?",
    "How does the wholesale RFQ quote process work?",
    "What stainless steel grades do you use?",
    "Can you laser-etch our hospital / clinic logo?",
    "Do you manufacture electrical medical devices?"
  ];

  const handleSend = (userText) => {
    const textToSend = userText || inputValue;
    if (!textToSend.trim()) return;

    const newMsg = { id: Date.now(), sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, newMsg]);
    if (!userText) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(textToSend);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: response }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();

    // Check for electrical query
    if (q.includes('electric') || q.includes('electronic') || q.includes('appliance') || q.includes('battery') || q.includes('cautery')) {
      return "SURGILENCE (PVT) LTD specializes **strictly in premium manual forged surgical and dental hand instruments**. In compliance with our pure metallurgy craft, we do not produce electrical appliances. This ensures our full engineering capacity is dedicated to tactile balance, edge sharpness, and corrosion resistance in steel.";
    }

    // Check for specific instruments & pricing
    for (const item of INSTRUMENTS_DATA) {
      const nameMatch = item.name.toLowerCase().includes(q) || q.includes(item.ref.toLowerCase());
      const subMatch = q.includes(item.subcategory.toLowerCase().split(' ')[0]);
      if (nameMatch) {
        return `**${item.name} (${item.ref})**:\n• **Single Unit Price:** $${item.priceUSD.toFixed(2)} USD\n• **Wholesale Bulk Price (10+ units):** $${item.bulkPriceUSD.toFixed(2)} USD\n• **Alloy:** ${item.steelGrade}\n• **Sterilization:** Autoclavable up to 134°C (273°F)\n• **Stock Status:** Ready for export delivery.`;
      }
    }

    if (q.includes('price') || q.includes('cost') || q.includes('usd') || q.includes('rate')) {
      return "All our instruments are priced transparently in **USD** with wholesale tier discounts:\n• **Scalpel Handles:** from $9.50 USD\n• **Tissue Forceps & Hemostats:** $14.00 – $19.50 USD\n• **Metzenbaum Scissors:** $28.50 USD (Bulk: $22.00 USD)\n• **TC Gold Needle Holders:** $44.00 USD (Bulk: $35.00 USD)\n• **Dental Extraction Forceps:** $36.00 – $38.00 USD\n• **Kerrison Rongeurs:** $165.00 USD\n\nYou can view complete tier pricing on each item page or request a custom proforma invoice!";
    }

    if (q.includes('quote') || q.includes('rfq') || q.includes('inquiry') || q.includes('order')) {
      return "To request an official wholesale quotation:\n1. Click **'+ Quote'** or add items to your basket.\n2. Navigate to our dedicated **Quote / RFQ Page** or open the drawer.\n3. Enter your hospital / clinic details, and we will generate an instant commercial reference sheet.\n4. You can also send the list directly to our export desk on WhatsApp (+92 309 1699666).";
    }

    if (q.includes('steel') || q.includes('material') || q.includes('alloy') || q.includes('aisi')) {
      return "We utilize authentic **German and French surgical stainless steel billets**:\n• **AISI 420 Martensitic Steel:** For scissors, cutting edges, and elevators (HRC 52-56)\n• **AISI 410 Surgical Steel:** For ductile forceps, retractors, and handles\n• **Tungsten Carbide (TC Gold):** Vacuum-brazed jaws (HRC 68-70) for needle drivers\n• **ASTM A967 Chemical Passivation:** 100% boil-tested against rust.";
    }

    if (q.includes('laser') || q.includes('oem') || q.includes('branding') || q.includes('logo') || q.includes('custom')) {
      return "Yes! We provide turnkey **OEM & Private Label Manufacturing**. We apply high-precision 50-micron fiber-laser etching to mark your clinic/hospital name, department codes, or custom distributor logos free of charge on qualifying wholesale orders.";
    }

    if (q.includes('ship') || q.includes('delivery') || q.includes('time') || q.includes('country') || q.includes('export')) {
      return "We export worldwide to over 48 countries! For sample and express orders, we partner with **DHL Medical Express** and FedEx (delivery in 4-7 business days). For commercial wholesale orders, we handle scheduled Air Freight and Sea Cargo with full export documentation.";
    }

    if (q.includes('autoclave') || q.includes('steriliz') || q.includes('clean')) {
      return "All Surgilence (Pvt) Ltd instruments are 100% guaranteed for repeated hospital steam autoclaving at **134°C (273°F)**. We passivate all surfaces according to ASTM A967 and ASTM F86 standards, ensuring zero discoloration or pitting.";
    }

    if (q.includes('whatsapp') || q.includes('contact') || q.includes('phone')) {
      return `You can reach our active export desk directly on WhatsApp at **${COMPANY_INFO.phone}** or email us at **${COMPANY_INFO.salesEmail}**. We respond 24/7 to international tenders.`;
    }

    return "Thank you for inquiring! At **SURGILENCE (PVT) LTD**, we engineer medical-grade manual dental and surgical instruments. Would you like details regarding our **product pricing**, **steel metallurgy (AISI 420 / Tungsten Carbide)**, or our **wholesale RFQ process**?";
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="surgilence-ai-toggle-wrapper">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="surgilence-ai-toggle-btn"
          aria-label="Toggle Surgilence AI Assistant"
          title="Chat with Surgilence AI"
        >
          <div className="ai-pulse-ring"></div>
          <IconSparkles size={20} className="ai-toggle-icon" />
          <span className="ai-toggle-label">Surgilence AI</span>
        </button>
      </div>

      {/* Interactive AI Chat Panel */}
      {isOpen && (
        <div className="surgilence-ai-panel">
          {/* Header */}
          <div className="ai-panel-header">
            <div className="flex items-center gap-2">
              <div className="ai-avatar-badge">
                <IconSparkles size={16} />
              </div>
              <div>
                <h4 className="ai-agent-name">Surgilence AI</h4>
                <div className="ai-status-indicator">
                  <span className="ai-status-dot"></span>
                  <span className="text-xs">Clinical Instrument Advisor</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ai-panel-close-btn"
              aria-label="Close AI Chat"
            >
              <IconX size={18} />
            </button>
          </div>

          {/* Quick Suggestions Pills */}
          <div className="ai-suggestions-bar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="ai-suggestion-chip"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="ai-messages-container">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`ai-message-row ${m.sender === 'user' ? 'user-row' : 'ai-row'}`}
              >
                {m.sender === 'ai' && (
                  <div className="ai-bubble-avatar">
                    <IconSparkles size={12} />
                  </div>
                )}
                <div className={`ai-message-bubble ${m.sender === 'user' ? 'user-bubble' : 'ai-bubble'}`}>
                  {m.text.split('\n').map((line, idx) => (
                    <p key={idx} className="ai-bubble-line">
                      {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-message-row ai-row">
                <div className="ai-bubble-avatar">
                  <IconSparkles size={12} />
                </div>
                <div className="ai-message-bubble ai-bubble typing-bubble">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="ai-input-form"
          >
            <input
              type="text"
              placeholder="Ask about USD prices, alloys, autoclave specs, or quotes..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="ai-input-field"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="ai-send-btn"
              aria-label="Send message to Surgilence AI"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>

          {/* Footer note */}
          <div className="ai-panel-footer">
            <a
              href={`https://wa.me/923091699666?text=Hello%20Surgilence,%20I%20have%20an%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="ai-whatsapp-direct"
            >
              <IconPhone size={13} />
              <span>Need human agent? Chat on WhatsApp (+92 309 1699666)</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
