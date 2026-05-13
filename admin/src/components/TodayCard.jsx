export default function TodayCard({
  title,
  value,
  total,
  Icon,
  color,
  width="w-[357px]"
}) {
  return (
    <div className={`${width} h-[91px] rounded-2xl border border-[#D1D5E4] p-4 flex flex-col justify-between`}>
      
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <span className={`${color} text-sm font-medium`}>
          {title}
        </span>

        <div className="flex items-center gap-2">
          {Icon && <Icon className={`w-4 h-4 ${color}`} stroke="currentColor"/>}
        </div>
      </div>

      {/* Bottom Number */}
      <div className="flex items-end gap-1">
        <span className={`${color} text-3xl font-semibold leading-none`}>
          {value}
        </span>
        <span className="text-gray-500 text-sm pb-[2px]">
          {total}
        </span>
      </div>
    </div>
  );
}