import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 px-4">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-[pulse_8s_ease-in-out_infinite] blur-3xl">
          <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-blue-300/40" />
          <div className="absolute right-[-80px] top-24 h-72 w-72 rounded-full bg-indigo-300/35" />
          <div className="absolute bottom-[-40px] left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-sky-300/30" />
        </div>
      </div>

      {/* Main glass card */}
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-white/60 bg-white/30 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.18)] backdrop-blur-2xl animate-[fadeIn_0.6s_ease-out]">
        {/* Inner highlight border */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/40" />

        {/* Diagonal light streak */}
        <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rotate-12 bg-gradient-to-br from-white/40 to-transparent blur-xl" />

        {/* Floating 404 badge */}
        <div className="relative mb-6 flex justify-center">
          <div className="relative h-28 w-28">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-400 to-sky-400 opacity-90 shadow-lg shadow-blue-500/40 animate-[float_4s_ease-in-out_infinite]" />
            <div className="absolute inset-[6px] flex items-center justify-center rounded-3xl border border-white/70 bg-white/70 backdrop-blur-xl">
              <span className="text-3xl font-bold tracking-tight text-slate-900">
                404
              </span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Page not found
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            The page you are looking for doesn&apos;t exist, has been moved, or is
            temporarily unavailable.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center justify-center rounded-full bg-white/70 px-4 py-2 text-xs font-medium text-slate-700 shadow-sm shadow-slate-200 ring-1 ring-slate-200/80 backdrop-blur-sm transition hover:bg-white hover:ring-slate-300"
          >
            Go back
            <span className="ml-1 transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-2 text-xs font-medium text-white shadow-md shadow-blue-500/40 ring-1 ring-blue-500/70 transition hover:from-blue-500 hover:to-indigo-500 hover:ring-blue-400"
          >
            Go to dashboard
            <span className="ml-1 inline-block animate-[bounceRight_1.4s_ease-in-out_infinite]">
              →
            </span>
          </button>
        </div>

        <p className="mt-4 text-center text-[11px] text-slate-400">
          If you think this is a mistake, please check the URL or contact support.
        </p>
      </div>

      {/* Keyframes for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceRight {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;