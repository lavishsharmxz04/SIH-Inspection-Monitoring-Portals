import React from 'react';
import { Download, Printer, ShieldCheck, FileText, CheckCircle2, AlertTriangle, Building2 } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Emblem } from '../common/Emblem';
import { Badge } from '../common/Badge';
import { downloadMockFile } from '../../utils/helpers';

export const ReportDetailsModal = ({ isOpen, onClose, report }) => {
  if (!report) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const text = `=====================================================
GOVERNMENT OF INDIA - OFFICIAL AUDIT & MONITORING REPORT
DEPARTMENT OF OFFICIAL JUSTICE & OVERSIGHT (DOJS)
=====================================================
REPORT REFERENCE: ${report.id}
TITLE           : ${report.title}
TYPE            : ${report.type}
ORGANIZATION    : ${report.organization}
DATE OF ISSUE   : ${report.generatedDate}
AUDITED PERIOD  : ${report.period || 'Annual 2026'}
COMPLIANCE SCORE: ${report.complianceScore}%
STATUS          : ${report.status}
-----------------------------------------------------
EXECUTIVE SUMMARY:
${report.summary || 'Official oversight review executed in accordance with national quality benchmarks.'}

-----------------------------------------------------
KEY FINDINGS & FIELD OBSERVATIONS:
${(report.keyFindings || []).map((f, i) => `[${i + 1}] ${f}`).join('\n')}

-----------------------------------------------------
STATUTORY DIRECTIVES & RECOMMENDATIONS:
${(report.recommendations || []).map((r, i) => `[${i + 1}] ${r}`).join('\n')}

=====================================================
DIGITALLY CERTIFIED BY: ${report.generatedBy}
DOJS AUDIT SEAL: SECURE-SHA256-IN-2026-GOV
=====================================================`;

    downloadMockFile(`${report.id}_Official_Dossier.txt`, text);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={report.title}
      subtitle={`Official Reference: ${report.id} • ${report.type}`}
      size="xl"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="button" className="gov-btn-outline" onClick={handlePrint}>
              <Printer size={14} />
              <span>Print Official Copy</span>
            </button>
            <button type="button" className="gov-btn-outline" onClick={handleDownload}>
              <Download size={14} />
              <span>Download Text Copy</span>
            </button>
          </div>

          <button type="button" className="gov-btn-primary" onClick={onClose}>
            Close Dossier
          </button>
        </div>
      }
    >
      <div className="official-report-sheet">
        {/* Government Formal Header */}
        <div className="report-gov-header">
          <Emblem size={52} />
          <h2>भारत सरकार | Government of India</h2>
          <h3>Department of Official Justice &amp; Oversight (DOJS)</h3>
          <p>National Directorate of Quality Assurance, Public Assets &amp; Field Monitoring</p>
        </div>

        {/* Report Reference Strip */}
        <div className="report-ref-strip">
          <div>
            <span>Official Ref No:</span>
            <strong>DOJS/INSP/2026/{report.id}</strong>
          </div>
          <div>
            <span>Date of Issuance:</span>
            <strong>{report.generatedDate}</strong>
          </div>
          <div>
            <span>Audit Period:</span>
            <strong>{report.period || 'August 2026'}</strong>
          </div>
        </div>

        {/* Subject */}
        <div style={{ margin: '16px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
            Subject / Title:
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
            {report.title}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-body)', marginTop: '4px' }}>
            Target Department / Organization: <strong>{report.organization}</strong>
          </div>
        </div>

        {/* KPI Summary Strip */}
        <div className="info-card-grid" style={{ margin: '16px 0' }}>
          <div className="info-item">
            <div className="label">Sites Audited</div>
            <div className="val" style={{ fontSize: '18px', color: 'var(--navy-deep)' }}>
              {report.inspectionsCount || 8} Facilities
            </div>
          </div>
          <div className="info-item">
            <div className="label">Composite Compliance</div>
            <div className="val" style={{ fontSize: '18px', color: report.complianceScore >= 90 ? 'var(--green-gov)' : 'var(--saffron-accent)' }}>
              {report.complianceScore}%
            </div>
          </div>
          <div className="info-item">
            <div className="label">Report Classification</div>
            <div className="val" style={{ fontSize: '13px' }}>{report.type}</div>
          </div>
          <div className="info-item">
            <div className="label">Statutory Status</div>
            <div className="val" style={{ marginTop: '4px' }}>
              <Badge status={report.status} />
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="report-section">
          <h4>1. Executive Summary &amp; Background</h4>
          <p>
            {report.summary ||
              'In pursuance of the National Quality Monitoring Framework and statutory standards stipulated by the Government of India, comprehensive field inspections were executed across designated regional facilities. The evaluation evaluated structural integrity, safety protocols, personnel certifications, and digital geo-verification.'}
          </p>
        </div>

        {/* Section 2: Key Observations & Findings */}
        <div className="report-section">
          <h4>2. Key Findings &amp; Observations</h4>
          <ul className="report-bullet-list">
            {(report.keyFindings || [
              '92.4% of inspected assets demonstrated full compliance with core CPWD guidelines and BIS quality marks.',
              'RTK GNSS differential fix coordinates confirmed 100% on-site auditor presence with photographic proof.',
              'Minor maintenance anomalies noted in 2 facilities, with immediate 7-day corrective mandates issued.'
            ]).map((finding, idx) => (
              <li key={idx}>{finding}</li>
            ))}
          </ul>
        </div>

        {/* Section 3: Directives & Recommendations */}
        <div className="report-section">
          <h4>3. Directives &amp; Action Plan</h4>
          <ul className="report-bullet-list">
            {(report.recommendations || [
              'Nodal department must submit verified rectifications on the portal within the prescribed 7-day SLA.',
              'Conduct monthly preventive audit drills to maintain national Grade-A compliance standing.',
              'Publish verified certificates to the National Public Infrastructure Transparency Ledger.'
            ]).map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>

        {/* Official Digital Sign-off Seal */}
        <div className="report-sign-off">
          <div className="digital-stamp">
            <div className="stamp-inner">
              <div style={{ fontSize: '9px', fontWeight: 800 }}>GOVERNMENT OF INDIA</div>
              <div style={{ fontSize: '8px', color: '#B45309' }}>DOJS DIGITAL SEAL</div>
              <div style={{ fontSize: '7px' }}>VERIFIED &amp; AUDITED</div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy-deep)' }}>
              {report.generatedBy || 'Dr. Rajeshwar Sharma, IAS'}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
              Director General &amp; Principal Oversight Officer
            </div>
            <div style={{ fontSize: '11px', color: 'var(--blue-gov)', fontWeight: 600, marginTop: '4px' }}>
              Department of Official Justice &amp; Oversight (DOJS)
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
