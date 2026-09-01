import React from 'react';

export const StatCard = ({
  label,
  value,
  icon: Icon,
  trend,
  trendType = 'good', // 'good' or 'warn'
  accent = 'blue', // 'blue', 'saffron', 'green', 'red', 'yellow'
  subtext,
  onClick
}) => {
  return (
    <div
      className={`gov-kpi-card accent-${accent}`}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <div className="kpi-top">
        <span className="kpi-label">{label}</span>
        {Icon && (
          <div className="kpi-icon-wrap">
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="kpi-value">{value}</div>

      <div className="kpi-footer">
        {trend && (
          <span className={`kpi-trend-${trendType}`}>
            {trend}
          </span>
        )}
        {subtext && <span>{subtext}</span>}
      </div>
    </div>
  );
};
