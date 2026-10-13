import { useState } from 'react';
import {
  ClipboardList, Plus, Search, CheckCircle, Clock,
  User, BedDouble, Calendar, ArrowRight, X
} from 'lucide-react';
import { mockAdmissions, mockPatients, mockBeds } from '../../data/mockData';

export default function AdmissionsManagement() {
  const [admissions, setAdmissions] = useState(mockAdmissions);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    patientId: mockPatients[0]?.id || 1,
    bedId: mockBeds.find((b) => b.status === 'AVAILABLE')?.id || 1,
  });

  const availableBeds = mockBeds.filter((b) => b.status === 'AVAILABLE');

  const filtered = admissions.filter((a) => {
    const matchesStatus = filterStatus === 'All' || a.status === filterStatus;
    const matchesSearch =
      a.patient?.name.toLowerCase().includes(search.toLowerCase()) ||
      a.bed?.hospital?.name.toLowerCase().includes(search.toLowerCase()) ||
      String(a.id).includes(search);
    return matchesStatus && matchesSearch;
  });

  const activeCount = admissions.filter((a) => a.status === 'ADMITTED').length;
  const dischargedCount = admissions.filter((a) => a.status === 'DISCHARGED').length;

  const handleAdmit = (e) => {
    e.preventDefault();
    const patient = mockPatients.find((p) => p.id === Number(formData.patientId));
    const bed = mockBeds.find((b) => b.id === Number(formData.bedId));

    const newAdmission = {
      id: Math.max(...admissions.map((a) => a.id), 0) + 1,
      patient,
      bed,
      status: 'ADMITTED',
      admissionDate: new Date().toISOString(),
    };

    setAdmissions([newAdmission, ...admissions]);
    setModalOpen(false);
  };

  const handleDischarge = (id) => {
    setAdmissions(
      admissions.map((a) =>
        a.id === id ? { ...a, status: 'DISCHARGED' } : a
      )
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <span className="page-breadcrumb">System Administration / Admissions</span>
        <div className="page-title-row">
          <div className="page-title">
            <h1>Patient Admissions & Discharges</h1>
          </div>
          <button className="btn btn-primary" onClick={() => setModalOpen(true)} id="btn-admit-patient">
            <Plus size={16} /> Admit Patient
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="sa-stats-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#E8F0FE', color: '#578EF5' }}>
            <ClipboardList size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">Total Recorded</span>
            <span className="stat-value">{admissions.length}</span>
          </div>
        </div>

        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#DCFCE7', color: '#22C55E' }}>
            <Clock size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">Currently Admitted</span>
            <span className="stat-value">{activeCount}</span>
          </div>
        </div>

        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#FEF3C7', color: '#F59E0B' }}>
            <CheckCircle size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">Discharged</span>
            <span className="stat-value">{dischargedCount}</span>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div className="card-title">
            <ClipboardList size={18} className="card-icon" />
            Admissions Registry
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <div style={{ position: 'relative', width: 240 }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
              <input
                type="text"
                placeholder="Search patient or hospital..."
                className="form-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: 36, height: 36, fontSize: 'var(--text-xs)' }}
              />
            </div>
            <select
              className="form-input"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ height: 36, fontSize: 'var(--text-xs)', width: 140 }}
            >
              <option value="All">All Statuses</option>
              <option value="ADMITTED">Admitted</option>
              <option value="DISCHARGED">Discharged</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Admission #</th>
                <th>Patient</th>
                <th>Bed Assignment</th>
                <th>Hospital</th>
                <th>Admission Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((adm) => {
                const dateStr = new Date(adm.admissionDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <tr key={adm.id}>
                    <td><strong>ADM-#{String(adm.id).padStart(4, '0')}</strong></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="avatar avatar-sm avatar-placeholder">
                          {adm.patient?.name?.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 'var(--fw-semibold)' }}>{adm.patient?.name}</div>
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
                            {adm.patient?.condition}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <BedDouble size={14} color="var(--color-primary)" />
                        <span>Bed #{adm.bed?.id} ({adm.bed?.type})</span>
                      </div>
                    </td>
                    <td>{adm.bed?.hospital?.name}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-xs)' }}>
                        <Calendar size={13} color="var(--color-text-tertiary)" />
                        <span>{dateStr}</span>
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
                          title="Discharge Patient"
                        >
                          Discharge
                        </button>
                      ) : (
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>Completed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-tertiary)' }}>
                    No admissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admit Patient Modal */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">New Patient Admission</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAdmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label" htmlFor="select-patient">Select Patient</label>
                  <select
                    id="select-patient"
                    className="form-input"
                    value={formData.patientId}
                    onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  >
                    {mockPatients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.age}y, {p.gender}) — {p.condition}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="select-bed">Assign Bed (Available only)</label>
                  <select
                    id="select-bed"
                    className="form-input"
                    value={formData.bedId}
                    onChange={(e) => setFormData({ ...formData, bedId: e.target.value })}
                  >
                    {availableBeds.length > 0 ? (
                      availableBeds.map((b) => (
                        <option key={b.id} value={b.id}>
                          Bed #{b.id} — {b.type} ({b.hospital?.name})
                        </option>
                      ))
                    ) : (
                      <option disabled>No beds available</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={availableBeds.length === 0}
                  id="confirm-admission-btn"
                >
                  Admit Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
