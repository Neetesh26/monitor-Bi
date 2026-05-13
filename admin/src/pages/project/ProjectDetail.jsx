import EDHeader from "./../../components/EmployeeDetails/EDHeader";
import ProjectHeader from '../../components/project/ProjectHeader';
import { useParams } from 'react-router-dom';
import FilterDateBar from "../../components/project/FilterDateBar";
import TodayCard from "../../components/TodayCard";
import WorkTime from "./../../assets/dashboard/BagSimple.svg?react";
import Currenttask from "./../../assets/projects/currenttask.svg?react";
import InReview from "./../../assets/projects/InReview.svg?react";
import Completedtask from "./../../assets/projects/completedtask.svg?react";
import KanbanBoard from "../../components/project/KanbanBoard";
import AssignedEmployeesHeader from "../../components/project/AssignedEmployeeHeader";
import EmployeeTable from "../../components/EmployeeTable";
import { assignedEmployeeColumns } from "../../components/Columns";
import { assignedEmployeesData } from "../../data/assignedEmployee";
function ProjectDetail() {
  const {projectname} = useParams();
  return (
    <>
      <EDHeader title="Project Detail"/>
      <ProjectHeader title={projectname} />
      <FilterDateBar />
      <div className="w-full flex justify-between items-center mb-6">
          <TodayCard title="Total Time On Project" value="01:42"  Icon={WorkTime} color="text-[#1B48DE]" width="w-[250px]"/>
          <TodayCard title="Current Task" value="15 tasks"  Icon={Currenttask} color="text-[#1B48DE]" width="w-[250px]"/>
          <TodayCard title="In Review" value="6 tasks"  Icon={InReview} color="text-[#1B48DE]" width="w-[250px]"/>
          <TodayCard title="Completed Tasks" value="20"  Icon={Completedtask} color="text-[#1B48DE]" width="w-[250px]"/>
      </div>
      <KanbanBoard />
      <AssignedEmployeesHeader />
      <EmployeeTable columns={assignedEmployeeColumns} data={assignedEmployeesData} />
    </>
  )
}

export default ProjectDetail