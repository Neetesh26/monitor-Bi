import { createBrowserRouter, RouterProvider } from "react-router";
import AddEmployee from "../pages/entryPages/AddEmployee";


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
