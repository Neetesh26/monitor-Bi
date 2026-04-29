import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AddEmployee from "../pages/employeesPages/AddEmployee";



const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AddEmployee />,
    },
   
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
