import React from 'react';
import { ShieldCheck, Target, Award, CheckCircle2, Lock, FileCheck, Landmark } from 'lucide-react';
import { Emblem } from '../../components/common/Emblem';

export const About = () => {
  return (
    <div className="gov-container" style={{ padding: '40px 20px 60px' }}>
      {/* Official Header */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
        <Emblem size={56} />
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--saffron-accent)', marginTop: '12px', letterSpacing: '0.05em' }}>
          DEPARTMENT OF OFFICIAL JUSTICE &amp; OVERSIGHT (DOJS)
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '4px' }}>
          About the SIH Inspection &amp; Monitoring Portal
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.6, marginTop: '8px' }}>
          Established under the Smart India Hackathon initiative to create a unified digital audit ecosystem for all Central and State government infrastructure assets.
        </p>
      </div>

      {/* Vision & Mission Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ background: 'var(--blue-light)', color: 'var(--blue-gov)', padding: '8px', borderRadius: '6px' }}>
              <Target size={22} />
            </div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'var(--navy-deep)' }}>Our Mission</h3>
          </div>
          <p style={{ fontSize: '13.5px', color: 'var(--text-body)', lineHeight: 1.7 }}>
            To eradicate delays, subjective evaluations, and paper-bound audit trails in public sector monitoring through automated GNSS geo-tagging, cryptographic photographic verification, and unified dashboard intelligence.
          </p>
        </div>

        <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ background: 'rgba(232, 117, 34, 0.15)', color: 'var(--saffron-accent)', padding: '8px', borderRadius: '6px' }}>
              <Landmark size={22} />
            </div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'var(--navy-deep)' }}>Institutional Framework</h3>
          </div>
          <p style={{ fontSize: '13.5px', color: 'var(--text-body)', lineHeight: 1.7 }}>
            Operating under the Directorate of Quality Assurance, the portal bridges central regulatory authorities with regional field execution teams, ensuring seamless delegation and transparent non-conformance remediation.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '16px' }}>
          Guiding Principles of Government Field Audits
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '6px', fontSize: '14px' }}>
              1. Uncompromising Integrity
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-body)', margin: 0, lineHeight: 1.6 }}>
              Every piece of photographic and coordinate data is sealed at capture time with differential GPS fixes.
            </p>
          </div>

          <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '6px', fontSize: '14px' }}>
              2. SLA-Bound Rectification
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-body)', margin: 0, lineHeight: 1.6 }}>
              Non-conformances automatically trigger 7-day or 14-day statutory resolution windows with alert escalations.
            </p>
          </div>

          <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '6px', fontSize: '14px' }}>
              3. Open Compliance Transparency
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-body)', margin: 0, lineHeight: 1.6 }}>
              Aggregated departmental scores are computed in real time without human alteration.
            </p>
          </div>
        </div>
      </div>

      {/* Security & Audit Compliance Statement */}
      <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '24px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <ShieldCheck size={36} style={{ color: 'var(--green-gov)', flexShrink: 0 }} />
        <div>
          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#166534' }}>
            National Cybersecurity &amp; Indian Information Technology Compliance
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#14532D', lineHeight: 1.5 }}>
            This application complies with CERT-In guidelines, the Digital Personal Data Protection (DPDP) Act, and the National E-Governance Standards for secure departmental access control.
          </p>
        </div>
      </div>
    </div>
  );
};
