import { useState } from 'react';
import {
  ClipboardList, Plus, Search, Calendar, BedDouble, X
} from 'lucide-react';
import { mockAdmissions, mockPatients, mockBeds } from '../../data/mockData';

export default function HospitalAdminAdmissionsPage() {
  const [admissions, setAdmissions] = useState(mockAdmissions);
  const [filterStatus, setFilterStatus] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    patientId: mockPatients[0]?.id || 1,
    bedId: mockBeds.find((b) => b.status === 'AVAILABLE')?.id || 1,
  });

  const availableBeds = mockBeds.filter((b) => b.status === 'AVAILABLE');

  const filtered = admissions.filter((a) => {
    return filterStatus === 'All' || a.status === filterStatus;
  });

  const handleAdmit = (e) => {
    e.preventDefault();
    const patient = mockPatients.find((p) => p.id === Number(formData.patientId));
    const bed = mockBeds.find((b) => b.id === Number(formData.bedId));

    const newAdm = {
      id: Math.max(...admissions.map((a) => a.id), 0) + 1,
      patient,
      bed,
      status: 'ADMITTED',
      admissionDate: new Date().toISOString(),
    };
    setAdmissions([newAdm, ...admissions]);
    setModalOpen(false);
  };

  const handleDischarge = (id) => {
    setAdmissions(
      admissions.map((a) => (a.id === id ? { ...a, status: 'DISCHARGED' } : a))
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <span className="page-breadcrumb">Hospital Management / Admissions</span>
        <div className="page-title-row">
          <div className="page-title">
            <h1>Inpatient Admissions & Discharges</h1>
          </div>
          <button className="btn btn-primary" onClick={() => setModalOpen(true)} id="btn-ha-admit">
            <Plus size={16} /> Admit Patient
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header" style={{ justifyContent: 'space-between' }}>
          <div className="card-title">
            <ClipboardList size={18} className="card-icon" />
            Admissions Roster
          </div>
          <select
            className="form-input"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: 140, height: 36, fontSize: 'var(--text-xs)' }}
          >
            <option value="All">All Statuses</option>
            <option value="ADMITTED">Admitted</option>
            <option value="DISCHARGED">Discharged</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Admission #</th>
                <th>Patient</th>
                <th>Bed Assignment</th>
                <th>Date of Admission</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((adm) => (
                <tr key={adm.id}>
                  <td><strong>ADM-#{String(adm.id).padStart(4, '0')}</strong></td>
                  <td>
                    <div style={{ fontWeight: 'var(--fw-semibold)' }}>{adm.patient?.name}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
                      {adm.patient?.condition}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <BedDouble size={14} color="var(--color-primary)" />
                      <span>Bed #{adm.bed?.id} ({adm.bed?.type})</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-xs)' }}>
                      <Calendar size={13} color="var(--color-text-tertiary)" />
                      <span>{new Date(adm.admissionDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${adm.status === 'ADMITTED' ? 'badge-success' : 'badge-neutral'}`}>
                      {adm.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {adm.status === 'ADMITTED' ? (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleDischarge(adm.id)}
                      >
                        Discharge Patient
                      </button>
                    ) : (
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>Discharged</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Admit Patient to Bed</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAdmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Patient</label>
                  <select
                    className="form-input"
                    value={formData.patientId}
                    onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  >
                    {mockPatients.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} ({p.condition})</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Bed (Available Only)</label>
                  <select
                    className="form-input"
                    value={formData.bedId}
                    onChange={(e) => setFormData({ ...formData, bedId: e.target.value })}
                  >
                    {availableBeds.map((b) => (
                      <option key={b.id} value={b.id}>Bed #{b.id} — {b.type}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={availableBeds.length === 0}>
                  Confirm Admission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
