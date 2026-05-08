import StatusBadge from "./StatusBadge";

const AttendanceGrid = ({ data }) => {
  return (
    <div className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-5 
      xl:grid-cols-7 
      gap-4 sm:gap-5
    ">
      {data.map((item, i) => (
        <div
          key={i}
          className="
            rounded-2xl 
            border border-slate-200 
            bg-white 
            p-3 sm:p-4 
            shadow-sm 
            hover:shadow-md 
            transition 
            w-full
          "
        >
          {/* Date */}
          <p className="text-[10px] sm:text-xs text-slate-500 mb-2 truncate">
            {item.date}, {item.day}
          </p>

          {/* Status */}
          <StatusBadge status={item.status} />

          {/* Time */}
          <div className="space-y-1 text-[11px] sm:text-xs mt-2">
            <p className="text-green-600 flex items-center gap-1">
              🟢 <span>10:30 AM</span>
            </p>
            <p className="text-red-500 flex items-center gap-1">
              🔴 <span>07:38 PM</span>
            </p>
          </div>

          {/* Total Time */}
          <div className="mt-2 flex items-center gap-1 text-blue-600 text-[11px] sm:text-xs font-medium">
            <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></span>
            <span>8H 8M</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceGrid;