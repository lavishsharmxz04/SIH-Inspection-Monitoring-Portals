import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, RefreshCw, KeyRound, ArrowRight, Building2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Emblem } from '../../components/common/Emblem';
import { setSessionUser, getOrganizations, DEMO_USERS } from '../../services/mockService';

export const Login = () => {
  const navigate = useNavigate();
  const orgs = getOrganizations();

  const [role, setRole] = useState('ADMIN'); // 'ADMIN' or 'ORGANIZATION'
  const [selectedOrgId, setSelectedOrgId] = useState(orgs[0]?.id || 'ORG-001');
  const [username, setUsername] = useState('admin.dojs@nic.in');
  const [password, setPassword] = useState('••••••••••••');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7K9P4');
  const [errorMessage, setErrorMessage] = useState('');

  const refreshCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setErrorMessage('');
    if (newRole === 'ADMIN') {
      setUsername('admin.dojs@nic.in');
    } else {
      const selectedOrg = orgs.find((o) => o.id === selectedOrgId) || orgs[0];
      setUsername(`${(selectedOrg?.shortCode || 'nia').toLowerCase()}_nodal_admin`);
    }
  };

  const handleOrgChange = (e) => {
    const orgId = e.target.value;
    setSelectedOrgId(orgId);
    const selectedOrg = orgs.find((o) => o.id === orgId);
    setUsername(`${(selectedOrg?.shortCode || 'org').toLowerCase()}_nodal_admin`);
  };

  const handleQuickLogin = (demoType) => {
    if (demoType === 'admin') {
      setRole('ADMIN');
      setUsername('admin.dojs@nic.in');
      setSessionUser({
        role: 'ADMIN',
        officer: 'Dr. Rajeshwar Sharma, IAS',
        designation: 'Director General & Central Oversight Officer',
        email: 'admin.dojs@nic.in',
        orgId: null,
        orgName: 'DOJS Directorate (Central)'
      });
      navigate('/admin/dashboard');
    } else if (demoType === 'org_admin') {
      const org = orgs[0] || { id: 'ORG-001', name: 'National Infrastructure Authority', authorizedOfficer: 'Dr. Rajeshwar Sharma, IAS' };
      setRole('ORGANIZATION');
      setSelectedOrgId(org.id);
      setUsername('nia_nodal_admin');
      setSessionUser({
        role: 'ORGANIZATION',
        subRole: 'Nodal Admin',
        officer: org.authorizedOfficer || 'Er. Sandeep Chauhan',
        designation: 'Nodal Administrator',
        email: org.officialEmail || 'nodal@dept.gov.in',
        orgId: org.id,
        orgName: org.name
      });
      navigate('/organization/dashboard');
    } else if (demoType === 'field_lead') {
      const org = orgs[0] || { id: 'ORG-001', name: 'National Infrastructure Authority' };
      setRole('ORGANIZATION');
      setSelectedOrgId(org.id);
      setUsername('nia_field_lead');
      setSessionUser({
        role: 'ORGANIZATION',
        subRole: 'Field Supervisor',
        officer: 'Er. Sandeep Chauhan',
        designation: 'Field Inspection Supervisor',
        email: 'field.lead@dept.gov.in',
        orgId: org.id,
        orgName: org.name
      });
      navigate('/organization/inspections');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      setErrorMessage('Please enter your authorized username or official email ID.');
      return;
    }

    if (role === 'ADMIN') {
      setSessionUser({
        role: 'ADMIN',
        officer: 'Dr. Rajeshwar Sharma, IAS',
        designation: 'Director General & Central Oversight Officer',
        email: username,
        orgId: null,
        orgName: 'DOJS Directorate (Central)'
      });
      navigate('/admin/dashboard');
    } else {
      const selectedOrg = orgs.find((o) => o.id === selectedOrgId) || orgs[0];
      setSessionUser({
        role: 'ORGANIZATION',
        officer: selectedOrg?.authorizedOfficer || 'Nodal Authorized Officer',
        designation: selectedOrg?.designation || 'Department Officer',
        email: username,
        orgId: selectedOrg?.id || 'ORG-001',
        orgName: selectedOrg?.name || 'Nodal Organization'
      });
      navigate('/organization/dashboard');
    }
  };

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: 'calc(100vh - 140px)', padding: '40px 20px 60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        {/* Flag Bar */}
        <div className="gov-flag-bar" style={{ borderRadius: 'var(--radius-md) var(--radius-md) 0 0' }} />

        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '0 0 var(--radius-md) var(--radius-md)', padding: '32px', boxShadow: 'var(--shadow-modal)' }}>
          {/* Emblem & Portal Title */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Emblem size={48} />
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--saffron-accent)', marginTop: '8px', letterSpacing: '0.05em' }}>
              भारत सरकार | GOVERNMENT OF INDIA
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
              Official Inspection Portal Login
            </h2>
            <p style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
              Authorized Departmental &amp; Nodal Officer Access
            </p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="gov-tabs-bar" style={{ marginBottom: '20px' }}>
            <button
              type="button"
              className={`gov-tab-btn ${role === 'ADMIN' ? 'active' : ''}`}
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={() => handleRoleChange('ADMIN')}
            >
              <ShieldCheck size={15} />
              <span>DOJS Central Admin</span>
            </button>
            <button
              type="button"
              className={`gov-tab-btn ${role === 'ORGANIZATION' ? 'active' : ''}`}
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={() => handleRoleChange('ORGANIZATION')}
            >
              <Building2 size={15} />
              <span>Nodal Organization</span>
            </button>
          </div>

          {errorMessage && (
            <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '10px 12px', borderRadius: 'var(--radius-sm)', fontSize: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={15} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {role === 'ORGANIZATION' && (
              <div className="form-group">
                <label className="form-label">
                  Select Nodal Organization <span className="required">*</span>
                </label>
                <select
                  className="form-control"
                  value={selectedOrgId}
                  onChange={handleOrgChange}
                >
                  {orgs.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name} ({o.id})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">
                Official User ID / Email <span className="required">*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  className="form-control"
                  style={{ paddingLeft: '34px' }}
                  placeholder={role === 'ADMIN' ? 'admin.dojs@nic.in' : 'org_nodal_admin'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <User size={15} style={{ position: 'absolute', left: '10px', top: '11px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <label className="form-label" style={{ margin: 0 }}>
                  Authorized Passkey / Password <span className="required">*</span>
                </label>
                <span style={{ fontSize: '11px', color: 'var(--blue-gov)', cursor: 'pointer' }}>
                  Forgot Passkey?
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  required
                  className="form-control"
                  style={{ paddingLeft: '34px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock size={15} style={{ position: 'absolute', left: '10px', top: '11px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            {/* Security Captcha */}
            <div className="form-group">
              <label className="form-label">Security Verification Code</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div
                  style={{
                    background: '#1E293B',
                    color: '#F8FAFC',
                    fontFamily: 'monospace',
                    fontSize: '18px',
                    fontWeight: 800,
                    letterSpacing: '5px',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-sm)',
                    userSelect: 'none',
                    fontStyle: 'italic',
                    textDecoration: 'line-through'
                  }}
                >
                  {captchaCode}
                </div>
                <button
                  type="button"
                  className="gov-btn-outline"
                  onClick={refreshCaptcha}
                  title="Refresh Captcha"
                  style={{ padding: '7px 10px' }}
                >
                  <RefreshCw size={14} />
                </button>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter code"
                  style={{ flex: 1 }}
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="gov-btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '14px', padding: '10px' }}
            >
              <ShieldCheck size={16} />
              <span>Verify &amp; Enter Portal</span>
            </button>
          </form>

          {/* Quick Demo Login Credentials Bar */}
          <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--navy-deep)', textTransform: 'uppercase', marginBottom: '8px' }}>
              One-Click Demo Sandbox Sign-In:
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
              <button
                type="button"
                className="gov-btn-outline"
                style={{ justifyContent: 'flex-start', fontSize: '11.5px', padding: '6px 10px', background: '#F8FAFC' }}
                onClick={() => handleQuickLogin('admin')}
              >
                <ShieldCheck size={14} style={{ color: 'var(--blue-gov)' }} />
                <span>1. Sign In as <strong>DOJS Central Admin</strong></span>
              </button>

              <button
                type="button"
                className="gov-btn-outline"
                style={{ justifyContent: 'flex-start', fontSize: '11.5px', padding: '6px 10px', background: '#F8FAFC' }}
                onClick={() => handleQuickLogin('org_admin')}
              >
                <Building2 size={14} style={{ color: 'var(--saffron-accent)' }} />
                <span>2. Sign In as <strong>Nodal Org Admin (NIA)</strong></span>
              </button>

              <button
                type="button"
                className="gov-btn-outline"
                style={{ justifyContent: 'flex-start', fontSize: '11.5px', padding: '6px 10px', background: '#F8FAFC' }}
                onClick={() => handleQuickLogin('field_lead')}
              >
                <User size={14} style={{ color: 'var(--green-gov)' }} />
                <span>3. Sign In as <strong>Field Supervisor</strong></span>
              </button>
            </div>
          </div>

          <div style={{ marginTop: '18px', textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>
            <span>Need authorized credentials? </span>
            <Link to="/about" style={{ color: 'var(--blue-gov)', fontWeight: 600 }}>
              Contact Nodal Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
