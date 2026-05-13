import { Search } from "lucide-react";

function AssignedEmployeesHeader() {
  return (
    <div className="w-full flex items-center justify-between mb-6">
      
      {/* Title */}
      <h2 className="text-[32px] font-semibold text-[#111827]">
        Assigned Employees
      </h2>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        
        {/* Search Box */}
        <div className="flex items-center gap-2 border border-[#D1D5E4] rounded-xl px-4 py-3 w-[260px] bg-white">
          <Search size={18} className="text-[#6B7280]" />

          <input
            type="text"
            placeholder="Search Employee"
            className="outline-none w-full text-sm text-[#111827] placeholder:text-[#6B7280]"
          />
        </div>

        {/* Button */}
        <button className="bg-[#1B48DE] hover:bg-[#163bb8] transition-all duration-200 text-white px-6 py-3 rounded-xl font-medium">
          Assign Employee
        </button>
      </div>
    </div>
  );
}

export default AssignedEmployeesHeader;