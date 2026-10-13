import {
  UserCog, Shield, Check, X, Lock, Key, Users
} from 'lucide-react';
import { SEEDED_USERS } from '../../data/mockData';

export default function UsersOverview() {
  const permissions = [
    { endpoint: '/api/hospitals/**', method: 'GET', superAdmin: true, hospAdmin: true, publicUser: true },
    { endpoint: '/api/beds/**', method: 'GET', superAdmin: true, hospAdmin: true, publicUser: true },
    { endpoint: '/api/patients/**', method: 'GET', superAdmin: true, hospAdmin: true, publicUser: false },
    { endpoint: '/api/admissions/**', method: 'GET', superAdmin: true, hospAdmin: true, publicUser: false },
    { endpoint: '/api/ambulances/**', method: 'GET', superAdmin: true, hospAdmin: true, publicUser: false },
    { endpoint: '/api/**', method: 'POST / PUT / DELETE', superAdmin: true, hospAdmin: true, publicUser: false },
    { endpoint: '/swagger-ui/**', method: 'ALL', superAdmin: true, hospAdmin: true, publicUser: true },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <span className="page-breadcrumb">System Administration / Access Control</span>
        <div className="page-title-row">
          <div className="page-title">
            <h1>User Accounts & Role Permissions</h1>
          </div>
        </div>
      </div>

      {/* Users Cards */}
      <div className="sa-stats-grid" style={{ marginBottom: 'var(--space-6)', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {SEEDED_USERS.map((u) => {
          const roleBadgeColor =
            u.role === 'SUPER_ADMIN' ? 'badge-primary' :
            u.role === 'HOSPITAL_ADMIN' ? 'badge-success' : 'badge-warning';

          return (
            <div key={u.username} className="card" style={{ padding: 'var(--space-5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div className="avatar avatar-lg avatar-placeholder">
                  {u.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 'var(--fw-bold)' }}>{u.username}</h3>
                  <span className={`badge ${roleBadgeColor}`} style={{ marginTop: 4 }}>
                    {u.role.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div style={{ background: 'var(--color-background)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>Auth Method:</span>
                  <strong>HTTP Basic Auth</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Status:</span>
                  <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>Active / Seeded</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Permissions Matrix */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Shield size={18} className="card-icon" />
            Backend Security Authorization Matrix (SecurityConfig.java)
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Resource Endpoint</th>
                <th>HTTP Method</th>
                <th style={{ textAlign: 'center' }}>SUPER_ADMIN</th>
                <th style={{ textAlign: 'center' }}>HOSPITAL_ADMIN</th>
                <th style={{ textAlign: 'center' }}>PUBLIC_USER</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((p, i) => (
                <tr key={i}>
                  <td><code>{p.endpoint}</code></td>
                  <td><span className="badge badge-neutral">{p.method}</span></td>
                  <td style={{ textAlign: 'center' }}>
                    {p.superAdmin ? <Check size={18} color="var(--color-success)" style={{ margin: '0 auto' }} /> : <X size={18} color="var(--color-danger)" style={{ margin: '0 auto' }} />}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {p.hospAdmin ? <Check size={18} color="var(--color-success)" style={{ margin: '0 auto' }} /> : <X size={18} color="var(--color-danger)" style={{ margin: '0 auto' }} />}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {p.publicUser ? <Check size={18} color="var(--color-success)" style={{ margin: '0 auto' }} /> : <X size={18} color="var(--color-danger)" style={{ margin: '0 auto' }} />}
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
