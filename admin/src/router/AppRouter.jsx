
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
import NotFound from "../pages/not-Found/NotFound";

const AppRouter = () => {
   const existingAuth = localStorage.getItem("auth");

    if (!existingAuth) {
      const demoAuth = {
        token: "demo-token-123",
        user: {
          email: "demo@gmail.com",
          name: "Demo User",
          role: "Admin",
          userId: "123",
          organizationId: "org1",
        },
      };

      localStorage.setItem("auth", JSON.stringify(demoAuth));
    }
  const isLoggedIn = Boolean(localStorage.getItem("auth"));
console.log(">>>",isLoggedIn);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={isLoggedIn ? "/dashboard" : "/dashboard"} replace />,  // fix it bczz it it is only demo purpose and we want to show dashboard page without login
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
          path: "/employee/dashboard",
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
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;