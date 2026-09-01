import React from 'react';
import { Users, Shield, Phone, Mail, Star, MapPin, ClipboardCheck, CheckCircle2 } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { getInspections } from '../../services/mockService';

export const TeamDetailsModal = ({ isOpen, onClose, team }) => {
  if (!team) return null;

  const allInspections = getInspections();
  const teamInspections = allInspections.filter((i) => i.teamId === team.id || i.team.includes(team.name));

  const members = team.members || [
    { id: 'MEM-01', name: team.teamLead, role: 'Team Lead / Senior Auditor', experience: '12 Years', badge: 'Certified Civil Auditor' },
    { id: 'MEM-02', name: 'Rohan Joshi', role: 'Documentation & Drone Tech', experience: '5 Years', badge: 'DGCA Drone Pilot' },
    { id: 'MEM-03', name: 'Neha Singhal', role: 'Environmental Safety Inspector', experience: '7 Years', badge: 'EIA Certified' },
    { id: 'MEM-04', name: 'Amit Verma', role: 'Structural Engineer', experience: '8 Years', badge: 'GIS Specialist' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={team.name}
      subtitle={`Team ID: ${team.id} • ${team.department}`}
      size="lg"
      footer={
        <button type="button" className="gov-btn-primary" onClick={onClose}>
          Close Roster
        </button>
      }
    >
      <div>
        {/* Info Grid */}
        <div className="info-card-grid">
          <div className="info-item">
            <div className="label">Team Lead</div>
            <div className="val">{team.teamLead}</div>
          </div>
          <div className="info-item">
            <div className="label">Jurisdiction / Zone</div>
            <div className="val">{team.region}</div>
          </div>
          <div className="info-item">
            <div className="label">Performance Rating</div>
            <div className="val" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#B45309' }}>
              <Star size={14} style={{ fill: '#F59E0B', color: '#F59E0B' }} />
              <strong>{team.performanceRating || '4.8'}/5.0</strong>
            </div>
          </div>
          <div className="info-item">
            <div className="label">Status</div>
            <div className="val" style={{ marginTop: '4px' }}>
              <Badge status={team.status} />
            </div>
          </div>
          <div className="info-item">
            <div className="label">Contact Phone</div>
            <div className="val">{team.leadPhone || '+91 98110 43210'}</div>
          </div>
          <div className="info-item">
            <div className="label">Completed Audits</div>
            <div className="val" style={{ color: 'var(--green-gov)', fontWeight: 800 }}>
              {team.completedInspections || teamInspections.length} Sites Audited
            </div>
          </div>
        </div>

        {/* Current Deployment */}
        <div style={{ background: '#FFF8E1', border: '1px solid #FFE082', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '18px', fontSize: '12.5px', color: '#78350F' }}>
          <strong>Active Site Deployment:</strong> {team.currentAssignment || 'Standing by for next departmental inspection cycle.'}
        </div>

        {/* Member Roster */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={16} style={{ color: 'var(--blue-gov)' }} />
            Appointed Inspection Personnel ({members.length})
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {members.map((mem, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: 700, color: 'var(--navy-deep)', fontSize: '13px' }}>{mem.name || `Officer ${idx + 1}`}</div>
                  <span style={{ fontSize: '10.5px', background: 'var(--blue-light)', color: 'var(--blue-gov)', padding: '2px 6px', borderRadius: '3px', fontWeight: 600 }}>
                    {mem.id}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-body)', marginTop: '2px' }}>{mem.role}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Shield size={11} style={{ color: 'var(--green-gov)' }} />
                  <span>{mem.badge || mem.experience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inspection History */}
        <div>
          <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ClipboardCheck size={16} style={{ color: 'var(--blue-gov)' }} />
            Assigned Field Inspection Records ({teamInspections.length})
          </h4>

          {teamInspections.length === 0 ? (
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>No inspection records mapped to this unit yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {teamInspections.map((insp) => (
                <div key={insp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#FAFCFE', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '12.5px' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--navy-deep)' }}>{insp.title}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                      {insp.site} • {insp.location}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Badge status={insp.priority} />
                    <Badge status={insp.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
