import React from 'react';
import {
  ShieldCheck,
  Building2,
  Users,
  ClipboardCheck,
  FileText,
  KeyRound,
  Lock,
  Camera,
  MapPin,
  Clock,
  Compass,
  AlertTriangle,
  FileDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Features = () => {
  const featureList = [
    {
      icon: Building2,
      title: 'Centralized Nodal Organization Directory',
      desc: 'Central DOJS administrators can register state/central organizations with jurisdictional boundaries, assigned officers, and instant credential issuance.'
    },
    {
      icon: KeyRound,
      title: 'Two Authorized Accounts per Organization',
      desc: 'Enforces dual-account security: one for the Nodal Department Administrator and one for the Field Operations Supervisor, ensuring separation of duties.'
    },
    {
      icon: Users,
      title: 'Field Team Formation & Rostering',
      desc: 'Structure multi-disciplinary teams with domain specializations (civil, structural, environmental, medical), certified leads, and direct phone mapping.'
    },
    {
      icon: Compass,
      title: 'GNSS RTK Differential Geo-Tagging',
      desc: 'Every scheduled inspection captures high-precision coordinates to guarantee on-site presence, eliminating fraudulent off-site check-ins.'
    },
    {
      icon: Camera,
      title: 'Photographic & Document Evidence Archive',
      desc: 'Attach geotagged high-resolution photos, laboratory test reports, and signed NOCs directly to each inspection record.'
    },
    {
      icon: AlertTriangle,
      title: 'Granular Non-Conformance Tracking',
      desc: 'Log findings with severity ratings (Low, Medium, High, Critical), assigned rectification leads, and resolution due dates.'
    },
    {
      icon: Clock,
      title: 'Full Audit Trail & Chain of Custody',
      desc: 'Transparent timestamped history of every transition: Created → Assigned → Scheduled → Field Active → Findings Logged → Signed Off.'
    },
    {
      icon: FileDown,
      title: 'Statutory Report & PDF Generation',
      desc: 'Generate formal Government of India formatted audit dossiers complete with reference IDs, executive summaries, finding statistics, and official digital seals.'
    },
    {
      icon: Lock,
      title: 'Accessibility & Font Scaling Controls',
      desc: 'Built in compliance with GIGW (Guidelines for Indian Government Websites) including live IST clock, bilingual toggle, and font enlargement controls.'
    }
  ];

  return (
    <div className="gov-container" style={{ padding: '40px 20px 60px' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
        <span className="gov-badge-official">PLATFORM CAPABILITIES</span>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '8px' }}>
          Core Features &amp; Technical Capabilities
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.6, marginTop: '8px' }}>
          Explore the purpose-built modules designed to ensure frictionless oversight across India's public sector monitoring workflow.
        </p>
      </div>

      <div className="public-cards-grid" style={{ marginBottom: '40px' }}>
        {featureList.map((f, idx) => (
          <div key={idx} className="feature-card" style={{ background: '#FFFFFF' }}>
            <div className="feature-icon-wrap">
              <f.icon size={22} />
            </div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', background: '#F8FAFC', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy-deep)' }}>
          Ready to experience the digital oversight ecosystem?
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '600px', margin: '8px auto 16px' }}>
          Sign in with authorized administrator credentials or field supervisor accounts.
        </p>
        <Link to="/auth/login" className="gov-btn-primary" style={{ display: 'inline-flex' }}>
          <span>Launch Portal Login</span>
        </Link>
      </div>
    </div>
  );
};
