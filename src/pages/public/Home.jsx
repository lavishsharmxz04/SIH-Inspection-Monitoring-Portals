import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Building2,
  Users,
  ClipboardCheck,
  FileText,
  MapPin,
  Camera,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  Compass,
  Layers,
  Award
} from 'lucide-react';
import { Emblem } from '../../components/common/Emblem';
import { LiveGeoRadar } from '../../components/dashboard/LiveGeoRadar';
import { InspectionDetailsModal } from '../../components/inspections/InspectionDetailsModal';
import { getAdminStats, getInspections } from '../../services/mockService';

export const Home = () => {
  const stats = getAdminStats();
  const inspections = getInspections();
  const [selectedInspection, setSelectedInspection] = useState(null);

  const domains = [
    { title: 'School & Higher Education', icon: Building2, desc: 'Classroom safety, RTE compliance, lab equipment, sanitation', count: '142 Audits' },
    { title: 'Primary & Tertiary Healthcare', icon: ShieldCheck, desc: 'Cold chain integrity, bio-medical waste, emergency readiness', count: '98 Audits' },
    { title: 'Civil Highways & Bridges', icon: MapPin, desc: 'Material density, drainage gradients, toll plazas, structural integrity', count: '215 Audits' },
    { title: 'Urban Water & Municipal Works', icon: Layers, desc: 'Pumping telemetry, water purity testing, sewage treatment plants', count: '76 Audits' },
    { title: 'Digital & Telemetry Infra', icon: Compass, desc: 'Fibre optic lines, solar microgrids, SCADA monitoring networks', count: '53 Audits' },
    { title: 'Public Distribution & Warehouses', icon: Award, desc: 'Food grain preservation, moisture sensors, weighing calibration', count: '64 Audits' },
  ];

  return (
    <div>
      {/* Official Hero Section */}
      <section className="gov-hero-section">
        <div className="gov-container">
          <div className="gov-hero-grid">
            <div className="gov-hero-content">
              <div className="gov-hero-eyebrow">
                <ShieldCheck size={16} />
                <span>Smart India Hackathon • Official Digital Oversight Platform</span>
              </div>

              <h1>National Unified Inspection &amp; Monitoring Portal</h1>

              <p>
                An authoritative, high-integrity governance framework designed for the Department of Official Justice &amp; Oversight (DOJS) and registered state/central organizations to enforce real-time, geo-tagged field audits, cryptographic photographic evidence verification, and SLA-bound remediation tracking.
              </p>

              <div className="gov-hero-actions">
                <Link to="/auth/login" className="gov-btn-accent" style={{ fontSize: '14px', padding: '12px 24px' }}>
                  <span>Authorized Portal Access</span>
                  <ArrowRight size={16} />
                </Link>

                <Link to="/how-it-works" className="gov-btn-outline" style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}>
                  <span>Explore Workflow</span>
                </Link>
              </div>

              {/* Trust badges */}
              <div style={{ display: 'flex', gap: '20px', marginTop: '24px', flexWrap: 'wrap', fontSize: '12px', color: '#CBD5E1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={15} style={{ color: '#4ADE80' }} />
                  <span>100% Geo-Tagged RTK Fixes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={15} style={{ color: '#4ADE80' }} />
                  <span>2 Issued Logins per Organization</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={15} style={{ color: '#4ADE80' }} />
                  <span>256-Bit Audit Trail Encryption</span>
                </div>
              </div>
            </div>

            {/* Hero Quick Gateway Card */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                boxShadow: 'var(--shadow-modal)',
                border: '1px solid var(--border-color)',
                color: 'var(--navy-deep)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
                <Emblem size={38} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Authorized Sign-In</h3>
                  <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    Two-Tier Single Sign-On Gateway
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Admin Box */}
                <Link
                  to="/admin/dashboard"
                  style={{
                    display: 'block',
                    padding: '14px',
                    background: '#F8FAFC',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.2s'
                  }}
                  className="hero-gateway-card"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ background: 'var(--navy-deep)', color: '#FFF', padding: '8px', borderRadius: '6px' }}>
                        <Building2 size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '13.5px', color: 'var(--navy-deep)' }}>DOJS Central Admin</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Oversight, Register Orgs, National Reports</div>
                      </div>
                    </div>
                    <ArrowRight size={16} style={{ color: 'var(--blue-gov)' }} />
                  </div>
                </Link>

                {/* Organization Box */}
                <Link
                  to="/organization/dashboard"
                  style={{
                    display: 'block',
                    padding: '14px',
                    background: '#F8FAFC',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.2s'
                  }}
                  className="hero-gateway-card"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ background: 'var(--blue-gov)', color: '#FFF', padding: '8px', borderRadius: '6px' }}>
                        <Users size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '13.5px', color: 'var(--navy-deep)' }}>Nodal Organization Portal</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Field Teams, Inspections, Evidence Upload</div>
                      </div>
                    </div>
                    <ArrowRight size={16} style={{ color: 'var(--blue-gov)' }} />
                  </div>
                </Link>

                <div style={{ background: '#FFF8E1', border: '1px solid #FFE082', borderRadius: 'var(--radius-sm)', padding: '10px', fontSize: '11.5px', color: '#78350F', display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <Lock size={14} style={{ flexShrink: 0 }} />
                  <span>Use official demo credentials provided on the login page for instant sandbox verification.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live National Inspection Metrics Strip */}
      <section className="gov-stats-ribbon">
        <div className="gov-container">
          <div className="stats-ribbon-grid">
            <div className="stats-ribbon-item">
              <div className="num">{stats.totalOrgs}</div>
              <div className="lbl">Authorized Nodal Bodies</div>
            </div>
            <div className="stats-ribbon-item">
              <div className="num">{stats.totalInspections}</div>
              <div className="lbl">Audits Executed</div>
            </div>
            <div className="stats-ribbon-item">
              <div className="num">99.8%</div>
              <div className="lbl">RTK Geo-Tag Accuracy</div>
            </div>
            <div className="stats-ribbon-item">
              <div className="num">100%</div>
              <div className="lbl">Photographic Evidence Rigor</div>
            </div>
            <div className="stats-ribbon-item">
              <div className="num">{stats.overallCompliance}%</div>
              <div className="lbl">National Compliance Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Telemetry Radar Preview Section */}
      <section className="public-section" style={{ background: '#F8FAFC', padding: '40px 0' }}>
        <div className="gov-container">
          <div className="section-title-center" style={{ marginBottom: '24px' }}>
            <span className="gov-badge-official">REAL-TIME SURVEILLANCE TELEMETRY</span>
            <h2>Live Geo-Tagged Inspection Matrix</h2>
            <p>
              Interactive satellite & GNSS RTK rover positioning stream verifying physical on-site audit compliance.
            </p>
          </div>

          <LiveGeoRadar
            inspections={inspections}
            onSelectInspection={(insp) => setSelectedInspection(insp)}
          />
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="public-section" style={{ background: '#FFFFFF' }}>
        <div className="gov-container">
          <div className="section-title-center">
            <span className="gov-badge-official">PILLARS OF GOVERNANCE</span>
            <h2>Architected for Absolute Accountability</h2>
            <p>
              Engineered specifically to solve field inspection opacity, unauthorized reporting, and evidence tampering across India's vast public infrastructure assets.
            </p>
          </div>

          <div className="public-cards-grid">
            <div className="feature-card">
              <div className="feature-icon-wrap">
                <Building2 size={24} />
              </div>
              <h3>Two-Tier Governance Model</h3>
              <p>
                Central DOJS administrators maintain national oversight, register departmental organizations, and issue two distinct authorized login credentials per organization.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap">
                <Compass size={24} />
              </div>
              <h3>RTK GPS Differential Geo-Tagging</h3>
              <p>
                Every field audit mandates GNSS coordinates fix down to ±1.5 meter tolerance, preventing remote sign-offs without physical on-site presence.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap">
                <Camera size={24} />
              </div>
              <h3>Photographic Evidence Vault</h3>
              <p>
                Multi-angle photographic archives, test certificate attachments, and cryptographic timestamp hashes form an irrefutable audit trail.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap">
                <ClipboardCheck size={24} />
              </div>
              <h3>Granular Finding Lifecycle</h3>
              <p>
                Categorize non-conformances by severity (Low to Critical) with dedicated resolution leads, 7-day SLA deadlines, and verified rectification sign-offs.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap">
                <Users size={24} />
              </div>
              <h3>Field Team Unit Rostering</h3>
              <p>
                Form and deploy multi-disciplinary teams with domain specializations, lead officer contact mapping, and historic performance ratings.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap">
                <FileText size={24} />
              </div>
              <h3>Statutory Dossier Generation</h3>
              <p>
                Instant one-click compilation of comprehensive audit dossiers formatted per official Government of India Gazette standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inspection Domains Grid */}
      <section className="public-section" style={{ background: 'var(--bg-main)' }}>
        <div className="gov-container">
          <div className="section-title-center">
            <span className="gov-badge-official">AUDIT JURISDICTIONS</span>
            <h2>Covering Key Public Infrastructure Sectors</h2>
            <p>
              Standardized inspection protocols calibrated for diverse administrative departments and municipal bodies.
            </p>
          </div>

          <div className="public-cards-grid">
            {domains.map((dom, idx) => (
              <div key={idx} className="feature-card" style={{ background: '#FFFFFF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div className="feature-icon-wrap" style={{ margin: 0 }}>
                    <dom.icon size={22} />
                  </div>
                  <span style={{ fontSize: '11px', background: 'var(--blue-light)', color: 'var(--blue-gov)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                    {dom.count}
                  </span>
                </div>
                <h3>{dom.title}</h3>
                <p>{dom.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official CTA Strip */}
      <section style={{ background: 'var(--navy-deep)', color: '#FFFFFF', padding: '50px 0', borderTop: '4px solid var(--saffron-accent)' }}>
        <div className="gov-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
              Authorized Departmental Access
            </h2>
            <p style={{ margin: '6px 0 0', color: '#CBD5E1', fontSize: '14px' }}>
              Access the secure portal with your designated official credentials to schedule or manage audits.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/auth/login" className="gov-btn-accent" style={{ fontSize: '13.5px', padding: '10px 20px' }}>
              <span>Proceed to Portal Login</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Modal inspection details preview if clicked from Home */}
      {selectedInspection && (
        <InspectionDetailsModal
          isOpen={!!selectedInspection}
          onClose={() => setSelectedInspection(null)}
          inspection={selectedInspection}
          onUpdateStatus={() => {}}
          onOpenAddFinding={() => {}}
        />
      )}
    </div>
  );
};

