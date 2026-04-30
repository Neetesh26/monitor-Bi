import React, { useMemo, useState } from "react";
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

const statCards = [
  { title: "Work Time", value: "04:12 h", change: "+87%", icon: CalendarDays, color: "text-blue-600" },
  { title: "Active Time", value: "06:33 h", change: "+65%", icon: Monitor, color: "text-sky-600" },
  { title: "Idle Time", value: "01:42 h", change: "-77%", icon: Clock3, color: "text-red-500" },
  { title: "Manual Time", value: "01:55 h", change: "+80%", icon: SquareChartGantt, color: "text-violet-600" },
  { title: "Productive Time", value: "10:42 h", change: "+59%", icon: LayoutGrid, color: "text-emerald-600" },
  { title: "Unproductive Time", value: "06:44 h", change: "+55%", icon: LineChartIcon, color: "text-amber-600" },
  { title: "Neutral Time", value: "04 :54 h", change: "-60%", icon: Circle, color: "text-slate-500" },
  { title: "Utilization", value: "16.32%", change: "+89%", icon: Users, color: "text-indigo-600" },
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

  const filteredApps = useMemo(() => {
    if (!query.trim()) return apps;
    return apps.filter(([name]) => name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const chartData = todayOnly ? activityData.slice(-4) : activityData;

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
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm flex items-center gap-2 hover:bg-slate-50">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ title, value, change, icon: Icon, color }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">{title}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
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

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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