import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "13-03-26", day: "Monday",    minutes: 180 },
  { date: "14-03-26", day: "Tuesday",   minutes: 60  },
  { date: "15-03-26", day: "Wednesday", minutes: 180 },
  { date: "16-03-26", day: "Thursday",  minutes: 50  },
  { date: "17-03-26", day: "Friday",    minutes: 180 },
  { date: "18-03-26", day: "Saturday",  minutes: 0   },
];

const formatY = (v) => {
  if (v === 0) return "0";
  if (v % 60 === 0) return `${v / 60} hr`;
  if ([10, 20, 30, 40, 50].includes(v)) return `${v}m`;
  return null;
};

const formatTooltip = (v) => {
  if (v === 0) return "0m";
  const h = Math.floor(v / 60), m = v % 60;
  return h > 0 ? (m > 0 ? `${h}hr ${m}m` : `${h}hr`) : `${m}m`;
};

export default function TimeOnProjectChart() {
  return (
    <div className="bg-white border border-[#D1D5E4] rounded-xl">
        <h2 className="w-full text-lg font-bold border-b border-[#D1D5E4] px-4 py-4 flex items-center justify-between mb-2">
          Time on project
        </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barCategoryGap="30%">
          <CartesianGrid vertical={false} stroke="#F2F4F7" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tick={({ x, y, payload, index }) => (
              <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={12} textAnchor="middle" fill="#888" fontSize={11}>{payload.value}</text>
                <text x={0} y={0} dy={24} textAnchor="middle" fill="#888" fontSize={11}>{data[index].day}</text>
              </g>
            )}
          />
          <YAxis tickLine={false} axisLine={false} tickFormatter={formatY} tick={{ fill: "#888", fontSize: 11 }} />
          <Tooltip formatter={formatTooltip} />
          <Bar dataKey="minutes" fill="#C8DEFF" radius={[4, 4, 4, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

