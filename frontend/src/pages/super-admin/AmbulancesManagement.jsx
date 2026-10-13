import { useState } from 'react';
import {
  Truck, Plus, Search, MapPin, Edit2, Trash2,
  Navigation, AlertTriangle, X, Check
} from 'lucide-react';
import { mockAmbulances } from '../../data/mockData';

export default function AmbulancesManagement() {
  const [ambulances, setAmbulances] = useState(mockAmbulances);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAmbulance, setEditingAmbulance] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({ vehicleNumber: '', location: '' });

  const filtered = ambulances.filter(
    (a) =>
      a.vehicleNumber.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingAmbulance(null);
    setFormData({ vehicleNumber: '', location: '' });
    setModalOpen(true);
  };

  const openEditModal = (amb) => {
    setEditingAmbulance(amb);
    setFormData({ vehicleNumber: amb.vehicleNumber, location: amb.location });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.vehicleNumber || !formData.location) return;

    if (editingAmbulance) {
      setAmbulances(
        ambulances.map((a) =>
          a.id === editingAmbulance.id ? { ...a, ...formData } : a
        )
      );
    } else {
      const newAmb = {
        id: Math.max(...ambulances.map((a) => a.id), 0) + 1,
        ...formData,
      };
      setAmbulances([...ambulances, newAmb]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setAmbulances(ambulances.filter((a) => a.id !== id));
    setDeleteConfirm(null);
  };

  const getStatusBadge = (loc) => {
    const lower = loc.toLowerCase();
    if (lower.includes('responding') || lower.includes('en route')) {
      return <span className="badge badge-warning">En Route</span>;
    }
    if (lower.includes('maintenance')) {
      return <span className="badge badge-danger">Maintenance</span>;
    }
    return <span className="badge badge-success">Standby</span>;
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <span className="page-breadcrumb">System Administration / Fleet</span>
        <div className="page-title-row">
          <div className="page-title">
            <h1>Ambulance Fleet Dispatch</h1>
          </div>
          <button className="btn btn-primary" onClick={openAddModal} id="btn-add-ambulance">
            <Plus size={16} /> Add Ambulance
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="sa-stats-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#E8F0FE', color: '#578EF5' }}>
            <Truck size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">Total Fleet Units</span>
            <span className="stat-value">{ambulances.length}</span>
          </div>
        </div>

        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#DCFCE7', color: '#22C55E' }}>
            <Navigation size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">On Standby</span>
            <span className="stat-value">
              {ambulances.filter((a) => a.location.toLowerCase().includes('standby')).length}
            </span>
          </div>
        </div>

        <div className="card sa-stat-card">
          <div className="sa-stat-icon" style={{ background: '#FEF3C7', color: '#F59E0B' }}>
            <MapPin size={22} />
          </div>
          <div className="sa-stat-body">
            <span className="stat-label">Active Missions</span>
            <span className="stat-value">
              {ambulances.filter((a) => a.location.toLowerCase().includes('route') || a.location.toLowerCase().includes('responding')).length}
            </span>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div className="card-title">
            <Truck size={18} className="card-icon" />
            Fleet Vehicles
          </div>
          <div style={{ position: 'relative', width: 280 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search vehicle number or area..."
              className="form-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 36, height: 36, fontSize: 'var(--text-xs)' }}
              id="search-ambulances-input"
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Plate Number</th>
                <th>GPS Location / Status</th>
                <th>Dispatch State</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((amb) => (
                <tr key={amb.id}>
                  <td><strong>AMB-#{String(amb.id).padStart(3, '0')}</strong></td>
                  <td>
                    <span style={{
                      fontFamily: 'monospace',
                      fontWeight: 'var(--fw-bold)',
                      background: 'var(--color-background)',
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)'
                    }}>
                      {amb.vehicleNumber}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-xs)' }}>
                      <MapPin size={13} color="var(--color-primary)" />
                      <span>{amb.location}</span>
                    </div>
                  </td>
                  <td>{getStatusBadge(amb.location)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => openEditModal(amb)}
                        title="Update Location"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => setDeleteConfirm(amb)}
                        title="Decommission"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-tertiary)' }}>
                    No ambulances found.
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
              <h3 className="modal-title">{editingAmbulance ? 'Update Ambulance' : 'Register Ambulance'}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label" htmlFor="amb-plate">Vehicle Registration / Plate Number</label>
                  <input
                    id="amb-plate"
                    type="text"
                    className="form-input"
                    placeholder="e.g. TN-01-XY-9999"
                    value={formData.vehicleNumber}
                    onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="amb-loc">Current Location / Status</label>
                  <input
                    id="amb-loc"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Downtown Central — standby"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" id="save-ambulance-btn">
                  {editingAmbulance ? 'Update Fleet' : 'Add Vehicle'}
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
                <AlertTriangle size={20} /> Decommission Ambulance
              </h3>
              <button className="modal-close" onClick={() => setDeleteConfirm(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to remove <strong>{deleteConfirm.vehicleNumber}</strong> from active fleet dispatch?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm.id)} id="confirm-delete-ambulance">
                Confirm Decommission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
