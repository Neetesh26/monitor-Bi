import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/Mainlayout";
import TimeAndAttendance from "./pages/TimeAndAttendance";
import RealTimeInsights from "./pages/RealInsights";
import Employees from "./pages/Employees/Employees";
import EmployeeDetails from "./pages/Employees/EmployeeDetails";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/insights" element={<RealTimeInsights/>}></Route>
          <Route path="/attendance" element={<TimeAndAttendance/>} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}