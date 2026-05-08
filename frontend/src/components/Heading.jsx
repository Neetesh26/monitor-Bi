import { CalendarDays, Filter } from "lucide-react";

export default function DashboardHeader({title,content}) {
  return (
    <div className="flex items-center justify-between mb-6">
      
      {/* Left Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          {title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {content}
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        
        {/* Today Button */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white text-sm text-gray-700 hover:bg-gray-50">
          <CalendarDays size={16} />
          Today
        </button>

        {/* Filter Button */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white text-sm text-gray-700 hover:bg-gray-50">
          <Filter size={16} />
          Filter
        </button>

      </div>
    </div>
  );
}