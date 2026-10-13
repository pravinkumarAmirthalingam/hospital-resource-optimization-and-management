import { useState } from 'react';
import {
  BedDouble, Plus, Search, Filter, Building2, CheckCircle2,
  Clock, X, Check
} from 'lucide-react';
import { mockBeds, mockHospitals, mockAdmissions } from '../../data/mockData';

export default function BedsManagement() {
  const [beds, setBeds] = useState(mockBeds);
  const [filterHospital, setFilterHospital] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    type: 'General',
    status: 'AVAILABLE',
    hospitalId: mockHospitals[0]?.id || 1,
  });

  const bedTypes = ['All', 'General', 'ICU', 'Pediatric', 'Maternity', 'Surgery'];

  const filtered = beds.filter((b) => {
    const matchesHosp = filterHospital === 'All' || b.hospital?.id === Number(filterHospital);
    const matchesType = filterType === 'All' || b.type === filterType;
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    const matchesSearch =
      b.hospital?.name.toLowerCase().includes(search.toLowerCase()) ||
      b.type.toLowerCase().includes(search.toLowerCase()) ||
      String(b.id).includes(search);
    return matchesHosp && matchesType && matchesStatus && matchesSearch;
  });

  const availableCount = beds.filter((b) => b.status === 'AVAILABLE').length;
  const occupiedCount = beds.filter((b) => b.status === 'OCCUPIED').length;
  const occupancyRate = Math.round((occupiedCount / beds.length) * 100);

  const handleAddBed = (e) => {
    e.preventDefault();
    const hosp = mockHospitals.find((h) => h.id === Number(formData.hospitalId));
    const newBed = {
      id: Math.max(...beds.map((b) => b.id), 0) + 1,
      type: formData.type,
      status: formData.status,
      hospital: hosp,
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
        <span className="page-breadcrumb">System Administration / Beds</span>
        <div className="page-title-row">
          <div className="page-title">
            <h1>Bed Inventory & Availability</h1>
          </div>
          <button className="btn btn-primary" onClick={() => setModalOpen(true)} id="btn-add-bed">
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
            <span className="stat-label">Total Beds System-Wide</span>
            <span className="stat-value">{beds.length}</span>
          </div>
        </div>

        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#DCFCE7', color: '#22C55E' }}>
            <CheckCircle2 size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">Available Beds</span>
            <span className="stat-value">{availableCount}</span>
          </div>
        </div>

        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#FEE2E2', color: '#EF4444' }}>
            <Clock size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">Occupied Beds</span>
            <span className="stat-value">{occupiedCount}</span>
          </div>
        </div>

        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#FEF3C7', color: '#F59E0B' }}>
            <BedDouble size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">Occupancy Rate</span>
            <span className="stat-value">{occupancyRate}%</span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="card" style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-4) var(--space-5)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center' }}>
          <div style={{ position: 'relative', minWidth: 220, flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search beds or hospitals..."
              className="form-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 36, height: 36, fontSize: 'var(--text-xs)' }}
            />
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            <select
              className="form-input"
              value={filterHospital}
              onChange={(e) => setFilterHospital(e.target.value)}
              style={{ height: 36, fontSize: 'var(--text-xs)', width: 180 }}
            >
              <option value="All">All Hospitals</option>
              {mockHospitals.map((h) => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>

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
      </div>

      {/* Beds Table */}
      <div className="card">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Bed ID</th>
                <th>Hospital</th>
                <th>Type</th>
                <th>Status</th>
                <th>Occupancy Info</th>
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
                    <td>
                      <span style={{ fontWeight: 'var(--fw-bold)' }}>BED-#{String(bed.id).padStart(3, '0')}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Building2 size={14} color="var(--color-primary)" />
                        <span>{bed.hospital?.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-primary">{bed.type}</span>
                    </td>
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
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                          Patient: <strong>{admission.patient?.name}</strong>
                        </span>
                      ) : (
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
                          Ready for assignment
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className={`btn btn-sm ${bed.status === 'AVAILABLE' ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={() => toggleStatus(bed.id)}
                        title="Toggle Bed Status"
                      >
                        {bed.status === 'AVAILABLE' ? 'Mark Occupied' : 'Mark Available'}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-tertiary)' }}>
                    No beds matched your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Bed Modal */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Register New Bed</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddBed}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label" htmlFor="bed-hospital">Hospital</label>
                  <select
                    id="bed-hospital"
                    className="form-input"
                    value={formData.hospitalId}
                    onChange={(e) => setFormData({ ...formData, hospitalId: e.target.value })}
                  >
                    {mockHospitals.map((h) => (
                      <option key={h.id} value={h.id}>{h.name} ({h.location})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="bed-type">Bed Type</label>
                  <select
                    id="bed-type"
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
                  <label className="form-label" htmlFor="bed-status">Initial Status</label>
                  <select
                    id="bed-status"
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
                <button type="submit" className="btn btn-primary" id="save-bed-btn">
                  Add Bed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
