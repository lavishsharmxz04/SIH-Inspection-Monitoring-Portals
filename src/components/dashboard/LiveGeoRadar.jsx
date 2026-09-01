import React, { useState, useEffect } from 'react';
import {
  Compass,
  MapPin,
  Radio,
  Wifi,
  Crosshair,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Maximize2
} from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';

export const LiveGeoRadar = ({ inspections = [], onSelectInspection }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeSector, setActiveSector] = useState('ALL');
  const [radarAngle, setRadarAngle] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const [telemetryPing, setTelemetryPing] = useState(34);

  // Simulated radar sweep angle
  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setRadarAngle((prev) => (prev + 3) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isScanning]);

  // Simulated live telemetry ping fluctuation
  useEffect(() => {
    const pingInterval = setInterval(() => {
      setTelemetryPing((prev) => Math.floor(28 + Math.random() * 12));
    }, 4000);
    return () => clearInterval(pingInterval);
  }, []);

  // Telemetry nodes mapping from inspections or fallback coordinates
  const nodes = [
    {
      id: 'INSP-2401',
      site: 'Chenab High-Speed Rail Viaduct',
      location: 'Reasi, J&K',
      sector: 'HIGHWAYS',
      inspector: 'Capt. Vikramaditya Rawat',
      status: 'SCHEDULED',
      priority: 'CRITICAL',
      coords: '33°09\'03"N 74°52\'46"E',
      x: 32, // percentage coordinates on radar grid
      y: 22,
      accuracy: '±0.3m RTK Fix',
      satellites: '12 (NavIC + GPS)',
      elevation: '1,420m MSL',
      temp: '18.4°C'
    },
    {
      id: 'INSP-2402',
      site: 'AIIMS Super Specialty Trauma Wing',
      location: 'Nagpur, MH',
      sector: 'HEALTHCARE',
      inspector: 'Dr. Sunita Kulkarni',
      status: 'COMPLETED',
      priority: 'HIGH',
      coords: '21°08\'45"N 79°05\'12"E',
      x: 52,
      y: 56,
      accuracy: '±0.4m RTK Fix',
      satellites: '14 Satellites',
      elevation: '310m MSL',
      temp: '31.2°C'
    },
    {
      id: 'INSP-2403',
      site: 'Model Senior Secondary School',
      location: 'Karnal, HR',
      sector: 'EDUCATION',
      inspector: 'Shri Anand Verma',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      coords: '29°41\'10"N 76°59\'20"E',
      x: 42,
      y: 35,
      accuracy: '±0.6m Differential',
      satellites: '11 Satellites',
      elevation: '252m MSL',
      temp: '29.0°C'
    },
    {
      id: 'INSP-2404',
      site: 'Integrated Sewage Treatment Plant 40MLD',
      location: 'Varanasi, UP',
      sector: 'WATER',
      inspector: 'Er. Pradeep Mishra',
      status: 'PENDING_REVIEW',
      priority: 'HIGH',
      coords: '25°19\'12"N 83°00\'36"E',
      x: 64,
      y: 44,
      accuracy: '±0.5m RTK Fix',
      satellites: '13 Satellites',
      elevation: '80m MSL',
      temp: '33.1°C'
    },
    {
      id: 'INSP-2405',
      site: 'High-Capacity Grain Silo Complex',
      location: 'Sangrur, PB',
      sector: 'INFRA',
      inspector: 'Sardar Manjit Singh',
      status: 'COMPLETED',
      priority: 'LOW',
      coords: '30°14\'24"N 75°50\'42"E',
      x: 36,
      y: 28,
      accuracy: '±0.2m RTK Fix',
      satellites: '15 Satellites',
      elevation: '232m MSL',
      temp: '27.8°C'
    },
    {
      id: 'INSP-2406',
      site: 'Smart Solar Microgrid 2.5MW',
      location: 'Jaisalmer, RJ',
      sector: 'ENERGY',
      inspector: 'Eng. Devendra Rathore',
      status: 'SCHEDULED',
      priority: 'MEDIUM',
      coords: '26°55\'12"N 70°54\'00"E',
      x: 24,
      y: 42,
      accuracy: '±0.4m RTK Fix',
      satellites: '14 Satellites',
      elevation: '225m MSL',
      temp: '37.5°C'
    }
  ];

  // Auto-select first node if none selected
  useEffect(() => {
    if (!selectedNode && nodes.length > 0) {
      setSelectedNode(nodes[0]);
    }
  }, []);

  const filteredNodes = nodes.filter((n) => {
    if (activeSector === 'ALL') return true;
    return n.sector === activeSector;
  });

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    soundFx.play('radar');
  };

  const handleInspectFull = (node) => {
    soundFx.play('click');
    if (onSelectInspection) {
      const match = inspections.find((i) => i.id === node.id) || {
        id: node.id,
        title: node.site,
        site: node.site,
        location: node.location,
        status: node.status,
        priority: node.priority,
        inspector: node.inspector,
        organization: 'National Nodal Authority',
        geoCoordinates: node.coords
      };
      onSelectInspection(match);
    }
  };

  const getNodeColor = (node) => {
    if (node.priority === 'CRITICAL') return '#EF4444'; // Red
    if (node.status === 'COMPLETED') return '#22C55E'; // Green
    if (node.status === 'IN_PROGRESS') return '#3B82F6'; // Blue
    return '#E87522'; // Saffron
  };

  return (
    <div className="gov-radar-container">
      {/* Header telemetry ribbon */}
      <div className="radar-header">
        <div className="radar-title-group">
          <div className="radar-live-badge">
            <Radio size={14} className="radar-ping-icon" />
            <span>LIVE GNSS RTK TELEMETRY</span>
          </div>
          <h3 className="radar-title">National Geo-Tagged Field Surveillance Matrix</h3>
        </div>

        <div className="radar-telemetry-stats">
          <div className="telemetry-stat-item">
            <Wifi size={13} style={{ color: 'var(--success)' }} />
            <span>NavIC RTK: <strong>Active</strong></span>
          </div>
          <div className="telemetry-stat-item">
            <Crosshair size={13} style={{ color: 'var(--blue-gov)' }} />
            <span>Precision: <strong>±0.3m</strong></span>
          </div>
          <div className="telemetry-stat-item">
            <Clock size={13} style={{ color: 'var(--saffron-accent)' }} />
            <span>Rover Ping: <strong>{telemetryPing}ms</strong></span>
          </div>
        </div>
      </div>

      {/* Sector Filter Chips */}
      <div className="radar-sectors-bar">
        {[
          { key: 'ALL', label: 'All Sectors' },
          { key: 'HIGHWAYS', label: 'Highways & Rail' },
          { key: 'HEALTHCARE', label: 'Healthcare' },
          { key: 'EDUCATION', label: 'Education' },
          { key: 'WATER', label: 'Municipal Water' },
          { key: 'ENERGY', label: 'Solar & Energy' }
        ].map((s) => (
          <button
            key={s.key}
            type="button"
            className={`radar-sector-chip ${activeSector === s.key ? 'active' : ''}`}
            onClick={() => {
              setActiveSector(s.key);
              soundFx.play('click');
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Radar Screen + Node Telemetry Inspector */}
      <div className="radar-grid">
        {/* Radar Viewport */}
        <div className="radar-screen">
          {/* Radar Circles & Crosshairs */}
          <div className="radar-ring ring-1" />
          <div className="radar-ring ring-2" />
          <div className="radar-ring ring-3" />
          <div className="radar-crosshair-h" />
          <div className="radar-crosshair-v" />

          {/* Sweeping Beam */}
          <div
            className="radar-sweep-beam"
            style={{
              transform: `rotate(${radarAngle}deg)`
            }}
          />

          {/* Geo Nodes */}
          {filteredNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const color = getNodeColor(node);

            return (
              <div
                key={node.id}
                className={`radar-node-marker ${isSelected ? 'selected' : ''}`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`
                }}
                onClick={() => handleNodeClick(node)}
                title={`${node.id} - ${node.site} (${node.location})`}
              >
                <div
                  className="radar-node-pulse"
                  style={{ backgroundColor: color }}
                />
                <div
                  className="radar-node-dot"
                  style={{ backgroundColor: color }}
                />

                {/* Node Mini Tag */}
                <div className="radar-node-tag">
                  <span className="radar-tag-id">{node.id}</span>
                </div>
              </div>
            );
          })}

          {/* Coordinates HUD overlay at bottom left */}
          <div className="radar-hud-coords">
            <span>GRID: LAT/LONG WGS-84</span>
            <span>DATUM: GAGAN / NAVIC GEO-REF</span>
          </div>

          <button
            type="button"
            className="radar-toggle-scan"
            onClick={() => setIsScanning(!isScanning)}
            title={isScanning ? 'Pause radar sweep' : 'Resume radar sweep'}
          >
            {isScanning ? 'SCANNING ON' : 'SCAN PAUSED'}
          </button>
        </div>

        {/* Selected Node Telemetry Inspector Panel */}
        <div className="radar-inspector">
          {selectedNode ? (
            <div className="inspector-card">
              <div className="inspector-header">
                <div>
                  <span className="inspector-badge" style={{ borderColor: getNodeColor(selectedNode) }}>
                    {selectedNode.id} • {selectedNode.priority}
                  </span>
                  <h4 className="inspector-site-name">{selectedNode.site}</h4>
                  <div className="inspector-location">
                    <MapPin size={13} />
                    <span>{selectedNode.location}</span>
                  </div>
                </div>
              </div>

              <div className="inspector-specs-grid">
                <div className="spec-box">
                  <span className="spec-label">GPS COORDINATES</span>
                  <span className="spec-value mono">{selectedNode.coords}</span>
                </div>

                <div className="spec-box">
                  <span className="spec-label">RTK PRECISION FIX</span>
                  <span className="spec-value text-green">{selectedNode.accuracy}</span>
                </div>

                <div className="spec-box">
                  <span className="spec-label">CONSTELLATION LOCK</span>
                  <span className="spec-value">{selectedNode.satellites}</span>
                </div>

                <div className="spec-box">
                  <span className="spec-label">SITE ELEVATION</span>
                  <span className="spec-value">{selectedNode.elevation}</span>
                </div>

                <div className="spec-box">
                  <span className="spec-label">LEAD INSPECTOR</span>
                  <span className="spec-value">{selectedNode.inspector}</span>
                </div>

                <div className="spec-box">
                  <span className="spec-label">AUDIT STATUS</span>
                  <span className="spec-value bold">{selectedNode.status}</span>
                </div>
              </div>

              <div className="inspector-actions">
                <button
                  type="button"
                  className="gov-btn-accent w-full"
                  onClick={() => handleInspectFull(selectedNode)}
                  style={{ justifyContent: 'center', fontSize: '12.5px', padding: '10px' }}
                >
                  <ExternalLink size={15} />
                  <span>Inspect Audit Dossier & Evidence</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="inspector-empty">
              <Compass size={32} style={{ color: 'var(--blue-gov)' }} />
              <p>Click any radar node on the matrix to stream real-time telemetry.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
