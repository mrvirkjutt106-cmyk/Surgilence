import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IconCheck,
  IconShieldCheck,
  IconTrash,
  IconDownload,
  IconPhone,
  IconFileText
} from '../components/Icons';
import { useCart } from '../context/CartContext';
import { COMPANY_INFO } from '../data/instruments';

export default function CheckoutPage() {
  const { cartItems, updateCartQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'wire', 'lc', 'paypal'
  const [shippingMethod, setShippingMethod] = useState('dhl'); // 'dhl' ($45 or 0), 'cargo' ($120)

  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    organization: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    vatTaxId: ''
  });

  const [cardDetails, setCardDetails] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Shipping cost logic: Free DHL if cartTotal > 500, else $45
  const shippingCost = shippingMethod === 'cargo' ? 120 : (cartTotal >= 500 ? 0 : 45);
  const grandTotal = cartTotal + shippingCost;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const generatedOrderId = `ORD-SL-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedOrderId);
    setOrderComplete(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const buildWhatsAppOrderLink = () => {
    const itemsText = cartItems
      .map((i) => `• [${i.ref}] ${i.name} x ${i.quantity} ($${(i.selectedPrice * i.quantity).toFixed(2)})`)
      .join('%0A');
    const msg = `Hello SURGILENCE (PVT) LTD,%0AI have placed Order #${orderId}:%0A%0A${itemsText}%0A%0AGrand Total: $${grandTotal.toFixed(2)} USD%0APayment Method: ${paymentMethod.toUpperCase()}%0AOrganization: ${encodeURIComponent(billingInfo.organization || 'Clinical Practice')}%0APlease confirm proforma invoice.`;
    return `https://wa.me/923091699666?text=${msg}`;
  };

  return (
    <div className="checkout-page">
      {/* Banner */}
      <section className="page-header-strip bg-slate-900 text-white">
        <div className="container">
          <div className="page-header-content">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-wider">
              SECURE GLOBAL PROCUREMENT
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-1 text-white">
              Commercial Order Checkout
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-2">
              Review your instruments order, configure hospital delivery destination, and select your preferred international payment gateway.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-10 sm:py-14">
        {orderComplete ? (
          /* Order Confirmation Screen */
          <div className="order-success-screen max-w-3xl mx-auto">
            <div className="success-icon-badge mx-auto mb-4">
              <IconCheck size={44} className="text-teal-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-2">
              Order Confirmed &amp; Proforma Generated
            </h2>
            <p className="text-sm text-slate-600 text-center mb-6">
              Thank you, <strong>{billingInfo.firstName} {billingInfo.lastName}</strong>. Your commercial order has been recorded with SURGILENCE (PVT) LTD.
            </p>

            <div className="order-summary-box bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                <div>
                  <span className="text-xs text-slate-500 block uppercase font-bold">Order Reference</span>
                  <span className="text-lg font-mono font-black text-teal-700">{orderId}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block uppercase font-bold">Total Amount</span>
                  <span className="text-xl font-black text-slate-900">${grandTotal.toFixed(2)} USD</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 mb-4">
                <div>
                  <strong>Customer / Entity:</strong> {billingInfo.organization || `${billingInfo.firstName} ${billingInfo.lastName}`}
                </div>
                <div>
                  <strong>Delivery To:</strong> {billingInfo.city}, {billingInfo.country}
                </div>
                <div>
                  <strong>Selected Gateway:</strong> {paymentMethod === 'card' ? 'Credit Card (Stripe)' : paymentMethod === 'wire' ? 'Bank Wire (T/T Swift)' : paymentMethod === 'lc' ? 'Letter of Credit (L/C)' : 'PayPal'}
                </div>
                <div>
                  <strong>Dispatch Carrier:</strong> {shippingMethod === 'dhl' ? 'DHL Medical Air Express' : 'Consolidated Air Freight'}
                </div>
              </div>

              {/* Payment specific instructions if wire */}
              {paymentMethod === 'wire' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900 mb-2">
                  <strong>Bank Wire Transfer Instructions:</strong> Please wire ${grandTotal.toFixed(2)} USD to account:
                  <br />Beneficiary: <strong>SURGILENCE (PVT) LTD</strong> | Bank: Standard Chartered / Habib Bank Sialkot | Swift: SCBLPKKXXX | Reference: {orderId}.
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={buildWhatsAppOrderLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <IconPhone size={18} />
                <span>Confirm on WhatsApp Desk</span>
              </a>

              <button onClick={() => window.print()} className="btn btn-secondary">
                <IconDownload size={18} />
                <span>Print Official Proforma Invoice</span>
              </button>

              <button
                onClick={() => {
                  setOrderComplete(false);
                  clearCart();
                  navigate('/products');
                }}
                className="btn btn-secondary"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="max-w-md mx-auto text-center py-16">
            <div className="empty-cart-icon mx-auto mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Your Order Cart is Empty</h3>
            <p className="text-sm text-slate-500 mb-6">
              You haven't added any surgical or dental instruments to your checkout cart yet.
            </p>
            <Link to="/products" className="btn btn-primary">
              Browse Instruments Catalog
            </Link>
          </div>
        ) : (
          /* Checkout Split Layout */
          <form onSubmit={handlePlaceOrder} className="checkout-main-grid">
            {/* Left Column: Billing Details & Payment Gateways */}
            <div className="checkout-form-col space-y-8">
              {/* 1. Facility & Shipping Address */}
              <div className="checkout-card">
                <h3 className="checkout-card-heading">
                  1. Clinical Facility &amp; Shipping Address
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">First Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John"
                        value={billingInfo.firstName}
                        onChange={(e) => setBillingInfo({ ...billingInfo, firstName: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Doe"
                        value={billingInfo.lastName}
                        onChange={(e) => setBillingInfo({ ...billingInfo, lastName: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Hospital / Clinic / Company *</label>
                      <input
                        type="text"
                        required
                        placeholder="City Central Hospital"
                        value={billingInfo.organization}
                        onChange={(e) => setBillingInfo({ ...billingInfo, organization: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Tax / VAT ID (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. GB123456789"
                        value={billingInfo.vatTaxId}
                        onChange={(e) => setBillingInfo({ ...billingInfo, vatTaxId: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Official Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="procurement@hospital.org"
                        value={billingInfo.email}
                        onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={billingInfo.phone}
                        onChange={(e) => setBillingInfo({ ...billingInfo, phone: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Street Address / Receiving Dept *</label>
                    <input
                      type="text"
                      required
                      placeholder="123 Medical Center Blvd, Suite 400"
                      value={billingInfo.address}
                      onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        required
                        placeholder="London / New York"
                        value={billingInfo.city}
                        onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">State / Province</label>
                      <input
                        type="text"
                        placeholder="Greater London / NY"
                        value={billingInfo.state}
                        onChange={(e) => setBillingInfo({ ...billingInfo, state: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Postal Code *</label>
                      <input
                        type="text"
                        required
                        placeholder="EC1A 1BB / 10001"
                        value={billingInfo.zip}
                        onChange={(e) => setBillingInfo({ ...billingInfo, zip: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Country / Territory *</label>
                    <select
                      value={billingInfo.country}
                      onChange={(e) => setBillingInfo({ ...billingInfo, country: e.target.value })}
                      className="form-select"
                    >
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>United Arab Emirates</option>
                      <option>Saudi Arabia</option>
                      <option>France</option>
                      <option>Italy</option>
                      <option>Spain</option>
                      <option>International / Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Dispatch Logistics Options */}
              <div className="checkout-card">
                <h3 className="checkout-card-heading">
                  2. International Dispatch Method
                </h3>

                <div className="space-y-3">
                  <label className={`shipping-radio-box ${shippingMethod === 'dhl' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="shipping"
                      value="dhl"
                      checked={shippingMethod === 'dhl'}
                      onChange={() => setShippingMethod('dhl')}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900">DHL Medical Air Express (Door-to-Door)</span>
                        <span className="font-bold text-sm text-teal-700">
                          {cartTotal >= 500 ? 'FREE (Orders > $500)' : '$45.00 USD'}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 block mt-0.5">
                        Delivered in 4 to 7 business days with pre-cleared medical export manifests.
                      </span>
                    </div>
                  </label>

                  <label className={`shipping-radio-box ${shippingMethod === 'cargo' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="shipping"
                      value="cargo"
                      checked={shippingMethod === 'cargo'}
                      onChange={() => setShippingMethod('cargo')}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900">Consolidated Air Cargo (Airport-to-Airport)</span>
                        <span className="font-bold text-sm text-teal-700">$120.00 USD</span>
                      </div>
                      <span className="text-xs text-slate-500 block mt-0.5">
                        For institutional orders &gt; 50 kg. Delivered in 8-12 business days.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* 3. Payment Gateway Options (Requirement 13) */}
              <div className="checkout-card">
                <h3 className="checkout-card-heading">
                  3. Select Payment Gateway
                </h3>

                <div className="payment-options-grid grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`payment-tab-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                  >
                    <span className="text-xs font-bold block">Credit / Debit Card</span>
                    <span className="text-[10px] text-slate-500">Stripe 256-bit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wire')}
                    className={`payment-tab-btn ${paymentMethod === 'wire' ? 'active' : ''}`}
                  >
                    <span className="text-xs font-bold block">Bank Wire T/T</span>
                    <span className="text-[10px] text-slate-500">Swift Transfer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('lc')}
                    className={`payment-tab-btn ${paymentMethod === 'lc' ? 'active' : ''}`}
                  >
                    <span className="text-xs font-bold block">Letter of Credit</span>
                    <span className="text-[10px] text-slate-500">L/C at Sight</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`payment-tab-btn ${paymentMethod === 'paypal' ? 'active' : ''}`}
                  >
                    <span className="text-xs font-bold block">PayPal</span>
                    <span className="text-[10px] text-slate-500">Buyer Protection</span>
                  </button>
                </div>

                {/* Gateway Detail Panels */}
                <div className="gateway-panel-content p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>Cardholders: Visa, Mastercard, American Express</span>
                        <span className="text-teal-600 font-bold">256-bit SSL Encrypted</span>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Name on Card *</label>
                        <input
                          type="text"
                          required={paymentMethod === 'card'}
                          placeholder="Dr. John Doe"
                          value={cardDetails.nameOnCard}
                          onChange={(e) => setCardDetails({ ...cardDetails, nameOnCard: e.target.value })}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Card Number *</label>
                        <input
                          type="text"
                          required={paymentMethod === 'card'}
                          placeholder="4242 •••• •••• 4242"
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                          className="form-input font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                          <label className="form-label">Expiry (MM/YY) *</label>
                          <input
                            type="text"
                            required={paymentMethod === 'card'}
                            placeholder="08/28"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className="form-input font-mono"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Security CVC *</label>
                          <input
                            type="text"
                            required={paymentMethod === 'card'}
                            placeholder="123"
                            value={cardDetails.cvc}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                            className="form-input font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'wire' && (
                    <div className="text-xs text-slate-700 space-y-2">
                      <div className="font-bold text-sm text-slate-900 mb-1">
                        Direct Bank Wire Transfer (T/T via SWIFT)
                      </div>
                      <p>
                        Institutional proforma invoice will be generated. Please initiate an international bank wire using the following parameters:
                      </p>
                      <ul className="list-disc pl-4 space-y-1 text-slate-600">
                        <li><strong>Beneficiary Name:</strong> SURGILENCE (PVT) LTD</li>
                        <li><strong>Account Country:</strong> Pakistan (Sialkot Manufacturing Hub)</li>
                        <li><strong>Bank:</strong> Standard Chartered Bank / Habib Bank Limited</li>
                        <li><strong>Payment Term:</strong> 30% Advance, 70% against Bill of Lading copy</li>
                      </ul>
                    </div>
                  )}

                  {paymentMethod === 'lc' && (
                    <div className="text-xs text-slate-700 space-y-2">
                      <div className="font-bold text-sm text-slate-900 mb-1">
                        Irrevocable Documentary Letter of Credit (L/C at Sight)
                      </div>
                      <p>
                        Suitable for hospital authority tenders and global container orders exceeding $5,000 USD.
                        Our bank will furnish formal advising instructions upon proforma issuance.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="text-xs text-slate-700 space-y-2">
                      <div className="font-bold text-sm text-slate-900 mb-1">
                        PayPal Commercial Checkout
                      </div>
                      <p>
                        You will be able to complete payment securely via PayPal Business. PayPal Buyer Protection covers all eligible medical shipments.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Review */}
            <div className="checkout-summary-col">
              <div className="order-summary-card">
                <h3 className="text-lg font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
                  Order Summary ({cartItems.reduce((acc, c) => acc + c.quantity, 0)} items)
                </h3>

                {/* Items Stack */}
                <div className="order-items-scroll space-y-3 mb-6 max-h-96 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="checkout-item-row flex gap-3 pb-3 border-b border-slate-100">
                      <img src={item.image} alt={item.name} className="checkout-item-thumb w-14 h-14 object-cover rounded border" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-slate-900 leading-tight">
                            {item.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-600 pl-2"
                            title="Remove item"
                          >
                            ×
                          </button>
                        </div>
                        <span className="text-[11px] text-teal-700 font-mono">{item.ref}</span>
                        <div className="flex items-center justify-between mt-1 text-xs">
                          <span className="text-slate-500">
                            {item.quantity} × ${item.selectedPrice.toFixed(2)}
                          </span>
                          <span className="font-bold text-slate-900">
                            ${(item.selectedPrice * item.quantity).toFixed(2)} USD
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculation Totals */}
                <div className="space-y-2 text-sm text-slate-600 border-b border-slate-200 pb-4 mb-4">
                  <div className="flex justify-between">
                    <span>Instruments Subtotal:</span>
                    <span className="font-semibold text-slate-900">${cartTotal.toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping ({shippingMethod === 'dhl' ? 'DHL Express' : 'Air Cargo'}):</span>
                    <span className="font-semibold text-slate-900">
                      {shippingCost === 0 ? <strong className="text-teal-600">FREE</strong> : `$${shippingCost.toFixed(2)} USD`}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Customs Duties &amp; Taxes:</span>
                    <span>Excluded (Standard DDU/FOB)</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-base font-extrabold text-slate-900">Grand Total:</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-teal-800">${grandTotal.toFixed(2)}</span>
                    <span className="text-xs text-slate-500 block">USD Total</span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button type="submit" className="btn btn-primary w-full py-3">
                  <span>Place Order &amp; Generate Proforma</span>
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <IconShieldCheck size={16} className="text-teal-600" />
                  <span>ISO 13485:2016 Compliant Facility</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
