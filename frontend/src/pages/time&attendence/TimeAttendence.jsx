import { useState, useMemo } from "react";
import AttendanceGrid from "../../components/AttendanceGrid";
import ManualTable from "../../components/ManualTable";

// ── Responsive CSS ──────────────────────────────────────────────────────────
const responsiveCSS = `
  .ta-header-row {
    padding: 18px 24px 0;
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  .ta-filter-bar {
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
  }
  .ta-tabs {
    display: flex;
    border-bottom: 1px solid #e2e8f0;
    margin-top: 16px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .ta-tabs::-webkit-scrollbar { display: none; }
  .ta-tab-btn {
    flex: 1;
    min-width: 100px;
    padding: 12px 8px;
    font-size: 13px;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.15s;
    letter-spacing: 0.01em;
    white-space: nowrap;
  }
  .ta-table-wrap {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .ta-table-wrap table {
    width: 100%;
    border-collapse: collapse;
    min-width: 640px;
  }

  @media (max-width: 640px) {
    .ta-header-row {
      padding: 14px 14px 0;
    }
    .ta-filter-bar {
      padding: 10px 14px;
    }
    .ta-tab-btn {
      font-size: 12px;
      min-width: 90px;
      padding: 10px 6px;
    }
    .ta-title {
      font-size: 14px !important;
    }
    .ta-subtitle {
      font-size: 11px !important;
    }
  }

  @media (max-width: 400px) {
    .ta-tab-btn {
      font-size: 11px;
      min-width: 80px;
    }
  }
`;

// ── Icons ───────────────────────────────────────────────────────────────────
const BackArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const CalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const FilterIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const LocationIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Data helpers ────────────────────────────────────────────────────────────
const pad = (n) => String(n).padStart(2, "0");
const toHHMM = (h, m) => `${pad(h)}:${pad(m)}`;

const locations   = ["Office", "Office", "WFH", "Office", "Office", "Office"];
const statusTypes = ["Active", "Active", "Active", "Active", "Active", "Active"];

const generateTimesheetRows = () =>
  Array.from({ length: 6 }, (_, i) => {
    const checkInM  = 5  + i * 2;
    const checkOutM = 10 + i * 3;
    const workM     = 30 + i * 5;
    return {
      id:           i + 1,
      date:         "Mar 6, 2026",
      day:          "Friday",
      status:       statusTypes[i],
      location:     locations[i],
      checkIn:      toHHMM(9,  checkInM  % 60),
      checkOut:     toHHMM(18, checkOutM % 60),
      workTime:     toHHMM(8,  workM     % 60),
      manualTime:   toHHMM(0,  15 + i * 5),
      computerAct:  toHHMM(7,  45 + i * 2),
      productive:   toHHMM(6,  30 + i * 4),
      unproductive: toHHMM(1,  10 + i * 3),
    };
  });

const generateAttendanceRows = () => {
  const statuses = ["Present","Present","WFH","Late","Present","Absent","Present","Present","WFH","Present","Late","Present","Absent","Present"];
  const days     = ["Mon","Tue","Wed","Thu","Fri","Mon","Tue","Wed","Thu","Fri","Mon","Tue","Wed","Thu"];
  return Array.from({ length: 14 }, (_, i) => ({
    id:       i + 1,
    date:     `Mar ${i + 1}, 2026`,
    day:      days[i],
    status:   statuses[i],
    checkIn:  statuses[i] === "Absent" ? "—" : toHHMM(9,  5  + i),
    checkOut: statuses[i] === "Absent" ? "—" : toHHMM(18, 10 + i),
    workTime: statuses[i] === "Absent" ? "00:00" : toHHMM(8, 30 + i),
    location: i % 3 === 2 ? "WFH" : "Office",
  }));
};

const generateManualRows = () =>
  Array.from({ length: 6 }, (_, i) => ({
    id:        i + 1,
    date:      "Mar 6, 2026",
    day:       "Friday",
    status:    ["Approved","Pending","Approved","Rejected","Pending","Approved"][i],
    location:  locations[i],
    startTime: toHHMM(9,  0 + i * 10),
    endTime:   toHHMM(18, 0 + i * 5),
    duration:  toHHMM(9,  0),
    reason:    ["Client Meeting","Field Work","Training","Travel","Offsite Work","Support Call"][i],
  }));

// ── Status badge ────────────────────────────────────────────────────────────
const Badge = ({ label }) => {
  const map = {
    Active:   { color: "#16a34a", bg: "transparent" },
    Present:  { color: "#16a34a", bg: "transparent" },
    Late:     { color: "#ea580c", bg: "transparent" },
    WFH:      { color: "#2563eb", bg: "transparent" },
    Absent:   { color: "#e11d48", bg: "transparent" },
    Approved: { color: "#16a34a", bg: "#f0fdf4",  border: "#bbf7d0" },
    Pending:  { color: "#d97706", bg: "#fffbeb",  border: "#fde68a" },
    Rejected: { color: "#e11d48", bg: "#fff1f2",  border: "#fecdd3" },
  };
  const s = map[label] || { color: "#64748b", bg: "transparent" };
  const hasBg = s.bg !== "transparent";
  return (
    <span style={{
      color:        s.color,
      background:   hasBg ? s.bg   : "transparent",
      border:       hasBg ? `1px solid ${s.border}` : "none",
      fontSize:     12,
      fontWeight:   600,
      padding:      hasBg ? "2px 8px" : 0,
      borderRadius: hasBg ? 20 : 0,
    }}>
      {label}
    </span>
  );
};

// ── Shared table cell styles ─────────────────────────────────────────────────
const thStyle = {
  padding:      "10px 14px",
  textAlign:    "left",
  fontSize:     12,
  fontWeight:   500,
  color:        "#94a3b8",
  borderBottom: "1px solid #e2e8f0",
  whiteSpace:   "nowrap",
  background:   "#fff",
};
const tdStyle = {
  padding:        "13px 14px",
  fontSize:       13,
  color:          "#374151",
  borderBottom:   "1px solid #f1f5f9",
  whiteSpace:     "nowrap",
  verticalAlign:  "middle",
};

// ── Timesheet Table ──────────────────────────────────────────────────────────
const TimesheetTable = ({ data }) => (
  <div className="ta-table-wrap">
    <table>
      <thead>
        <tr>
          {["Date","Status","Check In","Check Out","Work Time","Manual Time","Computer Act.","Productive","Unproductive"].map(h => (
            <th key={h} style={thStyle}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td style={tdStyle}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#1e293b" }}>{row.date}</div>
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>{row.day}</div>
            </td>
            <td style={tdStyle}>
              <Badge label={row.status} />
              <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 3, color: "#94a3b8", fontSize: 11 }}>
                <LocationIcon /> {row.location}
              </div>
            </td>
            <td style={tdStyle}><span style={{ color: "#94a3b8" }}>{row.checkIn}</span></td>
            <td style={tdStyle}><span style={{ color: "#94a3b8" }}>{row.checkOut}</span></td>
            <td style={tdStyle}><span style={{ color: "#94a3b8" }}>{row.workTime}</span></td>
            <td style={tdStyle}><span style={{ color: "#94a3b8" }}>{row.manualTime}</span></td>
            <td style={tdStyle}><span style={{ color: "#94a3b8" }}>{row.computerAct}</span></td>
            <td style={tdStyle}><span style={{ color: "#94a3b8" }}>{row.productive}</span></td>
            <td style={tdStyle}><span style={{ color: "#94a3b8" }}>{row.unproductive}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ── Attendance Table ─────────────────────────────────────────────────────────
const AttendanceTable = ({ data }) => (
  <div className="ta-table-wrap">
    <table>
      <thead>
        <tr>
          {["Date","Status","Check In","Check Out","Work Time","Location"].map(h => (
            <th key={h} style={thStyle}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td style={tdStyle}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#1e293b" }}>{row.date}</div>
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>{row.day}</div>
            </td>
            <td style={tdStyle}><Badge label={row.status} /></td>
            <td style={tdStyle}><span style={{ color: "#94a3b8" }}>{row.checkIn}</span></td>
            <td style={tdStyle}><span style={{ color: "#94a3b8" }}>{row.checkOut}</span></td>
            <td style={tdStyle}><span style={{ color: "#94a3b8" }}>{row.workTime}</span></td>
            <td style={tdStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#64748b", fontSize: 12 }}>
                <LocationIcon /> {row.location}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ── Filter dropdown ──────────────────────────────────────────────────────────
const FilterDropdown = ({ onClose, filters, setFilters }) => {
  const statusOptions = ["Active","Present","Late","WFH","Absent"];
  const toggleStatus = (s) => {
    setFilters(f => ({
      ...f,
      statuses: f.statuses.includes(s)
        ? f.statuses.filter(x => x !== s)
        : [...f.statuses, s],
    }));
  };
  return (
    <div style={{
      position:   "absolute",
      right:      0,
      top:        "calc(100% + 8px)",
      width:      220,
      background: "#fff",
      border:     "1px solid #e2e8f0",
      borderRadius: 12,
      boxShadow:  "0 8px 24px rgba(0,0,0,0.10)",
      zIndex:     100,
      padding:    16,
    }}>
      <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, color: "#1e293b" }}>
        Filter by Status
      </p>
      {statusOptions.map(s => (
        <label key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", cursor: "pointer", fontSize: 13, color: "#374151" }}>
          <span
            style={{
              width: 16, height: 16,
              border: "1.5px solid #cbd5e1",
              borderRadius: 4,
              background: filters.statuses.includes(s) ? "#2563eb" : "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.1s",
            }}
            onClick={() => toggleStatus(s)}
          >
            {filters.statuses.includes(s) && <span style={{ color: "#fff" }}><CheckIcon /></span>}
          </span>
          {s}
        </label>
      ))}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          onClick={() => setFilters(f => ({ ...f, statuses: [] }))}
          style={{ flex: 1, padding: "7px 0", border: "1px solid #e2e8f0", borderRadius: 8, background: "#fff", fontSize: 12, color: "#64748b", cursor: "pointer" }}
        >
          Clear
        </button>
        <button
          onClick={onClose}
          style={{ flex: 1, padding: "7px 0", border: "none", borderRadius: 8, background: "#2563eb", fontSize: 12, color: "#fff", cursor: "pointer", fontWeight: 500 }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

// ── Month picker ─────────────────────────────────────────────────────────────
const MONTHS = ["Jan 2026","Feb 2026","Mar 2026","Apr 2026","May 2026","Jun 2026"];
const MonthPicker = ({ selected, onSelect, onClose }) => (
  <div style={{
    position:   "absolute",
    left:       0,
    top:        "calc(100% + 8px)",
    width:      180,
    background: "#fff",
    border:     "1px solid #e2e8f0",
    borderRadius: 12,
    boxShadow:  "0 8px 24px rgba(0,0,0,0.10)",
    zIndex:     100,
    overflow:   "hidden",
  }}>
    {MONTHS.map(m => (
      <button
        key={m}
        onClick={() => { onSelect(m); onClose(); }}
        style={{
          display:    "block",
          width:      "100%",
          textAlign:  "left",
          padding:    "9px 14px",
          border:     "none",
          background: selected === m ? "#eff6ff" : "#fff",
          fontSize:   13,
          color:      selected === m ? "#2563eb" : "#374151",
          fontWeight: selected === m ? 600 : 400,
          cursor:     "pointer",
        }}
      >
        {m}
      </button>
    ))}
  </div>
);

// ── Main Component ───────────────────────────────────────────────────────────
const TimeAttendence = () => {
  const [activeTab,       setActiveTab]       = useState("timesheet");
  const [selectedMonth,   setSelectedMonth]   = useState("This Month");
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showFilter,      setShowFilter]      = useState(false);
  const [filters,         setFilters]         = useState({ statuses: [] });

  const timesheetRows  = useMemo(() => generateTimesheetRows(),  []);
  const attendanceRows = useMemo(() => generateAttendanceRows(), []);
  const manualRows     = useMemo(() => generateManualRows(),     []);

  const filteredTimesheet  = filters.statuses.length
    ? timesheetRows.filter(r  => filters.statuses.includes(r.status))
    : timesheetRows;
  const filteredAttendance = filters.statuses.length
    ? attendanceRows.filter(r => filters.statuses.includes(r.status))
    : attendanceRows;

  const TABS = [
    { key: "timesheet",  label: "Timesheet"   },
    { key: "attendance", label: "Attendance"  },
    { key: "manual",     label: "Manual Time" },
  ];

  const attendanceData = [
    { date: "19th Jan", day: "Mon", status: "Present"  },
    { date: "20th Jan", day: "Tue", status: "Present"  },
    { date: "21st Jan", day: "Wed", status: "WFH"      },
    { date: "22nd Jan", day: "Thu", status: "Present"  },
    { date: "23rd Jan", day: "Fri", status: "Present"  },
    { date: "24th Jan", day: "Sat", status: "Weekend"  },
    { date: "25th Jan", day: "Sun", status: "Weekend"  },
    { date: "25th Jan", day: "Sun", status: "Weekend"  },
    { date: "25th Jan", day: "Sun", status: "Weekend"  },
    { date: "19th Jan", day: "Mon", status: "Present"  },
    { date: "20th Jan", day: "Tue", status: "Present"  },
    { date: "21st Jan", day: "Wed", status: "WFH"      },
    { date: "22nd Jan", day: "Thu", status: "Present"  },
    { date: "23rd Jan", day: "Fri", status: "Present"  },
    { date: "23rd Jan", day: "Fri", status: "Present"  },
    { date: "23rd Jan", day: "Fri", status: "Present"  },
  ];

  return (
    <>
      <style>{responsiveCSS}</style>

      <div style={{
        background:   "#fff",
        border:       "1px solid #e2e8f0",
        borderRadius: 16,
        fontFamily:   "system-ui,-apple-system,sans-serif",
        width:        "100%",
        boxSizing:    "border-box",
        overflow:     "hidden",
        padding:      15,
      }}>

        {/* ── Header ── */}
        <div className="ta-header-row">
          <button style={{
            marginTop:   2,
            width:       28,
            height:      28,
            border:      "1px solid #e2e8f0",
            borderRadius: 8,
            background:  "#fff",
            display:     "flex",
            alignItems:  "center",
            justifyContent: "center",
            cursor:      "pointer",
            color:       "#475569",
            flexShrink:  0,
          }}>
            <BackArrow />
          </button>
          <div style={{ minWidth: 0 }}>
            <h2 className="ta-title" style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1e293b" }}>
              Time & Attendance
            </h2>
            <p className="ta-subtitle" style={{ margin: "3px 0 0", fontSize: 12, color: "#94a3b8" }}>
              Monitor check-ins, check-outs, and total work hours easily.
            </p>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="ta-tabs">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              className="ta-tab-btn"
              onClick={() => setActiveTab(key)}
              style={{
                fontWeight:   activeTab === key ? 600 : 400,
                color:        activeTab === key ? "#2563eb" : "#64748b",
                borderBottom: activeTab === key ? "2px solid #2563eb" : "2px solid transparent",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Filter bar ── */}
        <div className="ta-filter-bar">
          {/* Month picker */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => { setShowMonthPicker(v => !v); setShowFilter(false); }}
              style={{
                display:      "flex",
                alignItems:   "center",
                gap:          6,
                padding:      "7px 12px",
                border:       "1px solid #e2e8f0",
                borderRadius: 8,
                background:   "#fff",
                fontSize:     12,
                color:        "#374151",
                cursor:       "pointer",
                fontWeight:   500,
                whiteSpace:   "nowrap",
              }}
            >
              <CalIcon />
              {selectedMonth === "This Month" ? "This Month" : selectedMonth}
            </button>
            {showMonthPicker && (
              <MonthPicker
                selected={selectedMonth}
                onSelect={setSelectedMonth}
                onClose={() => setShowMonthPicker(false)}
              />
            )}
          </div>

          {/* Filter button */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => { setShowFilter(v => !v); setShowMonthPicker(false); }}
              style={{
                display:      "flex",
                alignItems:   "center",
                gap:          6,
                padding:      "7px 12px",
                border:       "1px solid #e2e8f0",
                borderRadius: 8,
                background:   showFilter ? "#eff6ff" : "#fff",
                fontSize:     12,
                color:        showFilter ? "#2563eb" : "#374151",
                cursor:       "pointer",
                fontWeight:   500,
              }}
            >
              <FilterIcon /> Filter
              {filters.statuses.length > 0 && (
                <span style={{
                  background:    "#2563eb",
                  color:         "#fff",
                  fontSize:      10,
                  fontWeight:    700,
                  width:         16,
                  height:        16,
                  borderRadius:  "50%",
                  display:       "flex",
                  alignItems:    "center",
                  justifyContent: "center",
                }}>
                  {filters.statuses.length}
                </span>
              )}
            </button>
            {showFilter && (
              <FilterDropdown
                onClose={() => setShowFilter(false)}
                filters={filters}
                setFilters={setFilters}
              />
            )}
          </div>
        </div>

        {/* ── Table content ── */}
        <div style={{ paddingBottom: 8 }}>
          {activeTab === "timesheet"  && <TimesheetTable  data={filteredTimesheet}  />}
          {activeTab === "attendance" && <AttendanceGrid  data={attendanceData}     />}
          {activeTab === "manual"     && <ManualTable     data={manualRows}         />}
        </div>

      </div>
    </>
  );
};

export default TimeAttendence;