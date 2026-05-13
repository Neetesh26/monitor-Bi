import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Adminlayout from "./layout/Adminlayout";
import TimeAndAttendance from "./pages/TimeAndAttendance";
import RealTimeInsights from "./pages/RealInsights";
import Employees from "./pages/AdminEmployees/Employees";
import EmployeeDetails from "./pages/AdminEmployees/EmployeeDetails";
import Teams from "./pages/AdminTeams/Teams";
import TeamDetails from "./pages/AdminTeams/TeamDetails";
import Project from "./pages/project/Project";
import ProjectDetail from "./pages/project/ProjectDetail";
import Screenshot from "./pages/adminScreenshots/Adminscreenshot";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Adminlayout/>}>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/insights" element={<RealTimeInsights/>}></Route>
          <Route path="/attendance" element={<TimeAndAttendance/>} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamName" element={<TeamDetails />} />
          <Route path="/projects" element={<Project />}/>
          <Route path="/projects/:projectname" element={<ProjectDetail />}/>
          <Route path="/screenshots" element={<Screenshot/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}