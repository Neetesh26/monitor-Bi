import { ArrowLeft, Pencil, Settings, Users } from "lucide-react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function TeamDetailHeader() {
    const {teamName} = useParams();
    const navigate = useNavigate();
  return (
    <div className="w-full flex items-center justify-between mb-6">
      
      {/* Left Section */}
      <div className="flex items-center gap-4">
        
        {/* Back Button */}
        <button
          className="w-10 h-10 rounded-xl border border-[#D1D5E4]
          flex items-center justify-center bg-white cursor-pointer"
          onClick={()=>{navigate(-1)}}
        >
          <ArrowLeft size={22} className="text-[#101828]" />
        </button>

        {/* Team Info */}
        <div>
          <h2 className="text-[23px] font-semibold text-[#1B48DE] leading-none">
            {teamName}
          </h2>

          <div className="flex items-center gap-2 mt-2 text-[#667085]">
            <Users size={16} />

            <span className="text-lg font-medium">
              6 members
            </span>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        
        <button
          className="w-10 h-10 rounded-xl border border-[#D1D5E4]
          flex items-center justify-center bg-white"
        >
          <Pencil size={20} className="text-[#344054]" />
        </button>

        <button
          className="w-10 h-10 rounded-xl border border-[#D1D5E4]
          flex items-center justify-center bg-white"
        >
          <Settings size={20} className="text-[#344054]" />
        </button>
      </div>
    </div>
  );
}