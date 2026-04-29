import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";

const AppRouter = () => {
  const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />,
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
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
