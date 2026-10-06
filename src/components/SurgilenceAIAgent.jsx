import React, { useState, useRef, useEffect } from 'react';
import { IconX, IconSparkles } from './Icons';
import { INSTRUMENTS_DATA, COMPANY_INFO } from '../data/instruments';

export default function SurgilenceAIAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am **Surgilence AI**, your dedicated surgical & dental instruments advisor. How can I assist you with item specifications, USD prices, or wholesale quotations?"
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
    "Instrument prices in USD",
    "Wholesale RFQ quote process",
    "German stainless steel grades",
    "Autoclave sterilization cycles",
    "Worldwide shipping & DHL"
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
    }, 500);
  };

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();

    // Specific instrument query
    for (const item of INSTRUMENTS_DATA) {
      if (item.name.toLowerCase().includes(q) || q.includes(item.ref.toLowerCase())) {
        return `**${item.name} (${item.ref})**:\n• **Price:** $${item.priceUSD.toFixed(2)} USD\n• **Wholesale (10+ pcs):** $${item.bulkPriceUSD.toFixed(2)} USD\n• **Alloy:** ${item.steelGrade}\n• **Sterilization:** Autoclavable up to 134°C (273°F)\n• **Stock Status:** Ready for export.`;
      }
    }

    if (q.includes('price') || q.includes('usd') || q.includes('cost') || q.includes('rate')) {
      return "All our instruments are priced transparently in **USD** with tiered wholesale discounts:\n• **Scalpel Handles:** from $9.50 USD\n• **Tissue Forceps & Hemostats:** $14.00 – $19.50 USD\n• **Metzenbaum Scissors:** $28.50 USD (Bulk: $22.00 USD)\n• **TC Gold Needle Holders:** $44.00 USD (Bulk: $35.00 USD)\n• **Dental Extraction Forceps:** $36.00 – $38.00 USD\n• **Kerrison Rongeurs:** $165.00 USD\n\nVisit our Catalog page to view all prices or add items to your RFQ list!";
    }

    if (q.includes('quote') || q.includes('rfq') || q.includes('wholesale')) {
      return "To request an official wholesale quotation:\n1. Click **'RFQ Quote'** in the navigation bar.\n2. Add your desired quantities.\n3. Enter your hospital/clinic name to generate an immediate official RFQ sheet.\n4. You can also export the RFQ directly to WhatsApp at +92 309 1699666.";
    }

    if (q.includes('steel') || q.includes('material') || q.includes('alloy') || q.includes('grade')) {
      return "We manufacture exclusively with authentic **German and French surgical stainless steel billets**:\n• **AISI 420 Martensitic Steel:** High hardness (HRC 52-54) for scissors, bone punches, and elevators.\n• **AISI 410 Surgical Steel:** High ductility for forceps and retractors.\n• **Tungsten Carbide (TC Gold):** Vacuum-brazed jaws (HRA 88-90) for non-slip needle driving.\n• **Passivation:** ASTM A967 chemical treatment against rust.";
    }

    if (q.includes('autoclave') || q.includes('steriliz') || q.includes('clean')) {
      return "All Surgilence (Pvt) Ltd instruments are 100% certified for repeated hospital autoclaving at **134°C (273°F)**. We passivate all surfaces according to international medical standards to prevent corrosion and oxidation.";
    }

    if (q.includes('ship') || q.includes('dhl') || q.includes('delivery') || q.includes('time')) {
      return "We deliver worldwide to over 48 countries! Samples and priority orders ship via **DHL Express Worldwide** (4-7 business days). Commercial container shipments are routed via scheduled Air Freight and Sea Cargo.";
    }

    if (q.includes('whatsapp') || q.includes('contact') || q.includes('phone')) {
      return `You can reach our active export desk directly on WhatsApp at **${COMPANY_INFO.phone}** or email us at **${COMPANY_INFO.salesEmail}**.`;
    }

    return "Thank you for asking! At **SURGILENCE (PVT) LTD**, we engineer precision medical-grade surgical and dental hand instruments. Feel free to ask about our **product pricing**, **steel metallurgy**, or **wholesale quotes**!";
  };

  return (
    <div className="ai-agent-wrap">
      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-head">
            <div className="flex items-center gap-2">
              <IconSparkles size={16} />
              <div>
                <div className="font-bold text-xs">Surgilence AI</div>
                <div className="text-[10px] text-teal-100">Medical Instrument Specialist</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white opacity-80 hover:opacity-100 transition-opacity p-1"
              aria-label="Close AI chat"
            >
              <IconX size={15} />
            </button>
          </div>

          <div className="ai-chat-msgs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`ai-bubble ${m.sender === 'ai' ? 'ai-bubble-bot' : 'ai-bubble-user'}`}
              >
                <div className="whitespace-pre-line text-xs leading-relaxed">
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="ai-bubble ai-bubble-bot text-xs text-slate-400">
                Surgilence AI is formulating reply...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-quick-pills">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="ai-pill-btn"
              >
                {p}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="ai-chat-input-bar"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about prices, specs, alloys..."
              className="ai-chat-input"
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm rounded-full px-3 py-1 text-xs"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ai-trigger-btn"
        aria-label="Open Surgilence AI"
        title="Open Surgilence AI Medical Assistant"
      >
        <IconSparkles size={18} />
        <span>Surgilence AI</span>
      </button>
    </div>
  );
}
