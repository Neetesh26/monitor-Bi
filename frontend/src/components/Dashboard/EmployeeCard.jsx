// components/EmployeeTableCard.jsx

export default function EmployeeTableCard({
  title,data,option
}) {
    
  return (
    <div className="bg-white border border-[#D1D5E4] rounded-xl">
      
      {/* Header */}
      <div className="w-full border-b border-[#D1D5E4] px-4 py-4 flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-800">
          {title}
        </h3>
        <button className="text-sm font-semibold text-blue-600 hover:underline">
          View All
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 text-xs text-[#3A3F55] font-semibold ">
        <span className="px-8">{option}</span>
        <span className="text-center">PRODUCTIVE (hr)</span>
        <span className="text-center">UNPRODUCTIVE (hr)</span>
        <span className="text-center">UTILIZATION</span>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-2 p-4">
        {data.map((emp, index) => (
          <div
            key={index}
            className="grid grid-cols-4 items-center shadow rounded-lg px-3 py-3"
          >
           
            {/* Employee */}
            <div className="flex items-center gap-3">

            {emp.avatar &&  <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full"/> }
              
              <span className="text-sm font-medium text-[#1C1F2E]">
                {emp.name}
              </span>
            </div>

            {/* Productive */}
            <span className="text-sm text-center text-[#3A3F55]">
              {emp.productive}
            </span>

            {/* Unproductive */}
            <span className="text-sm text-center text-[#3A3F55]">
              {emp.unproductive}
            </span>

            {/* Utilization */}
            <span className="text-sm text-center text-[#3A3F55]">
              {emp.utilization}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}