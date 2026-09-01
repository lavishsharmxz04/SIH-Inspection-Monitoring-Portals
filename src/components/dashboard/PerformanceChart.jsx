import React from 'react';
import { BarChart3, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const PerformanceChart = ({ title = 'Inspection Activity & Compliance Overview' }) => {
  const months = [
    { month: 'Apr', completed: 28, pending: 4, compliance: 94 },
    { month: 'May', completed: 35, pending: 6, compliance: 91 },
    { month: 'Jun', completed: 42, pending: 5, compliance: 88 },
    { month: 'Jul', completed: 50, pending: 8, compliance: 93 },
    { month: 'Aug', completed: 58, pending: 7, compliance: 96 },
    { month: 'Sep', completed: 18, pending: 12, compliance: 92 }
  ];

  const maxVal = 70;

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        <div>
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
            <BarChart3 size={18} style={{ color: 'var(--blue-gov)' }} />
            {title}
          </h3>
          <p style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            Monthly completed field audits vs pending schedules across registered nodal divisions
          </p>
        </div>

        <div style={{ display: 'flex', gap: '14px', fontSize: '12px', fontWeight: 600 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '12px',
                height: '12px',
                background: 'var(--navy-deep)',
                borderRadius: '2px',
                display: 'inline-block'
              }}
            />
            <span>Completed Audits</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '12px',
                height: '12px',
                background: 'var(--saffron-accent)',
                borderRadius: '2px',
                display: 'inline-block'
              }}
            />
            <span>Pending / Scheduled</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '16px',
          alignItems: 'flex-end',
          height: '180px',
          padding: '16px 10px 0',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        {months.map((item) => {
          const completedHeight = (item.completed / maxVal) * 140;
          const pendingHeight = (item.pending / maxVal) * 140;

          return (
            <div
              key={item.month}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                height: '100%',
                justifyContent: 'flex-end'
              }}
            >
              <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end' }}>
                {/* Completed Bar */}
                <div
                  title={`Completed: ${item.completed}`}
                  style={{
                    width: '24px',
                    height: `${completedHeight}px`,
                    backgroundColor: 'var(--navy-deep)',
                    borderRadius: '3px 3px 0 0',
                    position: 'relative',
                    transition: 'all 0.3s'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '-16px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '10px',
                      fontWeight: 700,
                      color: 'var(--navy-deep)'
                    }}
                  >
                    {item.completed}
                  </span>
                </div>

                {/* Pending Bar */}
                <div
                  title={`Pending: ${item.pending}`}
                  style={{
                    width: '18px',
                    height: `${pendingHeight}px`,
                    backgroundColor: 'var(--saffron-accent)',
                    borderRadius: '3px 3px 0 0',
                    position: 'relative',
                    transition: 'all 0.3s'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '-16px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '10px',
                      fontWeight: 700,
                      color: 'var(--saffron-accent)'
                    }}
                  >
                    {item.pending}
                  </span>
                </div>
              </div>

              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--text-dark)',
                  marginTop: '4px'
                }}
              >
                {item.month}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini Compliance Progress Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '14px',
          marginTop: '16px'
        }}
      >
        <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
            GEO-TAG ACCURACY
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--green-gov)', marginTop: '2px' }}>
            99.8% Verified
          </div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>RTK GNSS Differential Fix</div>
        </div>

        <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
            EVIDENCE RIGOR
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--blue-gov)', marginTop: '2px' }}>
            100% Photographic
          </div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Min. 2 Photos per Site Required</div>
        </div>

        <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
            AVG REMEDIATION SPEED
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
            4.2 Days
          </div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>7-Day Government SLA Mandate</div>
        </div>
      </div>
    </div>
  );
};
