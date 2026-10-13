import { useState } from 'react';
import {
  Activity, ShieldCheck, Wrench, AlertTriangle, CheckCircle2,
  Clock, Plus, Search, Filter
} from 'lucide-react';
import { equipmentTypes } from '../../data/mockData';

export default function HospitalAdminResourcesPage() {
  const [equipmentList, setEquipmentList] = useState([
    { id: 'EQ-01', name: 'Servo-u Ventilator', category: 'Ventilator', department: 'ICU', status: 'Operational', lastCheck: 'Today, 08:30 AM' },
    { id: 'EQ-02', name: 'Giraffe Incubator', category: 'Incubator', department: 'NICU', status: 'Operational', lastCheck: 'Yesterday' },
    { id: 'EQ-03', name: 'Alaris Infusion Pump #4', category: 'Infusion Pump', department: 'General', status: 'In Use', lastCheck: '2 hours ago' },
    { id: 'EQ-04', name: 'IntelliVue Patient Monitor', category: 'Patient Monitor', department: 'Emergency', status: 'Operational', lastCheck: 'Today, 10:15 AM' },
    { id: 'EQ-05', name: 'Mindray Defibrillator', category: 'Emergency', department: 'Trauma Unit', status: 'Operational', lastCheck: '3 days ago' },
    { id: 'EQ-06', name: 'Hamilton-C6 Ventilator', category: 'Ventilator', department: 'ICU', status: 'Maintenance', lastCheck: 'Oct 11' },
    { id: 'EQ-07', name: 'B. Braun Perfusor', category: 'Infusion Pump', department: 'Surgery', status: 'Operational', lastCheck: 'Today, 06:45 AM' },
  ]);

  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');

  const filtered = equipmentList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.department.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCat === 'All' || item.category === filterCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <span className="page-breadcrumb">Operations & Resource / Equipment</span>
        <div className="page-title-row">
          <div className="page-title">
            <h1>Clinical Resources & Medical Equipment</h1>
          </div>
        </div>
      </div>

      {/* Equipment Categories */}
      <div className="sa-stats-grid" style={{ marginBottom: 'var(--space-6)' }}>
        {equipmentTypes.map((eq) => (
          <div key={eq.name} className="card sa-stat-card">
            <div className="sa-stat-icon" style={{ background: '#E8F0FE', color: '#578EF5' }}>
              <Activity size={22} />
            </div>
            <div className="sa-stat-body">
              <span className="stat-label">{eq.name}</span>
              <span className="stat-value">{eq.active} / {eq.count} active</span>
            </div>
          </div>
        ))}
      </div>

      {/* Equipment Registry Table */}
      <div className="card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div className="card-title">
            <Activity size={18} className="card-icon" />
            Device Inventory & Calibration Status
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <div style={{ position: 'relative', width: 240 }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
              <input
                type="text"
                placeholder="Search equipment..."
                className="form-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: 36, height: 36, fontSize: 'var(--text-xs)' }}
              />
            </div>
            <select
              className="form-input"
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              style={{ height: 36, fontSize: 'var(--text-xs)', width: 140 }}
            >
              <option value="All">All Categories</option>
              <option value="Ventilator">Ventilators</option>
              <option value="Incubator">Incubators</option>
              <option value="Infusion Pump">Infusion Pumps</option>
              <option value="Patient Monitor">Monitors</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Device Tag</th>
                <th>Model / Name</th>
                <th>Category</th>
                <th>Ward / Department</th>
                <th>Status</th>
                <th>Last Calibration</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.id}</strong></td>
                  <td style={{ fontWeight: 'var(--fw-semibold)' }}>{item.name}</td>
                  <td><span className="badge badge-primary">{item.category}</span></td>
                  <td>{item.department}</td>
                  <td>
                    <span className={`badge ${
                      item.status === 'Operational' ? 'badge-success' :
                      item.status === 'In Use' ? 'badge-info' : 'badge-danger'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                      <Clock size={13} color="var(--color-text-tertiary)" />
                      <span>{item.lastCheck}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
