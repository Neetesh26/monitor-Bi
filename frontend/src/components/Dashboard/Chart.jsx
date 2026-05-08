// components/ActivityChart.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const data = [
  { day: "13 Mar", active: 40, break: 10, manual: 0 },
  { day: "13 Mar", active: 40, break: 10, manual: 40 },
  { day: "13 Mar", active: 40, break: 20, manual: 10 },
  { day: "13 Mar", active: 40, break: 10, manual: 0 },
  { day: "13 Mar", active: 40, break: 10, manual: 0 },
  { day: "13 Mar", active: 40, break: 50, manual: 0 },
  { day: "16 Mar", active: 40, break: 10, manual: 0 },
];

export default function ActivityChart() {
  return (
    <div className="bg-white p-4 rounded border border-[#D1D5E4] mb-6">
      
      {/* Top Section */}
      <div className="flex items-center justify-between mb-4">
        
        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white">
            Activities
          </button>
          <button className="px-3 py-1 text-sm text-gray-600">
            Utilization
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-300"></span>
            Active Time
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-yellow-300"></span>
            Break Time
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-pink-300"></span>
            Manual Time
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <BarChart data={data} barGap={8}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip cursor={false} />
            {/* Stacked bars */}
            <Bar dataKey="active" stackId="a" fill="#93C5FD" radius={[4, 4, 0, 0]} />
            <Bar dataKey="break" stackId="a" fill="#FDE68A"/>
            <Bar dataKey="manual" stackId="a" fill="#F9A8D4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}