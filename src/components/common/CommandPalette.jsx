import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Command,
  Building2,
  ClipboardCheck,
  Users,
  FileText,
  Plus,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  Compass,
  CornerDownLeft,
  RotateCcw
} from 'lucide-react';
import {
  getOrganizations,
  getInspections,
  getTeams,
  getReports,
  resetToDefaultData
} from '../../services/mockService';
import { soundFx } from '../../utils/soundEffects';

export const CommandPalette = ({
  isOpen,
  onClose,
  onOpenCreateOrg,
  onOpenCreateInsp,
  onOpenCreateTeam,
  onOpenGenerateReport,
  onSelectInspection
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      soundFx.play('click');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Global keydown listeners for ESC and arrows
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle palette on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else if (window.__openCommandPalette) window.__openCommandPalette();
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const orgs = getOrganizations();
  const inspections = getInspections();
  const teams = getTeams();
  const reports = getReports();

  // Static commands list
  const systemActions = [
    {
      id: 'act-new-insp',
      category: 'Actions',
      title: 'Schedule New Inspection Order',
      subtitle: 'Create geo-tagged field audit order with assigned nodal team',
      icon: ClipboardCheck,
      badge: 'Order',
      action: () => {
        onClose();
        if (onOpenCreateInsp) onOpenCreateInsp();
        else navigate('/admin/dashboard');
      }
    },
    {
      id: 'act-new-org',
      category: 'Actions',
      title: 'Register Nodal Organization',
      subtitle: 'Issue 2 dual-login credentials with state domain mapping',
      icon: Plus,
      badge: 'Register',
      action: () => {
        onClose();
        if (onOpenCreateOrg) onOpenCreateOrg();
        else navigate('/admin/organizations');
      }
    },
    {
      id: 'act-new-team',
      category: 'Actions',
      title: 'Form Field Inspection Team',
      subtitle: 'Roster certified field inspectors with RTK rover hardware',
      icon: Users,
      badge: 'Team',
      action: () => {
        onClose();
        if (onOpenCreateTeam) onOpenCreateTeam();
        else navigate('/organization/teams');
      }
    },
    {
      id: 'act-gen-rep',
      category: 'Actions',
      title: 'Generate Official Compliance Report',
      subtitle: 'Compile statutory dossier with cryptographic digital seal',
      icon: FileText,
      badge: 'Report',
      action: () => {
        onClose();
        if (onOpenGenerateReport) onOpenGenerateReport();
        else navigate('/admin/reports');
      }
    },
    {
      id: 'act-reset-data',
      category: 'System',
      title: 'Reset Demo Database to National Baseline',
      subtitle: 'Re-seed all inspections, telemetry logs, and alerts',
      icon: RotateCcw,
      badge: 'Re-seed',
      action: () => {
        resetToDefaultData();
        soundFx.play('success');
        onClose();
        window.location.reload();
      }
    }
  ];

  const navigationItems = [
    {
      id: 'nav-admin-dash',
      category: 'Navigation',
      title: 'DOJS Central Command Dashboard',
      subtitle: 'National KPI metrics, SLA countdowns, and geo-radar',
      icon: Building2,
      path: '/admin/dashboard'
    },
    {
      id: 'nav-admin-orgs',
      category: 'Navigation',
      title: 'Nodal Organizations Directory',
      subtitle: '184 state & central authorities and issued login accounts',
      icon: Building2,
      path: '/admin/organizations'
    },
    {
      id: 'nav-admin-reports',
      category: 'Navigation',
      title: 'National Audit Dossiers & Gazette Reports',
      subtitle: 'Cryptographic compliance records and PDF downloads',
      icon: FileText,
      path: '/admin/reports'
    },
    {
      id: 'nav-org-dash',
      category: 'Navigation',
      title: 'Department Organization Workspace',
      subtitle: 'Field team rosters, scheduled audits, and live evidence logs',
      icon: Compass,
      path: '/organization/dashboard'
    },
    {
      id: 'nav-org-inspections',
      category: 'Navigation',
      title: 'Field Inspections & Evidence Vault',
      subtitle: 'GPS coordinates, photo non-conformances, and telemetry fixes',
      icon: ClipboardCheck,
      path: '/organization/inspections'
    },
    {
      id: 'nav-public-home',
      category: 'Navigation',
      title: 'Public Portal Home',
      subtitle: 'Government oversight platform overview and guidance',
      icon: Sparkles,
      path: '/'
    }
  ];

  const q = query.toLowerCase().trim();

  // Filter Items
  const filteredActions = systemActions.filter(
    (a) => a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q)
  );

  const filteredNav = navigationItems.filter(
    (n) => n.title.toLowerCase().includes(q) || n.subtitle.toLowerCase().includes(q)
  );

  const filteredInspections = inspections
    .filter(
      (insp) =>
        insp.id.toLowerCase().includes(q) ||
        insp.title.toLowerCase().includes(q) ||
        insp.site.toLowerCase().includes(q) ||
        insp.location.toLowerCase().includes(q) ||
        insp.organization.toLowerCase().includes(q)
    )
    .slice(0, 5)
    .map((insp) => ({
      id: `insp-${insp.id}`,
      category: 'Inspections',
      title: `${insp.id}: ${insp.title}`,
      subtitle: `${insp.site} • ${insp.location} (${insp.organization})`,
      icon: ClipboardCheck,
      badge: insp.status,
      action: () => {
        onClose();
        if (onSelectInspection) {
          onSelectInspection(insp);
        } else {
          navigate('/admin/dashboard');
        }
      }
    }));

  const filteredOrgs = orgs
    .filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.name.toLowerCase().includes(q) ||
        o.state.toLowerCase().includes(q) ||
        o.category.toLowerCase().includes(q)
    )
    .slice(0, 4)
    .map((o) => ({
      id: `org-${o.id}`,
      category: 'Organizations',
      title: `${o.name} (${o.id})`,
      subtitle: `${o.state} • ${o.category} • Head: ${o.headOfficer}`,
      icon: Building2,
      badge: o.status,
      action: () => {
        onClose();
        navigate('/admin/organizations');
      }
    }));

  const allResults = [
    ...filteredActions,
    ...filteredNav.map((n) => ({
      ...n,
      action: () => {
        onClose();
        navigate(n.path);
      }
    })),
    ...filteredInspections,
    ...filteredOrgs
  ];

  const handleSelect = (item) => {
    soundFx.play('click');
    if (item && item.action) {
      item.action();
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (allResults.length || 1));
      soundFx.play('click');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (allResults.length || 1)) % (allResults.length || 1));
      soundFx.play('click');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allResults[selectedIndex]) {
        handleSelect(allResults[selectedIndex]);
      }
    }
  };

  return (
    <div
      className="cmd-palette-backdrop"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        className="cmd-palette-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Universal Command & Telemetry Search"
      >
        {/* Search Input Header */}
        <div className="cmd-palette-input-wrapper">
          <Search size={20} className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-palette-input"
            placeholder="Search inspections, organizations, telemetry coords, or command (e.g., 'bridge', 'nhai', 'order')..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
          />
          {query ? (
            <button
              type="button"
              className="cmd-clear-btn"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
            >
              <X size={16} />
            </button>
          ) : (
            <kbd className="cmd-kbd-badge">ESC</kbd>
          )}
        </div>

        {/* Results List */}
        <div className="cmd-palette-results" ref={listRef}>
          {allResults.length === 0 ? (
            <div className="cmd-empty-state">
              <Compass size={32} style={{ color: 'var(--blue-gov)', margin: '0 auto 10px auto' }} />
              <p style={{ fontWeight: 700, color: 'var(--navy-deep)', margin: '0 0 4px 0' }}>
                No telemetry or matching records found for "{query}"
              </p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                Try searching for "INSP", "Hospital", "School", "Highways", "Team", or "Register"
              </p>
            </div>
          ) : (
            allResults.map((item, idx) => {
              const Icon = item.icon || Sparkles;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  className={`cmd-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="cmd-item-icon-box">
                    <Icon size={16} />
                  </div>

                  <div className="cmd-item-content">
                    <div className="cmd-item-title-row">
                      <span className="cmd-item-title">{item.title}</span>
                      {item.badge && <span className="cmd-item-badge">{item.badge}</span>}
                    </div>
                    <div className="cmd-item-subtitle">{item.subtitle}</div>
                  </div>

                  <div className="cmd-item-enter">
                    {isSelected && <CornerDownLeft size={14} />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts bar */}
        <div className="cmd-palette-footer">
          <div className="cmd-footer-shortcuts">
            <span className="cmd-shortcut-hint">
              <kbd className="cmd-kbd-mini">↑</kbd> <kbd className="cmd-kbd-mini">↓</kbd> Navigate
            </span>
            <span className="cmd-shortcut-hint">
              <kbd className="cmd-kbd-mini">↵</kbd> Select
            </span>
            <span className="cmd-shortcut-hint">
              <kbd className="cmd-kbd-mini">ESC</kbd> Close
            </span>
          </div>

          <div className="cmd-footer-brand">
            <Sparkles size={13} style={{ color: 'var(--saffron-accent)' }} />
            <span>National Telemetry QuickHUD</span>
          </div>
        </div>
      </div>
    </div>
  );
};
