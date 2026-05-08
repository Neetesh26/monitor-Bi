import React, { useState } from "react";
import { CalendarDays, Filter } from "lucide-react";

const initialTeams = [
  {
    team: "Designers",
    employees: 6,
    workTime: "HH:MM",
    computerActivity: "HH:MM",
    manualTime: "HH:MM",
    productive: "HH:MM",
    unproductive: "HH:MM",
    neutral: "HH:MM",
    idleTime: "HH:MM",
  },
  {
    team: "Developers",
    employees: 5,
    workTime: "HH:MM",
    computerActivity: "HH:MM",
    manualTime: "HH:MM",
    productive: "HH:MM",
    unproductive: "HH:MM",
    neutral: "HH:MM",
    idleTime: "HH:MM",
  },
];

const TeamsPage = () => {
  const [teams] = useState(initialTeams);
  const [todayOnly, setTodayOnly] = useState(true);

  return (
    <div className="mt-2 space-y-3">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-slate-900">
            Teams
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm text-slate-500">
            Access team details, roles, and activity easily.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setTodayOnly((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-slate-50"
          >
            <CalendarDays size={14} />
            {todayOnly ? "Today" : "All Dates"}
          </button>

          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-slate-50">
            <Filter size={14} />
            Filter
          </button>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="flex min-h-[420px] flex-col rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
        
        {/* SCROLL AREA */}
        <div className="flex-1 overflow-x-auto">
          <table className="min-w-[900px] w-full text-left text-sm">
            
            <thead>
              <tr className="border-b border-slate-100 text-[11px] sm:text-xs font-medium text-slate-400 whitespace-nowrap">
                <th className="py-3 pr-4">Team</th>
                <th className="py-3 px-4">Employees</th>
                <th className="py-3 px-4">Work time</th>
                <th className="py-3 px-4">Computer Act.</th>
                <th className="py-3 px-4">Manual Time</th>
                <th className="py-3 px-4">Productive</th>
                <th className="py-3 px-4">Unproductive</th>
                <th className="py-3 px-4">Neutral</th>
                <th className="py-3 px-4">Idle Time</th>
              </tr>
            </thead>

            <tbody>
              {teams.map((row) => (
                <tr
                  key={row.team}
                  className="border-b border-slate-100 last:border-0 text-[12px] sm:text-sm text-slate-700 whitespace-nowrap"
                >
                  <td className="py-3 pr-4 font-medium">{row.team}</td>
                  <td className="py-3 px-4">{row.employees}</td>
                  <td className="py-3 px-4">{row.workTime}</td>
                  <td className="py-3 px-4">{row.computerActivity}</td>
                  <td className="py-3 px-4">{row.manualTime}</td>
                  <td className="py-3 px-4">{row.productive}</td>
                  <td className="py-3 px-4">{row.unproductive}</td>
                  <td className="py-3 px-4">{row.neutral}</td>
                  <td className="py-3 px-4">{row.idleTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1 text-xs text-slate-500">
          <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50">
            {"<"}
          </button>

          <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-600 text-white">
            1
          </button>

          <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50">
            2
          </button>

          <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50">
            3
          </button>

          <span className="px-1">…</span>

          <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50">
            12
          </button>

          <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50">
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;