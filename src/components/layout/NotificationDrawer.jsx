import React, { useState, useEffect } from 'react';
import {
  X,
  Bell,
  CheckCheck,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Info,
  ShieldAlert,
  Clock,
  Building2,
  Sparkles,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import {
  getAlerts,
  markAlertAsRead,
  markAllAlertsAsRead,
  deleteAlert,
  clearAllReadAlerts,
  getSystemUpdates,
  resetAlertsToDefault
} from '../../services/mockService';
import { Toast } from '../common/Toast';

export const NotificationDrawer = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'critical', 'updates'
  const [alerts, setAlerts] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (message, type = 'info') => {
    setToastMsg({ message, type });
  };

  const loadData = () => {
    setAlerts(getAlerts());
    setUpdates(getSystemUpdates());
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = alerts.filter((a) => !a.isRead).length;
  const criticalCount = alerts.filter((a) => a.type === 'warning' || a.type === 'danger').length;

  const handleMarkAllRead = () => {
    const updated = markAllAlertsAsRead();
    setAlerts(updated);
    showToast('All notifications marked as read', 'success');
  };

  const handleMarkOneRead = (id) => {
    const updated = markAlertAsRead(id);
    setAlerts(updated);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    const updated = deleteAlert(id);
    setAlerts(updated);
    showToast('Alert dismissed', 'info');
  };

  const handleClearRead = () => {
    const updated = clearAllReadAlerts();
    setAlerts(updated);
    showToast('Cleared read alerts', 'info');
  };

  const handleResetDemo = () => {
    const fresh = resetAlertsToDefault();
    setAlerts(fresh);
    showToast('Restored official demo alerts feed', 'success');
  };

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      loadData();
      setIsRefreshing(false);
      showToast('Notification feed synchronized with national grid', 'info');
    }, 450);
  };

  // Filter alerts based on activeTab
  const filteredAlerts = alerts.filter((a) => {
    if (activeTab === 'critical') {
      return a.type === 'warning' || a.type === 'danger';
    }
    return true;
  });

  return (
    <>
      {/* Backdrop */}
      <div
        className="gov-drawer-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <div
        className="gov-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Notification Center"
      >
        {/* Header */}
        <div className="drawer-header">
          <div>
            <div className="drawer-title-row">
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '6px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Bell size={18} style={{ color: 'var(--saffron)' }} />
              </div>
              <div>
                <h3 className="drawer-title">Alert & Notification Center</h3>
                <div className="drawer-subtitle">
                  National Realtime Telemetry • DOJS Surveillance
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            title="Close panel (Esc)"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="drawer-tabs">
          <button
            type="button"
            className={`drawer-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <Bell size={14} />
            <span>Alerts</span>
            {unreadCount > 0 && (
              <span
                style={{
                  background: 'var(--blue-gov)',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  fontWeight: 800
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`drawer-tab-btn ${activeTab === 'critical' ? 'active' : ''}`}
            onClick={() => setActiveTab('critical')}
          >
            <ShieldAlert size={14} style={{ color: criticalCount > 0 ? 'var(--saffron)' : 'inherit' }} />
            <span>Critical & SLA</span>
            {criticalCount > 0 && (
              <span
                style={{
                  background: '#D84315',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  fontWeight: 800
                }}
              >
                {criticalCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`drawer-tab-btn ${activeTab === 'updates' ? 'active' : ''}`}
            onClick={() => setActiveTab('updates')}
          >
            <Sparkles size={14} style={{ color: 'var(--blue-gov)' }} />
            <span>System Updates</span>
          </button>
        </div>

        {/* Actions Bar (Only for alerts tabs) */}
        {activeTab !== 'updates' && (
          <div className="drawer-actions-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
              <Clock size={12} />
              <span>
                {filteredAlerts.length} {filteredAlerts.length === 1 ? 'Notice' : 'Notices'} ({unreadCount} Unread)
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {unreadCount > 0 && (
                <button
                  type="button"
                  className="drawer-action-link"
                  onClick={handleMarkAllRead}
                  title="Mark all as read"
                >
                  <CheckCheck size={13} />
                  <span>Mark All Read</span>
                </button>
              )}
              <button
                type="button"
                className="drawer-action-link danger"
                onClick={handleClearRead}
                title="Clear read notices"
              >
                <Trash2 size={13} />
                <span>Clear Read</span>
              </button>
            </div>
          </div>
        )}

        {/* Drawer Body Feed */}
        <div className="drawer-body">
          {activeTab === 'updates' ? (
            /* System Updates Feed */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div
                style={{
                  background: '#EEF4FA',
                  border: '1px solid #D1E1F0',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '11.5px',
                  color: 'var(--navy-deep)'
                }}
              >
                <Info size={16} style={{ color: 'var(--blue-gov)', flexShrink: 0 }} />
                <span>
                  Portal is operating on national build <strong>v2.6.4</strong> with active GPS RTK differential tracking.
                </span>
              </div>

              {updates.map((up) => (
                <div
                  key={up.id}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 14px',
                    boxShadow: 'var(--shadow-sm)',
                    borderLeft: '3.5px solid var(--blue-gov)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <span
                      style={{
                        background: '#EEF4FA',
                        color: 'var(--blue-gov)',
                        fontSize: '10.5px',
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: '3px'
                      }}
                    >
                      {up.version}
                    </span>
                    <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{up.date}</span>
                  </div>

                  <h4
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: 'var(--navy-deep)',
                      margin: '0 0 6px 0',
                      lineHeight: 1.3
                    }}
                  >
                    {up.title}
                  </h4>

                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-body)',
                      lineHeight: 1.45,
                      margin: 0
                    }}
                  >
                    {up.description}
                  </p>

                  <div
                    style={{
                      marginTop: '8px',
                      paddingTop: '6px',
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '10.5px',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <span>Classification: Statutory Compliance</span>
                    <span style={{ color: 'var(--success)', fontWeight: 700 }}>• {up.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Alerts & Notices Feed */
            <>
              {filteredAlerts.length === 0 ? (
                <div
                  style={{
                    padding: '40px 20px',
                    textAlign: 'center',
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px dashed var(--border-color)',
                    margin: 'auto 0'
                  }}
                >
                  <CheckCircle2 size={36} style={{ color: 'var(--success)', margin: '0 auto 10px auto' }} />
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy-deep)', margin: '0 0 4px 0' }}>
                    All Clear in This Stream
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 16px 0' }}>
                    No pending {activeTab === 'critical' ? 'critical warnings' : 'alerts'} logged at this hour.
                  </p>
                  <button
                    type="button"
                    className="gov-btn-outline"
                    onClick={handleResetDemo}
                    style={{ fontSize: '11.5px', margin: '0 auto' }}
                  >
                    Restore Demo Notifications
                  </button>
                </div>
              ) : (
                filteredAlerts.map((alert) => {
                  const isWarning = alert.type === 'warning' || alert.type === 'danger';
                  const isSuccess = alert.type === 'success';
                  const Icon = isWarning ? AlertTriangle : isSuccess ? CheckCircle2 : Info;
                  const cardTypeClass = isWarning
                    ? 'warning-type'
                    : isSuccess
                    ? 'success-type'
                    : '';

                  return (
                    <div
                      key={alert.id}
                      className={`notif-card ${!alert.isRead ? 'unread' : ''} ${cardTypeClass}`}
                      onClick={() => !alert.isRead && handleMarkOneRead(alert.id)}
                      style={{ cursor: !alert.isRead ? 'pointer' : 'default' }}
                    >
                      <div className="notif-card-header">
                        <h4 className="notif-card-title">
                          <Icon
                            size={16}
                            style={{
                              color: isWarning
                                ? '#D84315'
                                : isSuccess
                                ? '#2E7D32'
                                : 'var(--blue-gov)',
                              flexShrink: 0,
                              marginTop: '1px'
                            }}
                          />
                          <span>{alert.title}</span>
                        </h4>

                        {!alert.isRead && (
                          <span
                            style={{
                              background: isWarning ? '#FDE8E8' : '#EEF4FA',
                              color: isWarning ? '#9B1C1C' : 'var(--blue-gov)',
                              fontSize: '10px',
                              fontWeight: 800,
                              padding: '1px 6px',
                              borderRadius: '3px',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            NEW
                          </span>
                        )}
                      </div>

                      <p className="notif-card-msg">{alert.message}</p>

                      <div className="notif-card-meta">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Building2 size={12} />
                          <span style={{ fontWeight: 600, color: 'var(--navy-deep)' }}>
                            {alert.organization}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={11} />
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>

                      <div
                        style={{
                          marginTop: '8px',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: '6px'
                        }}
                      >
                        {!alert.isRead && (
                          <button
                            type="button"
                            className="notif-btn-mini"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkOneRead(alert.id);
                            }}
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          type="button"
                          className="notif-btn-mini"
                          style={{ color: 'var(--text-muted)' }}
                          onClick={(e) => handleDelete(alert.id, e)}
                          title="Dismiss notification"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="drawer-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--success)'
              }}
            />
            <span>Gateway: Active Node IN-DOJS-01</span>
          </div>

          <button
            type="button"
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--blue-gov)',
              fontSize: '11px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              cursor: isRefreshing ? 'default' : 'pointer'
            }}
          >
            <RefreshCw size={12} className={isRefreshing ? 'badge-dot-pulse' : ''} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync Feed'}</span>
          </button>
        </div>
      </div>

      {toastMsg && (
        <Toast
          message={toastMsg.message}
          type={toastMsg.type}
          onClose={() => setToastMsg(null)}
          duration={3000}
        />
      )}
    </>
  );
};
