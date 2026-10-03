import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  Scale, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Calendar, 
  HelpCircle, 
  Building2,
  ArrowRight,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import DisclaimerBanner from '../common/DisclaimerBanner';

export default function SchemeDetailsPage() {
  const { 
    selectedSchemeDetail, 
    setSelectedSchemeDetail, 
    savedSchemeIds, 
    toggleSaveScheme, 
    compareSchemeIds, 
    toggleCompareScheme,
    setActiveView 
  } = useApp();

  const { t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState(null);

  if (!selectedSchemeDetail) return null;

  const scheme = selectedSchemeDetail;
  const isSaved = savedSchemeIds.includes(scheme.id);
  const isComparing = compareSchemeIds.includes(scheme.id);

  return (
    <div className="modal-overlay" onClick={() => setSelectedSchemeDetail(null)}>
      <div className="modal-content scheme-detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="scheme-header-tags">
            <span className="badge badge-blue">{scheme.category}</span>
            <span className="badge badge-teal">{scheme.level} Level</span>
            {scheme.verifiedStatus && (
              <span className="badge badge-green">
                <ShieldCheck size={12} /> Official Verified
              </span>
            )}
          </div>
          <button className="btn-ghost" onClick={() => setSelectedSchemeDetail(null)}>
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <DisclaimerBanner />

          <h1 className="detail-title">{scheme.name}</h1>
          <div className="detail-dept">
            <Building2 size={16} className="text-primary" /> {scheme.department}
          </div>

          {/* Quick Info Strip */}
          <div className="info-strip">
            <div className="strip-item">
              <span className="strip-label">Application Period:</span>
              <span className="strip-val">
                <Calendar size={14} /> {scheme.startDate} to {scheme.endDate || 'Ongoing'}
              </span>
            </div>
            <div className="strip-item">
              <span className="strip-label">Target Group:</span>
              <span className="strip-val">{scheme.beneficiaryTypes.join(', ')}</span>
            </div>
          </div>

          {/* Action CTAs Toolbar */}
          <div className="detail-actions-bar">
            <a 
              href={scheme.officialWebsite} 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-primary"
            >
              Apply on Official Website <ExternalLink size={16} />
            </a>

            <button 
              className={`btn btn-outline ${isSaved ? 'saved-active' : ''}`}
              onClick={() => toggleSaveScheme(scheme.id)}
            >
              <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
              {isSaved ? 'Saved to Bookmarks' : 'Save Scheme'}
            </button>

            <button 
              className={`btn btn-outline ${isComparing ? 'saved-active' : ''}`}
              onClick={() => toggleCompareScheme(scheme.id)}
            >
              <Scale size={16} />
              {isComparing ? 'In Comparison Matrix' : 'Compare Scheme'}
            </button>

            <button 
              className="btn btn-secondary"
              onClick={() => {
                setSelectedSchemeDetail(null);
                setActiveView('eligibility');
              }}
            >
              <CheckCircle2 size={16} /> Check My Eligibility
            </button>
          </div>

          {/* 1. Overview & Purpose */}
          <div className="detail-section">
            <h3>Overview & Purpose</h3>
            <p className="detail-text">{scheme.purpose || scheme.shortDescription}</p>
          </div>

          {/* 2. Key Benefits */}
          <div className="detail-section">
            <h3>Key Scheme Benefits</h3>
            <ul className="benefits-list">
              {scheme.benefits.map((b, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} className="text-success" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Detailed Eligibility Criteria */}
          <div className="detail-section">
            <h3>Eligibility Criteria</h3>
            <div className="criteria-grid">
              <div className="crit-item">
                <span className="crit-label">Age Range:</span>
                <span className="crit-val">{scheme.eligibilityCriteria.minAge || 0} - {scheme.eligibilityCriteria.maxAge || 'No limit'} Years</span>
              </div>
              <div className="crit-item">
                <span className="crit-label">Max Family Income:</span>
                <span className="crit-val">
                  {scheme.eligibilityCriteria.maxIncome ? `₹${scheme.eligibilityCriteria.maxIncome.toLocaleString('en-IN')}` : 'No Income Cap'}
                </span>
              </div>
              <div className="crit-item">
                <span className="crit-label">Eligible Occupations:</span>
                <span className="crit-val">{scheme.eligibilityCriteria.occupations.join(', ')}</span>
              </div>
              <div className="crit-item">
                <span className="crit-label">Covered States:</span>
                <span className="crit-val">{scheme.eligibilityCriteria.states.join(', ')}</span>
              </div>
            </div>

            {scheme.eligibilityCriteria.customRules && (
              <div className="custom-rules-box">
                <strong>Specific Conditions:</strong>
                <ul>
                  {scheme.eligibilityCriteria.customRules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 4. Required Documents */}
          <div className="detail-section">
            <h3>Required Documents</h3>
            <div className="docs-list">
              {scheme.requiredDocuments.map((doc) => (
                <div key={doc.id} className="doc-item-card">
                  <FileText size={18} className="text-primary" />
                  <div>
                    <strong className="doc-name">{doc.name}</strong>
                    <div className="doc-reason">Purpose: {doc.reason}</div>
                    <div className="doc-inst">{doc.instructions}</div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="btn btn-outline btn-sm btn-doc-guide"
              onClick={() => {
                setSelectedSchemeDetail(null);
                setActiveView('documents');
              }}
            >
              Go to Document Guidance Checklist <ArrowRight size={14} />
            </button>
          </div>

          {/* 5. Step-by-Step Application Procedure */}
          <div className="detail-section">
            <h3>Application Procedure</h3>
            <ol className="procedure-list">
              {scheme.applicationProcess.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>

          {/* 6. Frequently Asked Questions (FAQs) */}
          {scheme.faqs && scheme.faqs.length > 0 && (
            <div className="detail-section">
              <h3>Frequently Asked Questions</h3>
              <div className="faqs-accordion">
                {scheme.faqs.map((faq, idx) => (
                  <div key={idx} className="faq-item">
                    <button 
                      className="faq-q-btn"
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    >
                      <span><HelpCircle size={16} className="text-primary" /> {faq.question}</span>
                      <span>{activeFaq === idx ? '-' : '+'}</span>
                    </button>
                    {activeFaq === idx && (
                      <div className="faq-answer">{faq.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={() => setSelectedSchemeDetail(null)}>
            Close
          </button>
          <a 
            href={scheme.officialWebsite} 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-primary"
          >
            Go to Official Portal <ExternalLink size={16} />
          </a>
        </div>

        <style>{`
          .scheme-detail-modal {
            max-width: 850px;
          }

          .scheme-header-tags {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .detail-title {
            font-size: 1.6rem;
            margin-bottom: 0.25rem;
            line-height: 1.25;
          }

          .detail-dept {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: 1.25rem;
          }

          .info-strip {
            display: flex;
            align-items: center;
            gap: 2rem;
            background-color: var(--bg-main);
            padding: 0.85rem 1.1rem;
            border-radius: var(--radius-md);
            border: 1px solid var(--border);
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
          }

          .strip-item {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.85rem;
          }

          .strip-label {
            color: var(--text-secondary);
            font-weight: 500;
          }

          .strip-val {
            font-weight: 600;
            color: var(--text-main);
            display: flex;
            align-items: center;
            gap: 0.35rem;
          }

          .detail-actions-bar {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid var(--border);
          }

          .detail-section {
            margin-bottom: 1.75rem;
          }

          .detail-section h3 {
            font-size: 1.15rem;
            margin-bottom: 0.75rem;
            color: var(--text-main);
          }

          .detail-text {
            font-size: 0.95rem;
            color: var(--text-secondary);
            line-height: 1.6;
          }

          .benefits-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
          }

          .benefits-list li {
            display: flex;
            align-items: flex-start;
            gap: 0.6rem;
            font-size: 0.9rem;
          }

          .criteria-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .crit-item {
            background-color: var(--bg-main);
            padding: 0.75rem 1rem;
            border-radius: var(--radius-md);
            border: 1px solid var(--border);
          }

          .crit-label {
            display: block;
            font-size: 0.775rem;
            color: var(--text-secondary);
          }

          .crit-val {
            font-weight: 600;
            font-size: 0.9rem;
          }

          .custom-rules-box {
            background-color: #EFF6FF;
            border: 1px solid #93C5FD;
            border-radius: var(--radius-md);
            padding: 0.85rem 1rem;
            font-size: 0.85rem;
            color: #1E40AF;
          }

          .custom-rules-box ul {
            margin-top: 0.4rem;
            padding-left: 1.25rem;
          }

          .docs-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin-bottom: 1rem;
          }

          .doc-item-card {
            display: flex;
            align-items: flex-start;
            gap: 0.85rem;
            padding: 0.85rem 1rem;
            border-radius: var(--radius-md);
            border: 1px solid var(--border);
            background-color: var(--bg-main);
          }

          .doc-name {
            display: block;
            font-size: 0.9rem;
          }

          .doc-reason {
            font-size: 0.8rem;
            color: var(--text-secondary);
          }

          .doc-inst {
            font-size: 0.775rem;
            color: var(--primary);
            margin-top: 2px;
          }

          .btn-doc-guide {
            margin-top: 0.5rem;
          }

          .procedure-list {
            padding-left: 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            font-size: 0.9rem;
            color: var(--text-secondary);
          }

          .faqs-accordion {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .faq-item {
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            overflow: hidden;
          }

          .faq-q-btn {
            width: 100%;
            padding: 0.85rem 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: 600;
            font-size: 0.9rem;
            background-color: var(--bg-main);
          }

          .faq-answer {
            padding: 0.85rem 1rem;
            font-size: 0.875rem;
            color: var(--text-secondary);
            border-top: 1px solid var(--border);
            background-color: #ffffff;
          }

          @media (max-width: 640px) {
            .criteria-grid { grid-template-columns: 1fr; }
            .info-strip { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
          }
        `}</style>
      </div>
    </div>
  );
}
