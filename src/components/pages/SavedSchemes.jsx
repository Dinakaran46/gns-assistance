import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Scale, 
  ExternalLink, 
  Search, 
  Clock, 
  Building2,
  BookmarkCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import DisclaimerBanner from '../common/DisclaimerBanner';

export default function SavedSchemes() {
  const { schemes, savedSchemeIds, toggleSaveScheme, setSelectedSchemeDetail, toggleCompareScheme, setActiveView } = useApp();
  const { t } = useLanguage();

  const [savedSearchQuery, setSavedSearchQuery] = useState("");

  const savedSchemes = schemes.filter(s => savedSchemeIds.includes(s.id));

  const filteredSaved = savedSchemes.filter(s => 
    s.name.toLowerCase().includes(savedSearchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(savedSearchQuery.toLowerCase())
  );

  return (
    <div className="saved-schemes-page">
      <DisclaimerBanner />

      <div className="saved-header card">
        <div className="saved-header-left">
          <h1>{t('nav.saved')} ({savedSchemes.length})</h1>
          <p>Bookmarked government welfare schemes for quick access and tracking.</p>
        </div>

        {savedSchemes.length > 0 && (
          <button className="btn btn-outline" onClick={() => setActiveView('comparison')}>
            <Scale size={16} /> Compare All Saved Schemes
          </button>
        )}
      </div>

      {savedSchemes.length > 0 && (
        <div className="doc-search-bar card">
          <div className="input-icon-wrapper">
            <Search size={18} className="input-icon" />
            <input 
              type="text"
              className="form-input with-icon"
              placeholder="Search in saved bookmarks..."
              value={savedSearchQuery}
              onChange={(e) => setSavedSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {filteredSaved.length === 0 ? (
        <div className="empty-state card">
          <BookmarkCheck size={48} className="text-muted" />
          <h3>No saved schemes found</h3>
          <p>Browse government schemes and click the bookmark icon to save them here.</p>
          <button className="btn btn-primary" onClick={() => setActiveView('discover')}>
            Discover Schemes
          </button>
        </div>
      ) : (
        <div className="grid-3">
          {filteredSaved.map((scheme) => (
            <div key={scheme.id} className="scheme-card card">
              <div className="scheme-card-header">
                <span className="badge badge-blue">{scheme.category}</span>
                <button 
                  className="btn-ghost text-error" 
                  onClick={() => toggleSaveScheme(scheme.id)}
                  title="Remove from saved"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <h3 className="scheme-name">{scheme.name}</h3>
              <div className="scheme-dept"><Building2 size={14} /> {scheme.department}</div>

              <p className="scheme-desc">{scheme.shortDescription}</p>

              <div className="scheme-benefits-box">
                <Clock size={14} className="text-warning" /> Deadline: {scheme.endDate || 'Ongoing'}
              </div>

              <div className="scheme-card-actions">
                <button className="btn btn-primary btn-sm full-flex" onClick={() => setSelectedSchemeDetail(scheme)}>
                  View Details
                </button>
                <button className="btn btn-outline btn-sm" onClick={() => toggleCompareScheme(scheme.id)}>
                  <Scale size={14} /> Compare
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .saved-schemes-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .saved-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .saved-header-left h1 {
          font-size: 1.6rem;
          margin-bottom: 0.25rem;
        }

        .saved-header-left p {
          color: var(--text-secondary);
          font-size: 0.925rem;
        }
      `}</style>
    </div>
  );
}
