import React from 'react';
import { Building2, Users, ClipboardCheck, Camera, FileCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      icon: Building2,
      title: 'Organization Registration & 2-Account Issuance',
      desc: 'DOJS central oversight registers the state or central authority (e.g. NHAI, State Education Directorate). Two official accounts are instantly generated: a Nodal Admin account and a Field Supervisor account.',
      badge: 'Administrative Phase'
    },
    {
      step: '02',
      icon: Users,
      title: 'Field Team Formation & Roster Assignment',
      desc: 'The organization configures multi-disciplinary field units with certified leads, domain specialists (structural, electrical, environmental), and jurisdiction regions.',
      badge: 'Operational Setup'
    },
    {
      step: '03',
      icon: ClipboardCheck,
      title: 'Inspection Mandate Dispatch & Scheduling',
      desc: 'Audits are scheduled with target site parameters, priority levels (Low, Medium, High, Critical), required check categories, and GNSS target coordinates.',
      badge: 'Dispatch Phase'
    },
    {
      step: '04',
      icon: Camera,
      title: 'On-Site Verification & Geo-Tagged Evidence Capture',
      desc: 'Auditors physically arrive at the location, verify GNSS RTK coordinates fix, upload high-resolution photographic evidence, and record non-conformance findings.',
      badge: 'Field Execution'
    },
    {
      step: '05',
      icon: FileCheck,
      title: 'Statutory Report Generation & SLA Resolution',
      desc: 'Findings are resolved by assigned leads within the mandatory 7-day SLA. Final compliance dossiers with official digital stamps are generated for ministry records.',
      badge: 'Governance & Closure'
    }
  ];

  return (
    <div className="gov-container" style={{ padding: '40px 20px 60px' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
        <span className="gov-badge-official">STANDARD OPERATING PROCEDURE</span>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '8px' }}>
          Inspection &amp; Monitoring Workflow
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.6, marginTop: '8px' }}>
          Step-by-step statutory process connecting Central DOJS Directorate with on-site inspection teams.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px', margin: '0 auto 40px' }}>
        {steps.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                background: 'var(--navy-deep)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 800,
                flexShrink: 0
              }}
            >
              {item.step}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--navy-deep)' }}>
                  {item.title}
                </h3>
                <span style={{ fontSize: '11px', background: 'var(--blue-light)', color: 'var(--blue-gov)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                  {item.badge}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-body)', margin: 0, lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link to="/auth/login" className="gov-btn-accent" style={{ display: 'inline-flex' }}>
          <span>Access Authorized Portal</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
