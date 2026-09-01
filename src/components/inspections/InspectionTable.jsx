import React, { useState } from 'react';
import { Search, Eye, Filter, MapPin, Calendar, ClipboardCheck, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { Badge } from '../common/Badge';

export const InspectionTable = ({
  inspections = [],
  onViewDetails,
  onQuickStatusChange,
  onCreateInspection
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [orgFilter, setOrgFilter] = useState('ALL');

  const statuses = ['ALL', 'Pending', 'Scheduled', 'In Progress', 'Completed', 'Requires Action', 'Rejected'];
  const priorities = ['ALL', 'Low', 'Medium', 'High', 'Critical'];
  const organizations = ['ALL', ...new Set(inspections.map((i) => i.organization).filter(Boolean))];

  const filteredInspections = inspections.filter((insp) => {
    const matchesSearch =
      insp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insp.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (insp.location && insp.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (insp.inspector && insp.inspector.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === 'ALL' || insp.status === statusFilter;

    const matchesPriority =
      priorityFilter === 'ALL' || insp.priority === priorityFilter;

    const matchesOrg =
      orgFilter === 'ALL' || insp.organization === orgFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesOrg;
  });

  return (
    <div className="gov-table-container">
      {/* Header Toolbar */}
      <div className="table-header-toolbar">
        <div className="table-title-area">
          <h3>
            <ClipboardCheck size={18} style={{ color: 'var(--blue-gov)' }} />
            Official Inspection Registry ({filteredInspections.length})
          </h3>
          <p>Scheduled audits, geo-tagged evidence logs, and compliance findings</p>
        </div>

        <div className="table-controls">
          <div className="search-input-wrap">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search site, ID, title, inspector..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s === 'ALL' ? 'All Statuses' : s}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p === 'ALL' ? 'All Priorities' : `${p} Priority`}
              </option>
            ))}
          </select>

          {organizations.length > 2 && (
            <select
              className="filter-select"
              value={orgFilter}
              onChange={(e) => setOrgFilter(e.target.value)}
            >
              {organizations.map((o) => (
                <option key={o} value={o}>
                  {o === 'ALL' ? 'All Organizations' : o}
                </option>
              ))}
            </select>
          )}

          <button type="button" className="gov-btn-accent" onClick={onCreateInspection}>
            <span>+ Schedule Inspection</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="table-responsive">
        <table className="gov-table">
          <thead>
            <tr>
              <th>Inspection ID</th>
              <th>Audit Title &amp; Target Facility</th>
              <th>Organization &amp; Team</th>
              <th>Inspector Lead</th>
              <th>Audit Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Findings</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInspections.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                  No inspections found matching the current search parameters.
                </td>
              </tr>
            ) : (
              filteredInspections.map((insp) => (
                <tr key={insp.id}>
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
                      {insp.id}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--navy-deep)' }}>{insp.title}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={11} style={{ color: 'var(--saffron-accent)' }} />
                      <span>{insp.site}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: '12.5px' }}>{insp.organization}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{insp.team}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{insp.inspector}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Lead Auditor</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} style={{ color: 'var(--text-muted)' }} />
                      <span>{insp.date || insp.scheduledDate}</span>
                    </div>
                  </td>
                  <td>
                    <Badge status={insp.priority} />
                  </td>
                  <td>
                    <Badge status={insp.status} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {insp.findingsCount > 0 ? (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          color: insp.openIssuesCount > 0 ? 'var(--red-critical)' : 'var(--green-gov)',
                          background: insp.openIssuesCount > 0 ? 'var(--red-light)' : 'var(--green-light)',
                          padding: '2px 6px',
                          borderRadius: '3px'
                        }}
                      >
                        {insp.openIssuesCount > 0 && <AlertTriangle size={11} />}
                        <span>{insp.openIssuesCount} Open / {insp.findingsCount} Total</span>
                      </span>
                    ) : (
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>None Logged</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="table-action-btns" style={{ justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        className="table-action-btn"
                        onClick={() => onViewDetails(insp)}
                        title="View Full Inspection Record, Evidence & Timeline"
                      >
                        <Eye size={13} />
                        <span>Audit Log</span>
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
        <span>Showing {filteredInspections.length} of {inspections.length} recorded inspections</span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Geospatially Verified Registry</span>
      </div>
    </div>
  );
};
