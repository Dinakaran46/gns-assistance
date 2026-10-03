import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  CheckCircle2, 
  X, 
  Building2,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import DisclaimerBanner from '../common/DisclaimerBanner';

export default function AdminDashboard() {
  const { user, schemes, addScheme, updateScheme, deleteScheme } = useApp();
  const { t } = useLanguage();

  const [adminSearch, setAdminSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingScheme, setEditingScheme] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    level: 'Central',
    category: 'Education',
    shortDescription: '',
    purpose: '',
    benefitsStr: '',
    minAge: 18,
    maxAge: 60,
    maxIncome: 300000,
    officialWebsite: '',
    startDate: '',
    endDate: ''
  });

  const filteredSchemes = schemes.filter(s => 
    s.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    s.category.toLowerCase().includes(adminSearch.toLowerCase()) ||
    s.department.toLowerCase().includes(adminSearch.toLowerCase())
  );

  const openAddModal = () => {
    setEditingScheme(null);
    setFormData({
      name: '',
      department: 'Ministry of Welfare',
      level: 'Central',
      category: 'Education',
      shortDescription: '',
      purpose: '',
      benefitsStr: 'Financial grant up to ₹50,000 per year',
      minAge: 18,
      maxAge: 60,
      maxIncome: 300000,
      officialWebsite: 'https://india.gov.in',
      startDate: '2024-01-01',
      endDate: '2027-12-31'
    });
    setModalOpen(true);
  };

  const openEditModal = (scheme) => {
    setEditingScheme(scheme);
    setFormData({
      name: scheme.name,
      department: scheme.department,
      level: scheme.level,
      category: scheme.category,
      shortDescription: scheme.shortDescription,
      purpose: scheme.purpose || scheme.shortDescription,
      benefitsStr: scheme.benefits ? scheme.benefits.join('\n') : '',
      minAge: scheme.eligibilityCriteria?.minAge || 18,
      maxAge: scheme.eligibilityCriteria?.maxAge || 60,
      maxIncome: scheme.eligibilityCriteria?.maxIncome || 300000,
      officialWebsite: scheme.officialWebsite,
      startDate: scheme.startDate || '2024-01-01',
      endDate: scheme.endDate || '2027-12-31'
    });
    setModalOpen(true);
  };

  const handleSaveScheme = (e) => {
    e.preventDefault();

    const benefitsArray = formData.benefitsStr.split('\n').filter(b => b.trim().length > 0);

    const schemeObj = {
      name: formData.name,
      department: formData.department,
      level: formData.level,
      category: formData.category,
      beneficiaryTypes: ["General Citizens"],
      shortDescription: formData.shortDescription,
      purpose: formData.purpose,
      benefits: benefitsArray.length > 0 ? benefitsArray : [formData.benefitsStr],
      eligibilityCriteria: {
        minAge: Number(formData.minAge),
        maxAge: Number(formData.maxAge),
        maxIncome: Number(formData.maxIncome),
        occupations: ["All"],
        states: ["All"],
        categories: ["All"]
      },
      requiredDocuments: [
        { id: "doc-1", name: "Aadhaar Card", reason: "Identity Verification", instructions: "Self attested copy" }
      ],
      applicationProcess: ["Apply via official portal."],
      startDate: formData.startDate,
      endDate: formData.endDate,
      officialWebsite: formData.officialWebsite,
      sourceUrl: formData.officialWebsite,
      verifiedStatus: true
    };

    if (editingScheme) {
      updateScheme({ ...schemeObj, id: editingScheme.id });
    } else {
      addScheme(schemeObj);
    }

    setModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteScheme(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="admin-page">
      <DisclaimerBanner />

      {/* Admin Header Stats */}
      <div className="admin-header card">
        <div>
          <div className="badge badge-teal admin-role-badge">
            <ShieldCheck size={14} /> ADMINISTRATOR CONTROL PANEL
          </div>
          <h1>Government Scheme Management</h1>
          <p>Add, edit, verify, or unpublish official government welfare schemes in real time.</p>
        </div>

        <button className="btn btn-primary" onClick={openAddModal}>
          <Plus size={18} /> Add New Scheme
        </button>
      </div>

      {/* Search Bar */}
      <div className="doc-search-bar card">
        <div className="input-icon-wrapper">
          <Search size={18} className="input-icon" />
          <input 
            type="text"
            className="form-input with-icon"
            placeholder="Search schemes by title, category, or department..."
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Schemes Data Table */}
      <div className="admin-table-card card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Scheme Name</th>
              <th>Category</th>
              <th>Level</th>
              <th>Department</th>
              <th>Verification</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchemes.map((s) => (
              <tr key={s.id}>
                <td>
                  <strong>{s.name}</strong>
                  <div className="table-sub-text">{s.shortDescription.substring(0, 60)}...</div>
                </td>
                <td><span className="badge badge-blue">{s.category}</span></td>
                <td><span className="badge badge-gray">{s.level}</span></td>
                <td>{s.department}</td>
                <td>
                  <span className="badge badge-green">
                    <CheckCircle2 size={12} /> Published & Verified
                  </span>
                </td>
                <td>
                  <div className="admin-row-actions">
                    <button className="btn-ghost" onClick={() => openEditModal(s)} title="Edit Scheme">
                      <Edit size={16} className="text-primary" />
                    </button>
                    <button className="btn-ghost text-error" onClick={() => setDeleteConfirmId(s.id)} title="Delete Scheme">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingScheme ? 'Edit Government Scheme' : 'Add New Government Scheme'}</h2>
              <button className="btn-ghost" onClick={() => setModalOpen(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveScheme}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Scheme Name</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select 
                      className="form-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Education">Education</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Employment">Employment</option>
                      <option value="Housing">Housing</option>
                      <option value="Entrepreneurship">Entrepreneurship</option>
                      <option value="Women and Child Welfare">Women and Child Welfare</option>
                      <option value="Social Security">Social Security</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Government Level</label>
                    <select 
                      className="form-select"
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    >
                      <option value="Central">Central</option>
                      <option value="State">State</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Government Ministry / Department</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Short Summary Description</label>
                  <textarea 
                    rows={2} 
                    className="form-textarea"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Key Benefits (One per line)</label>
                  <textarea 
                    rows={3} 
                    className="form-textarea"
                    value={formData.benefitsStr}
                    onChange={(e) => setFormData({ ...formData, benefitsStr: e.target.value })}
                    required
                  />
                </div>

                <div className="grid-3">
                  <div className="form-group">
                    <label className="form-label">Min Age</label>
                    <input 
                      type="number" 
                      className="form-input"
                      value={formData.minAge}
                      onChange={(e) => setFormData({ ...formData, minAge: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Max Age</label>
                    <input 
                      type="number" 
                      className="form-input"
                      value={formData.maxAge}
                      onChange={(e) => setFormData({ ...formData, maxAge: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Max Family Income Cap (₹)</label>
                    <input 
                      type="number" 
                      className="form-input"
                      value={formData.maxIncome}
                      onChange={(e) => setFormData({ ...formData, maxIncome: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Official Portal URL</label>
                  <input 
                    type="url" 
                    className="form-input"
                    value={formData.officialWebsite}
                    onChange={(e) => setFormData({ ...formData, officialWebsite: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingScheme ? 'Update Scheme' : 'Publish Scheme'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <div className="modal-header">
              <h2>Confirm Deletion</h2>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this government scheme? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setDeleteConfirmId(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirmId)}>Delete Scheme</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .admin-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .admin-role-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.5rem;
        }

        .admin-header h1 {
          font-size: 1.6rem;
          margin-bottom: 0.25rem;
        }

        .admin-header p {
          color: var(--text-secondary);
          font-size: 0.925rem;
        }

        .admin-table-card {
          padding: 0;
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-table th, .admin-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.875rem;
        }

        .admin-table th {
          background-color: #F8FAFC;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;

        }

        .table-sub-text {
          font-size: 0.775rem;
          color: var(--text-secondary);
          margin-top: 2px;
        }

        .admin-row-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
}
