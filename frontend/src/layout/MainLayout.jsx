import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Clock3,
  Layers,
  Camera,
  FileText,
  Search,
  Bell,
  Plus,
  UserCircle,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutGrid },
  { label: "Time & Attendance", path: "/attendance", icon: Clock3 },
  { label: "Teams", path: "/dashboard", icon: Layers },
  { label: "Projects", path: "/attendance/time-tracking", icon: FileText },
  { label: "Screenshots", path: "/dashboard", icon: Camera },
  { label: "Reports", path: "/dashboard", icon: FileText },
];

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="max-w-[1500px] mx-auto flex flex-col xl:flex-row gap-6 px-4 py-4">
        <aside className="hidden xl:flex xl:w-[280px] flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-blue-600 grid place-items-center text-white font-bold">bi</div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Work Monitor</p>
              <p className="text-lg font-semibold">Hello, Alisha!</p>
            </div>
          </div>

          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                      isActive ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Keep track of work</p>
            <p className="mt-2 text-sm">Your team activity, attendance, projects, and reports in one dashboard.</p>
          </div>
        </aside>

        <main className="flex-1">
          <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Welcome back</p>
              <h1 className="text-2xl font-semibold">Work Monitor Suite</h1>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <label className="relative block w-full max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search employees, dates..."
                  className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500"
                />
              </label>
              <button className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" /> Create
              </button>
              <button className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
                <Bell className="h-5 w-5" />
              </button>
              <button className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700">
                <UserCircle className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div className="space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
