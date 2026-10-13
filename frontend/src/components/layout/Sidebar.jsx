import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { navConfig } from '../../data/mockData';
import * as Icons from 'lucide-react';
import './Sidebar.css';

const roleTitles = {
  SUPER_ADMIN: 'System Admin',
  HOSPITAL_ADMIN: 'Hospital Admin',
  PUBLIC_USER: 'Public Portal',
};

export default function Sidebar() {
  const { role } = useAuth();
  const location = useLocation();
  const navItems = navConfig[role] || [];

  return (
    <aside className="sidebar" id="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Icons.Cross size={22} />
        </div>
        <div className="sidebar-logo-text">
          <span className="sidebar-logo-name">MedResource</span>
          <span className="sidebar-logo-role">{roleTitles[role]}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Main Menu</div>
        {navItems.map((item) => {
          const Icon = Icons[item.icon] || Icons.Circle;
          const isActive =
            item.path === location.pathname ||
            (item.path !== '/' &&
              location.pathname.startsWith(item.path) &&
              item.path.split('/').length >= location.pathname.split('/').length);
          return (
            <NavLink
              key={item.key}
              to={item.path}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              id={`nav-${item.key}`}
              end={item.path === '/super-admin' || item.path === '/hospital-admin' || item.path === '/public'}
            >
              <Icon size={20} className="sidebar-link-icon" />
              <span className="sidebar-link-text">{item.label}</span>
              {isActive && <div className="sidebar-link-indicator" />}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-badge">
          <Icons.Shield size={14} />
          <span>{role ? role.replace('_', ' ') : 'PORTAL'}</span>
        </div>
      </div>
    </aside>
  );
}
