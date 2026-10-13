import { useState } from 'react';
import {
  BedDouble, Users, Activity, ArrowUpRight, AlertTriangle,
  ChevronLeft, ChevronRight, Plus, Clock, Info
} from 'lucide-react';
import ProgressCircle from '../../components/charts/ProgressCircle';
import {
  dashboardStats, mockStaff, mockSchedule, equipmentTypes,
  departments, calendarDays
} from '../../data/mockData';
import './HospitalAdminDashboard.css';

export default function HospitalAdminDashboard() {
  const [bedTab, setBedTab] = useState('Bed');
  const [activeDept, setActiveDept] = useState('All');
  const [activeEquipment, setActiveEquipment] = useState('Ventilator');

  const featured = mockStaff.find((s) => s.featured);
  const onDutyStaff = mockStaff.filter((s) => s.onDuty);
  const filteredSchedule = activeDept === 'All'
    ? mockSchedule
    : mockSchedule.filter((s) => s.dept === activeDept);

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <span className="page-breadcrumb">Resources</span>
        <div className="page-title-row">
          <div className="page-title">
            <h1>Operations & Resource</h1>
            <span className="status-dot status-dot-live" />
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-success)', fontWeight: 500 }}>Live</span>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary" id="btn-today">
              <Clock size={16} /> Today
            </button>
            <button className="btn btn-secondary" id="btn-alerts">
              <AlertTriangle size={16} /> View Alerts
            </button>
            <button className="btn btn-primary" id="btn-add-staff">
              <Plus size={16} /> Add Staff
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="ha-grid">
        {/* ── Left Column ──────────────────── */}
        <div className="ha-left">
          {/* Row 1: Bed Overview + Stats */}
          <div className="ha-row-1">
            {/* Bed & Room Overview */}
            <div className="card ha-bed-overview">
              <div className="card-header">
                <div className="card-title">
                  <BedDouble size={18} className="card-icon" />
                  Bed & Room Overview
                </div>
                <div className="card-action"><ArrowUpRight size={16} /></div>
              </div>

              <div className="pill-tabs" style={{ marginBottom: 'var(--space-5)', alignSelf: 'flex-start' }}>
                <button
                  className={`pill-tab ${bedTab === 'Bed' ? 'active' : ''}`}
                  onClick={() => setBedTab('Bed')}
                >Bed</button>
                <button
                  className={`pill-tab ${bedTab === 'Room' ? 'active' : ''}`}
                  onClick={() => setBedTab('Room')}
                >Room</button>
              </div>

              <div className="ha-bed-content">
                <div className="ha-bed-visual">
                  <div className="ha-bed-ready-badge">
                    <span className="status-dot status-dot-live" />
                    {dashboardStats.availableBeds} beds ready to use
                  </div>
                  <div className="ha-bed-image" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 0' }}>
                    <button className="carousel-nav-btn" style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', background: 'white', border: '1px solid var(--color-border)', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
                      <ChevronLeft size={16} color="var(--color-text-secondary)" />
                    </button>
                    <svg width="220" height="130" viewBox="0 0 220 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="mattressGrad" x1="40" y1="30" x2="180" y2="90" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="60%" stopColor="#EEF2F6" />
                          <stop offset="100%" stopColor="#DFE5EC" />
                        </linearGradient>
                        <linearGradient id="frameGrad" x1="30" y1="60" x2="190" y2="100" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#CBD5E1" />
                          <stop offset="100%" stopColor="#94A3B8" />
                        </linearGradient>
                        <linearGradient id="pillowGrad" x1="130" y1="20" x2="180" y2="45" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="100%" stopColor="#E2E8F0" />
                        </linearGradient>
                        <filter id="bedShadow" x="15" y="75" width="190" height="50" filterUnits="userSpaceOnUse">
                          <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.12" floodColor="#0F172A" />
                        </filter>
                      </defs>
                      {/* Bed Floor Shadow */}
                      <ellipse cx="110" cy="105" rx="85" ry="16" fill="#0F172A" opacity="0.08" />
                      {/* Wheels / Casters */}
                      <rect x="38" y="98" width="8" height="12" rx="4" fill="#64748B" />
                      <rect x="68" y="98" width="8" height="12" rx="4" fill="#64748B" />
                      <rect x="152" y="98" width="8" height="12" rx="4" fill="#64748B" />
                      <rect x="180" y="98" width="8" height="12" rx="4" fill="#64748B" />
                      {/* Bottom Frame */}
                      <path d="M35 88 L185 88 L180 98 L40 98 Z" fill="url(#frameGrad)" />
                      {/* Bed Body Base */}
                      <rect x="32" y="68" width="156" height="22" rx="5" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" filter="url(#bedShadow)" />
                      <rect x="42" y="74" width="40" height="10" rx="3" fill="#578EF5" opacity="0.8" />
                      <circle cx="95" cy="79" r="3" fill="#22C55E" />
                      <circle cx="105" cy="79" r="3" fill="#578EF5" />
                      {/* Mattress */}
                      <path d="M34 56 C34 50 42 46 54 44 L166 26 C176 24 186 28 186 36 L186 68 L34 68 Z" fill="url(#mattressGrad)" stroke="#CBD5E1" strokeWidth="1" />
                      {/* Pillow */}
                      <path d="M142 32 C142 27 150 25 160 25 L174 25 C180 25 184 29 184 34 L180 44 L144 42 Z" fill="url(#pillowGrad)" stroke="#CBD5E1" strokeWidth="1" />
                      {/* Raised Headboard */}
                      <rect x="178" y="16" width="12" height="52" rx="4" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />
                      {/* Footboard */}
                      <rect x="30" y="48" width="10" height="32" rx="4" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />
                      {/* Side Safety Rail */}
                      <rect x="80" y="44" width="55" height="16" rx="4" fill="#FFFFFF" fillOpacity="0.8" stroke="#578EF5" strokeWidth="1.5" />
                      <line x1="98" y1="44" x2="98" y2="60" stroke="#578EF5" strokeWidth="1" />
                      <line x1="116" y1="44" x2="116" y2="60" stroke="#578EF5" strokeWidth="1" />
                      {/* IV Pole on Left */}
                      <line x1="172" y1="6" x2="172" y2="40" stroke="#94A3B8" strokeWidth="2" />
                      <path d="M165 10 C165 7 179 7 179 10" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
                      <circle cx="172" cy="6" r="2" fill="#578EF5" />
                    </svg>
                    <button className="carousel-nav-btn" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'white', border: '1px solid var(--color-border)', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
                      <ChevronRight size={16} color="var(--color-text-secondary)" />
                    </button>
                  </div>
                  <h3 style={{ fontSize: 'var(--text-md)', marginTop: 'var(--space-3)' }}>General Electric Bed</h3>
                  <div className="ha-bed-tags">
                    <span className="badge badge-primary">General</span>
                    <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-xs)' }}>• {dashboardStats.availableBeds} beds</span>
                  </div>
                  <p className="ha-bed-desc">
                    Electric bed for general inpatient care, with adjustable positioning, and IV pole.
                  </p>
                  <div className="ha-bed-actions">
                    <button className="btn btn-primary btn-sm" id="btn-reserve-bed">Reserve Bed</button>
                    <button className="btn btn-secondary btn-sm" id="btn-view-details">View Details</button>
                  </div>
                  <div className="ha-bed-cleaned">
                    <Clock size={14} />
                    <span>Cleaned • 2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="ha-stat-grid">
              {/* Bed Occupied */}
              <div className="card ha-stat-card">
                <div className="card-header">
                  <span className="card-title">Bed<br/>Occupied</span>
                  <div className="card-action"><ArrowUpRight size={14} /></div>
                </div>
                <div className="ha-stat-row">
                  <span className="stat-value">{dashboardStats.bedOccupied}<span className="stat-unit">%</span></span>
                  <span className="stat-label">occupied</span>
                </div>
              </div>

              {/* Staff Coverage */}
              <div className="card ha-stat-card">
                <div className="card-header">
                  <span className="card-title">Staff<br/>Coverage</span>
                  <div className="card-action"><ArrowUpRight size={14} /></div>
                </div>
                <div className="ha-stat-row">
                  <span className="stat-value">{dashboardStats.staffCoverage}<span className="stat-unit">%</span></span>
                  <span className="stat-label">on duty</span>
                </div>
              </div>

              {/* Operating Rooms */}
              <div className="card ha-stat-card">
                <div className="card-header">
                  <span className="card-title">Operating<br/>Rooms</span>
                </div>
                <div className="ha-stat-row">
                  <span className="stat-value">{dashboardStats.operatingRooms}<span className="stat-unit">%</span></span>
                  <span className="stat-label">utilization</span>
                </div>
              </div>

              {/* Department Load */}
              <div className="card ha-stat-card">
                <div className="card-header">
                  <span className="card-title">Department<br/>Load</span>
                </div>
                <div className="ha-stat-row">
                  <span className="stat-value">&gt;{dashboardStats.departmentLoad}<span className="stat-unit">%</span></span>
                  <span className="stat-label">capacity</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Equipment + Schedule */}
          <div className="ha-row-2">
            {/* Equipment Insight */}
            <div className="card ha-equipment">
              <div className="card-header">
                <div className="card-title">
                  <Activity size={18} className="card-icon" />
                  Equipments Insight
                </div>
                <div className="card-action"><ArrowUpRight size={16} /></div>
              </div>

              <div className="filter-tags" style={{ marginBottom: 'var(--space-5)' }}>
                {equipmentTypes.map((eq) => (
                  <button
                    key={eq.name}
                    className={`filter-tag ${activeEquipment === eq.name ? 'active' : ''}`}
                    onClick={() => setActiveEquipment(eq.name)}
                  >
                    {eq.name}
                  </button>
                ))}
              </div>

              <div className="ha-equipment-body">
                <ProgressCircle
                  value={dashboardStats.equipmentHealth}
                  size={140}
                  strokeWidth={12}
                  color="var(--color-primary)"
                  label="available"
                />
                <div className="ha-equipment-stat">
                  <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--fw-bold)' }}>
                    {dashboardStats.equipmentAvailable}/{equipmentTypes.reduce((a, e) => a + e.count, 0)}
                  </span>
                  <span className="stat-label">available</span>
                </div>
              </div>

              <div className="ha-key-insight">
                <Info size={14} />
                <span><strong>Key Insight:</strong> Equipment usage is within safe limits.</span>
              </div>
            </div>

            {/* Staff Schedule */}
            <div className="card ha-schedule">
              <div className="card-header">
                <div className="card-title">
                  <Users size={18} className="card-icon" />
                  Staff Schedule
                </div>
                <div className="ha-schedule-month">
                  <ChevronLeft size={16} style={{ cursor: 'pointer' }} />
                  <span>December 2025</span>
                  <ChevronRight size={16} style={{ cursor: 'pointer' }} />
                </div>
              </div>

              {/* Calendar Strip */}
              <div className="ha-calendar-strip">
                <ChevronLeft size={16} className="ha-cal-nav" />
                {calendarDays.map((d) => (
                  <div key={d.date} className={`ha-cal-day ${d.isToday ? 'today' : ''}`}>
                    <span className="ha-cal-day-name">{d.day}</span>
                    <span className="ha-cal-day-num">{d.date}</span>
                    {d.isToday && <span className="ha-cal-dot" />}
                  </div>
                ))}
                <ChevronRight size={16} className="ha-cal-nav" />
              </div>

              {/* Department Filters */}
              <div className="filter-tags" style={{ marginBottom: 'var(--space-4)' }}>
                {departments.map((dept) => (
                  <button
                    key={dept}
                    className={`filter-tag ${activeDept === dept ? 'active' : ''}`}
                    onClick={() => setActiveDept(dept)}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              {/* Schedule List */}
              <div className="ha-schedule-list">
                {filteredSchedule.map((item, i) => (
                  <div key={i} className="ha-schedule-item">
                    <span className="ha-schedule-time">{item.time}</span>
                    <div className="ha-schedule-detail">
                      <div className="ha-schedule-dot-line">
                        <span className="ha-schedule-dot" style={{
                          background: item.dept === 'Dental' ? 'var(--color-primary)' :
                            item.dept === 'Surgery' ? 'var(--color-success)' :
                            item.dept === 'Emergency' ? 'var(--color-danger)' : 'var(--color-warning)'
                        }} />
                      </div>
                      <div>
                        <span className="ha-schedule-staff">{item.staff}</span>
                        {item.assistant && (
                          <span className="ha-schedule-assistant">
                            <span className="status-dot" style={{ background: 'var(--color-success)', width: 6, height: 6 }} />
                            {item.assistant}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Active Staff ────── */}
        <div className="ha-right">
          <div className="card ha-active-staff">
            <div className="card-header">
              <div className="card-title">
                <Users size={18} className="card-icon" />
                Active Staff
              </div>
              <div className="card-action"><ArrowUpRight size={16} /></div>
            </div>

            {/* Featured Doctor */}
            {featured && (
              <div className="ha-featured-doctor">
                <div className="ha-featured-status">
                  <span className="badge badge-success">
                    <span className="status-dot status-dot-live" style={{ width: 6, height: 6 }} />
                    On Duty
                  </span>
                </div>
                <div className="ha-featured-avatar avatar avatar-xl avatar-placeholder">
                  {featured.name.split(' ').pop().charAt(0)}
                </div>
                <h3 className="ha-featured-name">{featured.name}</h3>
                <div className="ha-featured-meta">
                  <span className="badge badge-neutral">{featured.role}</span>
                  <span className="badge badge-neutral">{featured.dept}</span>
                  <span className="badge badge-neutral">{featured.code}</span>
                </div>
              </div>
            )}

            {/* On Duty List */}
            <div className="ha-duty-section">
              <div className="ha-duty-header">
                <span>On Duty Staff</span>
                <ChevronRight size={14} />
              </div>
              <div className="ha-duty-list">
                {onDutyStaff.map((doc) => (
                  <div key={doc.id} className="ha-duty-item">
                    <div className="ha-duty-avatar avatar avatar-sm avatar-placeholder">
                      {doc.name.split(' ').pop().charAt(0)}
                    </div>
                    <div className="ha-duty-info">
                      <span className="ha-duty-name">{doc.name}</span>
                      <span className="ha-duty-dept">{doc.dept}</span>
                    </div>
                    <span className="badge badge-success" style={{ fontSize: '0.625rem', padding: '1px 6px' }}>
                      On Duty
                    </span>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-4)' }} id="btn-add-staff-bottom">
                <Plus size={16} /> Add Staff
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
