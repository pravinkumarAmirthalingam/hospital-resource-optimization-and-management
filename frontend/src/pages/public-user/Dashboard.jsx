import { useState } from 'react';
import {
  Building2, BedDouble, Search, PhoneCall, MapPin,
  Clock, ShieldCheck, HeartPulse, ChevronRight, CheckCircle2
} from 'lucide-react';
import { mockHospitals, mockBeds } from '../../data/mockData';
import './PublicUserDashboard.css';

export default function PublicUserDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const bedTypes = ['All', 'General', 'ICU', 'Pediatric', 'Maternity', 'Surgery'];

  const availableBeds = mockBeds.filter((b) => b.status === 'AVAILABLE');

  const filteredHospitals = mockHospitals.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedType === 'All') return matchesSearch;
    
    const hasBedType = mockBeds.some(
      (b) => b.hospital.id === h.id && b.type === selectedType && b.status === 'AVAILABLE'
    );
    return matchesSearch && hasBedType;
  });

  return (
    <div className="public-dashboard animate-fade-in">
      {/* Hero Banner */}
      <div className="public-hero">
        <div className="public-hero-content">
          <div className="public-hero-badge">
            <HeartPulse size={16} />
            <span>Public Health & Hospital Resource Portal</span>
          </div>
          <h1 className="public-hero-title">
            Find Real-Time Hospital Beds & Emergency Resources
          </h1>
          <p className="public-hero-desc">
            Search verified bed availability, emergency care centers, and contact information across Metro City in real time.
          </p>

          <div className="public-search-box">
            <Search size={20} className="public-search-icon" />
            <input
              type="text"
              placeholder="Search by hospital name or area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="public-search-input"
              id="public-hospital-search"
            />
          </div>
        </div>

        <div className="public-emergency-card">
          <div className="public-emergency-header">
            <PhoneCall size={20} />
            <span>24/7 Emergency Dispatch</span>
          </div>
          <div className="public-emergency-number">108 / 112</div>
          <p className="public-emergency-desc">
            For critical trauma, cardiac emergencies, or urgent ambulance requests.
          </p>
          <div className="public-emergency-badges">
            <span className="emergency-badge">
              <CheckCircle2 size={13} /> 24/7 Toll-Free
            </span>
            <span className="emergency-badge">
              <CheckCircle2 size={13} /> GPS Dispatch
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Strip */}
      <div className="public-stats-grid">
        <div className="card public-stat-card">
          <div className="public-stat-icon" style={{ background: '#EBF4FF', color: '#3B82F6' }}>
            <Building2 size={24} />
          </div>
          <div>
            <div className="stat-value">{mockHospitals.length}</div>
            <div className="stat-label">Network Hospitals</div>
          </div>
        </div>

        <div className="card public-stat-card">
          <div className="public-stat-icon" style={{ background: '#ECFDF5', color: '#10B981' }}>
            <BedDouble size={24} />
          </div>
          <div>
            <div className="stat-value">{availableBeds.length}</div>
            <div className="stat-label">Beds Currently Available</div>
          </div>
        </div>

        <div className="card public-stat-card">
          <div className="public-stat-icon" style={{ background: '#FEF3C7', color: '#F59E0B' }}>
            <Clock size={24} />
          </div>
          <div>
            <div className="stat-value">&lt; 3 mins</div>
            <div className="stat-label">Real-Time Refresh Rate</div>
          </div>
        </div>

        <div className="card public-stat-card">
          <div className="public-stat-icon" style={{ background: '#F3E8FF', color: '#8B5CF6' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <div className="stat-value">100%</div>
            <div className="stat-label">Verified Medical Centers</div>
          </div>
        </div>
      </div>

      {/* Bed Type Filters */}
      <div className="public-filter-section">
        <div className="public-filter-label">Filter by Available Bed Type:</div>
        <div className="filter-tags">
          {bedTypes.map((type) => (
            <button
              key={type}
              className={`filter-tag ${selectedType === type ? 'active' : ''}`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Hospital Directory Cards */}
      <div className="public-hospitals-section">
        <div className="section-header">
          <h2>Network Hospitals & Availability</h2>
          <span className="results-count">Showing {filteredHospitals.length} hospitals</span>
        </div>

        <div className="public-hospitals-grid">
          {filteredHospitals.map((hospital) => {
            const hBeds = mockBeds.filter((b) => b.hospital.id === hospital.id);
            const hAvailable = hBeds.filter((b) => b.status === 'AVAILABLE');
            const icuAvailable = hBeds.filter((b) => b.type === 'ICU' && b.status === 'AVAILABLE').length;

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
                  <span className={`badge ${hAvailable.length > 0 ? 'badge-success' : 'badge-neutral'}`}>
                    {hAvailable.length > 0 ? `${hAvailable.length} Beds Open` : 'Full Occupancy'}
                  </span>
                </div>

                <div className="public-card-divider" />

                <div className="public-card-bed-breakdown">
                  <div className="bed-chip">
                    <span className="bed-chip-count">{hAvailable.length}</span>
                    <span className="bed-chip-label">Total Open</span>
                  </div>
                  <div className="bed-chip">
                    <span className="bed-chip-count">{icuAvailable}</span>
                    <span className="bed-chip-label">ICU Open</span>
                  </div>
                  <div className="bed-chip">
                    <span className="bed-chip-count">{hBeds.length}</span>
                    <span className="bed-chip-label">Total Capacity</span>
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
    </div>
  );
}
