import { useState } from 'react';
import {
  Users, Plus, Search, Edit2, Trash2, HeartPulse,
  UserCheck, AlertCircle, X, AlertTriangle
} from 'lucide-react';
import { mockPatients, mockAdmissions } from '../../data/mockData';

export default function PatientsManagement() {
  const [patients, setPatients] = useState(mockPatients);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    condition: '',
  });

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingPatient(null);
    setFormData({ name: '', age: '', gender: 'Male', condition: '' });
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingPatient(p);
    setFormData({ name: p.name, age: p.age, gender: p.gender, condition: p.condition });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.condition) return;

    if (editingPatient) {
      setPatients(
        patients.map((p) =>
          p.id === editingPatient.id ? { ...p, ...formData, age: Number(formData.age) } : p
        )
      );
    } else {
      const newPatient = {
        id: Math.max(...patients.map((p) => p.id), 0) + 1,
        name: formData.name,
        age: Number(formData.age),
        gender: formData.gender,
        condition: formData.condition,
      };
      setPatients([...patients, newPatient]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <span className="page-breadcrumb">System Administration / Patients</span>
        <div className="page-title-row">
          <div className="page-title">
            <h1>Patients Directory</h1>
          </div>
          <button className="btn btn-primary" onClick={openAddModal} id="btn-add-patient">
            <Plus size={16} /> Register Patient
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="sa-stats-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#E8F0FE', color: '#578EF5' }}>
            <Users size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">Total Registered</span>
            <span className="stat-value">{patients.length}</span>
          </div>
        </div>

        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#DCFCE7', color: '#22C55E' }}>
            <UserCheck size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">Currently Admitted</span>
            <span className="stat-value">
              {mockAdmissions.filter((a) => a.status === 'ADMITTED').length}
            </span>
          </div>
        </div>

        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#FEF3C7', color: '#F59E0B' }}>
            <HeartPulse size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">Average Patient Age</span>
            <span className="stat-value">
              {Math.round(patients.reduce((a, p) => a + p.age, 0) / patients.length)} yrs
            </span>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div className="card-title">
            <Users size={18} className="card-icon" />
            Patient Records
          </div>
          <div style={{ position: 'relative', width: 280 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search patients or condition..."
              className="form-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 36, height: 36, fontSize: 'var(--text-xs)' }}
              id="search-patients-input"
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Age / Gender</th>
                <th>Clinical Condition</th>
                <th>Admission Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const admission = mockAdmissions.find(
                  (a) => a.patient?.id === p.id && a.status === 'ADMITTED'
                );

                return (
                  <tr key={p.id}>
                    <td><strong>PT-{String(p.id).padStart(4, '0')}</strong></td>
                    <td style={{ fontWeight: 'var(--fw-semibold)' }}>{p.name}</td>
                    <td>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                        {p.age} yrs • {p.gender}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-warning" style={{ fontWeight: 'var(--fw-medium)' }}>
                        {p.condition}
                      </span>
                    </td>
                    <td>
                      {admission ? (
                        <span className="badge badge-success">
                          Admitted (Bed #{admission.bed?.id})
                        </span>
                      ) : (
                        <span className="badge badge-neutral">Outpatient / Discharged</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => openEditModal(p)}
                          title="Edit Patient"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setDeleteConfirm(p)}
                          title="Delete Patient"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-tertiary)' }}>
                    No patients found matching "{search}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">{editingPatient ? 'Edit Patient Record' : 'Register New Patient'}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label" htmlFor="patient-name">Full Name</label>
                  <input
                    id="patient-name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Ramesh Patel"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="patient-age">Age</label>
                    <input
                      id="patient-age"
                      type="number"
                      min="0"
                      max="120"
                      className="form-input"
                      placeholder="e.g. 35"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="patient-gender">Gender</label>
                    <select
                      id="patient-gender"
                      className="form-input"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="patient-condition">Clinical Condition / Diagnosis</label>
                  <input
                    id="patient-condition"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Acute bronchitis"
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" id="save-patient-btn">
                  {editingPatient ? 'Update Record' : 'Register Patient'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-danger)' }}>
                <AlertTriangle size={20} /> Delete Patient Record
              </h3>
              <button className="modal-close" onClick={() => setDeleteConfirm(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete patient <strong>{deleteConfirm.name}</strong>?</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', marginTop: 8 }}>
                Deleting this record will affect admission histories linked to this patient.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm.id)} id="confirm-delete-patient">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
