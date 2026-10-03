import React, { useState } from 'react';
import { 
  Scale, 
  X, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  Building2,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import DisclaimerBanner from '../common/DisclaimerBanner';

export default function SchemeComparison() {
  const { schemes, compareSchemeIds, toggleCompareScheme, setSelectedSchemeDetail } = useApp();
  const { t } = useLanguage();

  const [highlightDiffs, setHighlightDiffs] = useState(true);

  // Selected schemes for comparison
  const selectedSchemes = schemes.filter(s => compareSchemeIds.includes(s.id));

  return (
    <div className="comparison-page">
      <DisclaimerBanner />

      <div className="comp-header card">
        <div className="comp-header-title">
          <h1>{t('nav.comparison')}</h1>
          <p>Side-by-side comparison of benefits, eligibility limits, documents, and application portals.</p>
        </div>

        <div className="comp-controls">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={highlightDiffs} 
              onChange={(e) => setHighlightDiffs(e.target.checked)} 
            />
            <span>Highlight Key Field Differences</span>
          </label>
        </div>
      </div>

      {selectedSchemes.length === 0 ? (
        <div className="empty-state card">
          <Scale size={48} className="text-muted" />
          <h3>No schemes selected for comparison</h3>
          <p>Browse schemes and click "Compare Scheme" to add up to 4 schemes side by side.</p>
        </div>
      ) : (
        <div className="comparison-table-wrapper card">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="field-header-cell">Field / Attribute</th>
                {selectedSchemes.map((s) => (
                  <th key={s.id} className="scheme-header-cell">
                    <div className="comp-scheme-top">
                      <span className="badge badge-blue">{s.category}</span>
                      <button 
                        className="btn-ghost btn-sm remove-comp-btn"
                        onClick={() => toggleCompareScheme(s.id)}
                        title="Remove from comparison"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <h3 className="comp-scheme-name">{s.name}</h3>
                    <div className="comp-scheme-dept">{s.department}</div>
                    <button 
                      className="btn btn-outline btn-sm full-width-btn"
                      onClick={() => setSelectedSchemeDetail(s)}
                    >
                      View Full Details
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Category & Level */}
              <tr className={highlightDiffs ? 'diff-row' : ''}>
                <td className="field-label">Category & Level</td>
                {selectedSchemes.map(s => (
                  <td key={s.id}>
                    <strong>{s.category}</strong> ({s.level} Level)
                  </td>
                ))}
              </tr>

              {/* Target Beneficiaries */}
              <tr className={highlightDiffs ? 'diff-row' : ''}>
                <td className="field-label">Target Beneficiaries</td>
                {selectedSchemes.map(s => (
                  <td key={s.id}>{s.beneficiaryTypes.join(', ')}</td>
                ))}
              </tr>

              {/* Age Limits */}
              <tr className={highlightDiffs ? 'diff-row' : ''}>
                <td className="field-label">Eligible Age Limit</td>
                {selectedSchemes.map(s => (
                  <td key={s.id}>
                    {s.eligibilityCriteria.minAge || 0} - {s.eligibilityCriteria.maxAge || 'No Upper Limit'} Years
                  </td>
                ))}
              </tr>

              {/* Income Cap */}
              <tr className={highlightDiffs ? 'diff-row' : ''}>
                <td className="field-label">Annual Income Ceiling</td>
                {selectedSchemes.map(s => (
                  <td key={s.id}>
                    {s.eligibilityCriteria.maxIncome 
                      ? `₹${s.eligibilityCriteria.maxIncome.toLocaleString('en-IN')}` 
                      : 'No Income Ceiling'}
                  </td>
                ))}
              </tr>

              {/* Benefits */}
              <tr>
                <td className="field-label">Key Financial & Welfare Benefits</td>
                {selectedSchemes.map(s => (
                  <td key={s.id}>
                    <ul className="comp-list">
                      {s.benefits.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Required Documents */}
              <tr>
                <td className="field-label">Required Documents</td>
                {selectedSchemes.map(s => (
                  <td key={s.id}>
                    <ul className="comp-list">
                      {s.requiredDocuments.map((d, i) => <li key={i}>{d.name}</li>)}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Application Portal */}
              <tr>
                <td className="field-label">Official Portal Link</td>
                {selectedSchemes.map(s => (
                  <td key={s.id}>
                    <a 
                      href={s.officialWebsite} 
                      target="_blank" 
                      rel="noreferrer"
                      className="official-link"
                    >
                      Visit Official Portal <ExternalLink size={14} />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .comparison-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .comp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .comp-header-title h1 {
          font-size: 1.6rem;
          margin-bottom: 0.25rem;
        }

        .comp-header-title p {
          color: var(--text-secondary);
          font-size: 0.925rem;
        }

        .comparison-table-wrapper {
          overflow-x: auto;
          padding: 0;
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .comparison-table th, .comparison-table td {
          padding: 1.25rem;
          border: 1px solid var(--border);
          vertical-align: top;
          font-size: 0.9rem;
        }

        .field-header-cell {
          width: 200px;
          background-color: #F8FAFC;
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
        }

        .scheme-header-cell {
          min-width: 260px;
          background-color: #ffffff;
        }

        .comp-scheme-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .comp-scheme-name {
          font-size: 1.05rem;
          margin-bottom: 0.25rem;
          line-height: 1.3;
        }

        .comp-scheme-dept {
          font-size: 0.775rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .full-width-btn {
          width: 100%;
        }

        .field-label {
          font-weight: 600;
          background-color: #F8FAFC;
          color: var(--text-main);
        }

        .diff-row td:not(.field-label) {
          background-color: #EFF6FF;
        }

        .comp-list {
          padding-left: 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          color: var(--text-secondary);
        }

        .official-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 600;
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}
