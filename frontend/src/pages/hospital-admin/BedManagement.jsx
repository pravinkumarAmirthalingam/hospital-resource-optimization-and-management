import { useState } from 'react';
import {
  BedDouble, Plus, Search, CheckCircle2, Clock, X
} from 'lucide-react';
import { mockBeds, mockAdmissions, mockHospitals } from '../../data/mockData';

export default function HospitalAdminBedManagement() {
  const [beds, setBeds] = useState(mockBeds);
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    type: 'General',
    status: 'AVAILABLE',
  });

  const bedTypes = ['All', 'General', 'ICU', 'Pediatric', 'Maternity', 'Surgery'];

  const filtered = beds.filter((b) => {
    const matchesType = filterType === 'All' || b.type === filterType;
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const availableCount = beds.filter((b) => b.status === 'AVAILABLE').length;
  const occupiedCount = beds.filter((b) => b.status === 'OCCUPIED').length;

  const handleAddBed = (e) => {
    e.preventDefault();
    const newBed = {
      id: Math.max(...beds.map((b) => b.id), 0) + 1,
      type: formData.type,
      status: formData.status,
      hospital: mockHospitals[0],
    };
    setBeds([...beds, newBed]);
    setModalOpen(false);
  };

  const toggleStatus = (id) => {
    setBeds(
      beds.map((b) =>
        b.id === id
          ? { ...b, status: b.status === 'AVAILABLE' ? 'OCCUPIED' : 'AVAILABLE' }
          : b
      )
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <span className="page-breadcrumb">Hospital Management / Beds</span>
        <div className="page-title-row">
          <div className="page-title">
            <h1>Bed Inventory & Ward Allocation</h1>
          </div>
          <button className="btn btn-primary" onClick={() => setModalOpen(true)} id="btn-ha-add-bed">
            <Plus size={16} /> Add Bed
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="sa-stats-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#E8F0FE', color: '#578EF5' }}>
            <BedDouble size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">Total Ward Beds</span>
            <span className="stat-value">{beds.length}</span>
          </div>
        </div>

        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#DCFCE7', color: '#22C55E' }}>
            <CheckCircle2 size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">Available for Inpatients</span>
            <span className="stat-value">{availableCount}</span>
          </div>
        </div>

        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#FEE2E2', color: '#EF4444' }}>
            <Clock size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">Currently Occupied</span>
            <span className="stat-value">{occupiedCount}</span>
          </div>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="card" style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-4) var(--space-5)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--color-text-secondary)' }}>
            Filter Ward:
          </span>
          <select
            className="form-input"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{ height: 36, fontSize: 'var(--text-xs)', width: 140 }}
          >
            {bedTypes.map((t) => (
              <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>
            ))}
          </select>

          <select
            className="form-input"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ height: 36, fontSize: 'var(--text-xs)', width: 140 }}
          >
            <option value="All">All Statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="OCCUPIED">Occupied</option>
          </select>
        </div>
      </div>

      {/* Beds Table */}
      <div className="card">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Bed ID</th>
                <th>Type</th>
                <th>Current Status</th>
                <th>Patient In Residence</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((bed) => {
                const admission = mockAdmissions.find(
                  (a) => a.bed?.id === bed.id && a.status === 'ADMITTED'
                );

                return (
                  <tr key={bed.id}>
                    <td><strong>BED-#{String(bed.id).padStart(3, '0')}</strong></td>
                    <td><span className="badge badge-primary">{bed.type}</span></td>
                    <td>
                      <span className={`badge ${bed.status === 'AVAILABLE' ? 'badge-success' : 'badge-danger'}`}>
                        <span className="status-dot" style={{
                          background: bed.status === 'AVAILABLE' ? 'var(--color-success)' : 'var(--color-danger)',
                          width: 6,
                          height: 6
                        }} />
                        {bed.status}
                      </span>
                    </td>
                    <td>
                      {admission ? (
                        <span>{admission.patient?.name} ({admission.patient?.condition})</span>
                      ) : (
                        <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-xs)' }}>Ready</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className={`btn btn-sm ${bed.status === 'AVAILABLE' ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={() => toggleStatus(bed.id)}
                      >
                        {bed.status === 'AVAILABLE' ? 'Mark Occupied' : 'Mark Available'}
                      </button>
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
              <h3 className="modal-title">Add Bed to Inventory</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddBed}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Bed Type</label>
                  <select
                    className="form-input"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="General">General</option>
                    <option value="ICU">ICU</option>
                    <option value="Pediatric">Pediatric</option>
                    <option value="Maternity">Maternity</option>
                    <option value="Surgery">Surgery</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Initial Status</label>
                  <select
                    className="form-input"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="OCCUPIED">OCCUPIED</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Bed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
