import { Calendar, Filter } from "lucide-react";

const Filters = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button className="flex items-center gap-2 border border-slate-200 px-3 py-1.5 rounded-md text-xs hover:bg-slate-50">
        <Calendar size={14} />
        This Month
      </button>

      <button className="flex items-center gap-2 border border-slate-200 px-3 py-1.5 rounded-md text-xs hover:bg-slate-50">
        <Filter size={14} />
        Filter
      </button>
    </div>
  );
};

export default Filters;