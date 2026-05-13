import { CalendarDays, Funnel } from "lucide-react";

export default function FilterDateBar() {
  return (
    <div className="flex items-center justify-between w-full mb-6">
      
      {/* Date Range */}
      <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 bg-white shadow-sm">
        <CalendarDays size={18} className="text-gray-500" />

        <span>
          Mon, March 23, 2026 - Fri, March 27, 2026
        </span>
      </div>

      {/* Filter Button */}
      <button className="flex items-center gap-2 border border-gray-300 rounded-xl px-5 py-3 text-sm font-medium text-gray-700 bg-white shadow-sm hover:bg-gray-50 transition">
        <Funnel size={18} className="text-gray-500" />
        Filter
      </button>
    </div>
  );
}