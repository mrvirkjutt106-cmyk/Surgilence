import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import QuotePage from './pages/QuotePage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import QualityPage from './pages/QualityPage';
import ContactPage from './pages/ContactPage';
import WhatsAppToggle from './components/WhatsAppToggle';
import SurgilenceAIAgent from './components/SurgilenceAIAgent';
import { IconCheck } from './components/Icons';

function AppContent() {
  const { toastMessage } = useCart();

  return (
    <div className="app-root-light">
      <ScrollToTop />
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/quality" element={<QualityPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Floating Interactive Widgets (WhatsApp & AI Agent) */}
      <WhatsAppToggle />
      <SurgilenceAIAgent />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="light-toast-notification">
          <div className="toast-icon">
            <IconCheck size={16} />
          </div>
          <span className="toast-text">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}
