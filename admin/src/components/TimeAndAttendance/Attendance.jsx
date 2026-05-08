const dates = Array.from({ length: 26 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);

const employees = [
  {
    name: "Alisha Khan",
    attendance: ["off","present","present","present","present","present","off","off","present","absent","present","present","off","off","present","present","present","present","present","present","present"],
  },
  {
    name: "Tarun Upadhyay",
    attendance: ["off","present","present","present","present","present","off","off","present","present","present","present","off","off","present","present","present","present","present","present","present"],
  },
  {
    name: "Vandana Ramchandani",
    attendance: ["off","present","present","present","present","present","off","off","present","present","present","present","off","off","present","present","present","present","present","present","present"],
  },
];

function getDotColor(type) {
  switch (type) {
    case "off":
      return "bg-[#8B5CF6]";
    case "present":
      return "bg-[#D0E8FFE5]";
    case "absent":
      return "bg-[#FDD09FE5]";
    default:
      return "bg-gray-300";
  }
}

export default function AttendanceGrid() {
  return (
    <div className="w-full border border-[#D1D5E4] rounded-lg overflow-x-auto">
      
      {/* Header */}
      <div className="grid grid-cols-[200px_repeat(26,40px)] text-xs text-gray-600">
        <div className="p-3 font-medium">EMPLOYEE</div>
        {dates.map((d) => (
          <div key={d} className="flex items-center justify-center border-l border-[#D1D5E4]">
            {d}
          </div>
        ))}
      </div>

      {/* Total Row */}
      <div className="grid grid-cols-[200px_repeat(26,40px)] border-t border-[#D1D5E4]">
        <div className="p-3 font-medium">Total Count</div>
        {dates.map((d, i) => (
          <div key={i} className="flex items-center justify-center border-l border-[#D1D5E4] text-xs text-gray-500">
            0/30
          </div>
        ))}
      </div>

      {/* Employee Rows */}
      {employees.map((emp, idx) => (
        <div
          key={idx}
          className="grid grid-cols-[200px_repeat(26,40px)] border-t border-[#D1D5E4]"
        >
          {/* Name */}
          <div className="p-3 text-sm">{emp.name}</div>

          {/* Attendance Cells */}
          {dates.map((_, i) => {
            const type = emp.attendance[i];

            return (
              <div
                key={i}
                className="flex items-center justify-center border-l border-[#D1D5E4] h-10"
              >
                {type && (
                  <div
                    className={`w-3 h-3 rounded-full ${getDotColor(type)}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}