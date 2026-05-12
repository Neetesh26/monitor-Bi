import TodayCard from "../components/TodayCard.jsx";
import Heading from "../components/Heading";
import { Users } from "lucide-react";
import TrendUp from "./../assets/dashboard/TrendUp.svg?react";
import TrendDown from "./../assets/dashboard/TrendDown.svg?react";
import EmployeeTable from "../components/EmployeeTable.jsx";
import { insightsColumns } from "../components/Columns.jsx";
import { employees } from "../data/employees.js";

function RealTimeInsights() {

  return (
    <>
      <Heading title="Real-time Insights" content="Stay updated with real-time data across teams and tasks"/>
      <div className="grid grid-cols-3 gap-4 mb-6 w-full">
        <TodayCard title="Present Today" value="12" total="/25" Icon={Users} color="text-blue-500" />
        <TodayCard title="Currently Active" value="12"  Icon={TrendUp} color="text-green-500"/>
        <TodayCard title="Currently Unproductive" value="01"  Icon={TrendDown} color="text-red-500" />
      </div>
      <EmployeeTable columns={insightsColumns} data={employees}/>
    </>
  )
}

export default RealTimeInsights