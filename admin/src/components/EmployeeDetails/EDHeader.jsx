import ArrowLeft from "./../../assets/employeeDetails/CaretLeft.svg?react";
import { useNavigate } from "react-router-dom";
export default function EmployeeDetailHeader() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-4 mb-6">
      
      {/* Back Button */}
      <button
        className="
          w-12 h-12
          rounded-xl
          border border-[#D1D5E4]
          flex items-center justify-center
          bg-white
          hover:bg-gray-50
          transition
        "
        onClick={()=>navigate(-1)}
      >
       <ArrowLeft />
      </button>

      {/* Title */}
      <h1 className="text-[20px] font-semibold text-[#111827]">
        Employee Detail
      </h1>
    </div>
  );
}