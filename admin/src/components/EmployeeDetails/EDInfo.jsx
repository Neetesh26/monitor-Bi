import {Pencil, Settings, Clock } from "lucide-react";
import Team from "./../../assets/sidebar/team.svg?react"

export default function EmployeeProfileCard({ employee }) {
  return (
    <div className="w-full bg-[#F4F6FB] rounded-[8px]  overflow-hidden mb-6">
 
      {/* Profile Row */}
      <div className="flex items-center justify-between px-4 py-3 gap-4">
        {/* Avatar + Name + Email */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex-shrink-0">
            <img className="w-12 h-12 rounded-full bg-blue-50 border border-blue-600 flex items-center justify-center  select-none"
              src={employee.avatar} />
        
           
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-blue-600 truncate leading-tight">
              {employee.name}
            </p>
            <p className="text-xs text-gray-400 truncate mt-0.5">
              {employee.email}
            </p>
          </div>
        </div>
 
        {/* Department + Shift */}
        <div className="flex flex-col gap-1.5 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Team />
            <span className="text-xs font-medium">{employee.role}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Clock size={14} className=" flex-shrink-0" />
            <span className="text-xs">{employee.checkIn} - {employee.checkOut}</span>
          </div>
        </div>
 
        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            aria-label="Edit employee"
            className="w-8 h-8 flex items-center justify-center rounded-lg shadow bg-white"
          >
            <Pencil size={14} />
          </button>
          <button
            aria-label="Employee settings"
            className="w-8 h-8 flex items-center justify-center rounded-lg shadow bg-white"
          >
            <Settings size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}