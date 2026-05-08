import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";

const formatTime = (seconds) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${secs}`;
};

const sampleHistory = [
  {
    date: "Fri, 27 March",
    checkIn: "10:33 AM",
    checkOut: "07:33 PM",
    workHours: "08:25:30 H",
    breakHours: "08:25:30 H",
  },
  {
    date: "Thu, 26 March",
    checkIn: "10:33 AM",
    checkOut: "07:33 PM",
    workHours: "08:25:30 H",
    breakHours: "08:25:30 H",
  },
];

const AttendancePage = () => {
  const navigate = useNavigate();
  const [checkedIn, setCheckedIn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (checkedIn && !onBreak) {
      interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [checkedIn, onBreak]);

  const statusLabel = useMemo(() => {
    if (!checkedIn) return "Not Started Yet";
    if (onBreak) return "On Break";
    return "In Progress";
  }, [checkedIn, onBreak]);

  const handleCheckIn = () => {
    setCheckedIn(true);
    setOnBreak(false);
    setSeconds(0);
  };

  const handleCheckOut = () => {
    setCheckedIn(false);
    setOnBreak(false);
    setSeconds(0);
  };

  const handleToggleBreak = () => {
    if (!checkedIn) return;
    setOnBreak((current) => !current);
  };

  return (
    <div className="min-h-screen bg-[#cfd0e3] px-4 py-6">
      <div className="mx-auto w-full max-w-md rounded-[20px] border border-slate-200 bg-white p-6 shadow-xl">
        <div className="mb-5 border-b border-slate-200 pb-4">
          <button className="relative text-sm font-medium text-slate-700">
            Attendance
            <span className="absolute bottom-[-1px] left-1/2 h-px w-24 -translate-x-1/2 bg-blue-600" />
          </button>
          <Link
            to="/attendance/time-tracking"
            className="ml-4 text-sm font-normal text-slate-500"
          >
            Time tracking
          </Link>
        </div>

        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-slate-500">Mon, 30 March</p>
          <div className="mt-2 text-3xl font-semibold text-slate-900">
            {formatTime(seconds)} h
          </div>
        </div>

        <p className="text-center text-sm text-slate-500">{statusLabel}</p>

        <div className="mt-4">
          {!checkedIn ? (
            <button
              onClick={handleCheckIn}
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Check in
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCheckOut}
                className="w-full rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                Check out
              </button>
              <button
                onClick={handleToggleBreak}
                className="w-full rounded-xl border border-blue-600 bg-white py-3 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
              >
                {onBreak ? "Resume" : "Take a break"}
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-4">
          {sampleHistory.map((item) => (
            <div
              key={item.date}
              className="grid grid-cols-[1fr_2fr] rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="border-r border-slate-200 pr-4">
                <p className="text-sm font-semibold text-blue-600">{item.date}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 px-4 text-sm text-slate-600">
                <div>
                  <p className="text-xs uppercase text-slate-400">Check In</p>
                  <p className="mt-1 font-semibold text-slate-900">{item.checkIn}</p>
                  <p className="mt-2 text-xs uppercase text-slate-400">Check Out</p>
                  <p className="mt-1 font-semibold text-slate-900">{item.checkOut}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-400">Work Hours</p>
                  <p className="mt-1 font-semibold text-slate-900">{item.workHours}</p>
                  <p className="mt-2 text-xs uppercase text-slate-400">Break Hours</p>
                  <p className="mt-1 font-semibold text-slate-900">{item.breakHours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Open Dashboard
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            <div className="text-xs font-semibold text-slate-900">Last Sync</div>
            <div>Today at 05:16 PM; 30-03-2025</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;