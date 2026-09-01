import React from 'react';
import { Building2, ShieldCheck, Mail, Phone, MapPin, User, KeyRound, Users, ClipboardCheck, ArrowRight } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { getTeams, getInspections } from '../../services/mockService';

export const OrgDetailsModal = ({ isOpen, onClose, organization }) => {
  if (!organization) return null;

  const orgTeams = getTeams(organization.id);
  const orgInspections = getInspections(organization.id);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={organization.name}
      subtitle={`Official Registry ID: ${organization.id} • ${organization.state}`}
      size="xl"
      footer={
        <button type="button" className="gov-btn-primary" onClick={onClose}>
          Close Profile
        </button>
      }
    >
      <div>
        {/* Top Info Grid */}
        <div className="info-card-grid">
          <div className="info-item">
            <div className="label">Jurisdiction &amp; State</div>
            <div className="val">{organization.district || 'HQ'}, {organization.state}</div>
          </div>
          <div className="info-item">
            <div className="label">Nodal Officer</div>
            <div className="val">{organization.authorizedOfficer}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{organization.designation}</div>
          </div>
          <div className="info-item">
            <div className="label">Current Status</div>
            <div className="val" style={{ marginTop: '4px' }}>
              <Badge status={organization.status} />
            </div>
          </div>
          <div className="info-item">
            <div className="label">Official Email</div>
            <div className="val">{organization.officialEmail}</div>
          </div>
          <div className="info-item">
            <div className="label">Official Phone</div>
            <div className="val">{organization.officialPhone || 'Not Listed'}</div>
          </div>
          <div className="info-item">
            <div className="label">Compliance Score</div>
            <div className="val" style={{ color: 'var(--green-gov)', fontWeight: 800, fontSize: '15px' }}>
              {organization.complianceScore || 85.0}%
            </div>
          </div>
        </div>

        {/* Address */}
        <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '18px', border: '1px solid var(--border-color)', fontSize: '12.5px' }}>
          <strong>Headquarters Address:</strong> {organization.address || 'Central Government Complex, New Delhi'}
        </div>

        {/* Issued Login Accounts (Two Authorized Logins) */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <KeyRound size={16} style={{ color: 'var(--blue-gov)' }} />
            Issued Authorized Login Accounts (2 Licenses)
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {(organization.issuedAccounts || [
              { username: `${(organization.shortCode || 'org').toLowerCase()}_nodal_admin`, role: 'Nodal Admin', status: 'Active', lastLogin: '2026-08-31 16:45' },
              { username: `${(organization.shortCode || 'org').toLowerCase()}_field_lead`, role: 'Field Supervisor', status: 'Active', lastLogin: '2026-09-01 09:12' }
            ]).map((acc, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--navy-deep)', fontSize: '13px' }}>{acc.role}</span>
                  <Badge status={acc.status || 'Active'} />
                </div>
                <div style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--blue-gov)', fontWeight: 600 }}>
                  User ID: {acc.username}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Last Sign-in: {acc.lastLogin || 'Recent'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Inspection Teams */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={16} style={{ color: 'var(--blue-gov)' }} />
            Active Field Inspection Units ({orgTeams.length})
          </h4>

          {orgTeams.length === 0 ? (
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>No teams configured yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {orgTeams.map((team) => (
                <div key={team.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#FAFCFE', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '12.5px' }}>
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--navy-deep)' }}>{team.name}</span>
                    <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>({team.id})</span>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Lead: {team.teamLead} • {team.department}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 600 }}>{team.membersCount || 4} Members</div>
                    <div style={{ fontSize: '11px', color: 'var(--green-gov)' }}>Rating: {team.performanceRating || '4.8'}/5.0</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Inspection History */}
        <div>
          <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ClipboardCheck size={16} style={{ color: 'var(--blue-gov)' }} />
            Assigned Inspections ({orgInspections.length})
          </h4>

          {orgInspections.length === 0 ? (
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>No inspections recorded yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {orgInspections.map((insp) => (
                <div key={insp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#FAFCFE', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '12.5px' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--navy-deep)' }}>{insp.title}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                      Site: {insp.site} • {insp.location}
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
