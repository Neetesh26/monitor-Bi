import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import AttendancePage from "../pages/attendance/AttendancePage";
import TimeTrackingPage from "../pages/attendance/TimeTrackingPage";
import ProjectDetailPage from "../pages/attendance/ProjectDetailPage";
import CreateTaskPage from "../pages/attendance/CreateTaskPage";
import ProtectedRoute from "./ProtectedRoute";
import TimeAttendence from "../pages/time&attendence/TimeAttendence";
import TeamsPage from "../pages/teams/TeamsPage";
import ScreenshotsPage from "../pages/screenshort/ScreenshotsPage";

const AppRouter = () => {
  const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={isLoggedIn ? "/attendance" : "/login"} replace />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/time-attendance",
          element: <TimeAttendence />,
        },
        {
          path: "/teams",
          element: <div className="p-8"><TeamsPage />  </div>,
        },
        {
          path: "/projects",
          element: <div className="p-8">Projects Page</div>,
        },
        {
          path: "/screenshots",
          element: <div className="p-8"><ScreenshotsPage />  </div>,
        },
        {
          path: "/reports",
          element: <div className="p-8">Reports Page</div>,
        },
       
      ],
    },
    {
      path: "/attendance",
      element: (
        <ProtectedRoute>
          <AttendancePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/attendance/time-tracking",
      element: (
        <ProtectedRoute>
          <TimeTrackingPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/attendance/project/:projectId",
      element: (
        <ProtectedRoute>
          <ProjectDetailPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/attendance/project/:projectId/create-task",
      element: (
        <ProtectedRoute>
          <CreateTaskPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;