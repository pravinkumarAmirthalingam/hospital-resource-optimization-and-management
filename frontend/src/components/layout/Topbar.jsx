import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import './Topbar.css';

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleLabels = {
    SUPER_ADMIN: 'Super Admin',
    HOSPITAL_ADMIN: 'Hospital Admin',
    PUBLIC_USER: 'Public User',
  };

  return (
    <header className="topbar" id="topbar">
      {/* Search */}
      <div className="topbar-search">
        <Search size={18} className="topbar-search-icon" />
        <input
          type="text"
          placeholder="Search patients, beds, hospitals..."
          className="topbar-search-input"
          id="global-search"
        />
      </div>

      {/* Right section */}
      <div className="topbar-right">
        {/* Notifications */}
        <button className="topbar-icon-btn" id="notifications-btn" data-tooltip="Notifications">
          <Bell size={20} />
          <span className="topbar-notification-dot" />
        </button>

        {/* Profile */}
        <div className="topbar-profile" onClick={() => setShowDropdown(!showDropdown)}>
          <div className="topbar-avatar avatar avatar-md avatar-placeholder">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="topbar-profile-info">
            <span className="topbar-profile-name">{user?.username}</span>
            <span className="topbar-profile-role">{roleLabels[user?.role]}</span>
          </div>
          <ChevronDown size={16} className="topbar-chevron" />

          {showDropdown && (
            <div className="topbar-dropdown animate-scale-in">
              <button className="topbar-dropdown-item" onClick={handleLogout} id="logout-btn">
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
