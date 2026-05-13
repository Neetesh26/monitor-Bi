import { ChevronUp } from "lucide-react";

function DateAccordion({date}) {
  return (
    <div className="w-full bg-[#F4F6FB] border border-[#D1D5E4] rounded-xl px-3 py-2 flex items-center justify-between mb-6">
      
      {/* Date */}
      <span className="text-[24px] font-semibold text-[#3A3F55]">
        {date}
      </span>

      {/* Arrow */}
      <button className="text-[#344054]">
        <ChevronUp size={22} />
      </button>
    </div>
  );
}

export default DateAccordion;