import React, { useState, useMemo } from 'react';
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
  IconEye,
  IconPlus,
  IconCheck,
  IconShieldCheck,
  IconAward
} from './Icons';

export default function Catalog({ onSelectProduct, onAddToQuote, quoteItems, searchInputRef }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Determine available subcategories based on category
  const availableSubcategories = useMemo(() => {
    if (selectedCategory === 'surgical') return SURGICAL_SUBCATEGORIES;
    if (selectedCategory === 'dental') return DENTAL_SUBCATEGORIES;
    return ['All'];
  }, [selectedCategory]);

  // Reset subcategory when switching main category
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setSelectedSubcategory('All');
  };

  // Filtered dataset
  const filteredInstruments = useMemo(() => {
    return INSTRUMENTS_DATA.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Subcategory filter
      if (selectedSubcategory !== 'All' && !selectedSubcategory.startsWith('All')) {
        if (item.subcategory !== selectedSubcategory) return false;
      }
      // Material filter
      if (selectedMaterial === 'tc' && !item.steelGrade.toLowerCase().includes('tungsten carbide')) {
        return false;
      }
      if (selectedMaterial === 'aisi420' && !item.steelGrade.toLowerCase().includes('420')) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesRef = item.ref.toLowerCase().includes(query);
        const matchesSub = item.subcategory.toLowerCase().includes(query);
        const matchesSpecialty = item.specialty.toLowerCase().includes(query);
        const matchesSteel = item.steelGrade.toLowerCase().includes(query);
        if (!matchesName && !matchesRef && !matchesSub && !matchesSpecialty && !matchesSteel) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedSubcategory, selectedMaterial, searchQuery]);

  // Check if item is already in RFQ quote cart
  const isItemInQuote = (itemId) => {
    return quoteItems.some((q) => q.id === itemId);
  };

  return (
    <section id="catalog" className="catalog-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <IconScissors size={15} />
            <span>Certified Medical Instruments Catalog</span>
          </div>
          <h2 className="section-title">Precision Dental &amp; Surgical Line</h2>
          <p className="section-desc">
            Browse our complete range of manual operating theatre instruments and dental surgical tools.
            Zero electronic appliances — 100% forged, hand-sharpened stainless steel built to international ISO standards.
          </p>
        </div>

        {/* Filter Toolbar Container */}
        <div className="catalog-toolbar glass-panel">
          {/* Main Category Tabs */}
          <div className="category-tabs">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`cat-tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            >
              <span>All Instruments</span>
              <span className="cat-count-badge">{INSTRUMENTS_DATA.length}</span>
            </button>

            <button
              onClick={() => handleCategoryChange('surgical')}
              className={`cat-tab-btn ${selectedCategory === 'surgical' ? 'active' : ''}`}
            >
              <IconScissors size={17} />
              <span>Surgical</span>
              <span className="cat-count-badge">7</span>
            </button>

            <button
              onClick={() => handleCategoryChange('dental')}
              className={`cat-tab-btn ${selectedCategory === 'dental' ? 'active' : ''}`}
            >
              <IconTooth size={17} />
              <span>Dental</span>
              <span className="cat-count-badge">8</span>
            </button>
          </div>

          {/* Search & Material Filters Bar */}
          <div className="catalog-filter-row">
            {/* Live Search Input */}
            <div className="search-input-wrapper">
              <IconSearch size={18} className="search-icon-inside" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search by instrument name, SKU (e.g. SL-SUR-1021), or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="catalog-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                  title="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            {/* Material Filter Pill Switcher */}
            <div className="material-filter-group">
              <label className="filter-label">Alloy Spec:</label>
              <div className="material-pill-buttons">
                <button
                  onClick={() => setSelectedMaterial('all')}
                  className={`material-pill ${selectedMaterial === 'all' ? 'active' : ''}`}
                >
                  All Alloys
                </button>
                <button
                  onClick={() => setSelectedMaterial('aisi420')}
                  className={`material-pill ${selectedMaterial === 'aisi420' ? 'active' : ''}`}
                >
                  AISI 420 Steel
                </button>
                <button
                  onClick={() => setSelectedMaterial('tc')}
                  className={`material-pill ${selectedMaterial === 'tc' ? 'active' : ''}`}
                >
                  TC Gold Inserts
                </button>
              </div>
            </div>
          </div>

          {/* Subcategories Pills (if surgical or dental is active) */}
          {availableSubcategories.length > 1 && (
            <div className="subcategories-bar">
              <span className="subcategories-label">Specialty:</span>
              <div className="subcategories-scroll">
                {availableSubcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`subcat-pill ${selectedSubcategory === sub ? 'active' : ''}`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Count & Quick Notice */}
        <div className="catalog-meta-bar">
          <div className="results-count">
            Showing <strong className="text-white">{filteredInstruments.length}</strong> medical instruments
            {searchQuery && <span> matching "<span className="text-primary">{searchQuery}</span>"</span>}
          </div>
          <div className="compliance-inline-badge">
            <IconShieldCheck size={14} className="text-primary" />
            <span>Class I Medical Devices • 100% Autoclave Guaranteed</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredInstruments.length > 0 ? (
          <div className="product-grid">
            {filteredInstruments.map((item) => {
              const inQuote = isItemInQuote(item.id);
              const isTC = item.steelGrade.toLowerCase().includes('tungsten carbide') || item.finish.includes('Gold');

              return (
                <article key={item.id} className="product-card glass-panel">
                  {/* Card Header Badges */}
                  <div className="card-top-badges">
                    <span className="sku-tag">{item.ref}</span>
                    <span className={`badge ${item.category === 'surgical' ? 'badge-surgical' : 'badge-dental'}`}>
                      {item.category === 'surgical' ? 'Surgical' : 'Dental'}
                    </span>
                  </div>

                  {/* Product Image Stage */}
                  <div className="product-thumb-stage" onClick={() => onSelectProduct(item)}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-thumb"
                      loading="lazy"
                    />
                    <div className="thumb-hover-overlay">
                      <span className="quick-view-hint">
                        <IconEye size={16} /> Quick Spec Sheet
                      </span>
                    </div>

                    {isTC && (
                      <div className="tc-gold-corner-badge" title="Tungsten Carbide Reinforced">
                        <IconAward size={13} />
                        <span>TC Gold</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details Body */}
                  <div className="product-card-body">
                    <div className="product-subcategory-tag">{item.subcategory}</div>
                    <h3 className="product-title" onClick={() => onSelectProduct(item)}>
                      {item.name}
                    </h3>
                    <p className="product-specialty-line">{item.specialty}</p>

                    {/* Spec Mini Table */}
                    <div className="spec-mini-grid">
                      <div className="spec-mini-item">
                        <span className="spec-label">Steel Grade</span>
                        <span className="spec-val truncate">{item.steelGrade.replace('German ', '').replace(' Stainless Steel', '')}</span>
                      </div>
                      <div className="spec-mini-item">
                        <span className="spec-label">Length</span>
                        <span className="spec-val">{item.length.split('/')[0]}</span>
                      </div>
                      <div className="spec-mini-item">
                        <span className="spec-label">Hardness</span>
                        <span className="spec-val">{item.hardness.split('(')[0]}</span>
                      </div>
                      <div className="spec-mini-item">
                        <span className="spec-label">Steam Temp</span>
                        <span className="spec-val">134°C (273°F)</span>
                      </div>
                    </div>

                    {/* Card Action Buttons */}
                    <div className="card-actions-row">
                      <button
                        onClick={() => onSelectProduct(item)}
                        className="btn btn-secondary btn-sm flex-1"
                        aria-label={`View full technical specifications of ${item.name}`}
                      >
                        <IconEye size={15} />
                        <span>View Specs</span>
                      </button>

                      <button
                        onClick={() => onAddToQuote(item)}
                        className={`btn btn-sm ${inQuote ? 'btn-primary' : 'btn-secondary'} rfq-add-btn`}
                        aria-label={`Add ${item.name} to quote inquiry`}
                        title={inQuote ? "Added to RFQ (Click to add another)" : "Add to Request for Quote"}
                      >
                        {inQuote ? (
                          <>
                            <IconCheck size={16} />
                            <span>In Quote</span>
                          </>
                        ) : (
                          <>
                            <IconPlus size={16} />
                            <span>+ Quote</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="catalog-empty glass-panel">
            <div className="empty-icon-circle">
              <IconSearch size={32} className="text-muted" />
            </div>
            <h3>No instruments match your criteria</h3>
            <p>Try refining your search keyword or clearing the subcategory filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubcategory('All');
                setSelectedMaterial('all');
                setSearchQuery('');
              }}
              className="btn btn-primary btn-sm mt-4"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
