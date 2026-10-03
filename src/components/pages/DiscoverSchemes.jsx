import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Bookmark, 
  CheckCircle2, 
  ArrowUpDown, 
  Building2,
  SlidersHorizontal,
  XCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { evaluateEligibility } from '../../utils/eligibilityEngine';
import DisclaimerBanner from '../common/DisclaimerBanner';

export default function DiscoverSchemes() {
  const { 
    schemes, 
    userProfile, 
    savedSchemeIds, 
    toggleSaveScheme, 
    setSelectedSchemeDetail,
    globalSearchQuery,
    setGlobalSearchQuery
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("All");
  const [sortBy, setSortBy] = useState("relevance");

  const categories = [
    "All",
    "Education",
    "Agriculture",
    "Healthcare",
    "Employment",
    "Housing",
    "Entrepreneurship",
    "Women and Child Welfare",
    "Social Security"
  ];

  // Evaluate schemes
  const evaluatedSchemes = schemes.map(scheme => {
    const evalRes = evaluateEligibility(userProfile, scheme);
    return { ...scheme, evalRes };
  });

  // Filter schemes
  const filteredSchemes = evaluatedSchemes.filter(scheme => {
    // Search Query match
    const query = globalSearchQuery.toLowerCase();
    const matchesQuery = !query || 
      scheme.name.toLowerCase().includes(query) ||
      scheme.department.toLowerCase().includes(query) ||
      scheme.category.toLowerCase().includes(query) ||
      scheme.shortDescription.toLowerCase().includes(query);

    // Category match
    const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory;

    // State match
    const matchesState = selectedState === "All" || 
      scheme.eligibilityCriteria.states.includes("All") ||
      scheme.eligibilityCriteria.states.includes(selectedState);

    // Level match
    const matchesLevel = selectedLevel === "All" || scheme.level === selectedLevel;

    // Beneficiary match
    const matchesBeneficiary = selectedBeneficiary === "All" || 
      scheme.beneficiaryTypes.includes(selectedBeneficiary);

    return matchesQuery && matchesCategory && matchesState && matchesLevel && matchesBeneficiary;
  });

  // Sort schemes
  const sortedSchemes = [...filteredSchemes].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "deadline") return new Date(a.endDate || "2030-12-31") - new Date(b.endDate || "2030-12-31");
    // Default relevance: Potentially Eligible first
    const rank = { "Potentially Eligible": 1, "More Information Required": 2, "Not Eligible Based on Criteria": 3 };
    return (rank[a.evalRes.tier] || 2) - (rank[b.evalRes.tier] || 2);
  });

  const clearFilters = () => {
    setGlobalSearchQuery("");
    setSelectedCategory("All");
    setSelectedState("All");
    setSelectedLevel("All");
    setSelectedBeneficiary("All");
    setSortBy("relevance");
  };

  return (
    <div className="discover-page">
      <DisclaimerBanner />

      <div className="discover-header card">
        <div className="discover-title-area">
          <h1>Discover Government Welfare Schemes</h1>
          <p>Search and filter central and state welfare initiatives across education, healthcare, agriculture, and business.</p>
        </div>

        {/* Search Input */}
        <div className="search-bar-row">
          <div className="discover-search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text"
              className="form-input discover-search-input"
              placeholder="Search by scheme name, department, or keyword..."
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="category-pills-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Multi-faceted Filter Controls Bar */}
        <div className="filters-control-bar">
          <div className="filter-group">
            <label><SlidersHorizontal size={14} /> Level:</label>
            <select className="form-select filter-select" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
              <option value="All">All Levels (Central & State)</option>
              <option value="Central">Central Govt Only</option>
              <option value="State">State Govt Only</option>
            </select>
          </div>

          <div className="filter-group">
            <label>State Domicile:</label>
            <select className="form-select filter-select" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
              <option value="All">All States / UTs</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Delhi">Delhi</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Target Group:</label>
            <select className="form-select filter-select" value={selectedBeneficiary} onChange={(e) => setSelectedBeneficiary(e.target.value)}>
              <option value="All">All Beneficiaries</option>
              <option value="Students">Students</option>
              <option value="Farmers">Farmers</option>
              <option value="Women">Women</option>
              <option value="Entrepreneurs">Entrepreneurs</option>
              <option value="Senior Citizens">Senior Citizens</option>
              <option value="Economically Weaker Sections">Economically Weaker Sections</option>
            </select>
          </div>

          <div className="filter-group">
            <label><ArrowUpDown size={14} /> Sort By:</label>
            <select className="form-select filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="relevance">Relevance & Eligibility</option>
              <option value="name">Scheme Name (A-Z)</option>
              <option value="deadline">Upcoming Deadline</option>
            </select>
          </div>

          <button className="btn-ghost btn-sm clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Scheme Cards Grid */}
      <div className="discover-results-header">
        <span>Showing <strong>{sortedSchemes.length}</strong> government schemes</span>
      </div>

      {sortedSchemes.length === 0 ? (
        <div className="empty-state card">
          <XCircle size={48} className="text-muted" />
          <h3>No matching schemes found</h3>
          <p>Try adjusting your search query or clear selected filters.</p>
          <button className="btn btn-outline" onClick={clearFilters}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid-3">
          {sortedSchemes.map((scheme) => {
            const isSaved = savedSchemeIds.includes(scheme.id);

            return (
              <div key={scheme.id} className="scheme-card card">
                <div className="scheme-card-header">
                  <span className="badge badge-blue">{scheme.category}</span>
                  <span className="badge badge-gray">{scheme.level}</span>
                </div>

                <h3 className="scheme-name">{scheme.name}</h3>
                <div className="scheme-dept"><Building2 size={14} /> {scheme.department}</div>

                <p className="scheme-desc">{scheme.shortDescription}</p>

                <div className="eligibility-status-banner">
                  <span className={`badge ${scheme.evalRes.statusBadge}`}>
                    {scheme.evalRes.tier}
                  </span>
                </div>

                <div className="scheme-benefits-box">
                  <strong>Benefit:</strong> {scheme.benefits[0]}
                </div>

                <div className="scheme-card-actions">
                  <button 
                    className="btn btn-primary btn-sm full-flex"
                    onClick={() => setSelectedSchemeDetail(scheme)}
                  >
                    View Details
                  </button>
                  <button 
                    className={`btn btn-outline btn-sm ${isSaved ? 'saved-active' : ''}`}
                    onClick={() => toggleSaveScheme(scheme.id)}
                    title={isSaved ? "Remove from bookmarks" : "Save scheme"}
                  >
                    <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .discover-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .discover-header {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .discover-title-area h1 {
          font-size: 1.6rem;
          margin-bottom: 0.25rem;
        }

        .discover-title-area p {
          color: var(--text-secondary);
          font-size: 0.925rem;
        }

        .discover-search-input-wrapper {
          position: relative;
          width: 100%;
        }

        .discover-search-input {
          padding-left: 2.75rem;
          font-size: 1rem;
          height: 48px;
        }

        .category-pills-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
        }

        .cat-pill {
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border);
          background-color: var(--bg-main);
          font-size: 0.825rem;
          font-weight: 500;
          color: var(--text-secondary);
          white-space: nowrap;
          transition: var(--transition);
        }

        .cat-pill:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .cat-pill.active {
          background-color: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
          font-weight: 600;
        }

        .filters-control-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.825rem;
          color: var(--text-secondary);
        }

        .filter-select {
          padding: 0.35rem 0.75rem;
          font-size: 0.825rem;
          width: auto;
        }

        .clear-btn {
          margin-left: auto;
          font-size: 0.825rem;
        }

        .discover-results-header {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .eligibility-status-banner {
          margin: 0.25rem 0;
        }

        .full-flex {
          flex: 1;
        }

        .scheme-dept {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
      `}</style>
    </div>
  );
}
