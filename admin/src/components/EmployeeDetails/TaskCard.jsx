const tasks = [
  {
    id: 1,
    title: "Task1",
    time: "HH:MM:SS",
    status: "Delivered",
  },
  {
    id: 2,
    title: "Task2",
    time: "HH:MM:SS",
    status: "To Do",
  },
];

export default function TasksCard() {
  return (
    <div className="w-full rounded-2xl border border-[#D1D5E4] bg-white">
      
      {/* Header */}
        <div className="w-full border-b border-[#D1D5E4] px-4 py-4 flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-800">
            Task
            </h2>
            <button className="text-sm font-semibold text-blue-600 hover:underline">
            View All
            </button>
        </div>
        
      {/* Table Header */}
      <div className="grid grid-cols-3 px-6 py-4 text-xs font-semibold text-[#667085] uppercase">
        <div>Task Description</div>
        <div>Time Estimate</div>
        <div className="text-center">Status</div>
      </div>

      {/* Rows */}
      <div className="px-4 pb-5 space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="grid grid-cols-3 items-center rounded-xl border border-[#EAECF0] px-4 py-4"
          >
            {/* Task Name */}
            <div className="text-[18px] font-medium text-[#1E293B]">
              {task.title}
            </div>

            {/* Time */}
            <div className="text-[18px] font-semibold text-[#344054]">
              {task.time}
            </div>

            {/* Status */}
            <div className="flex justify-center">
              <span
                className={`px-5 py-2 rounded-full text-sm font-medium ${
                  task.status === "Delivered"
                    ? "bg-[#ECFDF3] text-[#16A34A]"
                    : "bg-[#F4F3FF] text-[#7C3AED]"
                }`}
              >
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}