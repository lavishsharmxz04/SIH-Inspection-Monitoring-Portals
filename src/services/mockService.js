import {
  initialOrganizations,
  initialTeams,
  initialInspections,
  initialReports,
  systemAlerts
} from '../data/mockData';

const STORAGE_KEYS = {
  ORGS: 'sih_portal_organizations',
  TEAMS: 'sih_portal_teams',
  INSPECTIONS: 'sih_portal_inspections',
  REPORTS: 'sih_portal_reports',
  ALERTS: 'sih_portal_alerts',
  CURRENT_USER: 'sih_portal_current_user'
};

const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
};

const setStored = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
};

// Initialize default state
export const initializeMockDatabase = () => {
  if (!localStorage.getItem(STORAGE_KEYS.ORGS)) {
    setStored(STORAGE_KEYS.ORGS, initialOrganizations);
  }
  if (!localStorage.getItem(STORAGE_KEYS.TEAMS)) {
    setStored(STORAGE_KEYS.TEAMS, initialTeams);
  }
  if (!localStorage.getItem(STORAGE_KEYS.INSPECTIONS)) {
    setStored(STORAGE_KEYS.INSPECTIONS, initialInspections);
  }
  if (!localStorage.getItem(STORAGE_KEYS.REPORTS)) {
    setStored(STORAGE_KEYS.REPORTS, initialReports);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ALERTS)) {
    setStored(STORAGE_KEYS.ALERTS, systemAlerts);
  }
};

// Reset to factory defaults
export const resetToDefaultData = () => {
  setStored(STORAGE_KEYS.ORGS, initialOrganizations);
  setStored(STORAGE_KEYS.TEAMS, initialTeams);
  setStored(STORAGE_KEYS.INSPECTIONS, initialInspections);
  setStored(STORAGE_KEYS.REPORTS, initialReports);
  setStored(STORAGE_KEYS.ALERTS, systemAlerts);
};

// --- Current Auth Session Simulation ---
export const getSessionUser = () => {
  return getStored(STORAGE_KEYS.CURRENT_USER, {
    role: 'ADMIN', // 'ADMIN' or 'ORGANIZATION'
    name: 'DOJS National Administration Cell',
    officer: 'Dr. Rajeshwar Sharma, IAS',
    orgId: 'ORG-001',
    orgName: 'National Infrastructure Authority'
  });
};

export const setSessionUser = (userData) => {
  setStored(STORAGE_KEYS.CURRENT_USER, userData);
};

// --- Organization Operations ---
export const getOrganizations = () => {
  initializeMockDatabase();
  return getStored(STORAGE_KEYS.ORGS, initialOrganizations);
};

export const getOrganizationById = (id) => {
  const orgs = getOrganizations();
  return orgs.find((o) => o.id === id) || null;
};

export const addOrganization = (newOrg) => {
  const orgs = getOrganizations();
  const updated = [newOrg, ...orgs];
  setStored(STORAGE_KEYS.ORGS, updated);
  return newOrg;
};

export const toggleOrganizationStatus = (id) => {
  const orgs = getOrganizations();
  const updated = orgs.map((o) => {
    if (o.id === id) {
      return {
        ...o,
        status: o.status === 'Active' ? 'Deactivated' : 'Active'
      };
    }
    return o;
  });
  setStored(STORAGE_KEYS.ORGS, updated);
  return updated.find((o) => o.id === id);
};

// --- Team Operations ---
export const getTeams = (orgId = null) => {
  initializeMockDatabase();
  const teams = getStored(STORAGE_KEYS.TEAMS, initialTeams);
  if (orgId) {
    return teams.filter((t) => t.orgId === orgId);
  }
  return teams;
};

export const getTeamById = (id) => {
  const teams = getTeams();
  return teams.find((t) => t.id === id) || null;
};

export const addTeam = (newTeam) => {
  const teams = getTeams();
  const updated = [newTeam, ...teams];
  setStored(STORAGE_KEYS.TEAMS, updated);
  return newTeam;
};

export const updateTeam = (id, updatedFields) => {
  const teams = getTeams();
  const updated = teams.map((t) => (t.id === id ? { ...t, ...updatedFields } : t));
  setStored(STORAGE_KEYS.TEAMS, updated);
  return updated.find((t) => t.id === id);
};

export const deleteTeam = (id) => {
  const teams = getTeams();
  const updated = teams.filter((t) => t.id !== id);
  setStored(STORAGE_KEYS.TEAMS, updated);
  return true;
};

// --- Inspection Operations ---
export const getInspections = (orgId = null) => {
  initializeMockDatabase();
  const inspections = getStored(STORAGE_KEYS.INSPECTIONS, initialInspections);
  if (orgId) {
    return inspections.filter((i) => i.orgId === orgId);
  }
  return inspections;
};

export const getInspectionById = (id) => {
  const inspections = getInspections();
  return inspections.find((i) => i.id === id) || null;
};

export const addInspection = (newInsp) => {
  const inspections = getInspections();
  const updated = [newInsp, ...inspections];
  setStored(STORAGE_KEYS.INSPECTIONS, updated);
  return newInsp;
};

export const updateInspectionStatus = (id, status, note = '') => {
  const inspections = getInspections();
  const updated = inspections.map((i) => {
    if (i.id === id) {
      const isCompleted = status === 'Completed';
      const nowStr = new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date());

      const newTimeline = [
        ...(i.timeline || []),
        {
          step: `Status Updated to ${status}`,
          timestamp: nowStr,
          by: 'Authorized Officer',
          note: note || `Inspection marked as ${status}`
        }
      ];

      return {
        ...i,
        status,
        ...(isCompleted && { completedDate: new Date().toISOString().split('T')[0] }),
        timeline: newTimeline
      };
    }
    return i;
  });
  setStored(STORAGE_KEYS.INSPECTIONS, updated);
  return updated.find((i) => i.id === id);
};

export const addFindingToInspection = (inspectionId, finding) => {
  const inspections = getInspections();
  const updated = inspections.map((i) => {
    if (i.id === inspectionId) {
      const findings = [...(i.findings || []), finding];
      const openCount = findings.filter((f) => f.status === 'Open').length;
      return {
        ...i,
        findings,
        findingsCount: findings.length,
        openIssuesCount: openCount
      };
    }
    return i;
  });
  setStored(STORAGE_KEYS.INSPECTIONS, updated);
  return updated.find((i) => i.id === inspectionId);
};

// --- Report Operations ---
export const getReports = () => {
  initializeMockDatabase();
  return getStored(STORAGE_KEYS.REPORTS, initialReports);
};

export const addReport = (newReport) => {
  const reports = getReports();
  const updated = [newReport, ...reports];
  setStored(STORAGE_KEYS.REPORTS, updated);
  return newReport;
};

// --- Alerts & System Updates ---
export const getAlerts = () => {
  initializeMockDatabase();
  return getStored(STORAGE_KEYS.ALERTS, systemAlerts);
};

export const markAlertAsRead = (id) => {
  const alerts = getAlerts();
  const updated = alerts.map((a) => (a.id === id ? { ...a, isRead: true } : a));
  setStored(STORAGE_KEYS.ALERTS, updated);
  return updated;
};

export const markAllAlertsAsRead = () => {
  const alerts = getAlerts();
  const updated = alerts.map((a) => ({ ...a, isRead: true }));
  setStored(STORAGE_KEYS.ALERTS, updated);
  return updated;
};

export const deleteAlert = (id) => {
  const alerts = getAlerts();
  const updated = alerts.filter((a) => a.id !== id);
  setStored(STORAGE_KEYS.ALERTS, updated);
  return updated;
};

export const clearAllReadAlerts = () => {
  const alerts = getAlerts();
  const updated = alerts.filter((a) => !a.isRead);
  setStored(STORAGE_KEYS.ALERTS, updated);
  return updated;
};

export const getSystemUpdates = () => {
  return [
    {
      id: 'SYS-UP-01',
      version: 'v2.6.4 Security Patch',
      date: 'Today, 09:30 AM',
      type: 'security',
      title: 'GNSS RTK Coordinate Differential Precision Upgrade',
      description: 'Upgraded field satellite triangulation tolerance to ±1.2 meters. Off-site checks beyond 50m radius will automatically fail authentication.',
      badge: 'Active & Enforced'
    },
    {
      id: 'SYS-UP-02',
      version: 'DOJS Directive 2026/84',
      date: 'Yesterday, 14:15 PM',
      type: 'compliance',
      title: 'Mandatory Dual-Login Protocol for Nodal Authorities',
      description: 'All 184 registered organizations must maintain separated credentials for Department Administrator and On-Field Supervisor.',
      badge: 'Statutory SOP'
    },
    {
      id: 'SYS-UP-03',
      version: 'v2.6.0 Feature Release',
      date: '28 Aug 2026',
      type: 'feature',
      title: 'Official Gazette PDF Dossier Export with SHA-256 Seal',
      description: 'Audit reports now generate automated digital stamp signatures and verification barcodes compatible with ministry filing portals.',
      badge: 'Feature Live'
    },
    {
      id: 'SYS-UP-04',
      version: 'SLA Escalation Engine',
      date: '25 Aug 2026',
      type: 'sla',
      title: '7-Day Critical Non-Conformance Auto-Escalation',
      description: 'Unresolved High and Critical findings will now trigger automated SMS and DOJS central dashboard warning flags upon Day 6 countdown.',
      badge: 'Automated'
    }
  ];
};

export const resetAlertsToDefault = () => {
  setStored(STORAGE_KEYS.ALERTS, systemAlerts);
  return systemAlerts;
};

// --- Admin Aggregate Statistics ---
export const getAdminKPIs = () => {
  const orgs = getOrganizations();
  const inspections = getInspections();

  const totalOrgs = orgs.length;
  const activeOrgs = orgs.filter((o) => o.status === 'Active').length;
  const totalInspections = inspections.length;
  const completedInspections = inspections.filter((i) => i.status === 'Completed').length;
  const pendingInspections = inspections.filter((i) => ['Pending', 'Scheduled', 'In Progress'].includes(i.status)).length;
  
  let openIssues = 0;
  inspections.forEach((insp) => {
    if (insp.findings) {
      openIssues += insp.findings.filter((f) => f.status === 'Open').length;
    }
  });

  return {
    totalOrgs,
    activeOrgs,
    totalInspections,
    completedInspections,
    pendingInspections,
    openIssues,
    overallCompliance: 91.6
  };
};

// --- Organization Specific KPI Statistics ---
export const getOrgKPIs = (orgId) => {
  const teams = getTeams(orgId);
  const inspections = getInspections(orgId);
  const reports = getReports();

  let totalMembers = 0;
  teams.forEach((t) => {
    totalMembers += t.membersCount || (t.members ? t.members.length : 0);
  });

  const totalInspections = inspections.length;
  const completedInspections = inspections.filter((i) => i.status === 'Completed').length;
  const pendingInspections = inspections.filter((i) => i.status === 'Pending' || i.status === 'Scheduled').length;
  const inProgressInspections = inspections.filter((i) => i.status === 'In Progress').length;
  const requiresAction = inspections.filter((i) => i.status === 'Requires Action').length;

  let openIssues = 0;
  inspections.forEach((insp) => {
    if (insp.findings) {
      openIssues += insp.findings.filter((f) => f.status === 'Open').length;
    }
  });

  return {
    totalTeams: teams.length,
    totalTeamMembers: totalMembers,
    totalInspections,
    completedInspections,
    pendingInspections,
    inProgressInspections,
    requiresAction,
    openIssues,
    reportsGenerated: reports.length
  };
};

// Aliases for convenience
export const getAdminStats = getAdminKPIs;
export const getOrgStats = getOrgKPIs;
export const addInspectionFinding = addFindingToInspection;

export const DEMO_USERS = [
  { role: 'ADMIN', name: 'DOJS Central Admin', email: 'admin.dojs@nic.in' },
  { role: 'ORGANIZATION', name: 'Nodal Org Admin', email: 'nia_nodal_admin' },
  { role: 'ORGANIZATION', name: 'Field Supervisor', email: 'nia_field_lead' }
];

