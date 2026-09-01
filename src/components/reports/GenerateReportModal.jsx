import React, { useState } from 'react';
import { FileText, Calendar, Building2, ShieldCheck, Sparkles } from 'lucide-react';
import { Modal } from '../common/Modal';
import { getOrganizations } from '../../services/mockService';

export const GenerateReportModal = ({
  isOpen,
  onClose,
  onSubmit,
  defaultOrgId = null,
  defaultOrgName = null
}) => {
  const orgs = getOrganizations();

  const [formData, setFormData] = useState({
    id: `REP-${Math.floor(202600 + Math.random() * 900)}`,
    title: '',
    orgId: defaultOrgId || (orgs[0] ? orgs[0].id : 'ORG-001'),
    organization: defaultOrgName || (orgs[0] ? orgs[0].name : 'National Infrastructure Authority'),
    type: 'Monthly Compliance Audit',
    startDate: '2026-08-01',
    endDate: '2026-08-31',
    generatedBy: 'Dr. Rajeshwar Sharma, IAS',
    status: 'Published',
    summary: '',
    includePhotoEvidence: true,
    includeTelemetryFixes: true
  });

  const handleOrgChange = (e) => {
    const orgId = e.target.value;
    const selectedOrg = orgs.find((o) => o.id === orgId);
    setFormData((prev) => ({
      ...prev,
      orgId,
      organization: selectedOrg ? selectedOrg.name : prev.organization
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) {
      alert('Please enter a Report Title.');
      return;
    }

    const newReport = {
      ...formData,
      generatedDate: new Date().toISOString().split('T')[0],
      period: `${formData.startDate} to ${formData.endDate}`,
      inspectionsCount: Math.floor(6 + Math.random() * 8),
      complianceScore: Number((88 + Math.random() * 10).toFixed(1)),
      keyFindings: [
        'Routine structural and fire-safety verifications successfully executed across 92% of target facilities.',
        'Two minor discrepancies in preventive maintenance logs identified and scheduled for immediate rectification.',
        'RTK GPS geo-tagging demonstrated 99.8% precision with no perimeter deviations.'
      ],
      recommendations: [
        'Mandate quarterly refresher certification for auxiliary field inspection staff.',
        'Accelerate closure of outstanding non-conformances within the standard 7-day DOJS SLA window.',
        'Publish digitally signed certificates to the National Public Infrastructure Transparency Ledger.'
      ]
    };

    onSubmit(newReport);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generate Official Audit Report"
      subtitle="Synthesize field inspection logs into an official DOJS-compliant dossier"
      size="lg"
      footer={
        <>
          <button type="button" className="gov-btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="gov-btn-primary" onClick={handleSubmit}>
            Compile &amp; Publish Official Report
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">
              Report Title <span className="required">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              className="form-control"
              placeholder="e.g. Q3 Comprehensive Infrastructure Quality Audit"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Report ID</label>
            <input
              type="text"
              name="id"
              required
              className="form-control"
              value={formData.id}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Target Organization</label>
            <select
              name="orgId"
              className="form-control"
              value={formData.orgId}
              onChange={handleOrgChange}
            >
              {orgs.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name} ({o.id})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Report Category / Type</label>
            <select
              name="type"
              className="form-control"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Monthly Compliance Audit">Monthly Compliance Audit</option>
              <option value="Infrastructure Quality Assessment">Infrastructure Quality Assessment</option>
              <option value="Quarterly Inspection Summary">Quarterly Inspection Summary</option>
              <option value="Safety & Statutory Adherence">Safety &amp; Statutory Adherence</option>
              <option value="Remedial Action Plan">Remedial Action Plan</option>
            </select>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Audit Cycle Start Date</label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Audit Cycle End Date</label>
            <input
              type="date"
              name="endDate"
              className="form-control"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Sign-Off / Authorizing Officer</label>
          <input
            type="text"
            name="generatedBy"
            className="form-control"
            value={formData.generatedBy}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Executive Scope &amp; Context Remarks</label>
          <textarea
            name="summary"
            rows={3}
            className="form-control"
            placeholder="Provide context regarding the audit scope, focus areas, and key findings highlights..."
            value={formData.summary}
            onChange={handleChange}
          />
        </div>

        <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontWeight: 700, fontSize: '12.5px', color: 'var(--navy-deep)', marginBottom: '8px' }}>
            Report Inclusions:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="includePhotoEvidence"
                checked={formData.includePhotoEvidence}
                onChange={handleChange}
              />
              <span>Attach High-Resolution Photographic Proof Gallery</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="includeTelemetryFixes"
                checked={formData.includeTelemetryFixes}
                onChange={handleChange}
              />
              <span>Include RTK GPS Rover Telemetry Coordinates &amp; Timestamp Hash</span>
            </label>
          </div>
        </div>
      </form>
    </Modal>
  );
};
