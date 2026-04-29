import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../feature/AuthSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user?.name || user?.email || "User"}.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <h2 className="text-lg font-medium">Work Overview</h2>
            <p className="text-sm text-gray-500 mt-2">Track your team’s productivity and activity in one place.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <h2 className="text-lg font-medium">Employees</h2>
            <p className="text-sm text-gray-500 mt-2">View employee stats, devices, and real-time status.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <h2 className="text-lg font-medium">Productivity</h2>
            <p className="text-sm text-gray-500 mt-2">Analyze productive, idle, and manual time metrics.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
