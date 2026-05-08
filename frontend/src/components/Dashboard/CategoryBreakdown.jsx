import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Square } from "lucide-react";

const data = [
  { name: "Services", value: 25, color: "#E8C1D9" },
  { name: "Advertising Tools", value: 40, color: "#AFC6D9" },
  { name: "Arts & Entertainment", value: 6, color: "#BFA6E0" },
  { name: "Communication", value: 8, color: "#E9D48A" },
  { name: "Ai Tools", value: 7, color: "#E6A2A2" },
  { name: "Shopping", value: 14, color: "#9AD7B5" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-white shadow-md rounded-lg px-4 py-2 border border-pink-300">
        <p className="text-pink-500 font-semibold">{item.name}</p>
        <div className="text-xs text-gray-500 mt-1">
          <div>Today</div>
          <div>HH:MM:SS 00.00%</div>
          <div className="mt-1">Yesterday</div>
          <div>HH:MM:SS</div>
        </div>
      </div>
    );
  }
  return null;
};

const CategoryBreakdown = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#D1D5E4] w-full">
      {/* Title */}
      <h2 className="w-full px-4 py-4 text-lg font-bold text-gray-800 mb-4 border-b border-[#D1D5E4]">
        Category Breakdown
      </h2>

      {/* Legend */}
      <div className="flex items-center justify-center flex-wrap gap-4 mb-6 p-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center  gap-2 text-sm text-gray-600">
            <Square size={12} fill={item.color} color={item.color} />
            {item.name}
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryBreakdown;