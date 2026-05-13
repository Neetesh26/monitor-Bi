import { CalendarDays, Pencil, Users } from "lucide-react";

export default function ProjectHeader({title}) {
  return (
    <div className="w-full bg-[#F4F6FB] border border-[#D1D5E4] rounded-2xl px-4 py-3 flex items-center justify-between mb-6">
      
      {/* Left Section */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[22px] font-semibold text-[#1B48DE] leading-none">
          {title}
        </h2>

        <span className="text-[#1F9D63] text-lg font-medium">
          Active Project
        </span>
      </div>

      {/* Center Section */}
      <div className="flex flex-col gap-3">
        
        {/* Employees */}
        <div className="flex items-center gap-3 text-[#2E2F38]">
          <Users className="w-5 h-5" />
          <span className="text-[15px] font-medium">
            3 Employees
          </span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-3 text-[#2E2F38]">
          <CalendarDays className="w-5 h-5" />
          <span className="text-[15px] font-medium">
            24 March, 2026
          </span>
        </div>
      </div>

      {/* Right Section */}
      <button className="w-10 h-10 rounded-xl border border-[#D1D5E4] flex items-center justify-center hover:bg-gray-50 transition">
        <Pencil className="w-4 h-4 text-[#2E2F38]" />
      </button>
    </div>
  );
}