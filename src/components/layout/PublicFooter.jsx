import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { Emblem } from '../common/Emblem';

export const PublicFooter = () => {
  return (
    <footer className="gov-footer">
      <div className="gov-container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <Emblem size={40} />
              <div>
                <h3 style={{ margin: 0, fontSize: '16px' }}>SIH Inspection &amp; Monitoring Portal</h3>
                <span style={{ fontSize: '11px', color: '#FFB37C', fontWeight: 600 }}>
                  Government of India Digital Platform
                </span>
              </div>
            </div>
            <p>
              A centralized digital monitoring ecosystem built for Smart India Hackathon to facilitate structured field inspections, photographic evidence archiving, geo-tagged audits, and real-time governance compliance.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#CBD5E1' }}>
              <ShieldCheck size={16} style={{ color: '#4ADE80' }} />
              <span>Certified under National Cybersecurity &amp; Audit Standards</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Portal Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/about">About DOJS &amp; Initiative</Link></li>
              <li><Link to="/features">Core Platform Capabilities</Link></li>
              <li><Link to="/how-it-works">Inspection Workflow</Link></li>
              <li><Link to="/auth/login">Authorized Officer Login</Link></li>
            </ul>
          </div>

          {/* Official Resources */}
          <div className="footer-col">
            <h4>Government Portals</h4>
            <ul className="footer-links">
              <li>
                <a href="https://india.gov.in" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  National Portal of India <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://digitalindia.gov.in" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Digital India Initiative <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://sih.gov.in" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Smart India Hackathon <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://nic.in" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  National Informatics Centre <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Security & Support */}
          <div className="footer-col">
            <h4>Nodal Desk</h4>
            <p style={{ fontSize: '12.5px', color: '#94A3B8', marginBottom: '8px' }}>
              For technical integration and authorized organization credential inquiries:
            </p>
            <div style={{ fontSize: '12px', color: '#E2E8F0', lineHeight: 1.6 }}>
              <p><strong>Email:</strong> nodal.inspection@nic.in</p>
              <p><strong>Toll Free:</strong> 1800-11-2026 (09:00 - 18:00 IST)</p>
              <p><strong>Location:</strong> CGO Complex, Lodhi Road, New Delhi</p>
            </div>
          </div>
        </div>

        {/* Bottom Accreditation */}
        <div className="footer-bottom">
          <div>
            <span>© {new Date().getFullYear()} SIH Inspection &amp; Monitoring Portal. Designed &amp; Developed for Smart India Hackathon.</span>
          </div>

          <div className="footer-nic-badge">
            <span>Hosted on National Cloud Infrastructure</span>
            <span style={{ color: '#64748B' }}>•</span>
            <span>Version 2.4.0-GOV</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
