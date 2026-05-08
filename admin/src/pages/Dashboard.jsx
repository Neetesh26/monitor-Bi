import StatCard from "../components/Dashboard/Statcard";
import Heading from "../components/Heading";
import Bag from "./../assets/dashboard/BagSimple.svg?react";
import Chart from "./../assets/dashboard/ChartLine.svg?react";
import Clock from "./../assets/dashboard/ClockUser.svg?react";
import Desktop from "./../assets/dashboard/Desktop.svg?react";
import Lightning from "./../assets/dashboard/LightningSlash.svg?react";
import Minus from "./../assets/dashboard/Minus.svg?react";
import TrendDown from "./../assets/dashboard/TrendDown.svg?react";
import TrendUp from "./../assets/dashboard/TrendUp.svg?react";
import ActivityChart from "./../components/Dashboard/Chart";
import EmployeeTableCard from "../components/Dashboard/EmployeeCard";
import TopPlatformCategories from "../components/Dashboard/TopPlatformCategory";
import CategoryBreakdown from "../components/Dashboard/CategoryBreakdown";
import AppsWebsites from "../components/Dashboard/AppsWebsite";

const employees = [
  {
    name: "Shivangi Singh",
    avatar: "./user1.svg",
    productive: "01:28",
    unproductive: "01:28",
    utilization: "28.50%",
  },
  {
    name: "Aqsa Shaikh",
    avatar: "./user2.svg",
    productive: "01:28",
    unproductive: "01:28",
    utilization: "28.50%",
  },
];

const teams = [
    {
        name: "KlarityOS",
        productive: "01:28",
        unproductive: "01:28",
        utilization: "28.50%",  
    },
    {
        name: "Hanat",
        productive: "01:28",
        unproductive: "01:28",
        utilization: "28.50%",
    }
];

export default function Dashboard(){
    return(
        <>
            <Heading title="Dashboard" content="Keep track of your team's work and productivity"/>
            <div className="grid grid-cols-4 gap-4 mb-6 w-full">
                <StatCard title="Work Time" value="01:42 h" change="+99%" icon={Bag}/>
                <StatCard title="Active Time" value="01:42 h" change="+99%" icon={Chart}/>
                <StatCard title="Idle Time" value="01:42 h" change="+99%" icon={Clock}/>
                <StatCard title="Manual Time" value="01:42 h" change="+99%" icon={Desktop}/>
                <StatCard title="Productive Time" value="01:42 h" change="+99%" icon={Lightning}/>
                <StatCard title="Unproductive Time" value="01:42 h" change="+99%" icon={Minus}/>
                <StatCard title="Neutral Time" value="01:42 h" change="+99%" icon={TrendDown}/>
                <StatCard title="Utilization" value="01:42 h" change="+99%" icon={TrendUp}/>
            </div>
            <ActivityChart/>
            <div className="grid grid-cols-2 gap-4">
                <EmployeeTableCard title="Top Productive Employees" data={employees} option="EMPLOYEES"/>
                <EmployeeTableCard title="Top Unproductive Employees" data={employees} option="EMPLOYEES"/>
                <EmployeeTableCard title="Top Productive Teams" data={teams} option="TEAMS"/>
                <EmployeeTableCard title="Top Unproductive Teams" data={teams} option="TEAMS"/>
                <TopPlatformCategories />
                <CategoryBreakdown />
            </div>
            <AppsWebsites />
        </>    
    )
}