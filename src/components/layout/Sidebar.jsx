import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  ClipboardCheck,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  Briefcase
} from 'lucide-react';
import { Emblem } from '../common/Emblem';
import { getSessionUser } from '../../services/mockService';

export const Sidebar = ({ role = 'ADMIN', isMobileOpen = false, closeMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const user = getSessionUser();

  const handleSignOut = () => {
    navigate('/auth/login');
  };

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/organizations', label: 'Organizations', icon: Building2 },
    { path: '/admin/reports', label: 'Reports & Audits', icon: FileText },
  ];

  const orgLinks = [
    { path: '/organization/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/organization/teams', label: 'Team Management', icon: Users },
    { path: '/organization/inspections', label: 'Inspections', icon: ClipboardCheck },
    { path: '/organization/reports', label: 'Official Reports', icon: FileText },
  ];

  const links = role === 'ADMIN' ? adminLinks : orgLinks;

  return (
    <aside
      className={`portal-sidebar ${collapsed ? 'collapsed' : ''} ${
        isMobileOpen ? 'open-mobile' : ''
      }`}
    >
      {/* Sidebar Top Brand */}
      <div className="sidebar-header">
        <div className="sidebar-brand-wrap">
          <Emblem size={34} />
          {!collapsed && (
            <div>
              <div className="sidebar-title">SIH Inspection</div>
              <div className="sidebar-sub">
                {role === 'ADMIN' ? 'DOJS Central Admin' : 'Organization Portal'}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          className="sidebar-toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Role / Org Profile Card */}
      {!collapsed && (
        <div className="sidebar-role-badge">
          <div className="sidebar-role-label">
            {role === 'ADMIN' ? 'Authorized Oversight Cell' : 'Nodal Organization'}
          </div>
          <div className="sidebar-role-name">
            {role === 'ADMIN'
              ? 'DOJS Directorate (National)'
              : user?.orgName || 'State Education Directorate'}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              color: '#4ADE80',
              marginTop: '4px'
            }}
          >
            <Shield size={12} />
            <span>2FA Authenticated • Active</span>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              onClick={closeMobile}
              title={collapsed ? item.label : ''}
            >
              <Icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* Switch View Helper Link for Demo */}
        <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
          <Link
            to={role === 'ADMIN' ? '/organization/dashboard' : '/admin/dashboard'}
            className="sidebar-link"
            style={{
              backgroundColor: 'rgba(232, 117, 34, 0.15)',
              color: '#FFB37C',
              border: '1px dashed rgba(232, 117, 34, 0.4)'
            }}
            title="Switch portal view"
          >
            <Briefcase size={16} />
            {!collapsed && (
              <span>
                Switch to {role === 'ADMIN' ? 'Org View' : 'DOJS Admin'}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Sidebar Footer / Sign Out */}
      <div className="sidebar-footer">
        <button
          type="button"
          className="sidebar-signout-btn"
          onClick={handleSignOut}
          title="Sign Out"
        >
          <LogOut size={16} />
          {!collapsed && <span>Secure Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
