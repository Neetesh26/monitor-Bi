import React from "react";

const getStatusStyle = (status) => {
  switch (status) {
    case "Approved":
      return "bg-emerald-50 text-emerald-600";
    case "Rejected":
      return "bg-red-50 text-red-500";
    case "Pending":
      return "bg-amber-50 text-amber-500";
    default:
      return "bg-slate-100 text-slate-500";
  }
};

const ManualTable = ({ data = [] }) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
      {/* scroll container added ↑ */}

      <table className="min-w-[900px] w-full text-sm">
        {/* min width ensures proper layout */}

        <thead className="bg-slate-50 text-[11px] sm:text-[12px] text-slate-500">
          <tr className="h-11 whitespace-nowrap">
            <th className="px-4 sm:px-5 text-left font-medium">Date</th>
            <th className="text-left font-medium">Task</th>
            <th className="text-center font-medium">Start time</th>
            <th className="text-center font-medium">End Time</th>
            <th className="text-center font-medium">Duration (H)</th>
            <th className="text-center font-medium">Location</th>
            <th className="text-center font-medium">Productivity</th>
            <th className="text-center font-medium">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="h-[60px] border-t border-slate-100 text-[12px] sm:text-[13px] text-slate-700 hover:bg-slate-50 transition whitespace-nowrap"
            >
              {/* Date */}
              <td className="px-4 sm:px-5 align-middle">
                <span className="font-medium text-slate-800">
                  {row.date || "Mar 27, 2026"}
                </span>
              </td>

              {/* Task */}
              <td className="align-middle">
                <div className="flex flex-col leading-tight">
                  <span className="font-medium text-slate-800 truncate max-w-[140px]">
                    {row.task || "Task Detail"}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 truncate max-w-[140px]">
                    {row.project || "Project Name"}
                  </span>
                </div>
              </td>

              {/* Start */}
              <td className="text-center align-middle text-slate-600">
                {row.startTime || "HH:MM PM"}
              </td>

              {/* End */}
              <td className="text-center align-middle text-slate-600">
                {row.endTime || "HH:MM PM"}
              </td>

              {/* Duration */}
              <td className="text-center align-middle text-slate-600">
                {row.duration || "HH:MM"}
              </td>

              {/* Location */}
              <td className="text-center align-middle text-slate-600">
                {row.location || "Remote"}
              </td>

              {/* Productivity */}
              <td className="text-center align-middle text-slate-600">
                {row.productivity || "Productive"}
              </td>

              {/* Status */}
              <td className="text-center align-middle">
                <span
                  className={`px-2 sm:px-3 py-1 text-[10px] sm:text-[11px] font-medium rounded-full whitespace-nowrap ${getStatusStyle(
                    row.status || "Approved"
                  )}`}
                >
                  {row.status || "Approved"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManualTable;