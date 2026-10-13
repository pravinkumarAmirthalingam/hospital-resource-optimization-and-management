import { useState } from 'react';
import {
  Users, Plus, Search, Edit2, Trash2, HeartPulse,
  UserCheck, AlertCircle, X, BedDouble
} from 'lucide-react';
import { mockPatients, mockAdmissions, mockBeds } from '../../data/mockData';

export default function HospitalAdminPatientsPage() {
  const [patients, setPatients] = useState(mockPatients);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

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
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <span className="page-breadcrumb">Hospital Management / Patients</span>
        <div className="page-title-row">
          <div className="page-title">
            <h1>Patient Clinical Records</h1>
          </div>
          <button className="btn btn-primary" onClick={openAddModal} id="btn-hospital-add-patient">
            <Plus size={16} /> Add Patient
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div className="card-title">
            <Users size={18} className="card-icon" />
            Active Hospital Inpatients & Outpatients
          </div>
          <div style={{ position: 'relative', width: 280 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search patients..."
              className="form-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 36, height: 36, fontSize: 'var(--text-xs)' }}
              id="search-ha-patients"
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
                <th>Condition</th>
                <th>Assigned Bed</th>
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
                    <td>{p.age} yrs • {p.gender}</td>
                    <td>
                      <span className="badge badge-warning">{p.condition}</span>
                    </td>
                    <td>
                      {admission ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <BedDouble size={14} color="var(--color-primary)" />
                          <span>Bed #{admission.bed?.id} ({admission.bed?.type})</span>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-xs)' }}>None</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => openEditModal(p)}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(p.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">{editingPatient ? 'Edit Patient' : 'Add New Patient'}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label" htmlFor="patient-name-ha">Patient Name</label>
                  <input
                    id="patient-name-ha"
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="patient-age-ha">Age</label>
                    <input
                      id="patient-age-ha"
                      type="number"
                      className="form-input"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="patient-gender-ha">Gender</label>
                    <select
                      id="patient-gender-ha"
                      className="form-input"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="patient-cond-ha">Condition</label>
                  <input
                    id="patient-cond-ha"
                    type="text"
                    className="form-input"
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
                <button type="submit" className="btn btn-primary" id="save-ha-patient">
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
