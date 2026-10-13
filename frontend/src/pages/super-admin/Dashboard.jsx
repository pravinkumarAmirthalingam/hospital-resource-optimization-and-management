import {
  Building2, BedDouble, Users, Truck, ClipboardList,
  Activity, ArrowUpRight, TrendingUp, TrendingDown, BarChart3
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { systemStats, mockHospitals, mockBeds, mockPatients, mockAmbulances } from '../../data/mockData';
import './SuperAdminDashboard.css';

const COLORS = ['#578EF5', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'];

const bedByType = mockBeds.reduce((acc, bed) => {
  const existing = acc.find((b) => b.name === bed.type);
  if (existing) existing.value += 1;
  else acc.push({ name: bed.type, value: 1 });
  return acc;
}, []);

const hospitalBedData = mockHospitals.map((h) => ({
  name: h.name.split(' ').slice(0, 2).join(' '),
  beds: mockBeds.filter((b) => b.hospital.id === h.id).length,
  occupied: mockBeds.filter((b) => b.hospital.id === h.id && b.status === 'OCCUPIED').length,
}));

export default function SuperAdminDashboard() {
  const stats = [
    { label: 'Total Hospitals', value: systemStats.totalHospitals, icon: Building2, color: '#578EF5', trend: '+2', up: true },
    { label: 'Total Beds',      value: systemStats.totalBeds,      icon: BedDouble,     color: '#22C55E', trend: '+5', up: true },
    { label: 'Total Patients',  value: systemStats.totalPatients,  icon: Users,         color: '#F59E0B', trend: '+3', up: true },
    { label: 'Active Admissions', value: systemStats.activeAdmissions, icon: ClipboardList, color: '#8B5CF6', trend: '-1', up: false },
    { label: 'Ambulances',      value: systemStats.totalAmbulances, icon: Truck,         color: '#EF4444', trend: '0', up: true },
    { label: 'Occupancy Rate',  value: `${systemStats.occupancyRate}%`, icon: Activity, color: '#578EF5', trend: '+4%', up: true },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <span className="page-breadcrumb">System Administration</span>
        <div className="page-title-row">
          <div className="page-title">
            <h1>System Dashboard</h1>
            <span className="status-dot status-dot-live" />
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-success)', fontWeight: 500 }}>Live</span>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary" id="btn-export-report">
              <BarChart3 size={16} /> Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="sa-stats-grid">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card sa-stat-card animate-slide-up">
              <div className="sa-stat-icon" style={{ background: `${s.color}15`, color: s.color }}>
                <Icon size={22} />
              </div>
              <div className="sa-stat-body">
                <span className="stat-label">{s.label}</span>
                <span className="stat-value" style={{ fontSize: 'var(--text-2xl)' }}>{s.value}</span>
              </div>
              <div className={`sa-stat-trend ${s.up ? 'up' : 'down'}`}>
                {s.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{s.trend}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="sa-charts-row">
        {/* Bed Distribution Pie */}
        <div className="card sa-chart-card">
          <div className="card-header">
            <div className="card-title">
              <BedDouble size={18} className="card-icon" />
              Bed Distribution by Type
            </div>
            <div className="card-action"><ArrowUpRight size={16} /></div>
          </div>
          <div className="sa-pie-container">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={bedByType}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {bedByType.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="sa-pie-legend">
              {bedByType.map((b, i) => (
                <div key={b.name} className="sa-legend-item">
                  <span className="sa-legend-dot" style={{ background: COLORS[i % COLORS.length] }} />
                  <span>{b.name}</span>
                  <span className="sa-legend-count">{b.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Beds per Hospital Bar Chart */}
        <div className="card sa-chart-card">
          <div className="card-header">
            <div className="card-title">
              <Building2 size={18} className="card-icon" />
              Beds per Hospital
            </div>
            <div className="card-action"><ArrowUpRight size={16} /></div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={hospitalBedData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="beds" fill="#578EF5" radius={[6, 6, 0, 0]} name="Total Beds" />
              <Bar dataKey="occupied" fill="#22C55E" radius={[6, 6, 0, 0]} name="Occupied" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Hospitals Table */}
      <div className="card" style={{ marginTop: 'var(--space-6)' }}>
        <div className="card-header">
          <div className="card-title">
            <Building2 size={18} className="card-icon" />
            Registered Hospitals
          </div>
          <div className="card-action"><ArrowUpRight size={16} /></div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Hospital Name</th>
                <th>Location</th>
                <th>Phone</th>
                <th>Beds</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockHospitals.map((h) => {
                const beds = mockBeds.filter((b) => b.hospital.id === h.id);
                return (
                  <tr key={h.id}>
                    <td>#{h.id}</td>
                    <td style={{ fontWeight: 'var(--fw-semibold)' }}>{h.name}</td>
                    <td>{h.location}</td>
                    <td>{h.phone}</td>
                    <td>{beds.length}</td>
                    <td><span className="badge badge-success">Active</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
