import React, { useState, useEffect } from 'react';
import {
  Menu,
  Bell,
  Search,
  RotateCcw,
  Clock,
  Volume2,
  VolumeX,
  Sparkles,
  Command
} from 'lucide-react';
import { getAlerts, resetToDefaultData, getSessionUser } from '../../services/mockService';
import { NotificationDrawer } from './NotificationDrawer';
import { CommandPalette } from '../common/CommandPalette';
import { soundFx } from '../../utils/soundEffects';

export const Topbar = ({
  pageTitle,
  breadcrumbs = [],
  openMobile,
  onDataReset,
  onOpenCreateOrg,
  onOpenCreateInsp,
  onOpenCreateTeam,
  onOpenGenerateReport,
  onSelectInspection
}) => {
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(soundFx.isEnabled());
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const user = getSessionUser();

  // Expose global window handler for Cmd+K
  useEffect(() => {
    window.__openCommandPalette = () => setCmdOpen(true);
    return () => {
      delete window.__openCommandPalette;
    };
  }, []);

  const syncAlertCount = () => {
    const alerts = getAlerts();
    const count = alerts.filter((a) => !a.isRead).length;
    setUnreadCount(count);
  };

  useEffect(() => {
    syncAlertCount();

    const updateClock = () => {
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(now);
      setCurrentTime(`${timeStr} IST`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCloseDrawer = () => {
    setAlertsOpen(false);
    syncAlertCount();
  };

  const handleToggleSound = () => {
    const state = soundFx.toggleSound();
    setSoundActive(state);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo portal data (Organizations, Teams, Inspections, Reports) to official defaults?')) {
      resetToDefaultData();
      if (onDataReset) onDataReset();
      soundFx.play('success');
      window.location.reload();
    }
  };

  return (
    <>
      <header className="portal-topbar">
        <div className="topbar-left">
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={openMobile}
            style={{ display: 'flex', marginRight: '6px' }}
          >
            <Menu size={20} />
          </button>

          <div className="topbar-page-info">
            <h2>{pageTitle}</h2>
            <div className="topbar-breadcrumb">
              <span>Portal</span>
              {breadcrumbs.map((b, i) => (
                <React.Fragment key={i}>
                  <span>/</span>
                  <span style={{ color: i === breadcrumbs.length - 1 ? 'var(--navy-deep)' : 'inherit', fontWeight: i === breadcrumbs.length - 1 ? 600 : 400 }}>
                    {b}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="topbar-right">
          {/* Universal Quick Search Bar / Cmd+K Trigger */}
          <button
            type="button"
            className="topbar-search-trigger hidden-mobile"
            onClick={() => setCmdOpen(true)}
            title="Quick Telemetry & Command Search (Cmd + K)"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              borderRadius: 'var(--radius-sm)',
              padding: '5px 12px',
              fontSize: '12px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Search size={14} style={{ color: 'var(--blue-gov)' }} />
            <span>Search portal or telemetry...</span>
            <kbd
              style={{
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '3px',
                padding: '1px 5px',
                fontSize: '10px',
                fontWeight: 700,
                color: 'var(--navy-deep)'
              }}
            >
              ⌘K
            </kbd>
          </button>

          {/* Live IST Clock */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: 'var(--text-muted)',
              background: 'var(--bg-main)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)'
            }}
            className="hidden-mobile"
          >
            <Clock size={13} style={{ color: 'var(--blue-gov)' }} />
            <span>{currentTime}</span>
          </div>

          {/* Audio Chime Toggle */}
          <button
            type="button"
            className="topbar-icon-btn hidden-mobile"
            onClick={handleToggleSound}
            title={soundActive ? 'Tactile Audio Synthesizer: Enabled' : 'Tactile Audio Synthesizer: Muted'}
          >
            {soundActive ? (
              <Volume2 size={17} style={{ color: 'var(--blue-gov)' }} />
            ) : (
              <VolumeX size={17} style={{ color: 'var(--text-muted)' }} />
            )}
          </button>

          {/* Reset Mock Data Button */}
          <button
            type="button"
            className="gov-btn-outline"
            onClick={handleResetData}
            title="Reset portal data to official defaults"
            style={{ fontSize: '11.5px', padding: '5px 10px' }}
          >
            <RotateCcw size={13} />
            <span>Reset Demo Data</span>
          </button>

          {/* Notification Bell Trigger */}
          <button
            type="button"
            className="topbar-icon-btn"
            onClick={() => setAlertsOpen(true)}
            title="Official Notifications & System Updates"
            aria-label="Open notifications drawer"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notif-dot badge-dot-pulse" />}
          </button>

          {/* User Profile */}
          <div className="topbar-user-profile">
            <div className="user-avatar" title={user?.officer || 'Authorized Officer'}>
              {(user?.officer || 'Gov Officer')
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')}
            </div>
            <div className="user-info hidden-mobile">
              <div className="name">{user?.officer || 'Dr. Rajeshwar Sharma, IAS'}</div>
              <div className="desig">{user?.role === 'ADMIN' ? 'DOJS Central Admin' : user?.orgName}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Notification Drawer */}
      <NotificationDrawer
        isOpen={alertsOpen}
        onClose={handleCloseDrawer}
      />

      {/* Universal Command Palette */}
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onOpenCreateOrg={onOpenCreateOrg}
        onOpenCreateInsp={onOpenCreateInsp}
        onOpenCreateTeam={onOpenCreateTeam}
        onOpenGenerateReport={onOpenGenerateReport}
        onSelectInspection={onSelectInspection}
      />
    </>
  );
};

