import React, { useState } from 'react';
import { Search, Users, Eye, Edit2, Trash2, Shield, UserCheck, Star } from 'lucide-react';
import { Badge } from '../common/Badge';

export const TeamTable = ({
  teams = [],
  onViewDetails,
  onEditTeam,
  onDeleteTeam,
  onCreateTeam
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const departments = ['ALL', ...new Set(teams.map((t) => t.department).filter(Boolean))];

  const filteredTeams = teams.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.teamLead.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.region && t.region.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDept =
      departmentFilter === 'ALL' || t.department === departmentFilter;

    const matchesStatus =
      statusFilter === 'ALL' || t.status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="gov-table-container">
      {/* Toolbar */}
      <div className="table-header-toolbar">
        <div className="table-title-area">
          <h3>
            <Users size={18} style={{ color: 'var(--blue-gov)' }} />
            Operational Field Teams ({filteredTeams.length})
          </h3>
          <p>Multi-disciplinary field audit teams deployed for site evaluations</p>
        </div>

        <div className="table-controls">
          <div className="search-input-wrap">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search team, lead, region..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d === 'ALL' ? 'All Departments' : d}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button type="button" className="gov-btn-accent" onClick={onCreateTeam}>
            <span>+ Form New Team</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="gov-table">
          <thead>
            <tr>
              <th>Team ID</th>
              <th>Team Name &amp; Department</th>
              <th>Team Lead</th>
              <th>Jurisdiction / Region</th>
              <th>Members</th>
              <th>Current Assignment</th>
              <th>Rating</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeams.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                  No inspection teams found matching the search criteria.
                </td>
              </tr>
            ) : (
              filteredTeams.map((team) => (
                <tr key={team.id}>
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
                      {team.id}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--navy-deep)' }}>{team.name}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{team.department}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{team.teamLead}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{team.leadPhone || team.leadEmail}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '12px' }}>{team.region}</div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 700, color: 'var(--navy-deep)' }}>
                      {team.membersCount || (team.members ? team.members.length : 4)}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Officers</span>
                  </td>
                  <td>
                    <div
                      style={{
                        fontSize: '12px',
                        maxWidth: '220px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                      title={team.currentAssignment}
                    >
                      {team.currentAssignment || 'Standby / Awaiting Assignment'}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: 'var(--navy-deep)' }}>
                      <Star size={13} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                      <span>{team.performanceRating || '4.8'}</span>
                    </div>
                  </td>
                  <td>
                    <Badge status={team.status} />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="table-action-btns" style={{ justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        className="table-action-btn"
                        onClick={() => onViewDetails(team)}
                        title="View Roster & Audit Records"
                      >
                        <Eye size={13} />
                        <span>Roster</span>
                      </button>

                      <button
                        type="button"
                        className="table-action-btn"
                        onClick={() => onEditTeam(team)}
                        title="Edit Team Specifications"
                      >
                        <Edit2 size={13} />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        className="table-action-btn danger"
                        onClick={() => onDeleteTeam(team.id)}
                        title="Decommission Team"
                      >
                        <Trash2 size={13} />
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
        <span>Showing {filteredTeams.length} of {teams.length} operational teams</span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>DOJS Authorized Field Units</span>
      </div>
    </div>
  );
};
