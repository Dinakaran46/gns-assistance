import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RefreshCw, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Bookmark
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { evaluateEligibility } from '../../utils/eligibilityEngine';
import DisclaimerBanner from '../common/DisclaimerBanner';

export default function EligibilityChecker() {
  const { schemes, userProfile, setUserProfile, setSelectedSchemeDetail, savedSchemeIds, toggleSaveScheme } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ ...userProfile });
  const [evaluatedResults, setEvaluatedResults] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAssess = () => {
    // Save to user profile context
    setUserProfile(formData);

    // Run evaluation engine across all schemes
    const results = schemes.map(scheme => {
      const evalRes = evaluateEligibility(formData, scheme);
      return { ...scheme, evalRes };
    });

    setEvaluatedResults(results);
  };

  const handleReset = () => {
    setEvaluatedResults(null);
    setCurrentStep(1);
  };

  // Group results into 3 Tiers
  const potentiallyEligible = evaluatedResults ? evaluatedResults.filter(r => r.evalRes.tier === "Potentially Eligible") : [];
  const notEligible = evaluatedResults ? evaluatedResults.filter(r => r.evalRes.tier === "Not Eligible Based on Available Criteria") : [];
  const moreInfoRequired = evaluatedResults ? evaluatedResults.filter(r => r.evalRes.tier === "More Information Required") : [];

  return (
    <div className="eligibility-page">
      <DisclaimerBanner />

      <div className="checker-header card">
        <h1>Smart Government Scheme Eligibility Checker</h1>
        <p>Assess your eligibility across all Central and State welfare initiatives in seconds.</p>

        {/* Wizard Step Indicators */}
        {!evaluatedResults && (
          <div className="wizard-step-indicators">
            <div className={`step-dot ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'done' : ''}`}>1. Demographics</div>
            <div className="step-line" />
            <div className={`step-dot ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'done' : ''}`}>2. Income & Occupation</div>
            <div className="step-line" />
            <div className={`step-dot ${currentStep === 3 ? 'active' : ''} ${currentStep > 3 ? 'done' : ''}`}>3. Domicile & Education</div>
            <div className="step-line" />
            <div className={`step-dot ${currentStep === 4 ? 'active' : ''}`}>4. Specific Criteria</div>
          </div>
        )}
      </div>

      {/* Step Form Body */}
      {!evaluatedResults ? (
        <div className="wizard-form-card card">
          {currentStep === 1 && (
            <div className="step-content">
              <h2>Step 1: Personal Demographics</h2>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Age (Years)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={formData.age || ''}
                    onChange={(e) => handleInputChange('age', Number(e.target.value))}
                    placeholder="e.g. 24"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select 
                    className="form-select"
                    value={formData.gender || 'Male'}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Social Category</label>
                  <select 
                    className="form-select"
                    value={formData.category || 'General'}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    <option value="General">General</option>
                    <option value="OBC">OBC (Other Backward Classes)</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="EWS">Economically Weaker Section (EWS)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-content">
              <h2>Step 2: Financial & Employment Profile</h2>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Annual Family Income (₹)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={formData.annualIncome || ''}
                    onChange={(e) => handleInputChange('annualIncome', Number(e.target.value))}
                    placeholder="e.g. 220000"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Occupation</label>
                  <select 
                    className="form-select"
                    value={formData.occupation || 'Student'}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                  >
                    <option value="Student">Student</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Entrepreneur">Entrepreneur / Business Owner</option>
                    <option value="Self Employed">Self Employed / Artisan</option>
                    <option value="Job Seeker">Job Seeker / Unemployed</option>
                    <option value="Salaried Private">Salaried Private Employee</option>
                    <option value="Senior Citizen">Senior Citizen / Pensioner</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Employment Status</label>
                  <select 
                    className="form-select"
                    value={formData.employmentStatus || 'Unemployed'}
                    onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
                  >
                    <option value="Unemployed">Unemployed</option>
                    <option value="Employed">Employed</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-content">
              <h2>Step 3: Domicile & Educational Qualification</h2>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">State / UT of Domicile</label>
                  <select 
                    className="form-select"
                    value={formData.state || 'Tamil Nadu'}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  >
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">District</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.district || ''}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    placeholder="e.g. Chennai or Puducherry"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Education Level</label>
                  <select 
                    className="form-select"
                    value={formData.educationLevel || 'Undergraduate'}
                    onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                  >
                    <option value="Class 8 Pass">Class 8 Pass</option>
                    <option value="Class 10 Pass">Class 10 Pass</option>
                    <option value="Class 12 Pass">Class 12 Pass</option>
                    <option value="Undergraduate">Undergraduate Student / Degree</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="ITI / Diploma">ITI / Diploma Holder</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="step-content">
              <h2>Step 4: Additional Scheme-Specific Criteria</h2>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Land Holding (Hectares, if farmer)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    className="form-input" 
                    value={formData.landHolding || 1.0}
                    onChange={(e) => handleInputChange('landHolding', Number(e.target.value))}
                    placeholder="e.g. 1.5"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="wizard-controls">
            {currentStep > 1 && (
              <button className="btn btn-outline" onClick={() => setCurrentStep(prev => prev - 1)}>
                <ArrowLeft size={16} /> Previous Step
              </button>
            )}

            {currentStep < 4 ? (
              <button className="btn btn-primary" onClick={() => setCurrentStep(prev => prev + 1)}>
                Next Step <ArrowRight size={16} />
              </button>
            ) : (
              <button className="btn btn-secondary btn-lg" onClick={handleAssess}>
                <Sparkles size={18} /> Calculate Scheme Eligibility
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="results-view-container">
          <div className="results-toolbar card">
            <div>
              <h2>Eligibility Assessment Results</h2>
              <p>Found <strong>{potentiallyEligible.length}</strong> potentially eligible schemes out of {evaluatedResults.length} total assessed.</p>
            </div>
            <button className="btn btn-outline" onClick={handleReset}>
              <RefreshCw size={16} /> Re-run Assessment
            </button>
          </div>

          {/* Category 1: Potentially Eligible */}
          <div className="result-category-section">
            <h3 className="result-cat-title text-success">
              <CheckCircle2 size={20} /> Potentially Eligible Schemes ({potentiallyEligible.length})
            </h3>
            <div className="grid-2">
              {potentiallyEligible.map((s) => (
                <ResultCard key={s.id} scheme={s} setSelectedSchemeDetail={setSelectedSchemeDetail} savedSchemeIds={savedSchemeIds} toggleSaveScheme={toggleSaveScheme} />
              ))}
            </div>
          </div>

          {/* Category 2: More Information Required */}
          {moreInfoRequired.length > 0 && (
            <div className="result-category-section">
              <h3 className="result-cat-title text-warning">
                <HelpCircle size={20} /> More Information Required ({moreInfoRequired.length})
              </h3>
              <div className="grid-2">
                {moreInfoRequired.map((s) => (
                  <ResultCard key={s.id} scheme={s} setSelectedSchemeDetail={setSelectedSchemeDetail} savedSchemeIds={savedSchemeIds} toggleSaveScheme={toggleSaveScheme} />
                ))}
              </div>
            </div>
          )}

          {/* Category 3: Not Eligible */}
          {notEligible.length > 0 && (
            <div className="result-category-section">
              <h3 className="result-cat-title text-error">
                <XCircle size={20} /> Not Eligible Based on Criteria ({notEligible.length})
              </h3>
              <div className="grid-2">
                {notEligible.map((s) => (
                  <ResultCard key={s.id} scheme={s} setSelectedSchemeDetail={setSelectedSchemeDetail} savedSchemeIds={savedSchemeIds} toggleSaveScheme={toggleSaveScheme} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        .eligibility-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .checker-header h1 {
          font-size: 1.6rem;
          margin-bottom: 0.25rem;
        }

        .checker-header p {
          color: var(--text-secondary);
          font-size: 0.925rem;
        }

        .wizard-step-indicators {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1.5rem;
          overflow-x: auto;
        }

        .step-dot {
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-muted);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border);
          background-color: var(--bg-main);
          white-space: nowrap;
        }

        .step-dot.active {
          color: var(--primary);
          border-color: var(--primary);
          background-color: var(--primary-light);
        }

        .step-dot.done {
          color: var(--success);
          border-color: var(--success);
          background-color: var(--success-bg);
        }

        .step-line {
          flex: 1;
          height: 2px;
          background-color: var(--border);
          min-width: 20px;
        }

        .wizard-form-card h2 {
          font-size: 1.2rem;
          margin-bottom: 1.25rem;
        }

        .wizard-controls {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
        }

        .results-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .result-category-section {
          margin-bottom: 2.5rem;
        }

        .result-cat-title {
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .result-eval-card {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .eval-matched-box, .eval-unmatched-box {
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.825rem;
        }

        .eval-matched-box {
          background-color: #F0FDF4;
          border: 1px solid #BBF7D0;
          color: #166534;
        }

        .eval-unmatched-box {
          background-color: #FEF2F2;
          border: 1px solid #FECACA;
          color: #991B1B;
        }

        .eval-matched-box ul, .eval-unmatched-box ul {
          padding-left: 1.1rem;
          margin-top: 0.3rem;
        }
      `}</style>
    </div>
  );
}

function ResultCard({ scheme, setSelectedSchemeDetail, savedSchemeIds, toggleSaveScheme }) {
  const isSaved = savedSchemeIds.includes(scheme.id);

  return (
    <div className="card result-eval-card">
      <div className="scheme-card-header">
        <span className="badge badge-blue">{scheme.category}</span>
        <span className={`badge ${scheme.evalRes.statusBadge}`}>{scheme.evalRes.tier}</span>
      </div>

      <h3 className="scheme-name">{scheme.name}</h3>
      <div className="scheme-dept">{scheme.department}</div>

      {scheme.evalRes.matched.length > 0 && (
        <div className="eval-matched-box">
          <strong>Matched Requirements:</strong>
          <ul>
            {scheme.evalRes.matched.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </div>
      )}

      {scheme.evalRes.unmatched.length > 0 && (
        <div className="eval-unmatched-box">
          <strong>Unmet Requirements:</strong>
          <ul>
            {scheme.evalRes.unmatched.map((u, i) => <li key={i}>{u}</li>)}
          </ul>
        </div>
      )}

      <div className="scheme-card-actions">
        <button className="btn btn-primary btn-sm full-flex" onClick={() => setSelectedSchemeDetail(scheme)}>
          View Scheme Details
        </button>
        <button 
          className={`btn btn-outline btn-sm ${isSaved ? 'saved-active' : ''}`}
          onClick={() => toggleSaveScheme(scheme.id)}
        >
          <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}
