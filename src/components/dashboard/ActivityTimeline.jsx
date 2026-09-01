import React from 'react';
import { Clock, CheckCircle2, AlertCircle, ArrowUpRight, ShieldCheck, MapPin } from 'lucide-react';
import { Badge } from '../common/Badge';

export const ActivityTimeline = ({ inspections = [], onViewDetails }) => {
  const recentActivities = inspections.slice(0, 5);

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '20px',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}
      >
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 800,
            color: 'var(--navy-deep)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Clock size={18} style={{ color: 'var(--blue-gov)' }} />
          Recent Official Inspections &amp; Audits
        </h3>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          Showing latest field updates
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {recentActivities.map((insp) => (
          <div
            key={insp.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: '#FAFCFE',
              transition: 'background 0.2s',
              gap: '12px'
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: 'var(--blue-gov)',
                    backgroundColor: 'var(--blue-light)',
                    padding: '2px 6px',
                    borderRadius: '3px'
                  }}
                >
                  {insp.id}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {insp.organization}
                </span>
                <Badge status={insp.priority} />
                <Badge status={insp.status} />
              </div>

              <div
                style={{
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: 'var(--navy-deep)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {insp.title}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '11.5px',
                  color: 'var(--text-muted)',
                  marginTop: '4px'
                }}
              >
                <span>Site: {insp.site}</span>
                <span>•</span>
                <span>Team: {insp.team}</span>
                <span>•</span>
                <span>Date: {insp.date}</span>
              </div>
            </div>

            <button
              type="button"
              className="table-action-btn"
              onClick={() => onViewDetails && onViewDetails(insp)}
              title="View full inspection log"
            >
              <span>View Log</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
