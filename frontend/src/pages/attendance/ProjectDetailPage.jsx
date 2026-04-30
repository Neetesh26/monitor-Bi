import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, PlayCircle } from "lucide-react";

const projects = [
  {
    id: "hanat",
    name: "Hanat",
    tasks: [
      {
        title: "User Dashboard",
        time: "03:24:45",
        date: "Fri, 27 Mar",
        status: "In progress",
      },
    ],
  },
];

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const project = useMemo(() => projects.find((item) => item.id === projectId) || projects[0], [projectId]);
  const [tasks, setTasks] = useState(project.tasks);

  useEffect(() => {
    const stored = sessionStorage.getItem(`${project.id}-new-tasks`);
    if (stored) {
      const extraTasks = JSON.parse(stored);
      setTasks([...project.tasks, ...extraTasks]);
    }
  }, [project.id, project.tasks]);

  return (
    <div className="min-h-screen bg-[#cfd0e3] px-4 py-6">
      <div className="mx-auto w-full max-w-md rounded-[20px] border border-slate-200 bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/attendance" className="font-medium text-slate-900 hover:text-blue-600">
              Attendance
            </Link>
            <span className="h-px w-6 bg-slate-200" />
            <span className="text-slate-500">Time tracking</span>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {location.state?.saved && (
          <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Task saved successfully.
          </div>
        )}

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Projects</p>
            <h2 className="text-2xl font-semibold text-slate-900">{project.name}</h2>
          </div>
          <button
            onClick={() => navigate(`/attendance/project/${project.id}/create-task`)}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Add New Task
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-500">Projects</p>
              <p className="text-xl font-semibold text-slate-900">{project.name}</p>
            </div>
            <button className="rounded-full border border-blue-600 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50">
              Search Projects
            </button>
          </div>

          <div className="space-y-4">
            {tasks.map((task, idx) => (
              <div
                key={`${task.title}-${idx}`}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-base font-semibold text-slate-900">{task.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{task.date}</p>
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-slate-500 md:items-end">
                    <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs">
                      {task.status}
                    </span>
                    <div>{task.time}</div>
                    <button className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1.5 text-sm text-white">
                      <PlayCircle className="h-4 w-4" /> Resume
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
          >
            Open Dashboard
          </button>
          <div className="text-sm text-slate-600">
            <div className="text-sm font-semibold text-slate-900">Last Sync</div>
            <div>Today at 05:16 PM · 30-03-2025</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;