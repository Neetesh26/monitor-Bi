import React, { useMemo, useState, useEffect } from "react";
import {
  CalendarDays,
  Circle,
  Clock3,
  Filter,
  LayoutGrid,
  LineChart as LineChartIcon,
  Monitor,
  SquareChartGantt,
  Users,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { axiosInstance } from "../../config/axiosInstance"; 

const getAgentIdFromToken = () => {
  try {
    const authRaw = localStorage.getItem("auth");
    if (!authRaw) return null;

    const authObj = JSON.parse(authRaw);
    const token = authObj.token;
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payloadBase64 = parts[1];
    const payloadJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(payloadJson);

    // in your token, this is the id:
    // "userId": "9994163c-333b-4056-983f-002960afb232"
    return payload.userId || null;
  } catch (e) {
    console.error("Failed to decode auth token", e);
    return null;
  }
};

// ===== helper: convert seconds -> "HH:MM h" =====
const formatSecondsToHours = (seconds) => {
  if (!seconds || seconds <= 0) return "00:00 h"; 
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  return `${hh}:${mm} h`;
};

// config for stat cards (UI only)
const statCardsConfig = [
  { key: "workTime", title: "Work Time", change: "+87%", icon: CalendarDays, color: "text-blue-600" },
  { key: "activeTime", title: "Active Time", change: "+65%", icon: Monitor, color: "text-sky-600" },
  { key: "idleTime", title: "Idle Time", change: "-77%", icon: Clock3, color: "text-red-500" },
  { key: "manualTime", title: "Manual Time", change: "+80%", icon: SquareChartGantt, color: "text-violet-600" },
  { key: "productiveTime", title: "Productive Time", change: "+59%", icon: LayoutGrid, color: "text-emerald-600" },
  { key: "unproductiveTime", title: "Unproductive Time", change: "+55%", icon: LineChartIcon, color: "text-amber-600" },
  { key: "neutralTime", title: "Neutral Time", change: "-60%", icon: Circle, color: "text-slate-500" },
  { key: "utilization", title: "Utilization", change: "+89%", icon: Users, color: "text-indigo-600" },
];

const categories = ["Services", "Advertising Tools", "Arts & Entertainment", "Communication", "AI Tools", "Shopping"];

const apps = [
  ["Figma", "Productive"],
  ["app.insightful.io", "Productive"],
  ["Slack", "Neutral"],
  ["insightly.io", "Unproductive"],
  ["chatgpt.com", "Productive"],
];

const activityData = [
  { day: "13 Mar", active: 40, break: 10, manual: 5 },
  { day: "14 Mar", active: 42, break: 8, manual: 4 },
  { day: "15 Mar", active: 39, break: 11, manual: 6 },
  { day: "16 Mar", active: 44, break: 7, manual: 3 },
  { day: "17 Mar", active: 41, break: 9, manual: 5 },
  { day: "18 Mar", active: 38, break: 12, manual: 4 },
  { day: "19 Mar", active: 45, break: 6, manual: 2 },
];

const donutData = [
  { name: "Services", value: 32, color: "#f99" },
  { name: "Advertising Tools", value: 18, color: "#8eabd7" },
  { name: "Arts & Entertainment", value: 14, color: "#ddc069" },
  { name: "Communication", value: 12, color: "#88d2ae" },
  { name: "AI Tools", value: 12, color: "#aa85c8" },
  { name: "Shopping", value: 12, color: "#cd8989" },
];

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [todayOnly, setTodayOnly] = useState(true);
  const [activeTab, setActiveTab] = useState("Activities");

  const [showFilter, setShowFilter] = useState(false);
  const [rangeFilter, setRangeFilter] = useState("weekly"); // daily | yesterday | weekly | trend | custom

  const [loadingStats, setLoadingStats] = useState(false);
  const [statsError, setStatsError] = useState(null);

  const [statValues, setStatValues] = useState({
    workTimeSeconds: 0,
    activeTimeSeconds: 0,
    idleTimeSeconds: 0,
    manualTimeSeconds: 0,
    productiveTimeSeconds: 0,
    unproductiveTimeSeconds: 0,
    neutralTimeSeconds: 0,
    utilizationPercent: 0,
  });

  const filteredApps = useMemo(() => {
    if (!query.trim()) return apps;
    return apps.filter(([name]) => name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const chartData = todayOnly ? activityData.slice(-4) : activityData;

  // build axios path from range + agentId
  const getPathForRange = (range, agentId) => {
    switch (range) {
      case "daily":
        return `/productivity/${agentId}/daily`;
      case "yesterday":
        return `/productivity/${agentId}/yesterday`;
      case "weekly":
        return `/productivity/${agentId}/weekly`;
      case "trend":
        return `/productivity/${agentId}/trend`;
      case "custom":
        return `/productivity/${agentId}/custom`;
      default:
        return `/productivity/${agentId}/weekly`;
    }
  };

  // fetch stats whenever rangeFilter changes
  useEffect(() => {
    const agentId = getAgentIdFromToken();
    if (!agentId) {
      setStatsError("No agentId (userId) found in token");
      return;
    }

    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        setStatsError(null);

        const path = getPathForRange(rangeFilter, agentId);
        const res = await axiosInstance.get(path); 
        const json = res.data;

        if (!json || !json.data) {
          throw new Error("No data in response");
        }

        const d = json.data;

        const workSeconds = (d.productiveAppTime || 0) + (d.productiveWebTime || 0);
        const activeSeconds = workSeconds;
        const idleSeconds = d.idleTime || 0;
        const productivityScore = d.productivityScore || 0;

        setStatValues({
          workTimeSeconds: workSeconds,
          activeTimeSeconds: activeSeconds,
          idleTimeSeconds: idleSeconds,
          manualTimeSeconds: 0,
          productiveTimeSeconds: workSeconds,
          unproductiveTimeSeconds: 0,
          neutralTimeSeconds: 0,
          utilizationPercent: productivityScore * 100,
        });
      } catch (err) {
        console.error(err);
        setStatsError("Failed to load status");
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [rangeFilter]);

  const getCardValue = (key) => {
    switch (key) {
      case "workTime":
        return formatSecondsToHours(statValues.workTimeSeconds);
      case "activeTime":
        return formatSecondsToHours(statValues.activeTimeSeconds);
      case "idleTime":
        return formatSecondsToHours(statValues.idleTimeSeconds);
      case "manualTime":
        return formatSecondsToHours(statValues.manualTimeSeconds);
      case "productiveTime":
        return formatSecondsToHours(statValues.productiveTimeSeconds);
      case "unproductiveTime":
        return formatSecondsToHours(statValues.unproductiveTimeSeconds);
      case "neutralTime":
        return formatSecondsToHours(statValues.neutralTimeSeconds);
      case "utilization":
        return `${statValues.utilizationPercent.toFixed(2)}%`;
      default:
        return "00:00 h";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-sm border border-slate-200 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Track your team’s work and productivity.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTodayOnly((v) => !v)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm flex items-center gap-2 hover:bg-slate-50"
          >
            <CalendarDays size={16} />
            {todayOnly ? "Today" : "All Dates"}
          </button>

          <div className="relative">
            <button
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm flex items-center gap-2 hover:bg-slate-50"
              onClick={() => setShowFilter((prev) => !prev)}
            >
              <Filter size={16} /> Filter ({rangeFilter})
            </button>

            {showFilter && (
              <div className="absolute right-0 mt-2 w-40 rounded-xl border border-slate-200 bg-white shadow-md z-10 text-sm">
                <button
                  className={`block w-full text-left px-3 py-2 hover:bg-slate-50 ${
                    rangeFilter === "daily" ? "text-blue-600 font-medium" : "text-slate-700"
                  }`}
                  onClick={() => {
                    setRangeFilter("daily");
                    setShowFilter(false);
                  }}
                >
                  Daily
                </button>
                <button
                  className={`block w-full text-left px-3 py-2 hover:bg-slate-50 ${
                    rangeFilter === "yesterday" ? "text-blue-600 font-medium" : "text-slate-700"
                  }`}
                  onClick={() => {
                    setRangeFilter("yesterday");
                    setShowFilter(false);
                  }}
                >
                  Yesterday
                </button>
                <button
                  className={`block w-full text-left px-3 py-2 hover:bg-slate-50 ${
                    rangeFilter === "weekly" ? "text-blue-600 font-medium" : "text-slate-700"
                  }`}
                  onClick={() => {
                    setRangeFilter("weekly");
                    setShowFilter(false);
                  }}
                >
                  Weekly
                </button>
                <button
                  className={`block w-full text-left px-3 py-2 hover:bg-slate-50 ${
                    rangeFilter === "trend" ? "text-blue-600 font-medium" : "text-slate-700"
                  }`}
                  onClick={() => {
                    setRangeFilter("trend");
                    setShowFilter(false);
                  }}
                >
                  Trend
                </button>
                <button
                  className={`block w-full text-left px-3 py-2 hover:bg-slate-50 ${
                    rangeFilter === "custom" ? "text-blue-600 font-medium" : "text-slate-700"
                  }`}
                  onClick={() => {
                    setRangeFilter("custom");
                    setShowFilter(false);
                  }}
                >
                  Custom
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {loadingStats && (
        <div className="text-xs text-slate-400 px-1">Loading productivity data…</div>
      )}
      {statsError && (
        <div className="text-xs text-red-500 px-1">{statsError}</div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCardsConfig.map(({ key, title, change, icon: Icon, color }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">{title}</p>
                <p className="mt-2 text-2xl font-semibold text-blue-600">
                  {getCardValue(key)}
                </p>
              </div>
              <Icon size={18} className={color} />
            </div>
            <div className="mt-3 text-xs font-medium text-emerald-600">{change}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("Activities")}
                className={`rounded-lg px-3 py-1.5 text-xs ${
                  activeTab === "Activities"
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 text-slate-600"
                }`}
              >
                Activities
              </button>
              <button
                onClick={() => setActiveTab("Utilization")}
                className={`rounded-lg px-3 py-1.5 text-xs ${
                  activeTab === "Utilization"
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 text-slate-600"
                }`}
              >
                Utilization
              </button>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-300" />
                Active Time
              </span>
              <span>
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-yellow-300" />
                Break Time
              </span>
              <span>
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-pink-300" />
                Manual Time
              </span>
            </div>
          </div>

          <div className="h-72 rounded-xl border border-slate-100 bg-white p-2">
            {activeTab === "Activities" ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="active" stroke="#93c5fd" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="break" stroke="#fcd34d" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="manual" stroke="#f9a8d4" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                Utilization view placeholder
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl  border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold">Category Breakdown</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                >
                  {donutData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Top Platform Categories</h3>
            <button className="text-sm text-blue-600">View All</button>
          </div>
          <div className="space-y-4">
            {categories.map((item) => (
              <div key={item} className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm">
                <span>{item}</span>
                <span className="text-slate-500">28.50%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Apps & Websites</h3>
            <button className="text-sm text-blue-600">View All</button>
          </div>
          <div className="space-y-3">
            {filteredApps.map(([name, status]) => (
              <div key={name} className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-3">
                <div>
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-xs text-slate-400">Website / App</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    status === "Productive"
                      ? "bg-emerald-50 text-emerald-600"
                      : status === "Unproductive"
                      ? "bg-red-50 text-red-500"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {status}
                </span>
              </div>
            ))}
            {filteredApps.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
                No matching apps found.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;