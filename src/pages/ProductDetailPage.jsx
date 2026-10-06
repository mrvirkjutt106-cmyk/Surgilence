import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { INSTRUMENTS_DATA } from '../data/instruments';
import {
  IconCheck,
  IconShieldCheck,
  IconAward,
  IconFileText,
  IconPhone
} from '../components/Icons';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, addToQuote } = useCart();

  const product = INSTRUMENTS_DATA.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(1);
  const [laserNote, setLaserNote] = useState('');
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'applications', 'autoclave'

  if (!product) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Instrument Not Found</h2>
        <p className="text-slate-500 mb-6">The requested instrument model could not be found in our current catalog.</p>
        <Link to="/catalog" className="btn btn-primary">
          Back to Instruments Catalog
        </Link>
      </div>
    );
  }

  const isTC = product.steelGrade.toLowerCase().includes('tungsten carbide') || product.finish.includes('Gold');
  const unitPrice = quantity >= 10 ? product.bulkPriceUSD : product.priceUSD;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleAddToQuote = () => {
    addToQuote(product, quantity, laserNote);
  };

  const relatedItems = INSTRUMENTS_DATA.filter(
    (item) => item.category === product.category && item.id !== product.id
  ).slice(0, 4);

  const whatsappMessage = `Hello SURGILENCE (PVT) LTD,%0AI am inquiring about the ${encodeURIComponent(product.name)} (Ref: ${product.ref}).%0AQty needed: ${quantity} units.%0APlease provide stock availability and proforma pricing.`;

  return (
    <div className="product-detail-page bg-white">
      {/* Light Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container">
          <nav className="text-xs text-slate-500 flex items-center gap-2">
            <Link to="/" className="hover:text-teal-700">Home</Link>
            <span>/</span>
            <Link to="/catalog" className="hover:text-teal-700">Catalog</Link>
            <span>/</span>
            <Link to={`/catalog?category=${product.category}`} className="capitalize hover:text-teal-700">
              {product.category}
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-800 truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container py-10 sm:py-14">
        <div className="product-detail-layout">
          {/* Left Column: 1:1 Large Square Product Image */}
          <div className="product-stage-frame">
            <img
              src={product.image}
              alt={product.name}
              className="product-stage-img"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/item-metzenbaum-scissors.png';
              }}
            />
            {isTC && (
              <div className="absolute top-4 right-4 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <IconAward size={14} />
                <span>Tungsten Carbide Gold Line</span>
              </div>
            )}
          </div>

          {/* Right Column: Clean Specs & Actions */}
          <div className="product-info-panel">
            <span className="detail-sku-badge">{product.ref}</span>
            <h1 className="detail-title">{product.name}</h1>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Price Banner in USD */}
            <div className="detail-price-banner">
              <div>
                <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">UNIT PRICE (USD)</span>
                <span className="detail-price-big">${product.priceUSD.toFixed(2)}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-teal-800 block uppercase font-bold tracking-wider">BULK DISCOUNT (10+ PCS)</span>
                <span className="detail-wholesale-rate">${product.bulkPriceUSD.toFixed(2)} USD / pc</span>
              </div>
            </div>

            {/* Scannable Specs Table */}
            <table className="specs-table">
              <tbody>
                <tr>
                  <th>Alloy Grade</th>
                  <td>{product.steelGrade}</td>
                </tr>
                <tr>
                  <th>Length / Size</th>
                  <td>{product.length}</td>
                </tr>
                <tr>
                  <th>Tip Design</th>
                  <td>{product.tipType}</td>
                </tr>
                <tr>
                  <th>Hardness Standard</th>
                  <td>{product.hardness}</td>
                </tr>
                <tr>
                  <th>Surface Finish</th>
                  <td>{product.finish}</td>
                </tr>
                <tr>
                  <th>Autoclave Cycle</th>
                  <td>{product.sterilization}</td>
                </tr>
              </tbody>
            </table>

            {/* Custom Laser Engraving Input */}
            <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Custom Laser Engraving (Optional):
              </label>
              <input
                type="text"
                value={laserNote}
                onChange={(e) => setLaserNote(e.target.value)}
                placeholder="Enter clinic name or department ID (e.g. St. Jude OR-1)"
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:border-teal-600"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Permanent 50-micron fiber laser etching available on all metal instruments.
              </span>
            </div>

            {/* Quantity Selector & CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-14 text-center text-sm font-bold border-none outline-none py-2"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-primary flex-1 justify-center"
              >
                <span>Add to Cart (${totalPrice.toFixed(2)})</span>
              </button>

              <button
                onClick={handleAddToQuote}
                className="btn btn-secondary justify-center"
              >
                <IconFileText size={16} />
                <span>Add to RFQ</span>
              </button>
            </div>

            {/* WhatsApp Direct Inquiry Button */}
            <a
              href={`https://wa.me/923091699666?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors"
            >
              <IconPhone size={14} />
              <span>Inquire about this model on WhatsApp (+92 309 1699666)</span>
            </a>
          </div>
        </div>

        {/* Informational Tabs */}
        <div className="mt-14 pt-10 border-t border-slate-200">
          <div className="flex gap-4 border-b border-slate-200 pb-3 mb-6">
            <button
              onClick={() => setActiveTab('specs')}
              className={`text-sm font-bold pb-2 transition-colors border-b-2 -mb-[15px] ${
                activeTab === 'specs'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Clinical Application &amp; Features
            </button>
            <button
              onClick={() => setActiveTab('autoclave')}
              className={`text-sm font-bold pb-2 transition-colors border-b-2 -mb-[15px] ${
                activeTab === 'autoclave'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Autoclave &amp; Sterilization Guidelines
            </button>
          </div>

          {activeTab === 'specs' && (
            <div className="space-y-4 max-w-3xl text-sm text-slate-600 leading-relaxed">
              <h4 className="font-bold text-slate-900">Key Instrument Features:</h4>
              <ul className="list-disc pl-5 space-y-1.5">
                {product.features?.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <h4 className="font-bold text-slate-900 pt-3">Recommended Procedures:</h4>
              <p>{product.applications?.join(' • ')}</p>
            </div>
          )}

          {activeTab === 'autoclave' && (
            <div className="space-y-4 max-w-3xl text-sm text-slate-600 leading-relaxed">
              <h4 className="font-bold text-slate-900">Hospital Reprocessing Protocol:</h4>
              <p>
                1. <strong>Pre-Cleaning:</strong> Rinse immediately after use with neutral pH enzymatic cleaner (pH 7.0–8.5). Do not allow surgical debris to dry on box joints or serrations.
              </p>
              <p>
                2. <strong>Ultrasonic Bath:</strong> Run for 10–15 minutes with medical-grade lubricant bath.
              </p>
              <p>
                3. <strong>Steam Autoclave:</strong> Standard prevacuum steam cycle at <strong>134°C (273°F) for 4 minutes</strong>, or gravity displacement at 121°C (250°F) for 30 minutes.
              </p>
            </div>
          )}
        </div>

        {/* Related Instruments Grid */}
        {relatedItems.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Complementary Instruments in this Specialty
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((rel) => (
                <div key={rel.id} className="product-card">
                  <Link to={`/product/${rel.id}`} className="product-card-img-wrap">
                    <img src={rel.image} alt={rel.name} className="product-card-img" />
                  </Link>
                  <div className="product-card-body">
                    <span className="product-card-ref">{rel.ref}</span>
                    <h4 className="product-card-title">
                      <Link to={`/product/${rel.id}`}>{rel.name}</Link>
                    </h4>
                    <div className="product-card-pricing">
                      <span className="price-main-val">${rel.priceUSD.toFixed(2)}</span>
                    </div>
                    <Link to={`/product/${rel.id}`} className="btn btn-secondary btn-sm w-full mt-2 justify-center">
                      View Model
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
