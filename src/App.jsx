import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import QualitySection from './components/QualitySection';
import ManufacturingSection from './components/ManufacturingSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import QuoteDrawer from './components/QuoteDrawer';
import { IconCheck } from './components/Icons';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quoteItems, setQuoteItems] = useState([
    // Seed initial items for an instant realistic preview for the user
    {
      id: "sur-01",
      ref: "SL-SUR-1021",
      name: "Metzenbaum Dissecting Scissors",
      category: "surgical",
      steelGrade: "German AISI 420 Stainless Steel",
      image: "/images/surgical-forceps.jpg",
      quantity: 5,
      laserNote: "Hospital Sterile Lot"
    },
    {
      id: "den-01",
      ref: "SL-DEN-1102",
      name: "Dental Extraction Forceps #18R (Upper Molars)",
      category: "dental",
      steelGrade: "AISI 420 German Surgical Steel",
      image: "/images/dental-collection.jpg",
      quantity: 10,
      laserNote: "Clinic Clinic-A"
    }
  ]);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const searchInputRef = useRef(null);

  // Focus search input
  const handleSearchFocus = () => {
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 400);
    }
  };

  // Add instrument to quote inquiry basket
  const handleAddToQuote = (product, quantity = 1, laserNote = '') => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity, laserNote: laserNote || item.laserNote }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            ref: product.ref,
            name: product.name,
            category: product.category,
            steelGrade: product.steelGrade,
            image: product.image,
            quantity: quantity,
            laserNote: laserNote
          }
        ];
      }
    });

    // Show temporary toast notification
    setToastMessage(`Added ${quantity}x "${product.name}" to Quote Basket`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Update item quantity in RFQ basket
  const handleUpdateQuantity = (id, newQty) => {
    setQuoteItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove single item from RFQ basket
  const handleRemoveItem = (id) => {
    setQuoteItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear entire quote basket
  const handleClearQuote = () => {
    setQuoteItems([]);
  };

  return (
    <div className="app-root">
      {/* Navbar with Brand, Navigation & Quote Drawer Trigger */}
      <Navbar
        onOpenQuote={() => setIsQuoteOpen(true)}
        quoteCount={quoteItems.reduce((acc, c) => acc + c.quantity, 0)}
        onSearchFocus={handleSearchFocus}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onOpenQuote={() => setIsQuoteOpen(true)}
          onExploreCatalog={() => {
            const el = document.getElementById('catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Surgical & Dental Instruments Catalog */}
        <Catalog
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToQuote={handleAddToQuote}
          quoteItems={quoteItems}
          searchInputRef={searchInputRef}
        />

        {/* Metallurgical Standards & ISO 13485 */}
        <QualitySection />

        {/* International Manufacturing, OEM & Logistics */}
        <ManufacturingSection onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* Corporate Profile & Philosophy */}
        <AboutSection />

        {/* Contact & Inquiries with Social Links */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* Product Technical Specification Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToQuote={handleAddToQuote}
          isInQuote={quoteItems.some((item) => item.id === selectedProduct.id)}
        />
      )}

      {/* B2B Request for Quote Drawer */}
      <QuoteDrawer
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        quoteItems={quoteItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearQuote={handleClearQuote}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <div className="toast-icon">
            <IconCheck size={16} />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsQuoteOpen(true)}
            className="toast-action-btn"
          >
            View RFQ →
          </button>
        </div>
      )}
    </div>
  );
}
