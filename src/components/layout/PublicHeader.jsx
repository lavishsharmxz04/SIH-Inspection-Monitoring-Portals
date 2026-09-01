import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Globe, UserCheck } from 'lucide-react';
import { Emblem } from '../common/Emblem';

export const PublicHeader = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langHindi, setLangHindi] = useState(false);
  const [fontSize, setFontSize] = useState('md');

  const setAppFontSize = (size) => {
    setFontSize(size);
    document.body.className = `font-${size}`;
  };

  const navLinks = [
    { path: '/', label: langHindi ? 'मुख्य पृष्ठ (Home)' : 'Home' },
    { path: '/about', label: langHindi ? 'हमारे बारे में (About)' : 'About' },
    { path: '/features', label: langHindi ? 'विशेषताएं (Features)' : 'Features' },
    { path: '/how-it-works', label: langHindi ? 'कार्यप्रणाली (How It Works)' : 'How It Works' },
  ];

  return (
    <header>
      {/* Tricolor Ribbon */}
      <div className="gov-flag-bar" />

      {/* Top Accessibility Strip */}
      <div className="gov-top-accessibility">
        <div className="gov-container gov-top-flex">
          <div className="gov-top-left">
            <span>भारत सरकार | Government of India</span>
            <span style={{ color: '#94A3B8' }}>|</span>
            <span>Department of Official Justice &amp; Oversight (DOJS)</span>
          </div>

          <div className="gov-top-right">
            <div className="font-size-controls">
              <span style={{ fontSize: '11px', marginRight: '4px', color: '#94A3B8' }}>Font:</span>
              <button
                type="button"
                className={`font-btn ${fontSize === 'sm' ? 'active' : ''}`}
                onClick={() => setAppFontSize('sm')}
                title="Decrease font size"
              >
                A-
              </button>
              <button
                type="button"
                className={`font-btn ${fontSize === 'md' ? 'active' : ''}`}
                onClick={() => setAppFontSize('md')}
                title="Normal font size"
              >
                A
              </button>
              <button
                type="button"
                className={`font-btn ${fontSize === 'lg' ? 'active' : ''}`}
                onClick={() => setAppFontSize('lg')}
                title="Increase font size"
              >
                A+
              </button>
            </div>

            <button
              type="button"
              className="lang-switch"
              onClick={() => setLangHindi(!langHindi)}
            >
              <Globe size={11} style={{ display: 'inline', marginRight: '4px' }} />
              {langHindi ? 'English' : 'हिंदी'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Government Portal Header */}
      <div className="gov-main-header">
        <div className="gov-container gov-header-inner">
          <Link to="/" className="gov-brand">
            <Emblem size={46} />
            <div className="gov-brand-text">
              <p className="sub-hindi">स्मार्ट इंडिया हैकाथॉन - आधिकारिक निरीक्षण पोर्टल</p>
              <h1>SIH Inspection &amp; Monitoring Portal</h1>
              <p>Government Digital Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="gov-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`gov-nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}

            <Link to="/auth/login" className="gov-nav-link gov-btn-login">
              <UserCheck size={16} />
              <span>{langHindi ? 'पोर्टल लॉगिन' : 'Portal Login'}</span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid var(--border-color)',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`gov-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="gov-nav-link gov-btn-login"
              style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}
            >
              <UserCheck size={16} />
              <span>Portal Login</span>
            </Link>
          </div>
        )}
      </div>

      {/* Security Banner Ribbon */}
      <div className="gov-security-ribbon">
        <div className="gov-container gov-ribbon-flex">
          <div className="gov-security-tag">
            <Shield size={14} />
            <span>Secure Access • Access Restricted to Authorized Organizations</span>
          </div>
          <div style={{ fontSize: '11.5px', color: '#CBD5E1' }}>
            <span>Official Digital Platform • 256-Bit Encrypted Audit Logs</span>
          </div>
        </div>
      </div>
    </header>
  );
};
