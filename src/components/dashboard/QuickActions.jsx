import React from 'react';
import { Plus, Users, ClipboardCheck, FileDown, ShieldAlert, Sparkles } from 'lucide-react';

export const QuickActions = ({
  role = 'ADMIN',
  onCreateOrg,
  onCreateTeam,
  onCreateInspection,
  onGenerateReport
}) => {
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '20px',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '24px'
      }}
    >
      <h3
        style={{
          fontSize: '14.5px',
          fontWeight: 800,
          color: 'var(--navy-deep)',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Sparkles size={16} style={{ color: 'var(--saffron-accent)' }} />
        Official Administrative Actions
      </h3>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {role === 'ADMIN' && (
          <button type="button" className="gov-btn-primary" onClick={onCreateOrg}>
            <Plus size={15} />
            <span>Register New Organization</span>
          </button>
        )}

        <button type="button" className="gov-btn-accent" onClick={onCreateInspection}>
          <ClipboardCheck size={15} />
          <span>Schedule New Inspection</span>
        </button>

        <button type="button" className="gov-btn-outline" onClick={onCreateTeam}>
          <Users size={15} />
          <span>Form New Inspection Team</span>
        </button>

        <button type="button" className="gov-btn-outline" onClick={onGenerateReport}>
          <FileDown size={15} />
          <span>Generate Compliance Report</span>
        </button>
      </div>
    </div>
  );
};

export const AlertsBanner = ({ alert, onDismiss }) => {
  if (!alert) return null;

  return (
    <div className="portal-official-banner">
      <div className="banner-left">
        <ShieldAlert size={22} style={{ color: 'var(--red-critical)' }} />
        <div className="banner-text">
          <h4 style={{ color: 'var(--red-critical)' }}>
            URGENT GOVERNANCE NOTICE: {alert.title}
          </h4>
          <p>{alert.message}</p>
        </div>
      </div>
      {onDismiss && (
        <button
          type="button"
          className="gov-btn-outline"
          onClick={onDismiss}
          style={{ fontSize: '11.5px', padding: '4px 8px' }}
        >
          Acknowledge Notice
        </button>
      )}
    </div>
  );
};
