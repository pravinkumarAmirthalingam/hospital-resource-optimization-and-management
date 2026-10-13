import { useState } from 'react';
import {
  BedDouble, Search, Building2, CheckCircle2, Filter
} from 'lucide-react';
import { mockBeds, mockHospitals } from '../../data/mockData';

export default function PublicBedAvailability() {
  const [filterType, setFilterType] = useState('All');
  const [filterHospital, setFilterHospital] = useState('All');

  const bedTypes = ['All', 'General', 'ICU', 'Pediatric', 'Maternity', 'Surgery'];

  const availableBeds = mockBeds.filter((b) => b.status === 'AVAILABLE');

  const filtered = availableBeds.filter((b) => {
    const matchesType = filterType === 'All' || b.type === filterType;
    const matchesHosp = filterHospital === 'All' || b.hospital.id === Number(filterHospital);
    return matchesType && matchesHosp;
  });

  return (
    <div className="animate-fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div className="page-header">
        <span className="page-breadcrumb">Public Portal / Live Inventory</span>
        <div className="page-title-row">
          <div className="page-title">
            <h1>Live Hospital Bed Availability</h1>
            <span className="status-dot status-dot-live" />
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-success)', fontWeight: 500 }}>Live Feed</span>
          </div>
        </div>
      </div>

      {/* Filter Card */}
      <div className="card" style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-4) var(--space-5)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--color-text-secondary)' }}>
            Filter Available Beds:
          </span>
          <select
            className="form-input"
            value={filterHospital}
            onChange={(e) => setFilterHospital(e.target.value)}
            style={{ width: 200, height: 38, fontSize: 'var(--text-xs)' }}
          >
            <option value="All">All Hospitals</option>
            {mockHospitals.map((h) => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>

          <div className="filter-tags">
            {bedTypes.map((type) => (
              <button
                key={type}
                className={`filter-tag ${filterType === type ? 'active' : ''}`}
                onClick={() => setFilterType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Available Beds Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <BedDouble size={18} className="card-icon" />
            Available Bed Registry ({filtered.length} Open Beds)
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Bed ID</th>
                <th>Hospital</th>
                <th>Location</th>
                <th>Ward / Care Unit</th>
                <th>Availability</th>
                <th>Contact Desk</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((bed) => (
                <tr key={bed.id}>
                  <td><strong>BED-#{String(bed.id).padStart(3, '0')}</strong></td>
                  <td style={{ fontWeight: 'var(--fw-semibold)' }}>{bed.hospital?.name}</td>
                  <td>{bed.hospital?.location}</td>
                  <td><span className="badge badge-primary">{bed.type}</span></td>
                  <td>
                    <span className="badge badge-success">
                      <span className="status-dot status-dot-live" style={{ width: 6, height: 6 }} />
                      Available Now
                    </span>
                  </td>
                  <td>
                    <a
                      href={`tel:${bed.hospital?.phone?.replace(/\s+/g, '')}`}
                      style={{ color: 'var(--color-primary)', fontWeight: 'var(--fw-medium)', textDecoration: 'none' }}
                    >
                      {bed.hospital?.phone}
                    </a>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-tertiary)' }}>
                    No available beds match the selected filters at this time.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
