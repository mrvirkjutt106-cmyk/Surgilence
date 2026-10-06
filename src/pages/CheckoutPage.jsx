import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  IconCheck,
  IconShieldCheck,
  IconLock,
  IconGlobe
} from '../components/Icons';

export default function CheckoutPage() {
  const { cartItems, cartSubtotalUSD, updateCartQty, removeFromCart, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('stripe'); // 'stripe', 'wire', 'lc', 'paypal'
  const [shippingMethod, setShippingMethod] = useState('dhl'); // 'dhl' ($35) or 'air_cargo' ($85)

  // Form states
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [institution, setInstitution] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('United States');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shippingCost = cartItems.length === 0 ? 0 : shippingMethod === 'dhl' ? 35.00 : 85.00;
  const grandTotal = cartSubtotalUSD + shippingCost;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    const generatedId = `SL-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderComplete(true);
    clearCart();
  };

  return (
    <div className="checkout-page bg-slate-50 min-h-screen">
      {/* Light Header Strip */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-12">
        <div className="container">
          <div className="max-w-3xl">
            <span className="section-tag">SECURE EXPORT CHECKOUT</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
              Commercial Order Checkout
            </h1>
            <p className="text-slate-500 text-sm sm:text-base">
              Direct international sample and production checkout. Transparent USD billing with worldwide DHL delivery and encrypted payment gateways.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-10 sm:py-14">
        {orderComplete ? (
          <div className="bg-white border border-teal-200 rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 bg-teal-50 border border-teal-200 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconCheck size={32} />
            </div>
            <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              {orderId}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-4 mb-2">
              Order Confirmed &amp; Queued for Export
            </h2>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Thank you, <strong>{firstName} {lastName}</strong>. Your export parcel is being inspected in our cleanroom and packaged with protective tip guards. A confirmation with tracking details has been sent to <strong>{email}</strong>.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/catalog" className="btn btn-primary w-full sm:w-auto">
                Continue Browsing Catalog
              </Link>
              <a
                href={`https://wa.me/923091699666?text=Hello%20SURGILENCE,%20I%20just%20placed%20order%20${orderId}.%20Please%20confirm%20export%20dispatch.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full sm:w-auto"
              >
                Track via WhatsApp (+92 309 1699666)
              </a>
            </div>
          </div>
        ) : (
          <div className="checkout-layout">
            {/* Left Column: Form & Payment Gateways */}
            <div>
              <form onSubmit={handlePlaceOrder}>
                {/* Contact & Organization */}
                <div className="checkout-card">
                  <h2 className="checkout-card-title">
                    <span>1. Buyer Credentials &amp; Delivery Destination</span>
                  </h2>

                  <div className="form-grid mb-4">
                    <div className="form-group">
                      <label className="form-label">Email Address (for export documentation) *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="doctor@clinic.com"
                        className="form-input text-xs"
                      />
                    </div>
                  </div>

                  <div className="form-grid-2 mb-4">
                    <div className="form-group">
                      <label className="form-label">First Name *</label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="form-input text-xs"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="form-input text-xs"
                      />
                    </div>
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label">Hospital / Clinic / Distribution Facility</label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. Apex Surgical Center"
                      className="form-input text-xs"
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label">Street Address *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street and building number"
                      className="form-input text-xs"
                    />
                  </div>

                  <div className="form-grid-2 mb-4">
                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        className="form-input text-xs"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Country *</label>
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

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Postal / ZIP Code *</label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="ZIP Code"
                        className="form-input text-xs"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 555-0199"
                        className="form-input text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="checkout-card">
                  <h2 className="checkout-card-title">
                    <span>2. International Shipping Method</span>
                  </h2>
                  <div className="space-y-3">
                    <label
                      className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-colors ${
                        shippingMethod === 'dhl'
                          ? 'border-teal-600 bg-teal-50'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'dhl'}
                          onChange={() => setShippingMethod('dhl')}
                          className="accent-teal-600"
                        />
                        <div>
                          <div className="font-bold text-xs text-slate-800">DHL Express Worldwide</div>
                          <div className="text-[11px] text-slate-500">Fast door-to-door delivery with tracking (4-7 days)</div>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-slate-800">$35.00 USD</span>
                    </label>

                    <label
                      className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-colors ${
                        shippingMethod === 'air_cargo'
                          ? 'border-teal-600 bg-teal-50'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'air_cargo'}
                          onChange={() => setShippingMethod('air_cargo')}
                          className="accent-teal-600"
                        />
                        <div>
                          <div className="font-bold text-xs text-slate-800">Air Cargo Freight (Heavy / Palletized)</div>
                          <div className="text-[11px] text-slate-500">Direct to major international airport with AWB</div>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-slate-800">$85.00 USD</span>
                    </label>
                  </div>
                </div>

                {/* Payment Gateway Options */}
                <div className="checkout-card">
                  <h2 className="checkout-card-title">
                    <span>3. Payment Gateway Options</span>
                  </h2>

                  {/* Gateway Tabs */}
                  <div className="gateway-tabs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('stripe')}
                      className={`gateway-tab ${paymentMethod === 'stripe' ? 'active' : ''}`}
                    >
                      Credit Card (Stripe)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wire')}
                      className={`gateway-tab ${paymentMethod === 'wire' ? 'active' : ''}`}
                    >
                      Bank Wire (T/T Swift)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('lc')}
                      className={`gateway-tab ${paymentMethod === 'lc' ? 'active' : ''}`}
                    >
                      Letter of Credit (L/C)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`gateway-tab ${paymentMethod === 'paypal' ? 'active' : ''}`}
                    >
                      PayPal Commerce
                    </button>
                  </div>

                  {/* Gateway 1: Credit Card via Stripe */}
                  {paymentMethod === 'stripe' && (
                    <div className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="form-group">
                        <label className="form-label">Card Number *</label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4242 •••• •••• 4242"
                          className="form-input text-xs"
                        />
                      </div>
                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">Expiry (MM/YY) *</label>
                          <input
                            type="text"
                            required
                            value={cardExp}
                            onChange={(e) => setCardExp(e.target.value)}
                            placeholder="12/28"
                            className="form-input text-xs"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">CVC / Security Code *</label>
                          <input
                            type="text"
                            required
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="123"
                            className="form-input text-xs"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                        <IconLock size={12} className="text-teal-600" />
                        <span>256-Bit SSL Encrypted via Stripe Gateway</span>
                      </div>
                    </div>
                  )}

                  {/* Gateway 2: Wire Transfer T/T */}
                  {paymentMethod === 'wire' && (
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-2">
                      <div className="font-bold text-slate-800">International Bank Wire Details:</div>
                      <div className="font-mono bg-white p-3 rounded border border-slate-200 space-y-1">
                        <div><strong>Beneficiary:</strong> SURGILENCE (PVT) LTD</div>
                        <div><strong>Bank:</strong> Habib Bank Limited (HBL) Foreign Exchange Branch</div>
                        <div><strong>IBAN:</strong> PK36HABB0001234567890123</div>
                        <div><strong>SWIFT / BIC:</strong> HABBPKKAXXX</div>
                        <div><strong>Currency:</strong> USD (United States Dollar)</div>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        An official commercial proforma invoice with bank instructions will be sent upon submission.
                      </p>
                    </div>
                  )}

                  {/* Gateway 3: Letter of Credit L/C */}
                  {paymentMethod === 'lc' && (
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-2">
                      <div className="font-bold text-slate-800">Irrevocable Letter of Credit (L/C at Sight):</div>
                      <p>
                        Recommended for hospital tenders and international container shipments exceeding $10,000 USD. Confirmed by prime international commercial banks.
                      </p>
                    </div>
                  )}

                  {/* Gateway 4: PayPal Commerce */}
                  {paymentMethod === 'paypal' && (
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-2 text-center">
                      <p>You will be directed to PayPal's secure gateway to complete your payment.</p>
                      <div className="font-bold text-slate-800">PayPal Express Checkout Enabled</div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={cartItems.length === 0}
                  className="btn btn-primary w-full justify-center py-3 text-base font-bold disabled:opacity-50"
                >
                  <IconLock size={18} />
                  <span>Authorize Order (${grandTotal.toFixed(2)} USD)</span>
                </button>
              </form>
            </div>

            {/* Right Column: Order Summary */}
            <div>
              <div className="checkout-card sticky top-24">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                  <h3 className="font-bold text-base text-slate-900">Order Summary</h3>
                  <span className="text-xs font-semibold text-slate-500">
                    {cartItems.length} item{cartItems.length === 1 ? '' : 's'}
                  </span>
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-xs text-slate-500 mb-3">Your cart is empty.</p>
                    <Link to="/catalog" className="btn btn-secondary btn-sm">
                      Select Instruments
                    </Link>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-3 mb-6 max-h-80 overflow-y-auto pr-1">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-slate-100">
                          <div className="w-12 h-12 bg-white border border-slate-200 rounded p-1 shrink-0 flex items-center justify-center">
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-800 truncate">{item.name}</h4>
                            <span className="text-[11px] text-slate-400 block font-mono">{item.ref}</span>
                            <span className="text-[11px] text-teal-700 font-semibold">
                              ${item.priceUSD.toFixed(2)} × {item.quantity}
                            </span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-bold text-slate-900 block">
                              ${(item.priceUSD * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[10px] text-red-500 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 text-xs text-slate-600 border-t border-slate-200 pt-4 mb-4">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-semibold text-slate-800">${cartSubtotalUSD.toFixed(2)} USD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Export Shipping:</span>
                        <span className="font-semibold text-slate-800">${shippingCost.toFixed(2)} USD</span>
                      </div>
                      <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t border-slate-200 pt-2">
                        <span>Total (USD):</span>
                        <span className="text-teal-700 text-base">${grandTotal.toFixed(2)} USD</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
