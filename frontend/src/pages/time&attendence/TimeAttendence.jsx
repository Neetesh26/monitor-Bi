import { useState } from "react";
import Tabs from "../../components/Tabs";
import Filters from "../../components/Filters";
import TimesheetTable from "../../components/TimesheetTable";
import AttendanceGrid from "../../components/AttendanceGrid";
import ManualTable from "../../components/ManualTable";

const TimeAttendence = () => {
  const [activeTab, setActiveTab] = useState("timesheet");

  // ✅ Dynamic Timesheet Data (REALISTIC DATA)
  const tableData = Array.from({ length: 7 }, (_, i) => {
    const baseDate = new Date(2026, 2, 27); // March 27, 2026
    const currentDate = new Date(baseDate);
    currentDate.setDate(baseDate.getDate() + i);

    return {
      id: i + 1,
      date: currentDate.toDateString(),

      checkIn: `${9 + Math.floor(Math.random() * 2)}:${Math.floor(
        Math.random() * 60
      )
        .toString()
        .padStart(2, "0")} AM`,

      checkOut: `${6 + Math.floor(Math.random() * 2)}:${Math.floor(
        Math.random() * 60
      )
        .toString()
        .padStart(2, "0")} PM`,

      break: `${30 + Math.floor(Math.random() * 30)} mins`,

      totalHours: `${7 + Math.floor(Math.random() * 3)} hrs`,

      status: ["Present", "Late", "WFH"][
        Math.floor(Math.random() * 3)
      ],
    };
  });

  // ✅ Attendance Grid Data (unchanged)
  const attendanceData = [
    { date: "19th Jan", day: "Mon", status: "Present" },
    { date: "20th Jan", day: "Tue", status: "Present" },
    { date: "21st Jan", day: "Wed", status: "WFH" },
    { date: "22nd Jan", day: "Thu", status: "Present" },
    { date: "23rd Jan", day: "Fri", status: "Present" },
    { date: "24th Jan", day: "Sat", status: "Weekend" },
    { date: "25th Jan", day: "Sun", status: "Weekend" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl px-6 py-5 shadow-sm">
      
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-800">
          Time & Attendance
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Monitor check-ins, check-outs, and total work hours easily.
        </p>
      </div>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Filters />

      {activeTab === "timesheet" && (
        <TimesheetTable data={tableData} />
      )}
      {activeTab === "attendance" && (
        <AttendanceGrid data={attendanceData} />
      )}
      {activeTab === "manual" && (
        <ManualTable data={tableData} />
      )}
    </div>
  );
};

export default TimeAttendence;