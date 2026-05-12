import { useState } from "react";
import Heading from "./../components/Heading";
import Tabs from './../components/Tabs';
import Toolbar from '../components/Toolbar';
import EmployeeTable from '../components/EmployeeTable';
import { manualTimeColumns, timesheetColumns } from '../components/Columns';
import AttendanceGrid from '../components/TimeAndAttendance/Attendance';
import { employees } from "../data/employees.js";
import { manualTimeData } from "../data/manualTime";

function TimeAndAttendance() {
    const [activeTab, setActiveTab] = useState("Timesheet");
    const tabs = ['Timesheet', 'Attendance', 'Manual Time']
  return (
   <>
        <Heading title="Employees" content="Access employee details, roles and activity easily."/>
        <Tabs active={activeTab} setActive={setActiveTab} tabs={tabs} />
        
        <div className='w-full overflow-x-auto'>
            {
               activeTab==="Timesheet" && (
                <>
                    <Toolbar data="Today"/>
                    <EmployeeTable columns={timesheetColumns} data={employees}/>
                </>
               )
            }
            {
               activeTab==="Attendance" && (
                <>
                    <Toolbar data="This Month" />
                    <AttendanceGrid />
                </>
               )
            }
            {
                activeTab==="Manual Time" && (
                <>
                    <Toolbar data="Today" />
                    <EmployeeTable columns={manualTimeColumns} data={manualTimeData} />
                </>
                )
            } 
        </div> 
   </>
  )
}


export default TimeAndAttendance