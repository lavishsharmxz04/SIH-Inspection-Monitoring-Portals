import React, { useState } from 'react';
import { Search, Eye, KeyRound, Power, Building2, ShieldCheck, Phone, Mail } from 'lucide-react';
import { Badge } from '../common/Badge';

export const OrgTable = ({
  organizations = [],
  onViewDetails,
  onToggleStatus,
  onViewCredentials,
  onCreateOrg
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [stateFilter, setStateFilter] = useState('ALL');

  const states = ['ALL', ...new Set(organizations.map((o) => o.state).filter(Boolean))];

  const filteredOrgs = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.authorizedOfficer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (org.district && org.district.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === 'ALL' || org.status === statusFilter;

    const matchesState =
      stateFilter === 'ALL' || org.state === stateFilter;

    return matchesSearch && matchesStatus && matchesState;
  });

  return (
    <div className="gov-table-container">
      {/* Header Toolbar */}
      <div className="table-header-toolbar">
        <div className="table-title-area">
          <h3>
            <Building2 size={18} style={{ color: 'var(--blue-gov)' }} />
            Registered Nodal Organizations ({filteredOrgs.length})
          </h3>
          <p>Official directory of authorized government bodies &amp; departmental units</p>
        </div>

        <div className="table-controls">
          <div className="search-input-wrap">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search by name, ID, officer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Deactivated">Deactivated</option>
          </select>

          <select
            className="filter-select"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
          >
            {states.map((st) => (
              <option key={st} value={st}>
                {st === 'ALL' ? 'All States / UTs' : st}
              </option>
            ))}
          </select>

          <button type="button" className="gov-btn-accent" onClick={onCreateOrg}>
            <span>+ Register Organization</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="table-responsive">
        <table className="gov-table">
          <thead>
            <tr>
              <th>Org ID</th>
              <th>Organization &amp; Jurisdiction</th>
              <th>Authorized Officer</th>
              <th>Official Contact</th>
              <th>Teams</th>
              <th>Inspections</th>
              <th>Compliance</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrgs.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                  No organizations found matching the selected filters.
                </td>
              </tr>
            ) : (
              filteredOrgs.map((org) => (
                <tr key={org.id}>
                  <td>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        color: 'var(--blue-gov)',
                        background: 'var(--blue-light)',
                        padding: '2px 6px',
                        borderRadius: '3px'
                      }}
                    >
                      {org.id}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--navy-deep)' }}>{org.name}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                      {org.district}, {org.state}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{org.authorizedOfficer}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{org.designation}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Mail size={12} style={{ color: 'var(--blue-gov)' }} />
                      <span>{org.officialEmail}</span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Phone size={12} />
                      <span>{org.officialPhone}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>
                    {org.activeTeams || 0} Teams
                  </td>
                  <td>
                    <div style={{ fontSize: '12.5px', fontWeight: 600 }}>
                      {org.completedInspections || 0} / {org.totalInspections || 0}
                    </div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Completed / Total</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: org.complianceScore >= 90 ? 'var(--green-gov)' : 'var(--saffron-accent)' }}>
                      {org.complianceScore || 85.0}%
                    </div>
                  </td>
                  <td>
                    <Badge status={org.status} />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="table-action-btns" style={{ justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        className="table-action-btn"
                        onClick={() => onViewDetails(org)}
                        title="View Complete Organization Profile & Audit Records"
                      >
                        <Eye size={13} />
                        <span>Profile</span>
                      </button>

                      <button
                        type="button"
                        className="table-action-btn"
                        onClick={() => onViewCredentials(org)}
                        title="View & Issue Authorized Credentials"
                        style={{ color: 'var(--blue-gov)' }}
                      >
                        <KeyRound size={13} />
                        <span>Logins</span>
                      </button>

                      <button
                        type="button"
                        className={`table-action-btn ${org.status === 'Active' ? 'danger' : ''}`}
                        onClick={() => onToggleStatus(org.id)}
                        title={org.status === 'Active' ? 'Deactivate Organization Access' : 'Activate Organization Access'}
                      >
                        <Power size={13} />
                        <span>{org.status === 'Active' ? 'Deactivate' : 'Activate'}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-pagination">
        <span>Showing {filteredOrgs.length} of {organizations.length} registered organizations</span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>DOJS Authorized Directory</span>
      </div>
    </div>
  );
};
