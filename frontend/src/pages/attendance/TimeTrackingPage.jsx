import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const projectList = [
  {
    id: "hanat",
    name: "Hanat",
    tasks: 6,
    status: "Active",
  },
];

const TimeTrackingPage = () => {
  const navigate = useNavigate();
  const activeProject = useMemo(() => projectList[0], []);

  return (
    <div className="min-h-screen bg-[#cfd0e3] px-4 py-6">
      <div className="mx-auto w-full max-w-md rounded-[20px] border border-slate-200 bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <Link to="/attendance" className="font-medium text-slate-900 hover:text-blue-600">
              Attendance
            </Link>
            <span className="h-px w-6 bg-blue-600" />
          </div>
          <span className="text-sm font-medium text-blue-600">Time tracking</span>
        </div>

        <div className="mb-4 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <label className="relative block w-full">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search projects, tasks..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none focus:border-blue-500"
              />
            </label>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Assigned Projects</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">{activeProject.name}</p>
              </div>
              <button
                onClick={() => navigate(`/attendance/project/${activeProject.id}`)}
                className="rounded-full border border-blue-600 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
              >
                {activeProject.tasks} tasks →
              </button>
            </div>
          </div>

          <button
            onClick={() => navigate(`/attendance/project/${activeProject.id}`)}
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Open project
          </button>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
            <span>Last Sync</span>
            <span>Today at 05:16 PM · 30-03-2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTrackingPage;