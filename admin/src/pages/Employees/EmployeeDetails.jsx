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
            <Toolbar data="Today" />
            <div className="grid grid-cols-3 gap-4 mb-6 w-full">
                <TodayCard title="Work Time" value="01:42"  Icon={WorkTime} />
                <TodayCard title="Productive Time" value="01:42"  Icon={Trendup} />
                <TodayCard title="Unproductive Time" value="01:42"  Icon={Trenddown}/>
            </div>
        </>
    )
}