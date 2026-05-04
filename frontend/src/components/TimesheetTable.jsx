const TimesheetTable = ({ data }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-xs">
        <thead className="bg-slate-50 text-[11px] font-medium text-slate-500">
          <tr className="h-10">
            <th className="px-4 text-left font-medium">Date</th>
            <th className="text-left font-medium">Status</th>
            <th className="text-center font-medium">Check In</th>
            <th className="text-center font-medium">Check Out</th>
            <th className="text-center font-medium">Work time</th>
            <th className="text-center font-medium">Manual Time</th>
            <th className="text-center font-medium">Computer Act.</th>
            <th className="text-center font-medium">Productive</th>
            <th className="text-center font-medium">Unproductiv</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr
              key={i}
              className="h-14 border-t border-slate-100 text-[11px] text-slate-700 hover:bg-slate-50 transition"
            >
              <td className="px-4 align-middle">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-800">
                    {item.date} {/* e.g. "Mar 6, 2026" */}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {item.weekday || "Friday"}
                  </span>
                </div>
              </td>

              {/* Status: Active + location */}
              <td className="align-middle">
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium text-emerald-600">
                    {item.status || "Active"}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {item.location || "Office"}
                  </span>
                </div>
              </td>

              {/* numeric cells centered */}
              <td className="text-center align-middle">{item.checkIn || "HH:MM"}</td>
              <td className="text-center align-middle">{item.checkOut || "HH:MM"}</td>
              <td className="text-center align-middle">{item.workTime || "HH:MM"}</td>
              <td className="text-center align-middle">{item.manualTime || "HH:MM"}</td>
              <td className="text-center align-middle">
                {item.computerActivity || "HH:MM"}
              </td>
              <td className="text-center align-middle">
                {item.productive || "HH:MM"}
              </td>
              <td className="text-center align-middle">
                {item.unproductive || "HH:MM"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimesheetTable;