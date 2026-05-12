import { X, ChevronDown } from "lucide-react";

const selectedEmployees = [
  {
    id: 1,
    name: "Bhumika Solanki",
    role: "Designer",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: 2,
    name: "Vandana Ramchandani",
    role: "Developer",
    avatar: "https://i.pravatar.cc/40?img=6",
  },
];

export default function AddTeamModal({closeModal}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="w-[840px] rounded-2xl bg-white overflow-hidden border border-[#D1D5E4]">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#EAECF0]">
        <h2 className="text-[22px] font-semibold text-[#1E293B]">
          New Team
        </h2>

        <button onClick={closeModal}>
          <X size={22} className="text-[#667085] cursor-pointer" />
        </button>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        
        {/* Team Name */}
        <div>
          <label className="block text-[15px] font-medium text-[#344054] mb-2">
            Team Name
          </label>

          <input
            type="text"
            placeholder="Enter name of the project"
            className="w-full h-12 rounded-xl border border-[#D1D5E4]
            px-4 outline-none text-sm placeholder:text-[#98A2B3]"
          />
        </div>

        {/* Assign Employees */}
        <div>
          <label className="block text-[15px] font-medium text-[#344054] mb-2">
            Assign Employees
          </label>

          <button
            className="w-full h-12 rounded-xl border border-[#D1D5E4]
            px-4 flex items-center justify-between text-sm text-[#98A2B3]"
          >
            <span>Select employees</span>

            <ChevronDown size={20} className="text-[#667085]" />
          </button>
        </div>

        {/* Selected Employees */}
        <div className="space-y-3">
          {selectedEmployees.map((emp) => (
            <div
              key={emp.id}
              className="h-12 rounded-xl border border-[#D1D5E4]
              px-4 flex items-center justify-between"
            >
              
              {/* Left */}
              <div className="flex items-center gap-3">
                <img
                  src={emp.avatar}
                  alt={emp.name}
                  className="w-8 h-8 rounded-full"
                />

                <span className="text-[15px] font-medium text-[#1E293B]">
                  {emp.name}
                </span>
              </div>

              {/* Right */}
              <div className="flex items-center gap-10">
                <span className="text-sm text-[#344054]">
                  {emp.role}
                </span>

                <button>
                  <X size={18} className="text-[#667085]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-4 p-6 border-t border-[#EAECF0]">
        
        <button
          className="h-12 rounded-xl border border-[#1B48DE]
          text-[#1B48DE] font-semibold"
        >
          Cancel
        </button>
        <button
          className="h-12 rounded-xl bg-[#1B48DE]
          text-white font-semibold"
        >
          Save
        </button>
      </div>
    </div>
    </div>
  );
}