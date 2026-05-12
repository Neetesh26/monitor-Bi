export default function StatCard({
  title,
  value,
  change,
  icon: Icon
}) {
  return (
    <div className="bg-white border border-[#D1D5E4] rounded-xl p-4 w-[260px] h-[110px] flex flex-col justify-between">
      
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-500">{title}</p>
        <div className="p-1.5 rounded-md">
          <Icon className="w-6 h-6"/>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center gap-3">
        <h3 className="text-2xl font-semibold text-blue-600">
          {value}
        </h3>

        <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
          {change}
        </span>
      </div>
    </div>
  );
}