import { useState } from 'react';
import {
  Building2, Search, MapPin, PhoneCall, BedDouble, CheckCircle2, Navigation
} from 'lucide-react';
import { mockHospitals, mockBeds } from '../../data/mockData';

export default function PublicHospitalSearch() {
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');

  const locations = ['All', ...new Set(mockHospitals.map((h) => h.location.split(',')[0].trim()))];

  const filtered = mockHospitals.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase());
    const matchesLoc = locationFilter === 'All' || h.location.includes(locationFilter);
    return matchesSearch && matchesLoc;
  });

  return (
    <div className="animate-fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div className="page-header">
        <span className="page-breadcrumb">Public Portal / Directory</span>
        <div className="page-title-row">
          <div className="page-title">
            <h1>Find Network Hospitals & Emergency Care</h1>
          </div>
        </div>
      </div>

      {/* Search & Location Filter */}
      <div className="card" style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-5)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
            <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search by hospital name or area..."
              className="form-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 42 }}
              id="public-hosp-search-input"
            />
          </div>
          <select
            className="form-input"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            style={{ width: 200 }}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc === 'All' ? 'All Districts' : loc}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Hospital Cards Grid */}
      <div className="public-hospitals-grid">
        {filtered.map((hospital) => {
          const hBeds = mockBeds.filter((b) => b.hospital.id === hospital.id);
          const availableBeds = hBeds.filter((b) => b.status === 'AVAILABLE');

          return (
            <div key={hospital.id} className="card public-hospital-card">
              <div className="public-card-header">
                <div>
                  <h3 className="public-hospital-name">{hospital.name}</h3>
                  <div className="public-hospital-loc">
                    <MapPin size={14} />
                    <span>{hospital.location}</span>
                  </div>
                </div>
                <span className={`badge ${availableBeds.length > 0 ? 'badge-success' : 'badge-neutral'}`}>
                  {availableBeds.length} Open
                </span>
              </div>

              <div className="public-card-divider" />

              <div className="public-card-bed-breakdown">
                <div className="bed-chip">
                  <span className="bed-chip-count">{availableBeds.length}</span>
                  <span className="bed-chip-label">Available</span>
                </div>
                <div className="bed-chip">
                  <span className="bed-chip-count">{hBeds.length - availableBeds.length}</span>
                  <span className="bed-chip-label">Occupied</span>
                </div>
                <div className="bed-chip">
                  <span className="bed-chip-count">{hBeds.length}</span>
                  <span className="bed-chip-label">Total Beds</span>
                </div>
              </div>

              <div className="public-card-footer">
                <div className="public-hospital-phone">
                  <PhoneCall size={14} />
                  <span>{hospital.phone}</span>
                </div>
                <a href={`tel:${hospital.phone.replace(/\s+/g, '')}`} className="btn btn-primary btn-sm">
                  Call Hospital
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
