import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  INSTRUMENTS_DATA,
  CATEGORIES,
  SURGICAL_SUBCATEGORIES,
  DENTAL_SUBCATEGORIES
} from '../data/instruments';
import {
  IconSearch,
  IconScissors,
  IconTooth,
  IconAward,
  IconFileText,
  IconCheck,
  IconShieldCheck
} from '../components/Icons';
import { useCart } from '../context/CartContext';

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [selectedAlloy, setSelectedAlloy] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const { addToCart, addToQuote } = useCart();

  // Sync category state with URL param
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && (cat === 'surgical' || cat === 'dental' || cat === 'all')) {
      setSelectedCategory(cat);
      setSelectedSubcategory('All');
    }
  }, [searchParams]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setSelectedSubcategory('All');
    setSearchParams(catId === 'all' ? {} : { category: catId });
  };

  const availableSubcategories = useMemo(() => {
    if (selectedCategory === 'surgical') return SURGICAL_SUBCATEGORIES;
    if (selectedCategory === 'dental') return DENTAL_SUBCATEGORIES;
    return ['All'];
  }, [selectedCategory]);

  const filteredItems = useMemo(() => {
    return INSTRUMENTS_DATA.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedSubcategory !== 'All' && !selectedSubcategory.startsWith('All')) {
        if (item.subcategory !== selectedSubcategory) return false;
      }
      if (selectedAlloy === 'tc' && !item.steelGrade.toLowerCase().includes('tungsten carbide')) {
        return false;
      }
      if (selectedAlloy === 'aisi420' && !item.steelGrade.toLowerCase().includes('420')) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesRef = item.ref.toLowerCase().includes(q);
        const matchesSub = item.subcategory.toLowerCase().includes(q);
        const matchesSpecialty = item.specialty.toLowerCase().includes(q);
        if (!matchesName && !matchesRef && !matchesSub && !matchesSpecialty) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
      if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // featured
    });
  }, [selectedCategory, selectedSubcategory, selectedAlloy, searchQuery, sortBy]);

  return (
    <div className="catalog-page">
      {/* Catalog Header Banner */}
      <section className="page-header-strip bg-slate-900 text-white">
        <div className="container">
          <div className="page-header-content">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-wider">
              OFFICIAL INSTRUMENTS CATALOG
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-1 text-white">
              Surgical &amp; Dental Instruments
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-2">
              Browse our complete catalog of precision hand tools. Transparent USD wholesale pricing, individual specifications, and bulk volume rates. Zero electronic appliances.
            </p>
          </div>
        </div>
      </section>

      {/* Main Catalog Body */}
      <div className="container py-8 sm:py-12">
        {/* Filter Controls Bar */}
        <div className="catalog-controls-card">
          {/* Main Category Switcher Tabs */}
          <div className="catalog-tabs-row">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`catalog-tab ${selectedCategory === 'all' ? 'active' : ''}`}
            >
              <span>All Instruments</span>
              <span className="tab-count">{INSTRUMENTS_DATA.length}</span>
            </button>

            <button
              onClick={() => handleCategorySelect('surgical')}
              className={`catalog-tab ${selectedCategory === 'surgical' ? 'active' : ''}`}
            >
              <IconScissors size={17} />
              <span>Surgical</span>
              <span className="tab-count">7</span>
            </button>

            <button
              onClick={() => handleCategorySelect('dental')}
              className={`catalog-tab ${selectedCategory === 'dental' ? 'active' : ''}`}
            >
              <IconTooth size={17} />
              <span>Dental</span>
              <span className="tab-count">8</span>
            </button>
          </div>

          {/* Search, Alloy, and Sort Controls */}
          <div className="catalog-inputs-row">
            {/* Live Search */}
            <div className="search-field-wrap">
              <IconSearch size={18} className="search-field-icon" />
              <input
                type="text"
                placeholder="Search instrument name, SKU (e.g. SL-SUR-1021), or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-field-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="search-clear-cross"
                  title="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            {/* Alloy Filter */}
            <div className="filter-select-group">
              <label className="filter-group-label">Alloy:</label>
              <select
                value={selectedAlloy}
                onChange={(e) => setSelectedAlloy(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Steel Alloys</option>
                <option value="aisi420">AISI 420 Martensitic Steel</option>
                <option value="tc">Tungsten Carbide Gold Line</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="filter-select-group">
              <label className="filter-group-label">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High (USD)</option>
                <option value="price-desc">Price: High to Low (USD)</option>
                <option value="name">Alphabetical (A - Z)</option>
              </select>
            </div>
          </div>

          {/* Subspecialties Row */}
          {availableSubcategories.length > 1 && (
            <div className="subspecialties-row">
              <span className="subspecialties-title">Subcategory:</span>
              <div className="subspecialties-scroll">
                {availableSubcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`subspecialty-pill ${selectedSubcategory === sub ? 'active' : ''}`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Counter & Compliance Bar */}
        <div className="results-status-row">
          <div className="text-sm text-slate-600">
            Displaying <strong>{filteredItems.length}</strong> instruments in USD
            {searchQuery && <span> matching query "<strong>{searchQuery}</strong>"</span>}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <IconShieldCheck size={14} className="text-teal-600" />
            <span>Class I Medical Devices • 100% Autoclavable 134°C</span>
          </div>
        </div>

        {/* Product Grid */}
        {filteredItems.length > 0 ? (
          <div className="catalog-grid">
            {filteredItems.map((item) => (
              <CatalogCard
                key={item.id}
                item={item}
                onAddToCart={addToCart}
                onAddToQuote={addToQuote}
              />
            ))}
          </div>
        ) : (
          <div className="catalog-no-results">
            <div className="no-results-icon">
              <IconSearch size={32} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Instruments Found</h3>
            <p className="text-sm text-slate-500 mb-4">
              We couldn't find any instruments matching your current filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubcategory('All');
                setSelectedAlloy('all');
                setSearchQuery('');
              }}
              className="btn btn-primary btn-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CatalogCard({ item, onAddToCart, onAddToQuote }) {
  const isTC = item.steelGrade.toLowerCase().includes('tungsten carbide') || item.finish.includes('Gold');

  return (
    <article className="catalog-item-card">
      {/* Top Header */}
      <div className="catalog-item-head">
        <span className="sku-tag">{item.ref}</span>
        <span className={`badge ${item.category === 'surgical' ? 'badge-surgical' : 'badge-dental'}`}>
          {item.category === 'surgical' ? 'Surgical' : 'Dental'}
        </span>
      </div>

      {/* Unique Item Image */}
      <Link to={`/product/${item.id}`} className="catalog-thumb-stage">
        <img
          src={item.image}
          alt={item.name}
          className="catalog-thumb-img"
          loading="lazy"
        />
        {isTC && (
          <span className="catalog-tc-tag">
            <IconAward size={13} />
            <span>TC Gold</span>
          </span>
        )}
      </Link>

      {/* Card Info */}
      <div className="catalog-card-details">
        <span className="catalog-subcat-badge">{item.subcategory}</span>
        <h3 className="catalog-product-name">
          <Link to={`/product/${item.id}`}>{item.name}</Link>
        </h3>
        <p className="catalog-specialty-line">{item.specialty}</p>

        {/* Pricing */}
        <div className="catalog-price-container">
          <div>
            <span className="price-primary">${item.priceUSD.toFixed(2)}</span>
            <span className="price-unit-tag">USD</span>
          </div>
          <div className="price-bulk-indicator">
            10+ units: <strong>${item.bulkPriceUSD.toFixed(2)} USD</strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="catalog-card-actions">
          <Link to={`/product/${item.id}`} className="btn btn-secondary btn-sm flex-1">
            <span>Details</span>
          </Link>

          <button
            onClick={() => onAddToCart(item, 1)}
            className="btn btn-primary btn-sm flex-1"
          >
            <span>+ Cart</span>
          </button>

          <button
            onClick={() => onAddToQuote(item, 1)}
            className="btn btn-secondary btn-sm"
            title="Add to quotation basket"
          >
            <IconFileText size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
