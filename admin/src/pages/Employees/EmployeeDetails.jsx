import { useParams } from "react-router-dom";
import EmployeeDetailHeader from "../../components/EmployeeDetails/EDHeader";
import { employees } from "../../data/Employees";
import EmployeeProfileCard from "../../components/EmployeeDetails/EDInfo";
import Tabs from "../../components/Tabs";
import { useState } from "react";
import Toolbar from "../../components/Toolbar";
import TodayCard from "../../components/TodayCard";
import WorkTime from "./../../assets/dashboard/BagSimple.svg?react";
import Trendup from "./../../assets/dashboard/TrendUp.svg?react";
import Trenddown from "./../../assets/dashboard/TrendDown.svg?react";
import Chart from "./../../components/Dashboard/Chart";
import Screenshots from "../../components/EmployeeDetails/Screenshot";
import TopPlatformCategories from "../../components/TopPlatformCategory";
import CategoryBreakdown from "../../components/CategoryBreakdown";
import AppsWebsites from "../../components/AppsWebsite";
import ActivityTimeline from "../../components/EmployeeDetails/ActivityTimeline";
import EmployeeTable from "../../components/EmployeeTable";
import { employeeTimesheetColumns } from "../../components/Columns";
import { employeeTimesheetData } from "../../data/employeeTimesheet";
import TeamHoursCard from "../../components/EmployeeDetails/EmployeeTeamHours";
import { ChevronRight } from 'lucide-react';

export default function EmployeeDetails(){
    const {id} = useParams();
    const employee = employees.find(e=>e.id==id);
    const tabs = ['Utilization', 'Activities', 'Timesheet', 'Projects'];
    const [activeTab,setActiveTab] = useState("Utilization")
    
    return(
        <>
                <EmployeeDetailHeader />
                <EmployeeProfileCard employee={employee} />
                <Tabs active={activeTab} setActive={setActiveTab} tabs={tabs} />            
            {
                activeTab==="Utilization" && (
                    <>
                        <Toolbar data="Today" />
                        <div className="grid grid-cols-3 gap-4 mb-6 w-full">
                            <TodayCard title="Work Time" value="01:42"  Icon={WorkTime} color="text-blue-500"/>
                            <TodayCard title="Productive Time" value="01:42"  Icon={Trendup} color="text-green-500"/>
                            <TodayCard title="Unproductive Time" value="01:42"  Icon={Trenddown} color="text-red-500"/>
                        </div>
                        <Chart />
                        <Screenshots />
                        <div className="grid grid-cols-2 gap-4">
                            <TopPlatformCategories />
                            <CategoryBreakdown />
                        </div>
                        <AppsWebsites />
                    </>                    
                )
            }
            {
                activeTab==="Activities" && (
                    <>
                        <Toolbar data="This Month" />
                        <ActivityTimeline />
                    </>
                     
                )
            }
            {
                activeTab==="Timesheet" && (
                    <>
                        <Toolbar data="This Month" />
                        <EmployeeTable
                            columns={employeeTimesheetColumns} 
                            data={employeeTimesheetData}
                        />
                    </>
                )
            }
            {
                activeTab==="Projects" && (
                    <>
                        <Toolbar data={"This Month"} />
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <TeamHoursCard />
                            </div>
                            <div className="col-span-2">
                                <p>All Projects <ChevronRight className="inline-flex"/><span className="text-blue-400">Hanat</span></p>
                            </div>
                        </div>  
                    </>
                                     
                )
            }
            
            
        </>
    )
}