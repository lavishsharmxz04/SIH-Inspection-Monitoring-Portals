import React from 'react';
import {
  Building2,
  ClipboardCheck,
  Clock,
  AlertTriangle,
  Users,
  ShieldCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { StatCard } from '../common/StatCard';

export const AdminKPICards = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="kpi-cards-grid">
      <StatCard
        label="Total Registered Orgs"
        value={stats.totalOrgs}
        icon={Building2}
        accent="blue"
        trend={`+${stats.activeOrgs} Active`}
        trendType="good"
        subtext="State & Central Bodies"
      />
      <StatCard
        label="Total Inspections"
        value={stats.totalInspections}
        icon={ClipboardCheck}
        accent="saffron"
        trend="+14 This Month"
        trendType="good"
        subtext="Across all domains"
      />
      <StatCard
        label="Completed Audits"
        value={stats.completedInspections}
        icon={CheckCircle2}
        accent="green"
        trend="92.4% Completion"
        trendType="good"
        subtext="Signed & Verified"
      />
      <StatCard
        label="Pending / In-Progress"
        value={stats.pendingInspections}
        icon={Clock}
        accent="yellow"
        trend="SLA: Within 7 Days"
        trendType="good"
        subtext="Field mobilization active"
      />
      <StatCard
        label="Open Critical Issues"
        value={stats.openIssues}
        icon={AlertTriangle}
        accent="red"
        trend="Action Mandate Active"
        trendType="warn"
        subtext="Under active remediation"
      />
      <StatCard
        label="National Compliance Index"
        value={`${stats.overallCompliance || '91.6'}%`}
        icon={ShieldCheck}
        accent="green"
        trend="Grade A (Excellent)"
        trendType="good"
        subtext="Annual audit target met"
      />
    </div>
  );
};

export const OrgKPICards = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="kpi-cards-grid">
      <StatCard
        label="Active Field Teams"
        value={stats.totalTeams}
        icon={Users}
        accent="blue"
        trend="100% Deployed"
        trendType="good"
        subtext="Covering assigned zones"
      />
      <StatCard
        label="Total Team Members"
        value={stats.totalTeamMembers}
        icon={Users}
        accent="saffron"
        trend="Govt Certified"
        trendType="good"
        subtext="Auditors & Specialists"
      />
      <StatCard
        label="Total Inspections"
        value={stats.totalInspections}
        icon={ClipboardCheck}
        accent="blue"
        trend="Active Mandates"
        trendType="good"
        subtext="Current calendar year"
      />
      <StatCard
        label="Completed Inspections"
        value={stats.completedInspections}
        icon={CheckCircle2}
        accent="green"
        trend="Verified Evidence"
        trendType="good"
        subtext="100% Geo-tagged"
      />
      <StatCard
        label="In Progress / Scheduled"
        value={stats.inProgressInspections + stats.pendingInspections}
        icon={Clock}
        accent="yellow"
        trend="On Schedule"
        trendType="good"
        subtext="Field visits underway"
      />
      <StatCard
        label="Open Non-Conformances"
        value={stats.openIssues}
        icon={AlertTriangle}
        accent={stats.openIssues > 0 ? 'red' : 'green'}
        trend={stats.openIssues > 0 ? 'Requires Action' : 'All Clear'}
        trendType={stats.openIssues > 0 ? 'warn' : 'good'}
        subtext="Findings logged"
      />
    </div>
  );
};
