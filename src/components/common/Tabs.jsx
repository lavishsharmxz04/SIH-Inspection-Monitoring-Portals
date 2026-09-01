import React from 'react';

export const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="gov-tabs-bar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`gov-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon && <tab.icon size={15} />}
          <span>{tab.label}</span>
          {typeof tab.count !== 'undefined' && (
            <span className="tab-count">{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  );
};
