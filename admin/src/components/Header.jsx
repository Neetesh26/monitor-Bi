import { Bell, Plus, Search, ChevronDown } from "lucide-react";
import Profile from "./../assets/sidebar/profile.png";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-[#F4F6FB] px-8 py-3 flex items-center justify-between">
      
      {/* Left */}
      <h1 className="text-xl font-semibold text-blue-600">
        Hello, Sufiyan!
      </h1>

      {/* Center Search */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-[420px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search Employees, Dates..."
            className="w-full bg-gray-100 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        
        {/* Notification */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg border bg-white hover:bg-gray-50">
          <Bell size={18} className="text-gray-600" />
        </button>

        {/* Add Button */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700">
          <Plus size={18} className="text-white" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={Profile}
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
          <ChevronDown size={16} className="text-gray-500" />
        </div>
      </div>
    </header>
  );
}