import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  MinusCircle, 
  HelpCircle, 
  Search,
  CheckSquare,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import DisclaimerBanner from '../common/DisclaimerBanner';

export default function DocumentGuide() {
  const { schemes, documentReadiness, setDocStatus } = useApp();
  const { t } = useLanguage();

  const [selectedSchemeId, setSelectedSchemeId] = useState(schemes[0]?.id || "scheme-1");
  const [searchDocQuery, setSearchDocQuery] = useState("");

  const scheme = schemes.find(s => s.id === selectedSchemeId) || schemes[0];

  const docs = scheme.requiredDocuments || [];

  // Filter documents by search
  const filteredDocs = docs.filter(d => 
    d.name.toLowerCase().includes(searchDocQuery.toLowerCase()) ||
    d.reason.toLowerCase().includes(searchDocQuery.toLowerCase())
  );

  // Calculate readiness metrics
  const readyCount = docs.filter(d => documentReadiness[`${scheme.id}_${d.id}`] === 'Ready').length;
  const progressPercent = docs.length > 0 ? Math.round((readyCount / docs.length) * 100) : 0;

  return (
    <div className="document-guide-page">
      <DisclaimerBanner />

      <div className="doc-header card">
        <div>
          <h1>{t('documents.title')}</h1>
          <p>{t('documents.subtitle')}</p>
        </div>

        {/* Scheme Selector Dropdown */}
        <div className="scheme-select-row">
          <label className="form-label">{t('documents.selectScheme')}</label>
          <select 
            className="form-select scheme-dropdown"
            value={selectedSchemeId}
            onChange={(e) => setSelectedSchemeId(e.target.value)}
          >
            {schemes.map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.category})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress Bar Widget */}
      <div className="progress-widget-card card">
        <div className="progress-text-row">
          <div>
            <span className="progress-title">{t('documents.progress')}</span>
            <div className="progress-stats">{readyCount} of {docs.length} Documents Ready</div>
          </div>
          <span className="progress-percent-val">{progressPercent}%</span>
        </div>

        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Search Filter Bar */}
      <div className="doc-search-bar card">
        <div className="input-icon-wrapper">
          <Search size={18} className="input-icon" />
          <input 
            type="text"
            className="form-input with-icon"
            placeholder="Filter document requirements (e.g. Aadhaar, Income)..."
            value={searchDocQuery}
            onChange={(e) => setSearchDocQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Documents List */}
      <div className="docs-grid">
        {filteredDocs.map((doc) => {
          const currentStatus = documentReadiness[`${scheme.id}_${doc.id}`] || 'Not Started';

          return (
            <div key={doc.id} className="doc-item-card card">
              <div className="doc-card-header">
                <div className="doc-title-group">
                  <FileText size={22} className="text-primary" />
                  <div>
                    <h3 className="doc-title">{doc.name}</h3>
                    <span className="doc-purpose">Purpose: {doc.reason}</span>
                  </div>
                </div>

                {/* Status Badge Indicator */}
                <span className={`badge ${
                  currentStatus === 'Ready' ? 'badge-green' : 
                  currentStatus === 'Not Applicable' ? 'badge-gray' : 'badge-amber'
                }`}>
                  {currentStatus === 'Ready' && <CheckCircle2 size={12} />}
                  {currentStatus === 'Not Started' && <Clock size={12} />}
                  {currentStatus === 'Not Applicable' && <MinusCircle size={12} />}
                  {currentStatus}
                </span>
              </div>

              <div className="doc-instructions-box">
                <strong>Preparation Instructions:</strong>
                <p>{doc.instructions}</p>
              </div>

              {/* Status Action Buttons */}
              <div className="doc-status-controls">
                <span className="status-control-label">Mark Readiness Status:</span>
                <div className="status-btn-group">
                  <button 
                    className={`btn btn-sm ${currentStatus === 'Not Started' ? 'btn-secondary' : 'btn-outline'}`}
                    onClick={() => setDocStatus(scheme.id, doc.id, 'Not Started')}
                  >
                    Not Started
                  </button>

                  <button 
                    className={`btn btn-sm ${currentStatus === 'Ready' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setDocStatus(scheme.id, doc.id, 'Ready')}
                  >
                    <CheckSquare size={14} /> Ready
                  </button>

                  <button 
                    className={`btn btn-sm ${currentStatus === 'Not Applicable' ? 'btn-ghost' : 'btn-outline'}`}
                    onClick={() => setDocStatus(scheme.id, doc.id, 'Not Applicable')}
                  >
                    Not Applicable
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .document-guide-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .doc-header h1 {
          font-size: 1.6rem;
          margin-bottom: 0.25rem;
        }

        .doc-header p {
          color: var(--text-secondary);
          font-size: 0.925rem;
          margin-bottom: 1.25rem;
        }

        .scheme-select-row {
          max-width: 500px;
        }

        .scheme-dropdown {
          font-size: 0.95rem;
          font-weight: 600;
        }

        .progress-widget-card {
          background: linear-gradient(135deg, #ffffff, #F0FDF4);
          border-color: #BBF7D0;
        }

        .progress-text-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }

        .progress-title {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .progress-stats {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .progress-percent-val {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.8rem;
          color: var(--success);
        }

        .progress-bar-track {
          height: 12px;
          border-radius: var(--radius-full);
          background-color: var(--border);
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background-color: var(--success);
          border-radius: var(--radius-full);
          transition: width 0.3s ease;
        }

        .docs-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .doc-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .doc-title-group {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }

        .doc-title {
          font-size: 1.1rem;
        }

        .doc-purpose {
          font-size: 0.825rem;
          color: var(--text-secondary);
        }

        .doc-instructions-box {
          background-color: var(--bg-main);
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          font-size: 0.875rem;
          margin-bottom: 1.25rem;
        }

        .doc-instructions-box p {
          color: var(--text-secondary);
          margin-top: 2px;
        }

        .doc-status-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .status-control-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .status-btn-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
}
