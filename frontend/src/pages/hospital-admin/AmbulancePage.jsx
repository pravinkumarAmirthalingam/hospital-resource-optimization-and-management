import { useState } from 'react';
import {
  Truck, Plus, MapPin, Edit2, Trash2, X
} from 'lucide-react';
import { mockAmbulances } from '../../data/mockData';

export default function HospitalAdminAmbulancePage() {
  const [ambulances, setAmbulances] = useState(mockAmbulances);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAmbulance, setEditingAmbulance] = useState(null);

  const [formData, setFormData] = useState({ vehicleNumber: '', location: '' });

  const openAdd = () => {
    setEditingAmbulance(null);
    setFormData({ vehicleNumber: '', location: '' });
    setModalOpen(true);
  };

  const openEdit = (amb) => {
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
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <span className="page-breadcrumb">Hospital Management / Fleet</span>
        <div className="page-title-row">
          <div className="page-title">
            <h1>Emergency Ambulance Fleet</h1>
          </div>
          <button className="btn btn-primary" onClick={openAdd} id="btn-ha-add-amb">
            <Plus size={16} /> Add Ambulance
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Plate Number</th>
                <th>Current Status / Location</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ambulances.map((amb) => (
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MapPin size={13} color="var(--color-primary)" />
                      <span>{amb.location}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => openEdit(amb)}>
                        <Edit2 size={14} />
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(amb.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">{editingAmbulance ? 'Update Vehicle' : 'Add Vehicle'}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Plate Number</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.vehicleNumber}
                    onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Location / Mission</label>
                  <input
                    type="text"
                    className="form-input"
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
                <button type="submit" className="btn btn-primary">
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
