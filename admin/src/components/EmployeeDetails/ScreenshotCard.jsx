// components/Screenshots/ScreenshotCard.jsx

import { Clock3, MoreVertical } from "lucide-react";

export default function ScreenshotCard({
  title,
  image,
  time,
  employee,
  team,
}) {
  return (
    <div
      className="
        w-[320px]
        rounded-xl
        border border-[#D1D5E4]
        overflow-hidden
        bg-white
        shadow-sm
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-semibold text-[#475467]">
            {title}
          </span>
        </div>

        <MoreVertical
          size={18}
          className="text-[#667085] cursor-pointer"
        />
      </div>

      {/* Screenshot */}
      <img
        src={image}
        alt="screenshot"
        className="w-full h-[180px] object-cover"
      />

      {/* Footer */}
      <div className="px-4 py-3">
        
        <div className="flex items-center gap-2 text-[#667085] text-sm mb-3">
          <Clock3 size={14} />
          <span>{time}</span>
        </div>

        <p className="text-[15px] font-semibold text-[#475467]">
          {employee}
        </p>

        <p className="text-[15px] font-medium text-black mt-1">
          {team}
        </p>
      </div>
    </div>
  );
}