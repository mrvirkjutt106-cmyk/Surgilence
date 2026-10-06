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
  IconFileText
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

  const { addToCart } = useCart();

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
      return 0;
    });
  }, [selectedCategory, selectedSubcategory, selectedAlloy, searchQuery, sortBy]);

  return (
    <div className="catalog-page">
      {/* Light Header Strip */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="container">
          <div className="max-w-3xl">
            <span className="section-tag">EXPORT CATALOG</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              Surgical &amp; Dental Instruments
            </h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Explore our complete collection of German stainless steel and Tungsten Carbide manual instruments. Transparent USD pricing, individual specifications, and bulk discount rates for international buyers.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Controls Toolbar */}
      <div className="catalog-toolbar">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`btn btn-sm ${
                    selectedCategory === cat.id
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {cat.id === 'surgical' && <IconScissors size={14} />}
                  {cat.id === 'dental' && <IconTooth size={14} />}
                  <span>{cat.label}</span>
                </button>
              ))}

              {/* TC Gold Alloy Quick Filter */}
              <button
                onClick={() => setSelectedAlloy(selectedAlloy === 'tc' ? 'all' : 'tc')}
                className={`btn btn-sm ${
                  selectedAlloy === 'tc'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'btn-secondary text-amber-700 border-amber-200'
                }`}
              >
                <IconAward size={14} />
                <span>TC Gold Line</span>
              </button>
            </div>

            {/* Search Bar & Sort Dropdown */}
            <div className="flex items-center gap-3">
              <div className="catalog-search-wrap">
                <IconSearch size={16} className="catalog-search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search item or SKU..."
                  className="catalog-search-input"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="catalog-sort-select"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Subcategory Pills if in Surgical or Dental */}
          {availableSubcategories.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 mt-2 border-t border-slate-200 text-xs">
              <span className="text-slate-400 font-semibold uppercase text-[10px] mr-1 shrink-0">Subspecialty:</span>
              {availableSubcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                    selectedSubcategory === sub
                      ? 'bg-teal-700 text-white font-bold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 font-medium'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Grid Section */}
      <section className="section-py bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-semibold text-slate-500">
              Showing <strong className="text-slate-800">{filteredItems.length}</strong> instruments
            </span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-base font-bold text-slate-700 mb-2">No matching instruments found</p>
              <p className="text-sm text-slate-500 mb-4">Try clearing your search query or choosing another category.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedSubcategory('All');
                  setSelectedAlloy('all');
                }}
                className="btn btn-secondary btn-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredItems.map((item) => {
                const isTC = item.steelGrade.toLowerCase().includes('tungsten carbide') || item.finish.includes('Gold');
                return (
                  <div key={item.id} className="product-card">
                    {/* 1:1 Square Frame on Pure White Canvas */}
                    <Link to={`/product/${item.id}`} className="product-card-img-wrap">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="product-card-img"
                        loading="lazy"
                      />
                      <div className="product-tag-overlay">
                        <span className={`product-badge ${isTC ? 'product-badge-tc' : item.category === 'surgical' ? 'product-badge-surgical' : 'product-badge-dental'}`}>
                          {isTC ? 'TC GOLD' : item.category}
                        </span>
                      </div>
                    </Link>

                    {/* Card Body */}
                    <div className="product-card-body">
                      <span className="product-card-ref">{item.ref}</span>
                      <h3 className="product-card-title">
                        <Link to={`/product/${item.id}`} className="hover:text-teal-700">
                          {item.name}
                        </Link>
                      </h3>

                      <div className="product-specs-pills">
                        <span className="spec-pill">{item.length}</span>
                        <span className="spec-pill">{item.steelGrade.split(' ')[0]}</span>
                      </div>

                      <div className="product-card-pricing">
                        <div className="price-main-wrap">
                          <span className="price-main-val">${item.priceUSD.toFixed(2)}</span>
                          <span className="price-bulk-tag">Bulk: ${item.bulkPriceUSD.toFixed(2)} / 10+ pcs</span>
                        </div>
                      </div>

                      <div className="product-card-actions">
                        <Link to={`/product/${item.id}`} className="btn btn-secondary btn-sm">
                          Details
                        </Link>
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="btn btn-primary btn-sm"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
