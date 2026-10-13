import { useState } from 'react';
import {
  Building2, Plus, Search, Edit2, Trash2, Phone, MapPin,
  BedDouble, Check, X, AlertTriangle
} from 'lucide-react';
import { mockHospitals, mockBeds } from '../../data/mockData';

export default function HospitalsManagement() {
  const [hospitals, setHospitals] = useState(mockHospitals);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({ name: '', location: '', phone: '' });

  const filtered = hospitals.filter(
    (h) =>
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingHospital(null);
    setFormData({ name: '', location: '', phone: '' });
    setModalOpen(true);
  };

  const openEditModal = (h) => {
    setEditingHospital(h);
    setFormData({ name: h.name, location: h.location, phone: h.phone });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.phone) return;

    if (editingHospital) {
      setHospitals(
        hospitals.map((h) =>
          h.id === editingHospital.id ? { ...h, ...formData } : h
        )
      );
    } else {
      const newHospital = {
        id: Math.max(...hospitals.map((h) => h.id), 0) + 1,
        ...formData,
      };
      setHospitals([...hospitals, newHospital]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setHospitals(hospitals.filter((h) => h.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <span className="page-breadcrumb">System Administration / Hospitals</span>
        <div className="page-title-row">
          <div className="page-title">
            <h1>Hospitals Management</h1>
          </div>
          <button className="btn btn-primary" onClick={openAddModal} id="btn-add-hospital">
            <Plus size={16} /> Add Hospital
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="sa-stats-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#E8F0FE', color: '#578EF5' }}>
            <Building2 size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">Total Hospitals</span>
            <span className="stat-value">{hospitals.length}</span>
          </div>
        </div>

        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#DCFCE7', color: '#22C55E' }}>
            <MapPin size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">Locations Covered</span>
            <span className="stat-value">{new Set(hospitals.map((h) => h.location)).size}</span>
          </div>
        </div>

        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#FEF3C7', color: '#F59E0B' }}>
            <BedDouble size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">Network Beds</span>
            <span className="stat-value">{mockBeds.length}</span>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div className="card-title">
            <Building2 size={18} className="card-icon" />
            Hospital Directory
          </div>
          <div style={{ position: 'relative', width: 280 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search hospitals..."
              className="form-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 36, height: 36, fontSize: 'var(--text-xs)' }}
              id="search-hospitals-input"
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Hospital Name</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Registered Beds</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((h) => {
                const bedCount = mockBeds.filter((b) => b.hospital?.id === h.id).length;
                return (
                  <tr key={h.id}>
                    <td>#{h.id}</td>
                    <td style={{ fontWeight: 'var(--fw-semibold)' }}>{h.name}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-xs)' }}>
                        <MapPin size={13} color="var(--color-text-tertiary)" />
                        {h.location}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-xs)' }}>
                        <Phone size={13} color="var(--color-text-tertiary)" />
                        {h.phone}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-info">{bedCount} Beds</span>
                    </td>
                    <td><span className="badge badge-success">Active</span></td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => openEditModal(h)}
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setDeleteConfirm(h)}
                          title="Delete"
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
                  <td colSpan={7} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-tertiary)' }}>
                    No hospitals found matching "{search}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">{editingHospital ? 'Edit Hospital' : 'Add New Hospital'}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label" htmlFor="hospital-name">Hospital Name</label>
                  <input
                    id="hospital-name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Metro Specialty Care"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="hospital-location">Location / Address</label>
                  <input
                    id="hospital-location"
                    type="text"
                    className="form-input"
                    placeholder="e.g. 104 West Park Ave, Metro City"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="hospital-phone">Phone Number</label>
                  <input
                    id="hospital-phone"
                    type="text"
                    className="form-input"
                    placeholder="e.g. +91 44 8765 4321"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" id="save-hospital-btn">
                  {editingHospital ? 'Save Changes' : 'Create Hospital'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-danger)' }}>
                <AlertTriangle size={20} /> Delete Hospital
              </h3>
              <button className="modal-close" onClick={() => setDeleteConfirm(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to remove <strong>{deleteConfirm.name}</strong> from the system?</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', marginTop: 8 }}>
                This action cannot be undone. All associated records may be impacted.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm.id)} id="confirm-delete-hospital">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
