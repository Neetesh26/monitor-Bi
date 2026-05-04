import StatusBadge from "./StatusBadge";

const AttendanceGrid = ({ data }) => {
  return (
    <div className="grid grid-cols-7 gap-5">
      {data.map((item, i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover:shadow-md transition"
        >
          <p className="text-[10px] text-slate-500 mb-2">
            {item.date}, {item.day}
          </p>

          <StatusBadge status={item.status} />

          <div className="space-y-1 text-[11px] mt-2">
            <p className="text-green-600">🟢 10:30 AM</p>
            <p className="text-red-500">🔴 07:38 PM</p>
          </div>

          <div className="mt-2 flex items-center gap-1 text-blue-600 text-[11px] font-medium">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            8H 8M
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceGrid;