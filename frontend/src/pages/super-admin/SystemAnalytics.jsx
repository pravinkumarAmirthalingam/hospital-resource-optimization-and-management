import {
  BarChart3, Activity, TrendingUp, Users, BedDouble, Truck
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { mockHospitals, mockBeds, mockPatients, mockAdmissions } from '../../data/mockData';

const COLORS = ['#578EF5', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export default function SystemAnalytics() {
  const hospitalData = mockHospitals.map((h) => {
    const total = mockBeds.filter((b) => b.hospital.id === h.id).length;
    const occ = mockBeds.filter((b) => b.hospital.id === h.id && b.status === 'OCCUPIED').length;
    return {
      name: h.name.replace(' Hospital', '').replace(' Center', ''),
      total,
      occupied: occ,
      available: total - occ,
    };
  });

  const admissionTrends = [
    { day: 'Mon', admissions: 12, discharges: 8 },
    { day: 'Tue', admissions: 18, discharges: 14 },
    { day: 'Wed', admissions: 15, discharges: 11 },
    { day: 'Thu', admissions: 22, discharges: 16 },
    { day: 'Fri', admissions: 28, discharges: 19 },
    { day: 'Sat', admissions: 24, discharges: 20 },
    { day: 'Sun', admissions: 16, discharges: 12 },
  ];

  const conditionData = [
    { name: 'Cardiology', value: 24 },
    { name: 'Respiratory', value: 18 },
    { name: 'Orthopedic', value: 15 },
    { name: 'General / Post-op', value: 30 },
    { name: 'Pediatrics', value: 13 },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <span className="page-breadcrumb">System Administration / Analytics</span>
        <div className="page-title-row">
          <div className="page-title">
            <h1>Healthcare System Analytics</h1>
          </div>
        </div>
      </div>

      {/* Top Charts Row */}
      <div className="sa-charts-row" style={{ marginBottom: 'var(--space-6)' }}>
        {/* Weekly Inflow & Outflow */}
        <div className="card sa-chart-card">
          <div className="card-header">
            <div className="card-title">
              <TrendingUp size={18} className="card-icon" />
              Weekly Inpatient Flow (Admissions vs. Discharges)
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={admissionTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="admissions" stroke="#578EF5" strokeWidth={3} name="Admissions" />
              <Line type="monotone" dataKey="discharges" stroke="#22C55E" strokeWidth={3} name="Discharges" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Diagnosis Distribution */}
        <div className="card sa-chart-card">
          <div className="card-header">
            <div className="card-title">
              <Activity size={18} className="card-icon" />
              Clinical Diagnoses Distribution
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <ResponsiveContainer width="60%" height={260}>
              <PieChart>
                <Pie
                  data={conditionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {conditionData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 'var(--text-xs)' }}>
              {conditionData.map((c, i) => (
                <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS[i % COLORS.length] }} />
                  <span>{c.name}</span>
                  <strong style={{ marginLeft: 'auto' }}>{c.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Bed Capacities Bar Chart */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <BarChart3 size={18} className="card-icon" />
            Hospital Resource Allocation & Availability
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hospitalData} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="occupied" fill="#EF4444" radius={[6, 6, 0, 0]} name="Occupied Beds" />
            <Bar dataKey="available" fill="#22C55E" radius={[6, 6, 0, 0]} name="Available Beds" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
