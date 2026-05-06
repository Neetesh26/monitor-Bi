import { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import D3ActivityChart from "../../components/D3ActivityChart";

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const ArrowUpIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const icons = {
  workTime: (c) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  activeTime: (c) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  idleTime: (c) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  manualTime: (c) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="9" x2="9" y2="21" />
    </svg>
  ),
  productiveTime: (c) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  unproductiveTime: (c) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  ),
  neutralTime: (c) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  utilization: (c) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

const statCards = [
  { key: "workTime",         label: "Work Time",         value: "01:42 h", change: "+99%", color: "#3b82f6" },
  { key: "activeTime",       label: "Active Time",       value: "01:42 h", change: "+99%", color: "#0ea5e9" },
  { key: "idleTime",         label: "Idle Time",         value: "01:42 h", change: "+99%", color: "#ef4444" },
  { key: "manualTime",       label: "Manual Time",       value: "01:42 h", change: "+99%", color: "#8b5cf6" },
  { key: "productiveTime",   label: "Productive Time",   value: "01:42 h", change: "+99%", color: "#10b981" },
  { key: "unproductiveTime", label: "Unproductive Time", value: "01:42 h", change: "+99%", color: "#f59e0b" },
  { key: "neutralTime",      label: "Neutral Time",      value: "01:42 h", change: "+99%", color: "#64748b" },
  { key: "utilization",      label: "Utilization",       value: "16.32%",  change: "+99%", color: "#6366f1" },
];

const activityData = [
  { day: "13 Mar", active: 50, breakT: 8,  manual: 4 },
  { day: "13 Mar", active: 48, breakT: 10, manual: 5 },
  { day: "13 Mar", active: 50, breakT: 8,  manual: 4 },
  { day: "13 Mar", active: 50, breakT: 7,  manual: 3 },
  { day: "13 Mar", active: 50, breakT: 8,  manual: 5 },
  { day: "13 Mar", active: 49, breakT: 9,  manual: 4 },
  { day: "16 Mar", active: 51, breakT: 6,  manual: 3 },
];

const donutData = [
  { name: "Services",             value: 32, color: "#fca5a5" },
  { name: "Advertising Tools",    value: 18, color: "#93c5fd" },
  { name: "Arts & Entertainment", value: 14, color: "#fde68a" },
  { name: "Communication",        value: 12, color: "#6ee7b7" },
  { name: "AI Tools",             value: 12, color: "#c4b5fd" },
  { name: "Shopping",             value: 12, color: "#fda4af" },
];

const categories = [
  "Services",
  "Advertising Tools",
  "Arts & Entertainment",
  "Communication",
  "AI Tools",
  "Shopping",
];

const apps = [
  { name: "Figma",             status: "Productive"   },
  { name: "app.insightful.io", status: "Productive"   },
  { name: "Slack",             status: "Neutral"      },
  { name: "insightly.io",      status: "Unproductive" },
  { name: "chatgpt.com",       status: "Productive"   },
];

const statusStyle = {
  Productive:   { bg: "#f0fdf4", color: "#16a34a" },
  Neutral:      { bg: "#fffbeb", color: "#d97706" },
  Unproductive: { bg: "#fff1f2", color: "#e11d48" },
};

const card = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 18,
  padding: 20,
};

// Responsive style injected once
const responsiveCSS = `
  .dash-stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 16px;
  }
  .dash-middle-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
  .dash-chart-legend {
    display: flex;
    gap: 14px;
    font-size: 11px;
    color: #94a3b8;
    flex-wrap: wrap;
  }
  .dash-header-actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }
  .dash-app-row {
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    align-items: center;
    gap: 16px;
    border: 1px solid #f1f5f9;
    border-radius: 12px;
    padding: 10px 14px;
  }
  .dash-app-pct { display: inline; }
  .dash-app-change { display: inline-flex; }

  @media (max-width: 768px) {
    .dash-stat-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .dash-middle-grid {
      grid-template-columns: 1fr;
    }
    .dash-chart-legend {
      gap: 8px;
      font-size: 10px;
    }
    .dash-app-row {
      grid-template-columns: 1fr auto;
      gap: 8px;
    }
    .dash-app-pct   { display: none; }
    .dash-app-change { display: none; }
  }

  @media (max-width: 480px) {
    .dash-stat-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
    .dash-header-actions {
      gap: 6px;
    }
  }
`;

export default function Dashboard() {
  const [activeTab, setActiveTab]     = useState("Activities");
  const [todayOnly, setTodayOnly]     = useState(true);
  const [showFilter, setShowFilter]   = useState(false);
  const [rangeFilter, setRangeFilter] = useState("weekly");

  const chartData = todayOnly ? activityData.slice(-4) : activityData;
  const ranges = ["daily", "yesterday", "weekly", "trend", "custom"];

  return (
    <div
      style={{
        fontFamily: "system-ui,-apple-system,sans-serif",
        background: "#f8fafc",
        minHeight: "100vh",
        padding: "16px",
        color: "#0f172a",
        boxSizing: "border-box",
      }}
    >
      {/* Inject responsive CSS once */}
      <style>{responsiveCSS}</style>

      {/* ── HEADER ── */}
      <div
        style={{
          ...card,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Dashboard</h1>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: "#94a3b8" }}>
            Track your team's work and productivity.
          </p>
        </div>

        <div className="dash-header-actions">
          <button
            onClick={() => setTodayOnly((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 13px",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              background: "#fff",
              fontSize: 12,
              color: "#475569",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <CalendarIcon /> {todayOnly ? "Today" : "All Dates"}
          </button>

          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowFilter((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 13px",
                border: "1px solid #e2e8f0",
                borderRadius: 10,
                background: "#fff",
                fontSize: 12,
                color: "#475569",
                cursor: "pointer",
              }}
            >
              <FilterIcon /> Filter
            </button>
            {showFilter && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 6px)",
                  width: 140,
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  zIndex: 50,
                  overflow: "hidden",
                }}
              >
                {ranges.map((r) => (
                  <button
                    key={r}
                    onClick={() => { setRangeFilter(r); setShowFilter(false); }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 14px",
                      background: "none",
                      border: "none",
                      fontSize: 12,
                      color: rangeFilter === r ? "#2563eb" : "#475569",
                      fontWeight: rangeFilter === r ? 600 : 400,
                      cursor: "pointer",
                    }}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── STAT CARDS — 4 cols desktop / 2 cols mobile ── */}
      <div className="dash-stat-grid">
        {statCards.map(({ key, label, value, change, color }) => (
          <div key={key} style={{ ...card, padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>{label}</p>
              <span style={{ color, flexShrink: 0 }}>{icons[key](color)}</span>
            </div>
            <p style={{ margin: "8px 0 6px", fontSize: 20, fontWeight: 700, color: "#2563eb" }}>
              {value}
            </p>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 3,
                fontSize: 11,
                color: "#16a34a",
                fontWeight: 600,
                background: "#f0fdf4",
                padding: "2px 7px",
                borderRadius: 6,
              }}
            >
              <ArrowUpIcon /> {change}
            </span>
          </div>
        ))}
      </div>

      {/* ── CHART CARD ── */}
      <div style={{ ...card, marginBottom: 16 }}>
        {/* Chart header: tabs + legend */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            {["Activities", "Utilization"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "5px 14px",
                  borderRadius: 8,
                  fontSize: 12,
                  border: activeTab === tab ? "none" : "1px solid #e2e8f0",
                  background: activeTab === tab ? "#2563eb" : "#fff",
                  color: activeTab === tab ? "#fff" : "#64748b",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="dash-chart-legend">
            {[
              ["#9db4c0", "Productive"],
              ["#e6cf7a", "Neutral"],
              ["#f3a6c6", "Idle"],
            ].map(([c, l]) => (
              <span key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: c,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* Chart body */}
        <div style={{ height: 320 }}>
          {activeTab === "Activities" ? (
            <D3ActivityChart />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#94a3b8",
                fontSize: 13,
              }}
            >
              Utilization view placeholder
            </div>
          )}
        </div>
      </div>

      {/* ── MIDDLE ROW: Categories + Donut ── */}
      <div className="dash-middle-grid">

        {/* Top Platform Categories */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Top Platform Categories</h3>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 70px 70px",
              padding: "0 0 8px",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <span style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Category Name
            </span>
            <span style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "right" }}>
              Time
            </span>
            <span />
          </div>
          {categories.map((cat, i) => (
            <div
              key={cat}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 70px 70px",
                alignItems: "center",
                padding: "11px 0",
                borderBottom: i < categories.length - 1 ? "1px solid #f8fafc" : "none",
              }}
            >
              <span style={{ fontSize: 13, color: "#1e293b" }}>{cat}</span>
              <span style={{ fontSize: 13, color: "#64748b", textAlign: "right" }}>28.50%</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 3,
                  fontSize: 11,
                  color: "#16a34a",
                  fontWeight: 600,
                }}
              >
                <ArrowUpIcon /> +34%
              </span>
            </div>
          ))}
        </div>

        {/* Category Breakdown Donut */}
        <div style={card}>
          <h3 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 600 }}>Category Breakdown</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", marginBottom: 4 }}>
            {donutData.map((d) => (
              <span
                key={d.name}
                style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#64748b" }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: d.color,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                {d.name}
              </span>
            ))}
          </div>
          <div style={{ height: 290 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  startAngle={90}
                  endAngle={-270}
                >
                  {donutData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12 }}
                  formatter={(v, n) => [`${v}%`, n]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── APPS & WEBSITES ── */}
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Apps & Websites</h3>
          <button style={{ background: "none", border: "none", color: "#2563eb", fontSize: 13, cursor: "pointer" }}>
            View All
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {apps.map((app) => (
            <div key={app.name} className="dash-app-row">
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "#1e293b" }}>{app.name}</p>
                <p style={{ margin: "2px 0 0", fontSize: 11, color: "#94a3b8" }}>Website / App</p>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "4px 12px",
                  borderRadius: 20,
                  background: statusStyle[app.status].bg,
                  color: statusStyle[app.status].color,
                  whiteSpace: "nowrap",
                }}
              >
                {app.status}
              </span>
              <span className="dash-app-pct" style={{ fontSize: 13, color: "#64748b" }}>
                28.50%
              </span>
              <span
                className="dash-app-change"
                style={{
                  alignItems: "center",
                  gap: 3,
                  fontSize: 11,
                  color: "#16a34a",
                  fontWeight: 600,
                  background: "#f0fdf4",
                  padding: "2px 7px",
                  borderRadius: 6,
                }}
              >
                <ArrowUpIcon /> +34%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}