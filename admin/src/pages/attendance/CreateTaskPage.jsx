import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const initialTaskState = {
  title: "",
  dueDate: "",
  description: "",
  status: "",
  priority: "",
  assignees: [],
};

const employees = [
  { id: "bhumika", name: "Bhumika Solanki", role: "Designer" },
  { id: "vandana", name: "Vandana Ramchandani", role: "Developer" },
];

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [form, setForm] = useState(initialTaskState);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAssignee = (id) => {
    setForm((prev) => {
      const exists = prev.assignees.includes(id);
      return {
        ...prev,
        assignees: exists ? prev.assignees.filter((item) => item !== id) : [...prev.assignees, id],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.dueDate || !form.status || !form.priority) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const newTask = {
      title: form.title,
      date: form.dueDate,
      description: form.description,
      status: form.status,
      priority: form.priority,
      assignees: form.assignees.map((id) => employees.find((employee) => employee.id === id)?.name || id),
      time: "00:00:00",
    };

    const storageKey = `${projectId}-new-tasks`;
    const existing = JSON.parse(sessionStorage.getItem(storageKey) || "[]");
    sessionStorage.setItem(storageKey, JSON.stringify([...existing, newTask]));

    setMessage("Task saved successfully.");
    setTimeout(() => {
      navigate(`/attendance/project/${projectId}`, { state: { saved: true } });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-lg rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Create new task</p>
            <h2 className="text-2xl font-semibold text-slate-900">{projectId ? projectId.toUpperCase() : "Project"}</h2>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {message && <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div>}

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter name of the task"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
              required
            />
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter description of the task"
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
              required
            >
              <option value="">Select status</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
              required
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Assign Employees</p>
            <div className="mt-4 space-y-3">
              {employees.map((employee) => (
                <button
                  type="button"
                  key={employee.id}
                  onClick={() => toggleAssignee(employee.id)}
                  className={`flex w-full items-center justify-between rounded-3xl border px-4 py-3 text-left text-sm ${
                    form.assignees.includes(employee.id)
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-slate-500">{employee.role}</p>
                  </div>
                  <span>{form.assignees.includes(employee.id) ? "Selected" : "Add"}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex h-12 items-center justify-center rounded-3xl border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-3xl bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskPage;
