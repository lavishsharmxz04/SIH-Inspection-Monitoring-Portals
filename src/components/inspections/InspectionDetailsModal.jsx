import React, { useState } from 'react';
import {
  ClipboardCheck,
  MapPin,
  Calendar,
  User,
  Users,
  AlertTriangle,
  FileText,
  Camera,
  Compass,
  CheckCircle2,
  Clock,
  Plus,
  Download,
  Share2,
  ShieldCheck,
  Building2,
  ChevronRight
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { downloadMockFile } from '../../utils/helpers';

export const InspectionDetailsModal = ({
  isOpen,
  onClose,
  inspection,
  onUpdateStatus,
  onOpenAddFinding
}) => {
  if (!inspection) return null;

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'findings', 'evidence', 'timeline'
  const [newStatus, setNewStatus] = useState(inspection.status);
  const [statusNote, setStatusNote] = useState('');

  const findings = inspection.findings || [];
  const evidence = inspection.evidence || {
    photos: [],
    documents: [],
    gpsData: null,
    notes: ''
  };
  const timeline = inspection.timeline || [
    { step: 'Created', timestamp: '2026-08-20 10:00', by: 'DOJS Central Cell', note: 'Inspection order generated' },
    { step: 'Assigned', timestamp: '2026-08-21 14:30', by: inspection.organization, note: `Assigned to ${inspection.team}` },
    { step: 'Scheduled', timestamp: '2026-08-22 09:15', by: inspection.inspector, note: `Audit scheduled for ${inspection.date}` }
  ];

  const handleStatusChangeSubmit = () => {
    if (newStatus !== inspection.status) {
      onUpdateStatus(inspection.id, newStatus, statusNote);
      setStatusNote('');
    }
  };

  const handleDownloadAuditReport = () => {
    const reportText = `=====================================================
GOVERNMENT OF INDIA - OFFICIAL INSPECTION RECORD
DEPARTMENT OF OFFICIAL OVERSIGHT (DOJS)
=====================================================
INSPECTION ID   : ${inspection.id}
AUDIT TITLE     : ${inspection.title}
TARGET SITE     : ${inspection.site}
LOCATION        : ${inspection.location}
GEO-COORDINATES : ${inspection.geoCoordinates || 'N/A'}
DATE OF AUDIT   : ${inspection.date || inspection.scheduledDate}
ORGANIZATION    : ${inspection.organization}
ASSIGNED TEAM   : ${inspection.team}
LEAD INSPECTOR  : ${inspection.inspector}
PRIORITY LEVEL  : ${inspection.priority}
CURRENT STATUS  : ${inspection.status}
-----------------------------------------------------
AUDIT SUMMARY & SCOPE:
${inspection.description || 'Routine compliance and quality verification audit.'}

-----------------------------------------------------
RECORDED FINDINGS & NON-CONFORMANCES (${findings.length}):
${findings
  .map(
    (f, idx) => `
[#${idx + 1}] ${f.title}
Severity    : ${f.severity} | Status: ${f.status}
Assigned To : ${f.assignedPerson || 'Field Lead'} | Due: ${f.dueDate || 'N/A'}
Observation : ${f.description}
Action Taken: ${f.actionTaken || 'Pending resolution'}
`
  )
  .join('\n')}

-----------------------------------------------------
GPS ROVER TELEMETRY FIX:
Latitude    : ${evidence.gpsData?.latitude || 'N/A'}
Longitude   : ${evidence.gpsData?.longitude || 'N/A'}
Accuracy    : ${evidence.gpsData?.accuracy || 'N/A'}
Timestamp   : ${evidence.gpsData?.timestamp || 'N/A'}
Rover Device: ${evidence.gpsData?.device || 'NIC GNSS RTK'}

-----------------------------------------------------
AUDIT TIMELINE & CHAIN OF CUSTODY:
${timeline.map((t) => `• ${t.step} [${t.timestamp}] by ${t.by}: ${t.note}`).join('\n')}

=====================================================
OFFICIAL DIGITAL RECORD CERTIFIED UNDER SIH GOVERNANCE ACT
=====================================================`;

    downloadMockFile(`${inspection.id}_Official_Audit_Report.txt`, reportText);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={inspection.title}
      subtitle={`Official Inspection ID: ${inspection.id} • ${inspection.site}`}
      size="xl"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <button
            type="button"
            className="gov-btn-outline"
            onClick={handleDownloadAuditReport}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={14} />
            <span>Export Official Audit Slip (.txt)</span>
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" className="gov-btn-outline" onClick={onClose}>
              Close Window
            </button>
          </div>
        </div>
      }
    >
      <div>
        {/* Navigation Tabs inside modal */}
        <div className="gov-tabs-bar" style={{ marginBottom: '16px' }}>
          <button
            type="button"
            className={`gov-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <ClipboardCheck size={15} />
            <span>Basic Information</span>
          </button>

          <button
            type="button"
            className={`gov-tab-btn ${activeTab === 'findings' ? 'active' : ''}`}
            onClick={() => setActiveTab('findings')}
          >
            <AlertTriangle size={15} />
            <span>Findings &amp; Issues</span>
            <span className="tab-count">{findings.length}</span>
          </button>

          <button
            type="button"
            className={`gov-tab-btn ${activeTab === 'evidence' ? 'active' : ''}`}
            onClick={() => setActiveTab('evidence')}
          >
            <Camera size={15} />
            <span>Field Evidence &amp; GPS</span>
            <span className="tab-count">
              {(evidence.photos?.length || 0) + (evidence.documents?.length || 0)}
            </span>
          </button>

          <button
            type="button"
            className={`gov-tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            <Clock size={15} />
            <span>Audit Timeline</span>
            <span className="tab-count">{timeline.length}</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <div className="info-card-grid">
              <div className="info-item">
                <div className="label">Inspection ID</div>
                <div className="val" style={{ fontFamily: 'monospace', color: 'var(--blue-gov)' }}>
                  {inspection.id}
                </div>
              </div>
              <div className="info-item">
                <div className="label">Target Facility / Site</div>
                <div className="val">{inspection.site}</div>
              </div>
              <div className="info-item">
                <div className="label">Current Status</div>
                <div className="val" style={{ marginTop: '4px' }}>
                  <Badge status={inspection.status} />
                </div>
              </div>
              <div className="info-item">
                <div className="label">Nodal Organization</div>
                <div className="val">{inspection.organization}</div>
              </div>
              <div className="info-item">
                <div className="label">Inspection Team</div>
                <div className="val">{inspection.team}</div>
              </div>
              <div className="info-item">
                <div className="label">Lead Inspector</div>
                <div className="val">{inspection.inspector}</div>
              </div>
              <div className="info-item">
                <div className="label">Scheduled / Audit Date</div>
                <div className="val">{inspection.date || inspection.scheduledDate}</div>
              </div>
              <div className="info-item">
                <div className="label">Priority Level</div>
                <div className="val" style={{ marginTop: '4px' }}>
                  <Badge status={inspection.priority} />
                </div>
              </div>
              <div className="info-item">
                <div className="label">Domain Category</div>
                <div className="val">{inspection.category || 'Civil Infrastructure'}</div>
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '16px', fontSize: '13px' }}>
              <div style={{ fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '4px' }}>
                Site Physical Address &amp; Geo-Location:
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-body)' }}>
                <MapPin size={14} style={{ color: 'var(--saffron-accent)', flexShrink: 0 }} />
                <span>{inspection.location}</span>
              </div>
              <div style={{ marginTop: '4px', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                GPS Fix: {inspection.geoCoordinates || '18.6279° N, 73.8009° E'}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '6px' }}>
                Inspection Scope &amp; Mandate Description
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.6, background: '#FFFFFF', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                {inspection.description || 'Comprehensive evaluation of facility infrastructure, safety compliance, records, and digital telemetry under official standards.'}
              </p>
            </div>

            {/* Quick Status Update Section */}
            <div style={{ background: '#F0F7FF', border: '1px solid #B6D8F8', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '8px' }}>
                Update Official Inspection Workflow Status
              </h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                <select
                  className="form-control"
                  style={{ width: 'auto', minWidth: '180px' }}
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed (Signed Off)</option>
                  <option value="Requires Action">Requires Action</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <input
                  type="text"
                  placeholder="Official status note / sign-off remark..."
                  className="form-control"
                  style={{ flex: 1, minWidth: '220px' }}
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                />

                <button
                  type="button"
                  className="gov-btn-primary"
                  onClick={handleStatusChangeSubmit}
                  disabled={newStatus === inspection.status && !statusNote}
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FINDINGS */}
        {activeTab === 'findings' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--navy-deep)' }}>
                Recorded Field Findings &amp; Non-Conformances ({findings.length})
              </h4>

              <button
                type="button"
                className="gov-btn-accent"
                onClick={() => onOpenAddFinding(inspection.id)}
                style={{ fontSize: '12px', padding: '5px 10px' }}
              >
                <Plus size={13} />
                <span>+ Log New Finding</span>
              </button>
            </div>

            {findings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px', background: '#F8FAFC', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                <CheckCircle2 size={32} style={{ color: 'var(--green-gov)', margin: '0 auto 8px' }} />
                <div style={{ fontWeight: 700, color: 'var(--navy-deep)', fontSize: '14px' }}>No Non-Conformances Recorded</div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  All audited parameters were found compliant with CPWD / DOJS standards.
                </p>
                <button
                  type="button"
                  className="gov-btn-outline"
                  onClick={() => onOpenAddFinding(inspection.id)}
                  style={{ marginTop: '12px' }}
                >
                  + Add Observation
                </button>
              </div>
            ) : (
              findings.map((f, idx) => (
                <div key={f.id || idx} className={`finding-card severity-${f.severity?.toLowerCase() || 'medium'}`}>
                  <div className="finding-top">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', fontFamily: 'monospace', background: 'var(--bg-subtle)', padding: '1px 5px', borderRadius: '3px', fontWeight: 700 }}>
                        {f.id || `FND-${idx + 1}`}
                      </span>
                      <span className="finding-title">{f.title}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <Badge status={f.severity} />
                      <Badge status={f.status} />
                    </div>
                  </div>

                  <p className="finding-desc">{f.description}</p>

                  <div className="finding-meta">
                    <span><strong>Assigned Officer:</strong> {f.assignedPerson || 'Field Lead'}</span>
                    <span>•</span>
                    <span><strong>Remediation Due:</strong> {f.dueDate || 'Within 7 Days'}</span>
                    {f.resolvedDate && (
                      <>
                        <span>•</span>
                        <span style={{ color: 'var(--green-gov)' }}><strong>Resolved:</strong> {f.resolvedDate}</span>
                      </>
                    )}
                  </div>

                  {f.actionTaken && (
                    <div style={{ marginTop: '8px', background: '#F8FAFC', padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: '12px', borderLeft: '3px solid var(--blue-gov)' }}>
                      <strong>Action Taken:</strong> {f.actionTaken}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: EVIDENCE & GPS */}
        {activeTab === 'evidence' && (
          <div>
            {/* GPS Telemetry Fix */}
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Compass size={16} style={{ color: 'var(--blue-gov)' }} />
                Geo-Tagging GNSS RTK Rover Fix
              </h4>

              <div className="gps-rover-box">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  <div>Latitude: <strong>{evidence.gpsData?.latitude || '18.627921 N'}</strong></div>
                  <div>Longitude: <strong>{evidence.gpsData?.longitude || '73.800914 E'}</strong></div>
                  <div>Fix Accuracy: <strong>{evidence.gpsData?.accuracy || '± 1.5 meters (Differential RTK)'}</strong></div>
                  <div>Fix Timestamp: <strong>{evidence.gpsData?.timestamp || `${inspection.date} 11:00:14 IST`}</strong></div>
                </div>
                <div style={{ marginTop: '6px', fontSize: '11px', color: '#94A3B8' }}>
                  Hardware: {evidence.gpsData?.device || 'NIC Geo-Tagging Rover G-44'} • Cryptographic Seal Validated
                </div>
              </div>
            </div>

            {/* Photographic Evidence */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy-deep)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Camera size={16} style={{ color: 'var(--blue-gov)' }} />
                  Photographic Evidence ({evidence.photos?.length || 0})
                </h4>
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>High-Resolution Geo-Tagged Images</span>
              </div>

              {(!evidence.photos || evidence.photos.length === 0) ? (
                <div style={{ padding: '20px', textAlign: 'center', background: '#F8FAFC', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  No photos uploaded yet for this site audit.
                </div>
              ) : (
                <div className="evidence-photo-grid">
                  {evidence.photos.map((photo, idx) => (
                    <div key={photo.id || idx} className="evidence-photo-card">
                      <img src={photo.url} alt={photo.name} />
                      <div className="evidence-photo-info">
                        <div style={{ fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{photo.name}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                          <span>{photo.size}</span>
                          <span>{photo.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Verified Documents */}
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={16} style={{ color: 'var(--blue-gov)' }} />
                Attached Audit Checklists &amp; Certificates ({evidence.documents?.length || 0})
              </h4>

              {(!evidence.documents || evidence.documents.length === 0) ? (
                <div style={{ padding: '20px', textAlign: 'center', background: '#F8FAFC', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  No document attachments found.
                </div>
              ) : (
                <div className="evidence-docs-list">
                  {evidence.documents.map((doc, idx) => (
                    <div key={doc.id || idx} className="evidence-doc-item">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileText size={16} style={{ color: 'var(--blue-gov)' }} />
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--navy-deep)' }}>{doc.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            {doc.size} • Signed Date: {doc.date}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="table-action-btn"
                        onClick={() => downloadMockFile(doc.name, `OFFICIAL DOCUMENT ATTACHMENT: ${doc.name}\nINSPECTION REF: ${inspection.id}\nDATE: ${doc.date}`)}
                        title="Download Document"
                      >
                        <Download size={13} />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Inspector Notes */}
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '6px' }}>
                Lead Inspector Field Notes
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-body)', background: '#F8FAFC', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', lineHeight: 1.6 }}>
                {evidence.notes || 'Routine physical verification conducted. Remedial directives communicated to site authorities.'}
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: TIMELINE */}
        {activeTab === 'timeline' && (
          <div>
            <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '14px' }}>
              Inspection Audit Trail &amp; Chain of Custody
            </h4>

            <div className="timeline-list">
              {timeline.map((item, idx) => (
                <div key={idx} className={`timeline-item ${idx === timeline.length - 1 ? 'completed' : ''}`}>
                  <div className="timeline-dot" />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div className="timeline-step">{item.step}</div>
                    <div className="timeline-meta">{item.timestamp}</div>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--blue-gov)', fontWeight: 600 }}>
                    By: {item.by}
                  </div>
                  {item.note && <div className="timeline-note">{item.note}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
