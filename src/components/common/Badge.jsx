import React, { useState, useEffect, useRef } from 'react';
import { getStatusBadgeStyle } from '../../utils/helpers';

export const Badge = ({ status, className = '' }) => {
  const style = getStatusBadgeStyle(status);
  const [isUpdated, setIsUpdated] = useState(false);
  const prevStatusRef = useRef(status);

  useEffect(() => {
    if (prevStatusRef.current !== status) {
      prevStatusRef.current = status;
      setIsUpdated(true);
      const timer = setTimeout(() => setIsUpdated(false), 400);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const isLive = ['In-Progress', 'FIELD ACTIVE', 'Active', 'Critical', 'SCHEDULED'].includes(style.label);

  return (
    <span
      className={`gov-badge ${isUpdated ? 'gov-badge-updated' : ''} ${className}`}
      style={{
        backgroundColor: style.bg,
        color: style.color,
        borderColor: style.border
      }}
    >
      <span className={`badge-dot ${isLive ? 'badge-dot-pulse' : ''}`} />
      {style.label}
    </span>
  );
};
