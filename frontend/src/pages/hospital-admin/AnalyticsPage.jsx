import {
  BarChart3, Activity, Users, Clock, TrendingUp
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export default function HospitalAdminAnalyticsPage() {
  const hourlyOccupancy = [
    { hour: '00:00', occupancy: 78 },
    { hour: '04:00', occupancy: 75 },
    { hour: '08:00', occupancy: 82 },
    { hour: '12:00', occupancy: 89 },
    { hour: '16:00', occupancy: 87 },
    { hour: '20:00', occupancy: 84 },
  ];

  const deptCoverage = [
    { dept: 'Dental', onDuty: 3, target: 4 },
    { dept: 'Cardiology', onDuty: 4, target: 5 },
    { dept: 'Neurology', onDuty: 2, target: 3 },
    { dept: 'Surgery', onDuty: 5, target: 6 },
    { dept: 'Emergency', onDuty: 8, target: 8 },
    { dept: 'ICU', onDuty: 6, target: 6 },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <span className="page-breadcrumb">Hospital Management / Analytics</span>
        <div className="page-title-row">
          <div className="page-title">
            <h1>Operational Performance & Analytics</h1>
          </div>
        </div>
      </div>

      <div className="sa-charts-row" style={{ marginBottom: 'var(--space-6)' }}>
        {/* Hourly Occupancy */}
        <div className="card sa-chart-card">
          <div className="card-header">
            <div className="card-title">
              <TrendingUp size={18} className="card-icon" />
              24-Hour Bed Occupancy Fluctuations (%)
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={hourlyOccupancy}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
              <XAxis dataKey="hour" />
              <YAxis domain={[60, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="occupancy" stroke="#578EF5" strokeWidth={3} name="Occupancy %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Staff Duty Coverage */}
        <div className="card sa-chart-card">
          <div className="card-header">
            <div className="card-title">
              <Users size={18} className="card-icon" />
              Department Staffing Levels (Current vs. Target)
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={deptCoverage} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
              <XAxis dataKey="dept" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="onDuty" fill="#22C55E" radius={[6, 6, 0, 0]} name="On Duty Staff" />
              <Bar dataKey="target" fill="#CBD5E1" radius={[6, 6, 0, 0]} name="Target Staffing" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
