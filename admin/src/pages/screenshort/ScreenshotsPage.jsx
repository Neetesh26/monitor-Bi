import React, { useEffect, useState } from "react";
import {
  MonitorSmartphone,
  CalendarDays,
  Filter,
  ChevronDown,
  X,
} from "lucide-react";
import { axiosInstance } from "../../config/axiosInstance";

// fallback dummy
const dummyScreenshots = [
  {
    id: "1",
    title: "Figma",
    user: "Alisha Khan",
    time: "6:55 PM",
    date: "20-03-2026",
    url: "https://picsum.photos/seed/ui1/400/250",
  },
  {
    id: "2",
    title: "Figma",
    user: "Alisha Khan",
    time: "6:55 PM",
    date: "20-03-2026",
    url: "https://picsum.photos/seed/ui2/400/250",
  },
  {
    id: "3",
    title: "Figma",
    user: "Alisha Khan",
    time: "6:55 PM",
    date: "20-03-2026",
    url: "https://picsum.photos/seed/ui2/400/250",
  },
  {
    id: "4",
    title: "Figma",
    user: "Alisha Khan",
    time: "6:55 PM",
    date: "20-03-2026",
    url: "https://picsum.photos/seed/ui2/400/250",
  },
  {
    id: "5",
    title: "Figma",
    user: "Alisha Khan",
    time: "6:55 PM",
    date: "19-03-2026",
    url: "https://picsum.photos/seed/ui3/400/250",
  },
];

const ScreenshotsPage = () => {
  const [screenshots, setScreenshots] = useState(dummyScreenshots);
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dateFilter, setDateFilter] = useState("today");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [collapsedDates, setCollapsedDates] = useState({});
  const [previewShot, setPreviewShot] = useState(null);

  const getUserIdFromAuth = () => {
    try {
      const raw = localStorage.getItem("auth");
      if (!raw) return null;
      return JSON.parse(raw)?.user?.userId || null;
    } catch {
      return null;
    }
  };

  const groupByDate = (data) => {
    return data.reduce((acc, item) => {
      const date = item.date || "Unknown";
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});
  };

  const applyDateFilter = (data, filterMode) => {
    if (filterMode === "all") return data;

    if (filterMode === "today") {
      const today = new Date();
      const todayStr = `${String(today.getDate()).padStart(2, "0")}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${today.getFullYear()}`;

      const filtered = data.filter((item) => item.date === todayStr);
      return filtered.length > 0 ? filtered : data;
    }

    return data;
  };

  useEffect(() => {
    const userId = getUserIdFromAuth();

    if (!userId) {
      const base = applyDateFilter(dummyScreenshots, dateFilter);
      setGrouped(groupByDate(base));
      return;
    }

    const fetchScreenshots = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axiosInstance.get(`/screenshots/user/${userId}`);
        const data = res.data?.data || [];

        if (data.length > 0) {
          const formatted = data.map((item) => ({
            id: item.id,
            title: item.appName || "Screenshot",
            user: item.userName || "User",
            time: item.capturedAt,
            date: item.date || "20-03-2026",
            url: item.imageUrl,
          }));

          setScreenshots(formatted);
          const base = applyDateFilter(formatted, dateFilter);
          setGrouped(groupByDate(base));
        } else {
          const base = applyDateFilter(dummyScreenshots, dateFilter);
          setGrouped(groupByDate(base));
        }
      } catch (err) {
        setError("Failed to load screenshots");
        const base = applyDateFilter(dummyScreenshots, dateFilter);
        setGrouped(groupByDate(base));
      } finally {
        setLoading(false);
      }
    };

    fetchScreenshots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const base = applyDateFilter(screenshots, dateFilter);
    setGrouped(groupByDate(base));
  }, [dateFilter, screenshots]);

  const toggleDateCollapse = (date) => {
    setCollapsedDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setPreviewShot(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="space-y-4">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Screenshots</h2>
          <p className="text-sm text-slate-500">
            View periodic screenshots to track work activity.
          </p>
        </div>

        <div className="relative flex flex-wrap gap-2">
          <button
            onClick={() =>
              setDateFilter((prev) => (prev === "today" ? "all" : "today"))
            }
            className="flex items-center gap-2 border border-slate-300 px-3 py-1.5 rounded-md text-sm"
          >
            <CalendarDays size={14} />
            {dateFilter === "today" ? "Today" : "All"}
          </button>

          <button
            onClick={() => setShowFilterMenu((prev) => !prev)}
            className="flex items-center gap-2 border border-slate-300 px-3 py-1.5 rounded-md text-sm"
          >
            <Filter size={14} />
            Filter
          </button>

          {showFilterMenu && (
            <div className="absolute right-0 top-10 z-20 w-40 rounded-md border border-slate-200 bg-white text-sm shadow-md">
              <button
                onClick={() => {
                  setDateFilter("today");
                  setShowFilterMenu(false);
                }}
                className={`block w-full px-3 py-2 text-left hover:bg-slate-50 ${
                  dateFilter === "today" ? "text-blue-600 font-medium" : ""
                }`}
              >
                Today
              </button>

              <button
                onClick={() => {
                  setDateFilter("all");
                  setShowFilterMenu(false);
                }}
                className={`block w-full px-3 py-2 text-left hover:bg-slate-50 ${
                  dateFilter === "all" ? "text-blue-600 font-medium" : ""
                }`}
              >
                All Dates
              </button>

              <button
                onClick={() => {
                  setDateFilter("custom");
                  setShowFilterMenu(false);
                }}
                className={`block w-full px-3 py-2 text-left hover:bg-slate-50 ${
                  dateFilter === "custom" ? "text-blue-600 font-medium" : ""
                }`}
              >
                Custom (coming soon)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="rounded-2xl border border-slate-300 bg-white p-4 space-y-4">

        {loading && (
          <div className="text-center text-sm text-slate-400">
            Loading screenshots...
          </div>
        )}

        {!loading && Object.keys(grouped).length === 0 && (
          <div className="flex flex-col items-center text-slate-400">
            <MonitorSmartphone size={30} />
            No screenshots found
          </div>
        )}

        {Object.entries(grouped).map(([date, shots]) => {
          const isCollapsed = collapsedDates[date];

          return (
            <div key={date}>
              {/* DATE HEADER */}
              <button
                onClick={() => toggleDateCollapse(date)}
                className="flex w-full items-center justify-between bg-slate-100 px-3 py-2 rounded-md text-sm font-medium text-slate-600 mb-3"
              >
                <span>{date}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isCollapsed ? "-rotate-90" : ""
                  }`}
                />
              </button>

              {/* GRID */}
              {!isCollapsed && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {shots.map((shot) => (
                    <button
                      key={shot.id}
                      onClick={() => setPreviewShot(shot)}
                      className="border border-slate-300 rounded-xl overflow-hidden bg-white text-left hover:shadow-md transition"
                    >
                      <img
                        src={shot.url}
                        alt={shot.title}
                        className="w-full h-40 object-cover"
                      />

                      <div className="p-2 text-xs">
                        <p className="text-blue-600 font-medium">
                          {shot.title}
                        </p>
                        <p className="text-slate-400 text-[10px]">
                          {shot.user}
                        </p>

                        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                          <span>{shot.date}</span>
                          <span>{shot.time}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {previewShot && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setPreviewShot(null)}
        >
          <div
            className="relative max-h-[95vh] w-[95vw] sm:w-[90vw] max-w-5xl rounded-3xl bg-slate-950/95 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewShot(null)}
              className="absolute right-4 top-4 z-20 h-8 w-8 flex items-center justify-center rounded-full bg-black/70 text-white"
            >
              <X size={18} />
            </button>

            <div className="pt-8 flex items-center justify-center bg-gray-900">
              <img
                src={previewShot.url}
                alt={previewShot.title}
                className="max-h-[75vh] w-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between border-t border-slate-800 px-4 py-3 text-xs text-slate-200">
              <div>
                <p className="text-sm font-medium">{previewShot.title}</p>
                <p className="text-[11px] text-slate-400">
                  {previewShot.user}
                </p>
              </div>
              <div className="text-right text-[11px] text-slate-400">
                <div>{previewShot.date}</div>
                <div>{previewShot.time}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenshotsPage; 